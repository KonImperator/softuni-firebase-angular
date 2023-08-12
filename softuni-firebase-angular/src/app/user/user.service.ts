import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  user,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  uploadBytesResumable,
  ref,
  UploadTask,
  getDownloadURL,
} from '@angular/fire/storage';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  from,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { BrowserStorageService } from '../storage.service';
import { UserDTO, UserStorageData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User | null> = user(this.auth);
  user: User | null;

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isLoading$: Observable<boolean> = this._isLoading.asObservable();
  // using to check if components or sections are loading and avoid some of the flicker between logged in/anon user in the header

  private readonly storageRef = ref(this.storage);
  private readonly userAvatarsRef = ref(this.storageRef, 'user-avatars');
  // chaining references to the user avatars folder for easier use

  constructor( private auth: Auth, private firestore: Firestore, private storage: Storage, private localStorageService: BrowserStorageService) {
    this.user$.subscribe((user) => {
      if (user){
        this.user = user;
      }
      this._isLoading.next(false)
    });
  } 

  /* LOGIN LOGOUT REGISTER */

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      this.localStorageService.saveUser({uid: user.uid!, email: user.email!, photoURL: user.photoURL!, displayName: user.displayName!})
    } catch (error) {
      throw new Error('Wrong username or password');
    }
  }

  async register({displayName, password, email}: UserStorageData): Promise<User> {
    let userCredential;

    try {
      userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email!,
        password!
      );
      const user = userCredential.user;

      // create doc reference for current user
      const userDocRef = doc(this.firestore, 'users', userCredential.user.uid);

      // if registration is successful, update profile data and add subcollection
      await updateProfile(userCredential.user, { displayName });

      await this.firebaseSaveUser(userDocRef, email!, displayName!);
      this.localStorageService.saveUser({uid: user.uid!, email: user.email!, photoURL: user.photoURL!, displayName: user.displayName!})
      
      return userCredential.user;

    } catch (error: any) {
      // else delete new user to revert process
      if (userCredential) {
        userCredential.user.delete();
      }

      if (error.message.includes('email-already-in-use')) {
        throw new Error('Email is already in use');
      }
      throw new Error('Registration failed, please try again in a few minutes');
    }
  }

  logout(): Promise<void> {
    this.localStorageService.clear();
    this.user = null;
    return signOut(this.auth);
  }

  /* LOGIN LOGOUT REGISTER */

  private get userDocRef() {
    const user = JSON.parse(this.localStorageService.get('user')!);
    if (user) {
      return doc(this.firestore, 'users', user.uid);
    }
    return null
  }

  /* FIRESTORE OPERATIONS */
  
  async firebaseSaveUser(userDocRef: DocumentReference, email: string, displayName: string): Promise<void> {
    const data = { email: email, displayName: displayName, photoURL: '' };
    await setDoc(userDocRef, data);
  }

  async firebaseUpdateUser(userData: {displayName?: string, photoURL: string, email?: string}) {
    const userDocRef = this.userDocRef;
      if (userDocRef) {
        return from(updateDoc(userDocRef, userData));
      }
       return throwError(() => new Error('auth/missing-credentials'));
  }

  /* FIRESTORE OPERATIONS */

  /* PROFILE UPDATES */
  
  editProfile({ displayName, email, password, avatar }: UserDTO) {
    return this.user$.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          // if user is not logged in, throw error
          throw new Error('auth/missing-credentials');
        }
        // if user is present, reauthenticate
        return this.reauthenticateUser(password!).pipe(
          switchMap(() => this.uploadFileToStorage(avatar, user.uid)),
          switchMap((photoURL) => {
            const updatedData: any = {};
            photoURL ? updatedData.photoURL = photoURL : null;
            user.displayName !== displayName ? updatedData.displayName = displayName : null;
            user.email !== email ? updatedData.email = email : null;
            if (Object.keys(updatedData).length) {
              return from(this.firebaseUpdateUser(updatedData)).pipe(
                tap(() => {
                  this.localStorageService.saveUser(updatedData);
                  from(updateProfile(user!, updatedData));
                }),
                concatMap(() => {
                  console.log('updating email address')
                  if (user!.email !== email) {
                    return from(updateEmail(user!, email!))
                  }
                  this.localStorageService.set('email', email)
                  return of(null);
                })
              );
            }
            return of('');
          })
        );
      }),
      catchError((error) => this.handleErrors(error))
    );
  }

  changePassword(currPass: string, newPass: string) {
    return this.reauthenticateUser(currPass).pipe(
        tap(() => from(updatePassword(this.user!, newPass))),
        catchError((err) => this.handleErrors(err))
      )
  }

  reauthenticateUser(password: string) {
    const credentials = EmailAuthProvider.credential(this.user!.email!, password!);
    return from(reauthenticateWithCredential(this.user!, credentials))
  }

  /* PROFILE UPDATES */

  /* HANDLES FILE CLOUD STORAGE UPLOADS */  

  private uploadFileToStorage(avatar: File, uid: string): Observable<string> {
    if (!avatar) {
     return of('');
    }
    const avatarRef = ref(this.userAvatarsRef, `${uid}|avatar`);
    const uploadTask: UploadTask = uploadBytesResumable(avatarRef, avatar);
    return new Observable((observer) => {
      const unsubscribe = uploadTask.on('state_changed', {
        complete: () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            unsubscribe();
            observer.next(url);
            console.log('Upload Completed');
          });
        },
        error: (err) => {
          observer.error('storage/upload-failed');
        },
      });
    });
  }

  /* ERROR HANDLING */

  handleErrors(error: Error) {
    if (error.message.includes('auth/wrong-password') || error.message.includes('auth/invalid-password')) {
      return throwError( () => 'Incorrect password provided.');
    }

    if (error.message.includes('auth/email-already-in-use')) {
        return throwError( () => 'The email address is already in use by another account.');
    }

    if (error.message.includes('auth/invalid-email')) {
        return throwError( () => 'Invalid email format.');
    }

    if (error.message.includes('auth/too-many-requests')) {
      return throwError( () => 'Too many wrong password entries, try again later or reset your password.');
    }

    if (error.message.includes('auth/missing-credentials')) {
      return throwError( () => 'Missing user credentials: Authentication required');
    }

    if (error.message.includes('storage/upload-failed')) {
      return throwError( () => 'Failed to upload image.');
    }

    return throwError( () => 'An unexpected error occurred. Please try again later.');
  }
}

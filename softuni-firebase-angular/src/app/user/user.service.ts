import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  user,
  updateProfile,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject, Subscription, tap } from 'rxjs';

interface LoggedInUser {
  displayName: string | null | undefined;
  email: string | null | undefined;
  uid: string | null | undefined;
  createdAt: string | null | undefined;
}
@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy, OnInit {
  user: LoggedInUser | null;
  user$: Observable<User | null> = user(this.auth);

  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true); // using this to avoid some of the flicker between logged in/anon user in the header
  isLoading$: Observable<boolean> = this._isLoading.asObservable();

  userDocRef: DocumentReference | null;

  userSubscription: Subscription;
  
  constructor(private auth: Auth, private firestore: Firestore) {
    this.userSubscription = this.user$.pipe(tap((user) => {
      if (user) {
        const currentUser = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          createdAt: user.metadata.creationTime
        }
        this.user = currentUser;
      }
    }
    )).subscribe(() => this._isLoading.next(false));
  }

  ngOnInit(): void {}

  saveUserProfile(userData: any) {
    setDoc(this.userDocRef!, userData)
  }

  // getAuthState(): Observable<User | null> {
  //   return new Observable<User | null>((subscriber) => {
  //     const unsubscribe = onAuthStateChanged(
  //       this.auth,
  //       (user) => {
  //         subscriber.next(user);
  //       },
  //       (error) => {
  //         subscriber.error(error);
  //       },
  //       () => {
  //         subscriber.complete();
  //       });

  //       return unsubscribe;
  //   });
  // }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        throw new Error('Wrong username or password');
      });
  }

  register(userData: { username: string; passwords: { password: string, rePass: string}; email: string }) {
    return createUserWithEmailAndPassword(this.auth, userData.email, userData.passwords.password )
      .then((userCredential) => {
        this.userDocRef = doc(this.firestore, 'users', userCredential.user.uid);
        // create doc reference for current user
        const data = {
            email: userData.email,
            displayName: userData.username,
            photoUrl: '',
          }
          try {
          // if registration is successful, update profile data and add subcollection
          updateProfile(userCredential.user, { displayName: userData.username })
           
          this.saveUserProfile(data);
          return userCredential.user;

        } catch (error) {
          // else delete new user to revert process and rethrow error
          userCredential.user.delete();
          throw new Error();
        }
      })
      .catch((error) => {
        if (error.message.includes('email-already-in-use')) {
          throw new Error('Email is already in use');
        }
        throw new Error('Registration failed, please try again in a few minutes');
      }).finally(() => this.userDocRef = null);
  }

  logout(): Promise<void> {
    this.user = null;
    return signOut(this.auth);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

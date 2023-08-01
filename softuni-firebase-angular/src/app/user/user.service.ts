import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  user,
  onAuthStateChanged,
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
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy, OnInit {

  user$: Observable<User | null> = user(this.auth);
  userDocRef: DocumentReference | null;
  userSubscription: Subscription;
  
  constructor(private auth: Auth, private firestore: Firestore) {
    this.userSubscription = this.user$.subscribe();
  }

  ngOnInit(): void {}

  addUserProfile(userData: any) {
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
           
          this.addUserProfile(data);
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
    return signOut(this.auth);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

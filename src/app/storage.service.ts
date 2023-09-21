import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UserStorageData } from './user/interfaces';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  get(key: string) {
    const prop = this.storage.getItem(key);
    return prop ? JSON.parse(prop) : null;
  }

  set(key: string, value: string) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  saveUser(user: UserStorageData) {
    for (let [key, value] of Object.entries(user)) {
      this.set(key, value);
    }
  }

  getFullUser() {
    const displayName = this.get('displayName');
    const email = this.get('email');
    const uid = this.get('uid');
    const photoURL = this.get('photoURL');
    return { displayName, email, uid, photoURL };
  }
}

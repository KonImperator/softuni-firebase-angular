
export interface UserCredentials {
  email?: string;
  password?: string; 
}

export interface UserDTO extends UserCredentials {
  displayName: string;
  avatar: File;
}

export interface UserStorageData extends UserCredentials {
  displayName?: string;
  photoURL?: string;
  uid?: string;
}

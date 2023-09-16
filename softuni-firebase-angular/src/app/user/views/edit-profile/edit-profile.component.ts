import { Component, OnInit } from '@angular/core';
import { updateProfile } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultAvatarList } from 'src/assets/avatars/defaultAvatars';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { BrowserStorageService } from 'src/app/storage.service';
import { LoadingStates } from '../../interfaces';

type Button = 'avatarBtn' | 'saveBtn';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  file: File | null = null;
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;
  timeout: NodeJS.Timeout | null;

  defaultAvatarList: string[] = defaultAvatarList;
  defaultAvatar: string;

  isLoading: LoadingStates = { avatarBtn: false, saveBtn: false };

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private localStorageService: BrowserStorageService
  ) {}

  get user() {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.user!.email, [Validators.email, Validators.required]],
      displayName: [
        this.user!.displayName,
        [Validators.required, Validators.minLength(3)],
      ],
      password: ['', [Validators.required]],
    });
  }

  hideMessage() {
    this.error = null;
    this.success = null;
  }

  // *** For uploading custom avatar //

  onUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length <= 0) {
      return;
    }

    const file = target.files[0];

    if (!file.type.startsWith('image/')) {
      target.value = '';
      this.file = null;
      return;
    }
    this.file = file;
  }

  finalizeCustomAvatar() {
    if (!this.file || !this.user) {
      return;
    }

    this.isLoading.avatarBtn = true;

    this.userService
      .updateAvatar(this.file)
      .then(() => this.handleCompleteMessage('avatarBtn'))
      .catch((err) => this.handleCompleteMessage('avatarBtn', err));
  }
  // For uploading custom avatar *** //

  // *** For choosing default avatar //
  chooseDefaultAvatar(event: Event) {
    // event delegation for clicking on avatar
    if (event.target instanceof HTMLImageElement) {
      this.defaultAvatar = event.target.src.replace(`${environment.appDomainUrl}`, ''); // unifying image url format
    }
  }

  finalizeDefaultAvatar() {
    this.isLoading.avatarBtn = true;

    this.userService
      .firebaseUpdateUser({ photoURL: this.defaultAvatar })
      .then(() => {
        updateProfile(this.user!, { photoURL: this.defaultAvatar });
        this.localStorageService.set('photoURL', this.defaultAvatar);
        this.handleCompleteMessage('avatarBtn');
      })
      .catch((err) => this.handleCompleteMessage('avatarBtn', err));
  }
  // For choosing default avatar *** //

  onSubmit() {
    if (this.form.invalid) {
      return alert('Invalid input');
    }

    this.isLoading.saveBtn = true;

    this.userService
      .editProfile(this.form.value)
      .then(() => this.handleCompleteMessage('saveBtn'))
      .catch((err) => this.handleCompleteMessage('saveBtn', err.message));
  }

  handleCompleteMessage(buttonType: Button, err?: string) {
      this.isLoading[buttonType] = false;
      
      if (this.timeout) clearTimeout(this.timeout);

      err
      ? (this.error = err)
      : (this.success = 'Profile updated successfully!');

      this.timeout = setTimeout(() => {
        this.success = null;
        this.error = null;
        this.timeout = null;
      }, 5000);
    };
  }

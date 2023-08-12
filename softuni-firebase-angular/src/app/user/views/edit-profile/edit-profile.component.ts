import { Component, OnInit, NgZone } from '@angular/core';
import { updateProfile, User } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { defaultAvatarList } from 'src/assets/avatars/defaultAvatars';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user.service';
import { BrowserStorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  file: File | null = null;
  user: User | null = this.userService.user;
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;

  defaultAvatarList: string[] = [...defaultAvatarList];
  defaultAvatar: string;

  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private zone: NgZone,
    private localStorageService: BrowserStorageService
  ) {}

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

  setDefaultAvatar(event: Event) {
    if (event.target instanceof HTMLImageElement) {
      this.defaultAvatar = event.target.src.replace(`${environment.appDomainUrl}`, '');
    }
  }

  finalizeDefaultAvatar() {
    updateProfile(this.user!, { photoURL: this.defaultAvatar });
    this.localStorageService.set('photoURL', this.defaultAvatar)
    this.userService.firebaseUpdateUser({ photoURL: this.defaultAvatar });
  }

  onSubmit() {
    if (this.form.invalid) {
      return alert('Invalid input');
    }
    console.log('submitting form');

    this.isLoading = true;

    this.userService
      .editProfile({ ...this.form.value, avatar: this.file || '' })
      .pipe(take(1))
      .subscribe({
        complete: () => {
          // isLoading seems to be set outside of the current zone but I couldn't find out why
          // it doesn't reflect in the template so zone.run is used to bring it inside
          this.zone.run(() => {
            this.handleCompleteMessage();
          });
        },
        error: (err) => {
          this.handleCompleteMessage(err)
        },
      });
  }

    handleCompleteMessage(err?: string) {
      this.isLoading = false
      err ? this.error = err : this.success = 'Profile updated successfully!';
      const timeout = setTimeout(() => {
        this.success = null;
        this.error = null
        clearTimeout(timeout);
      }, 5000);
    }
}

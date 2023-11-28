import { Component } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
class CustomValidators {
  static passwordContainsNumber(control: AbstractControl): ValidationErrors {
    const regex = /\d/;

    if (regex.test(control.value) && control.value !== null) {
      return null as any;
    } else {
      return { passwordInvalid: true };
    }
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors {
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;

    if (
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      return null as any;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [
          null,
          [Validators.required, Validators.email, Validators.minLength(6)],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: CustomValidators.passwordsMatch,
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(
      (user) => {
        if (!user) {
          return;
        }
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.error.message);
      }
    );
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, 'OK');
  }
}

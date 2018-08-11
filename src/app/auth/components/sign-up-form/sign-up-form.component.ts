import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService,
          SessionStorageService,
          LocalStorage,
          SessionStorage
        } from 'angular-web-storage';


import { requiredMinLengthCustomValidator,
          requiredAtLeastOneUpperCaseValidator,
          requiredAtLeastOneSpecialCharacterValidator,
          requiredAtLeastOneNumericValidator,
          requiredNoSpaceValidator,
          requiredEmailValidator
        } from '../../../shared/services/form.validator';

import { AWSService } from '../../services/aws.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  signUpForm: FormGroup;
  passwordFieldType: string;
  passwordBtnText: string;

  constructor( private formBuilder: FormBuilder,
      private router: Router,
      private awsService: AWSService,
      public session: SessionStorageService,
      private toastr: ToastrService,
      private spinnerService: Ng4LoadingSpinnerService ) {
    }

  ngOnInit() {
    this.passwordFieldType = 'password';
    this.passwordBtnText = 'Show';
    this.signUpForm = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        // tslint:disable-next-line:max-line-length
        requiredEmailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        requiredMinLengthCustomValidator(8),
        requiredAtLeastOneUpperCaseValidator(/(?=.*[A-Z])/),
        requiredNoSpaceValidator(/^\S*$/),
        requiredAtLeastOneSpecialCharacterValidator(/(?=.*[!@#$%])/),
        requiredAtLeastOneNumericValidator(/(?=.*[/\d/])/)
      ])
    });
  }

  // convenience getter for easy access to form fields
  get signUpFormControl() { return this.signUpForm.controls; }

  // show/hide password
  togglePasswordType() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
    this.passwordBtnText = (this.passwordFieldType === 'password') ? 'Show' : 'Hide';
  }

  // Next button
  onSubmit() {
    this.spinnerService.show();
    const emailId = this.signUpFormControl.email.value;
    const password = this.signUpFormControl.password.value;

    this.awsService.signUp(emailId, password, this.signupHandler);
  }

  // callback for signup
  signupHandler = (err, result) => {
    this.spinnerService.hide();
    if (err) {
      if (err.code === 'UsernameExistsException') {
        this.router.navigate(['/signup/user-exist']);
        return;
      }
      // this.router.navigate(['/signup/error']);
      this.toastr.info(err.message , '', {});
      console.log(err);
      return;
    }
    this.session.set( 'userEmail', this.signUpFormControl.email.value );
    this.awsService.userEmail = this.signUpFormControl.email.value;
    this.router.navigate(['/signup/verify']);
  }

}

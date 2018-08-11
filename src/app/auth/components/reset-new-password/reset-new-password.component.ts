import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss',
  '../../containers/sign-up-page/sign-up-page.component.scss',
  '../sign-up-form/sign-up-form.component.scss',
  '../../../shared/components/sign-up-footer/sign-up-footer.component.scss']
})
export class ResetNewPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm: FormGroup;
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
    this.resetPasswordForm = this.formBuilder.group({
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
  get resetPasswordFormControl() { return this.resetPasswordForm.controls; }

  ngOnDestroy() {
    this.session.remove('reset-code');
  }

  // On Reset Password Submit
  onSubmit() {
    this.spinnerService.show();
    const resetPasswordData = {
      verifycode: this.session.get('reset-code'),
      newpassword: this.resetPasswordFormControl.password.value
    };
    this.awsService.resetPassword(resetPasswordData);
  }

  // show/hide password
  togglePasswordType() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
    this.passwordBtnText = (this.passwordFieldType === 'password') ? 'Show' : 'Hide';
  }
}

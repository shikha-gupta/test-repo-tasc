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
  selector: 'app-reset-password-code',
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.scss',
  '../../containers/sign-up-page/sign-up-page.component.scss',
  '../sign-up-form/sign-up-form.component.scss',
  '../../../shared/components/sign-up-footer/sign-up-footer.component.scss']
})
export class ResetPasswordCodeComponent implements OnInit, OnDestroy {
  destinationToBeDisplayed;
  resetCodeForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
      private router: Router,
      private awsService: AWSService,
      public session: SessionStorageService,
      private toastr: ToastrService,
      private spinnerService: Ng4LoadingSpinnerService ) {
        this.destinationToBeDisplayed = this.session.get('forgot-code-destination');
    }

  ngOnInit() {
    this.resetCodeForm = this.formBuilder.group({
      verificationCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*')
      ])
    });
  }

  ngOnDestroy() {
  }

  // convenience getter for easy access to form fields
  get resetCodeFormControl() {
    return this.resetCodeForm.controls;
  }

  // On code Submission
  onSubmit() {
    this.session.set('reset-code', this.resetCodeFormControl.verificationCode.value);
    this.router.navigate(['forgot-password/reset']);
  }

  resendEmailVerificationCode() {
    const emailId = this.session.get('forgot-email');
    this.awsService.forgotPaswword(emailId, 'true');
  }
}

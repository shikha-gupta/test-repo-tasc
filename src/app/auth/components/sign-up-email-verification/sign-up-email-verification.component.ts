import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

import { AWSService } from '../../services/aws.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-sign-up-email-verification',
  templateUrl: './sign-up-email-verification.component.html',
  styleUrls: ['../sign-up-form/sign-up-form.component.scss']
})
export class SignUpEmailVerificationComponent implements OnInit, AfterViewInit {
  emailVerificationForm: FormGroup;
  emailIdToVerify;

  constructor( private formBuilder: FormBuilder,
      private router: Router,
      private awsService: AWSService,
      private toastr: ToastrService,
      private spinnerService: Ng4LoadingSpinnerService ) {

    this.emailIdToVerify = this.awsService.userEmail;
  }

  ngOnInit() {
    this.emailVerificationForm = this.formBuilder.group({
      verificationCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
    });
  }

  ngAfterViewInit() {
    if (this.emailIdToVerify === '') {
      this.router.navigate(['signup']);
    }
  }

  // resend verification code
  resendEmailVerificationCode() {
    this.spinnerService.show();
    this.awsService.resendEmailVerificationCode();
  }

  // submit verfication code
  onCodeSubmit() {
    this.spinnerService.show();
    const code = this.emailVerificationForm.controls.verificationCode.value;
    this.awsService.emailVerification(code, this.emailVerificationHandler);
  }

  emailVerificationHandler = (err, result) => {
    if (err) {
      this.spinnerService.hide();
      console.log(err);
      this.toastr.info(err.message, '', {
        positionClass: 'toast-top-right'
      });
      return;
    } else {
      console.log('call result: ' + result);
      if (result === 'SUCCESS') {
        // // skipping confirmation page
        // this.awsService.getUserSession();
        // return;
        this.awsService.getUserSession();
        // this.spinnerService.hide();
        this.router.navigate(['/signup/confirm']);
        this.toastr.info('Your email has been verified', '', {
          positionClass: 'toast-top-right'
        });
        return;
      }
    }
  }

}

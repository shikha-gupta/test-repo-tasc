import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AWSService } from '../../../auth/services/aws.service';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-code-verification-form',
  templateUrl: './code-verification-form.component.html',
  styleUrls: [ './code-verification-form.component.scss',
    '../../../../app/auth/components/sign-up-form/sign-up-form.component.scss'
  ]
})
export class CodeVerificationFormComponent implements OnInit, AfterViewInit {
  codeVerificationForm: FormGroup;
  codeVerificationCallBack: any;
  resendVerificationCallBack: any;
  phoneNumberToVerify;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private awsService: AWSService,
              private toastr: ToastrService,
              private spinnerService: Ng4LoadingSpinnerService,
              private session: SessionStorageService ) {
    this.phoneNumberToVerify = this.awsService.phone_number;
  }

  ngOnInit() {
    this.codeVerificationForm = this.formBuilder.group({
      verificationCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
    });
    this.codeVerificationCallBack =  {
      onSuccess: (result) => {
        this.spinnerService.hide();
        console.log('call result: ' + result);
        this.session.remove('phone_number');
        this.router.navigate(['/user-profile']);
        this.toastr.info('Your phone number has been verified', '', {
          positionClass: 'toast-top-right'
        });
      },
      onFailure: (err) => {
        this.spinnerService.hide();
        this.toastr.info(err.message, '', {
          positionClass: 'toast-top-right'
        });
      }
    };
    this.resendVerificationCallBack =  {
      onSuccess: (result) => {
        this.spinnerService.hide();
        this.toastr.info('Authentication code resent to ' + this.phoneNumberToVerify, '', {
          positionClass: 'toast-top-right'
        });
      },
      onFailure: (err) => {
        this.spinnerService.hide();
        this.toastr.info(err.message, '', {
          positionClass: 'toast-top-right'
        });
      }
    };
  }
  ngAfterViewInit() {
    if (this.phoneNumberToVerify === '') {
      // this.router.navigate(['authentication']);
    }
  }

  // resend verification code
  resendVerificationCode() {
    this.spinnerService.show();
    this.awsService.getAttributeVerification('phone_number', this.resendVerificationCallBack);
  }

  // submit verfication code
  onSubmit() {
    this.spinnerService.show();
    const code = this.codeVerificationForm.controls.verificationCode.value;
    this.awsService.verifyCodeByAttribute('phone_number', code, this.codeVerificationCallBack);
  }

  resendCallback = (err, result) => {
    if (err) {
      this.spinnerService.hide();
      this.toastr.info(err.message, '', {
        positionClass: 'toast-top-right'
      });
      return;
    }
    this.spinnerService.hide();
      this.toastr.info('Successfully sent code to ' + this.phoneNumberToVerify, '', {
      positionClass: 'toast-top-right'
    });
  }

}

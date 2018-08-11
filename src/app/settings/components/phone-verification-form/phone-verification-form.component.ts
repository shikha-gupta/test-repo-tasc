import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AWSService } from '../../../auth/services/aws.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {
  requiredAtLeastOneNumericValidator,
  requiredAtLeastOneSpecialCharacterValidator,
  requiredAtLeastOneUpperCaseValidator,
  requiredMinLengthCustomValidator
} from '../../../shared/services/form.validator';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'angular-web-storage';

import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-phone-verification-form',
  templateUrl: './phone-verification-form.component.html',
  styleUrls: ['./phone-verification-form.component.scss',
    '../../../../app/auth/components/sign-up-form/sign-up-form.component.scss'
  ]
})
export class PhoneVerificationFormComponent implements OnInit {
  phoneVerificationForm: FormGroup;
  phoneVerificationCallBack: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private awsService: AWSService,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private session: SessionStorageService
  ) { }

  ngOnInit() {
    const phoneNumberIfExist = this.session.get('phone_number') ?
        (this.session.get('phone_number').replace(environment.phoneContryCode, '')) : null;
    this.phoneVerificationForm = this.formBuilder.group({
      phoneNumber: new FormControl( null, [
        Validators.required,
        Validators.pattern('[0-9]*'),
        requiredMinLengthCustomValidator(10)
      ])
    });
    this.phoneVerificationCallBack =  {
      onSuccess: (result) => {
        this.spinnerService.hide();
        this.awsService.phone_number = environment.phoneContryCode + this.phoneVerificationFormControl.phoneNumber.value;
        this.session.set('phone_number', environment.phoneContryCode + this.phoneVerificationFormControl.phoneNumber.value);
        this.toastr.info('Authentication code sent to ' +
          environment.phoneContryCode + this.phoneVerificationFormControl.phoneNumber.value, '', {
          positionClass: 'toast-top-right'
        });
        this.router.navigate(['/authentication/code']);
      },
      onFailure: (err) => {
        this.spinnerService.hide();
        this.toastr.info(err.message, '', {
          positionClass: 'toast-top-right'
        });
      }
    };
  }

  get phoneVerificationFormControl() { return this.phoneVerificationForm.controls; }

  onSubmit() {
    this.spinnerService.show();
    const toUpdate: any = {};
    toUpdate.phone_number = environment.phoneContryCode + this.phoneVerificationFormControl.phoneNumber.value;
    this.awsService.updateAttribute(toUpdate, this.confirmUpdate);
  }

  confirmUpdate = (err, results) => {
    console.log(err, results);
    if (err) {
      this.spinnerService.hide();
      this.toastr.info(err.message, '', {
        positionClass: 'toast-top-right'
      });
      console.log(err);
      return;
    }
    this.awsService.getAttributeVerification('phone_number', this.phoneVerificationCallBack);
  }

  skipVerification() {
    this.router.navigate(['user-profile']);
    this.session.remove('phone_number');
  }

}

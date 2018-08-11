import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AWSService } from '../../services/aws.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-confirmation',
  templateUrl: './sign-up-confirmation.component.html',
  styleUrls: [
    './sign-up-confirmation.component.scss',
    '../sign-up-form/sign-up-form.component.scss'
  ]
})
export class SignUpConfirmationComponent implements OnInit, AfterViewInit {
  signUpConfirmationForm;
  userEmail;

  constructor( private awsService: AWSService,
      private router: Router,
      private formBuilder: FormBuilder,
      private location: Location,
      private spinnerService: Ng4LoadingSpinnerService,
      private toastr: ToastrService ) {
    // this.awsService.getUserSession();
  }

  ngOnInit() {
    this.userEmail = this.awsService.cognitoUser.getUsername();
    this.signUpConfirmationForm = this.formBuilder.group({
      email: new FormControl( this.userEmail ),
      fname: new FormControl( null ),
      lname: new FormControl( null )
    });
  }

  ngAfterViewInit(): void {
    if (this.userEmail === '') {
      this.router.navigate(['signup']);
    }
  }

  confirmSignUp() {
    this.spinnerService.show();
    const fname = this.signUpConfirmationForm.controls.fname.value;
    const lname = this.signUpConfirmationForm.controls.lname.value;

    this.awsService.updateAttributeAndConfirmSignUp( fname, lname, this.confirmSignUpHandler );
  }

  confirmSignUpHandler = (err, results) => {
    console.log(err, results);
    this.spinnerService.hide();
    if (err) {
      this.toastr.error(err.measure(), '', {
        positionClass: 'toast-top-right'
      });
      return;
    }
    console.log('call result: ' + results);
    this.router.navigate(['authentication']);
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}

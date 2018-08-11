import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AWSService } from '../../services/aws.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  requiredMinLengthCustomValidator,
  requiredAtLeastOneUpperCaseValidator,
  requiredAtLeastOneSpecialCharacterValidator,
  requiredAtLeastOneNumericValidator, requiredEmailValidator
} from '../../../shared/services/form.validator';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm;
  passwordFieldType: string;
  passwordBtnText: string;
  rememberMe;

  constructor( private spinnerService: Ng4LoadingSpinnerService,
      private awsService: AWSService,
      private formBuilder: FormBuilder,
      private router: Router,
      private local: LocalStorageService,
      public session: SessionStorageService ) { }

  ngOnInit() {
    this.passwordFieldType = 'password';
    this.passwordBtnText = 'Show';
    const localEmail = this.local.get('remember') ? this.local.get('remember') : null;
    this.rememberMe = this.local.get('remember') ? true : false;
    this.loginForm = this.formBuilder.group({
      email: new FormControl(localEmail, [
        Validators.required,
        Validators.email,
        // tslint:disable-next-line:max-line-length
        requiredEmailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        requiredMinLengthCustomValidator(8),
        requiredAtLeastOneUpperCaseValidator(/(?=.*[A-Z])/),
        requiredAtLeastOneSpecialCharacterValidator(/(?=.*[() !@#$%])/),
        requiredAtLeastOneNumericValidator(/(?=.*[/\d/])/)
      ])
    });

    this.session.clear();
  }

  // show/hide password
  togglePasswordType() {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
    this.passwordBtnText = (this.passwordFieldType === 'password') ? 'Show' : 'Hide';
  }

  submitLogin() {
    this.spinnerService.show();
    this.rememberLogin();
    this.awsService.signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value, false);
  }

  rememberMeToggle() {
    this.rememberMe = (<HTMLInputElement>event.target).checked;
  }

  rememberLogin() {
    if (this.rememberMe) {
      this.local.set('remember', this.loginForm.controls.email.value);
    } else {
      this.local.remove('remember');
    }
  }
  
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth.routing';

import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { SignUpHeader } from './components/sign-up-header/sign-up-header.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpErrorComponent } from './components/sign-up-error/sign-up-error.component';
import { SignUpEmailVerificationComponent } from './components/sign-up-email-verification/sign-up-email-verification.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginVerificationComponent } from './components/login-verification/login-verification.component';
import { ModalModule } from 'ngx-bootstrap';
import { OverviewPageComponent } from './containers/overview-page/overview-page.component';
import { AWSService } from './services/aws.service';
import { SignUpConfirmationComponent } from './components/sign-up-confirmation/sign-up-confirmation.component';
import { SignUpExistingUserComponent } from './components/sign-up-existing-user/sign-up-existing-user.component';
import { NoAuthGaurd } from './services/no-auth.gaurd';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordCodeComponent } from './components/reset-password-code/reset-password-code.component';
import { ResetNewPasswordComponent } from './components/reset-new-password/reset-new-password.component';
import { ForgotPasswordEmailComponent } from './components/forgot-password-email/forgot-password-email.component';
import { ResetPasswordSuccessComponent } from './components/reset-password-success/reset-password-success.component';

@NgModule({
  declarations: [
    SignUpPageComponent,
    SignUpHeader,
    SignUpFormComponent,
    SignUpErrorComponent,
    SignUpEmailVerificationComponent,
    ForgotPasswordComponent,
    LoginPageComponent,
    LoginHeaderComponent,
    LoginFormComponent,
    LoginVerificationComponent,
    OverviewPageComponent,
    SignUpConfirmationComponent,
    SignUpExistingUserComponent,
    ResetPasswordCodeComponent,
    ResetNewPasswordComponent,
    ForgotPasswordEmailComponent,
    ResetPasswordSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [
    AWSService,
    NoAuthGaurd
  ]
})
export class AuthModule {
}

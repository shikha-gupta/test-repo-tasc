import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpErrorComponent } from './components/sign-up-error/sign-up-error.component';
import { SignUpEmailVerificationComponent } from './components/sign-up-email-verification/sign-up-email-verification.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginVerificationComponent } from './components/login-verification/login-verification.component';
import { OverviewPageComponent } from './containers/overview-page/overview-page.component';
import { SignUpConfirmationComponent } from './components/sign-up-confirmation/sign-up-confirmation.component';
import { SignUpExistingUserComponent } from './components/sign-up-existing-user/sign-up-existing-user.component';
import { NoAuthGaurd } from './services/no-auth.gaurd';
import { ForgotPasswordEmailComponent } from './components/forgot-password-email/forgot-password-email.component';
import { ResetPasswordCodeComponent } from './components/reset-password-code/reset-password-code.component';
import { ResetNewPasswordComponent } from './components/reset-new-password/reset-new-password.component';
import { ResetPasswordSuccessComponent } from './components/reset-password-success/reset-password-success.component';


const authRoutes: Routes = [
  {
    path: 'signup',
    component: SignUpPageComponent,
    canActivate: [ NoAuthGaurd ],
    children: [
      {
        path: '',
        component: SignUpFormComponent
      },
      {
        path: 'error',
        component: SignUpErrorComponent
      },
      {
        path: 'user-exist',
        component: SignUpExistingUserComponent
      },
      {
        path: 'verify',
        component: SignUpEmailVerificationComponent
      },
      {
        path: 'confirm',
        component: SignUpConfirmationComponent
      }
    ]
  },
  {
    path: 'forgot-password',
    canActivate: [ NoAuthGaurd ],
    component: ForgotPasswordComponent,
    children: [
      {
        path: '', component: ForgotPasswordEmailComponent
      },
      {
        path: 'code', component: ResetPasswordCodeComponent
      },
      {
        path: 'reset', component: ResetNewPasswordComponent
      },
      {
        path: 'success', component: ResetPasswordSuccessComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ NoAuthGaurd ],
    children: [
      {
        path: '', component: LoginFormComponent
      },
      {
        path: 'verify', component: LoginVerificationComponent
      }
    ]
  },
  {
    path: 'overview',
    component: OverviewPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [ RouterModule ]
})

export class AuthRoutingModule { }

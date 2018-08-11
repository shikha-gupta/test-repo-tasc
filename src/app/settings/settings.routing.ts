import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGaurd } from '../shared/services/auth.gaurd';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { TwoFactorPageComponent } from './containers/two-factor-page/two-factor-page.component';
import { CodeVerificationFormComponent } from './components/code-verification-form/code-verification-form.component';
import { PhoneVerificationFormComponent } from './components/phone-verification-form/phone-verification-form.component';
import { SignInSecurityComponent } from './components/sign-in-security/sign-in-security.component';
const userRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [ AuthGaurd ],
    children: [
      {
        path: '',
        redirectTo: 'user-profile',
        pathMatch: 'full'
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'security',
        component: SignInSecurityComponent
      }
    ]
  },
  {
    path: 'authentication',
    component: TwoFactorPageComponent,
    canActivate: [ AuthGaurd ],
    children: [
      {
        path: '',
        component: PhoneVerificationFormComponent
      },
      {
        path: 'code',
        component: CodeVerificationFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [ RouterModule ]
})

export class UserRoutingModule { }

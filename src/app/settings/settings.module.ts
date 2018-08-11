import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './settings.routing';
import { SharedModule } from '../shared/shared.module';
import { AuthGaurd } from '../shared/services/auth.gaurd';
import { SignInSecurityComponent } from './components/sign-in-security/sign-in-security.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { TwoFactorPageComponent } from './containers/two-factor-page/two-factor-page.component';
import { CodeVerificationFormComponent } from './components/code-verification-form/code-verification-form.component';
import { PhoneVerificationFormComponent } from './components/phone-verification-form/phone-verification-form.component';

@NgModule({
  declarations: [
    SettingsPageComponent,
    UserProfileComponent,
    SignInSecurityComponent,
    TwoFactorPageComponent,
    CodeVerificationFormComponent,
    PhoneVerificationFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    NgxMaskModule
  ],
  providers: [
    AuthGaurd
  ]
})
export class SettingsModule {
}

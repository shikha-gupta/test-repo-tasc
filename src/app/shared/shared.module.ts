import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { CollapseModule } from 'ngx-bootstrap';
import { SignUpFooterComponent } from './components/sign-up-footer/sign-up-footer.component';
import { ChangePasswordModalComponent } from './modals';
import { PasswordRulesComponent } from './components/password-rules/password-rules.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    SignUpFooterComponent,
    ChangePasswordModalComponent,
    PasswordRulesComponent
  ],
  exports: [
    AppHeaderComponent,
    SignUpFooterComponent,
    ChangePasswordModalComponent,
    PasswordRulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot()
  ]
})
export class SharedModule {
}

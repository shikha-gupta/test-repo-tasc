import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxMaskModule } from 'ngx-mask';

import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AuthModule,
    SettingsModule,
    AppRoutingModule,
    AngularWebStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
      iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },
      timeOut: 2000,
      tapToDismiss: false
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

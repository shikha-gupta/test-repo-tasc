import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SessionStorageService } from 'angular-web-storage';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { AWSService } from './aws.service';
import { CollapseModule } from 'ngx-bootstrap';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';


describe('LoginPageComponent', () => {
  let service;
  let userPool;
  beforeEach(async(() => {
    userPool = new AmazonCognitoIdentity.CognitoUserPool(environment.aws);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        CollapseModule,
        ToastrModule.forRoot()
      ],
      providers: [
        AWSService,
        SessionStorageService,
        ToastrService,
        Ng4LoadingSpinnerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(inject([AWSService], s => {
    service = s;
  }));

  afterEach(() => {
    service = null;
    userPool = null;
    TestBed.resetTestingModule();
  });

  it('should sign in', async () => {
    service.signIn(service.userEmail, 'Test@123456789');
    // service.getUserAttributes();
    //  expect(service.getCurrentUserSession()).toBeFalsy();
    // service.signOut();
  });
});

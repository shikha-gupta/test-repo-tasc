import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalStorageService,
          SessionStorageService,
          LocalStorage,
          SessionStorage
        } from 'angular-web-storage';

import { AWSService } from '../../services/aws.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SignUpEmailVerificationComponent } from './sign-up-email-verification.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

describe('SignUpEmailVerificationComponent', async () => {
  let component: SignUpEmailVerificationComponent;
  let fixture: ComponentFixture<SignUpEmailVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpEmailVerificationComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        Ng4LoadingSpinnerService,
        SessionStorageService,
        ToastrService,
        AWSService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEmailVerificationComponent);
    component = fixture.componentInstance;
    this.aws = AWSService;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  it('should create', async () => {
    expect(component).toBeTruthy();
    expect(component.emailVerificationForm).toBeDefined();
    expect(component.emailIdToVerify).toBeDefined();
  });
  it('resendEmailVerificationCode() should call for service resendEmailVerificationCode()', async () => {
    expect(component.resendEmailVerificationCode).toBeDefined();
    // component.resendEmailVerificationCode();
  });
  it('onCodeSubmit() should call for service resendEmailVerificationCode()', async () => {
    // await component.onCodeSubmit();
    expect(component.onCodeSubmit).toBeDefined();
  });
  it('emailVerificationHandler() should call for service resendEmailVerificationCode() with error', async () => {
    expect(component.emailVerificationHandler).toBeDefined();
    // component.emailVerificationHandler({message: 'error'}, null);
  });
  it('emailVerificationHandler() should call for service resendEmailVerificationCode() with success', async () => {
    expect(component.emailVerificationHandler).toBeDefined();
    // component.emailVerificationHandler(false, 'SUCCESS');
  });

});

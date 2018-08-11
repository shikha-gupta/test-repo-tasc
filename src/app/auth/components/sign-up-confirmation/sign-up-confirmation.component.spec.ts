import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SessionStorageService } from 'angular-web-storage';

import { AWSService } from '../../services/aws.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SignUpConfirmationComponent } from './sign-up-confirmation.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

describe('SignUpConfirmationComponent', () => {
  let component: SignUpConfirmationComponent;
  let fixture: ComponentFixture<SignUpConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpConfirmationComponent],
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
    fixture = TestBed.createComponent(SignUpConfirmationComponent);
    component = fixture.componentInstance;
    this.awsService = AWSService;
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.signUpConfirmationForm).toBeDefined();
  });
  it('should have user email to proceed', () => {
    expect(component.userEmail).toBeDefined();
  });
  it('confirmSignUp() to be called on click of sign up button if form is valid', () => {
    component.signUpConfirmationForm.controls['email'].setValue('xyz@gmail.com');
    component.signUpConfirmationForm.controls['fname'].setValue('ABC');
    component.signUpConfirmationForm.controls['lname'].setValue('DEF');
    // component.confirmSignUp();
  });
});

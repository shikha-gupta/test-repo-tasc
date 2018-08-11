import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SessionStorageService } from 'angular-web-storage';

import { AWSService } from '../../services/aws.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SignUpFormComponent } from './sign-up-form.component';


describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let spinnerService: Ng4LoadingSpinnerService;
  // let spinnerSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpFormComponent
      ],
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
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    this.session = new SessionStorageService();
    fixture.detectChanges();
    spinnerService = TestBed.get(Ng4LoadingSpinnerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sign up form should invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('e-mail field validity should fail when value is null', () => {
    const elementRef = component.signUpForm.controls['email'];
    expect(elementRef.valid).toBeFalsy();
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['email']).toBeUndefined();
  });

  it('e-mail field validity should fail when value is abc.gmail.com', () => {
    const elementRef = component.signUpForm.controls['email'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc.gmail.com');
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['email']).toBeTruthy();
    expect(elementRef.valid).toBeFalsy();
  });

  it('e-mail field validity should pass when value is abc@gmail.com', () => {
    const elementRef = component.signUpForm.controls['email'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc@gmail.com');
    expect(elementRef.errors).toBeNull();
    expect(elementRef.valid).toBeTruthy();
  });

  it('password field validity should fail when value is null', () => {
    const elementRef = component.signUpForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['requiredMinLengthCustom']).toBeTruthy();
    expect(errors['requiredAtLeastOneUpperCase']).toBeTruthy();
    expect(errors['requiredAtLeastOneSpecialCharacter']).toBeTruthy();
    expect(elementRef.valid).toBeFalsy();
  });

  it('password field validity should fail when value is abc', () => {
    const elementRef = component.signUpForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc');
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['requiredMinLengthCustom']).toBeTruthy();
    expect(errors['requiredAtLeastOneUpperCase']).toBeTruthy();
    expect(errors['requiredAtLeastOneSpecialCharacter']).toBeTruthy();
    expect(elementRef.valid).toBeFalsy();
  });

  it('password field validity should fail when value is abc!', () => {
    const elementRef = component.signUpForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc!');
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['requiredMinLengthCustom']).toBeTruthy();
    expect(errors['requiredAtLeastOneUpperCase']).toBeTruthy();
    expect(errors['requiredAtLeastOneSpecialCharacter']).toBeUndefined();
    expect(elementRef.valid).toBeFalsy();
  });

  it('password field validity should fail when value is abc!D', () => {
    const elementRef = component.signUpForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc!D');
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['requiredMinLengthCustom']).toBeTruthy();
    expect(errors['requiredAtLeastOneUpperCase']).toBeUndefined();
    expect(errors['requiredAtLeastOneSpecialCharacter']).toBeUndefined();
    expect(elementRef.valid).toBeFalsy();
  });

  it('password field validity should pass when value is abc!D678901234', () => {
    const elementRef = component.signUpForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc!D678901234');
    expect(elementRef.errors).toBeNull();
    expect(elementRef.valid).toBeTruthy();
  });

  it('sign up form should valid when provide email=abc@gmail.com and password=abc!D678901234', () => {
    expect(component.signUpForm.valid).toBeFalsy();
    const elementRefEmail = component.signUpForm.controls['email'];
    const elementRefPassword = component.signUpForm.controls['password'];
    elementRefEmail.setValue('abc@gmail.com');
    elementRefPassword.setValue('abc!D678901234');
    expect(component.signUpForm.valid).toBeTruthy();
  });

  // it('debug html', () => {
  //   expect(component.signUpForm.valid).toBeFalsy();
  //   const elementRefEmail = component.signUpForm.controls['email'];
  //   const elementRefPassword = component.signUpForm.controls['password'];
  //   elementRefEmail.setValue('abc@gmail.com');
  //   elementRefPassword.setValue('abc!D678');
  //   expect(component.signUpForm.valid).toBeTruthy();
  // });
  it('togglePasswordType() show update password visibility', async() => {
    component.togglePasswordType();
    expect(component.passwordFieldType).toBe('text');
    expect(component.passwordBtnText).toBe('Hide');
  });
  it('onSubmit() on and submit login', async() => {
    // spyOn(spinnerService, 'show').and.callThrough();
    const emailId = component.signUpFormControl.email.setValue('xyz@gmail.com');
    const password = component.signUpFormControl.password.setValue('Test@12345678901234');
    expect(component.signUpForm.valid).toBeTruthy();
    await component.onSubmit();
    // expect(component.signupHandler).toHaveBeenCalled();
    // component.signupHandler('', '');
  });

  it('signupHandler() test', async() => {
    const emailId = component.signUpFormControl.email.setValue('xyz@gmail.com');
    const password = component.signUpFormControl.password.setValue('Test@12345678901234');
    expect(component.signUpForm.valid).toBeTruthy();
    component.signupHandler({code: 'UsernameExistsException'}, false);
  });

  it('signupHandler() test', async() => {
    const emailId = component.signUpFormControl.email.setValue('xyz@gmail.com');
    const password = component.signUpFormControl.password.setValue('Test@12345678901234');
    expect(component.signUpForm.valid).toBeTruthy();
    component.signupHandler(false, {});
  });

  it('signupHandler() to be called as callback from aws service', async() => {
    const userEmail = this.session.get('userEmail');
    expect(userEmail).toBe('xyz@gmail.com');
  });
});

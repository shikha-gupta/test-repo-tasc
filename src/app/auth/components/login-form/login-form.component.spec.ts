import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { LocalStorageService, SessionStorageService } from 'angular-web-storage';

import { AWSService } from '../../services/aws.service';
import { ToastrService } from 'ngx-toastr';

import { LoginFormComponent } from './login-form.component';
import { By } from '@angular/platform-browser';


describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        Ng4LoadingSpinnerService,
        LocalStorageService,
        SessionStorageService,
        ToastrService,
        AWSService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    this.local = new LocalStorageService();
    fixture.detectChanges();
  });

  it('should create and declare', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeDefined();
    expect(component.passwordBtnText).toBeDefined();
    expect(component.passwordFieldType).toBeDefined();
    expect(component.rememberMe).toBeDefined();
  });
  it('sign in form should invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('e-mail field validity should fail when value is null', () => {
    const elementRef = component.loginForm.controls['email'];
    expect(elementRef.valid).toBeFalsy();
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['email']).toBeUndefined();
  });
  it('e-mail field validity should fail when value is xyz.yopmail.com', () => {
    const elementRef = component.loginForm.controls['email'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('xyz.yopmail.com');
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeUndefined();
    expect(errors['email']).toBeTruthy();
    expect(elementRef.valid).toBeFalsy();
  });
  it('e-mail field validity should pass when value is xyz@yopmail.com', () => {
    const elementRef = component.loginForm.controls['email'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('xyz@yopmail.com');
    expect(elementRef.errors).toBeNull();
    expect(elementRef.valid).toBeTruthy();
  });
  it('password field validity should fail when value is null', () => {
    const elementRef = component.loginForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    const errors = elementRef.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['requiredMinLengthCustom']).toBeTruthy();
    expect(errors['requiredAtLeastOneUpperCase']).toBeTruthy();
    expect(errors['requiredAtLeastOneSpecialCharacter']).toBeTruthy();
    expect(elementRef.valid).toBeFalsy();
  });
  it('password field validity should fail when value is abc', () => {
    const elementRef = component.loginForm.controls['password'];
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
    const elementRef = component.loginForm.controls['password'];
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
    const elementRef = component.loginForm.controls['password'];
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
    const elementRef = component.loginForm.controls['password'];
    expect(elementRef.valid).toBeFalsy();
    elementRef.setValue('abc!D678901234');
    expect(elementRef.errors).toBeNull();
    expect(elementRef.valid).toBeTruthy();
  });
  it('sign in form should valid when provide email=abc@gmail.com and password=abc!D678901234', () => {
    expect(component.loginForm.valid).toBeFalsy();
    const elementRefEmail = component.loginForm.controls['email'];
    const elementRefPassword = component.loginForm.controls['password'];
    elementRefEmail.setValue('xyz@yopmail.com');
    elementRefPassword.setValue('abc!D678901234');
    expect(component.loginForm.valid).toBeTruthy();
  });
  /*it('user navigate to profile page on filling valid login id and valid password', async () => {
    expect(component.loginForm.valid).toBeFalsy();
    const elementRefEmail = component.loginForm.controls['email'];
    const elementRefPassword = component.loginForm.controls['password'];
    elementRefEmail.setValue('xyz@yopmail.com');
    elementRefPassword.setValue('Shikha@1234567');
    await component.submitLogin();
    // console.log(location);
    expect(component.loginForm.valid).toBeFalsy();
  });*/
  it('togglePasswordType() show update password visibility', async() => {
    component.togglePasswordType();
    expect(component.passwordFieldType).toBe('text');
    expect(component.passwordBtnText).toBe('Hide');
  });
  it('rememberMeToggle() toggle checkbox for remember me functionality', async() => {
    const element = fixture.debugElement.nativeElement.querySelector('input[name=rememberMeToggle]');
    element.click();
    expect(component.rememberMe).toBeTruthy();
  });
  it('rememberLogin() on and submit login', async() => {
    component.rememberMe = true;
    component.loginForm.controls['email'].setValue('xyz@gmail.com');
    component.loginForm.controls['password'].setValue('abc!D678901234');
    component.submitLogin();
    expect(this.local.get('remember')).toEqual('xyz@gmail.com');
  });
  it('rememberLogin() off and submit login', async() => {
    component.rememberMe = false;
    component.loginForm.controls['email'].setValue('xyz@gmail.com');
    component.loginForm.controls['password'].setValue('abc!D678901234');
    component.submitLogin();
    expect(this.local.get('remember')).toBeNull();
  });
});

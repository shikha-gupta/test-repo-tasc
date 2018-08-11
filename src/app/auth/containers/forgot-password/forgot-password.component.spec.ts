import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { SignUpFooterComponent } from '../../../shared/components/sign-up-footer/sign-up-footer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForgotPasswordComponent,
        SignUpFooterComponent
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', async () => {
  //   // expect(component).toBeDefined();
  // });
});

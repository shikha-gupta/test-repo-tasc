import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerificationFormComponent } from './phone-verification-form.component';

describe('PhoneVerificationFormComponent', () => {
  let component: PhoneVerificationFormComponent;
  let fixture: ComponentFixture<PhoneVerificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

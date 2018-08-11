import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSecurityComponent } from './sign-in-security.component';

describe('SignInSecurityComponent', () => {
  let component: SignInSecurityComponent;
  let fixture: ComponentFixture<SignInSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

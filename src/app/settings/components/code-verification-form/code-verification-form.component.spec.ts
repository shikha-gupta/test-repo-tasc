import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeVerificationFormComponent } from './code-verification-form.component';

describe('CodeVerificationFormComponent', () => {
  let component: CodeVerificationFormComponent;
  let fixture: ComponentFixture<CodeVerificationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeVerificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
    // expect(component).toBeTruthy();
  // });
});

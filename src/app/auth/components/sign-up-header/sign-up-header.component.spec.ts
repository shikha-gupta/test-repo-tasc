import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignUpHeader } from './sign-up-header.component';

describe('SignUpHeader', () => {
  let component: SignUpHeader;
  let fixture: ComponentFixture<SignUpHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpHeader],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

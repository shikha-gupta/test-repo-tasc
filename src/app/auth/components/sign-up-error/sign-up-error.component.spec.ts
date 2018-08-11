import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignUpErrorComponent } from './sign-up-error.component';

describe('SignUpErrorComponent', () => {
  let component: SignUpErrorComponent;
  let fixture: ComponentFixture<SignUpErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpErrorComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

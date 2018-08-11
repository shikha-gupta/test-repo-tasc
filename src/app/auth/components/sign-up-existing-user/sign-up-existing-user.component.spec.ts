import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignUpExistingUserComponent } from './sign-up-existing-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('SignUpExistingUserComponent', () => {
  let component: SignUpExistingUserComponent;
  let fixture: ComponentFixture<SignUpExistingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpExistingUserComponent],
      imports: [
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpExistingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { SignUpPageComponent } from './sign-up-page.component';
import { SignUpHeader } from '../../components/sign-up-header/sign-up-header.component';
import { SignUpFooterComponent } from '../../../shared/components/sign-up-footer/sign-up-footer.component';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpPageComponent,
        SignUpHeader,
        SignUpFooterComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CollapseModule } from 'ngx-bootstrap';
import { SessionStorageService } from 'angular-web-storage';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppHeaderComponent } from './app-header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AWSService } from '../../../auth/services/aws.service';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      imports: [
        RouterTestingModule,
        CollapseModule,
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
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

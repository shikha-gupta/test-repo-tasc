import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, CollapseModule, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { SessionStorageService } from 'angular-web-storage';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';
import { AWSService } from '../../../auth/services/aws.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent, AppHeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        CollapseModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        SessionStorageService,
        AWSService,
        ToastrService,
        BsModalService,
        ComponentLoaderFactory,
        Ng4LoadingSpinnerService,
        PositioningService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

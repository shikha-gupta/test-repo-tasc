import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CollapseModule } from 'ngx-bootstrap';

import { SessionStorageService } from 'angular-web-storage';

import { AWSService } from '../../services/aws.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { OverviewPageComponent } from './overview-page.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppHeaderComponent } from '../../../shared/components/app-header/app-header.component';



describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverviewPageComponent,
        AppHeaderComponent
      ],
      imports: [
        ToastrModule.forRoot(),
        RouterTestingModule,
        CollapseModule
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
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

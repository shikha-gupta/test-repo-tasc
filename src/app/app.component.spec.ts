import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

class MockServices {
  // Router
  public events = of( new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        Ng4LoadingSpinnerModule
      ],
      providers: [
        { provide: Router, useClass: MockServices },
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router );
    fixture.detectChanges();
  });

  it('should be readly initialized', () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });
  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('ngOnInit() - test page should scroll to top', async(() => {
    expect(router.events).toBeTruthy();
    expect(window.pageXOffset).toBe(0);
    expect(window.pageYOffset).toBe(0);
  }));
});

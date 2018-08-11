import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AWSService } from '../../auth/services/aws.service';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor( private router: Router,
    private awsService: AWSService ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return this.awsService.userHasValidSession().then(
      res => {
        console.log('in session');
        if (res) {
          return true;
        }
      },
      err => {
        this.router.navigate(['/']);
        console.log('not in session');
        return false;
      }
    );
  }
}

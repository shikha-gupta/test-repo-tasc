import { Component, OnInit } from '@angular/core';
import { AWSService } from '../../services/aws.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { requiredEmailValidator } from '../../../shared/services/form.validator';


@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.scss',
  '../../containers/sign-up-page/sign-up-page.component.scss',
  '../sign-up-form/sign-up-form.component.scss',
  '../../../shared/components/sign-up-footer/sign-up-footer.component.scss']
})
export class ForgotPasswordEmailComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor( private awsService: AWSService,
      private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl( null, [
        Validators.required,
        Validators.email,
        // tslint:disable-next-line:max-line-length
        requiredEmailValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ] )
    });
  }

  forgotPassword() {
    this.awsService.forgotPaswword(this.forgotPasswordForm.controls.email.value, false);
  }
}

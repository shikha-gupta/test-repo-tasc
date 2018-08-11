import { Component, OnInit } from '@angular/core';
import { AWSService } from '../../services/aws.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { requiredEmailValidator } from '../../../shared/services/form.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    '../sign-up-page/sign-up-page.component.scss',
    '../../components/sign-up-form/sign-up-form.component.scss',
    '../../../shared/components/sign-up-footer/sign-up-footer.component.scss'
]
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private awsService: AWSService,
      private formBuilder: FormBuilder ) { }

  ngOnInit() {
  }

}

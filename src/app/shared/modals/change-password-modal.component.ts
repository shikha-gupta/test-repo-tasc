import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AWSService } from '../../auth/services/aws.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { requiredMinLengthCustomValidator,
        requiredAtLeastOneUpperCaseValidator,
        requiredNoSpaceValidator,
        requiredAtLeastOneSpecialCharacterValidator,
        requiredAtLeastOneNumericValidator } from '../services/form.validator';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'change-password-modal',
  template: `<div class="modal-container">
              <div class="title modal-header d-flex flex-column">
                <div class="text-uppercase">CHANGE PASSWORD</div>
                <div class="seperator mt-3"></div>
                <div class="modal-label mt-5">Enter your current password for verification and create new password.</div>
              </div>
              <div class="modal-body extra-bot-padding">
                <form [formGroup]="changePasswordForm" (ngSubmit)="submitNewPassword()">
                  <div class="form-group input-group">
                    <label class="has-float-label">
                      <input formControlName="currentPassword" class="form-control" type="email" placeholder="Verify current password"/>
                      <span>Verify current password</span>
                    </label>
                  </div>
                  <div class="form-group input-group mt-5">
                    <label class="has-float-label">
                      <input formControlName="password" class="form-control" type="email" placeholder="New password"/>
                      <span>New password</span>
                    </label>
                  </div>
                  <app-password-rules [validateForm]="changePasswordForm"></app-password-rules>
                </form>
              </div>
              <div class="modal-footer">
                <div class="d-flex col-sm-8 col-xs-12 px-0">
                  <button aria-label="Close" (click)="currentModRef.hide()" class="btn btn-block btn-outline-secondary">Cancel</button>
                  <button type="submit" class="btn btn-primary btn-block mt-0"
                  [ngClass]="{ 'btn-disabled btn-light' : !changePasswordForm.valid }"
                  [disabled]="!changePasswordForm.valid">Submit</button>
                </div>
              </div>
            </div>`
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() currentModRef: BsModalRef;
  changePasswordForm: FormGroup;

  constructor( private awsService: AWSService,
      private formBuilder: FormBuilder ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: new FormControl( null , [ Validators.required ] ),
      password: new FormControl( null , [
        Validators.required,
        requiredMinLengthCustomValidator(8),
        requiredAtLeastOneUpperCaseValidator(/(?=.*[A-Z])/),
        requiredNoSpaceValidator(/^\S*$/),
        requiredAtLeastOneSpecialCharacterValidator(/(?=.*[!@#$%])/),
        requiredAtLeastOneNumericValidator(/(?=.*[/\d/])/)
      ])
    });
  }

  submitNewPassword() {
    this.awsService.changePassword( this.changePasswordForm.controls.currentPassword.value,
      this.changePasswordForm.controls.password.value, this.changePasswordHandler);
  }

  changePasswordHandler() {
    this.currentModRef.hide();
  }

}

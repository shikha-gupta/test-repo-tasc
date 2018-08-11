import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { requiredMinLengthCustomValidator,
        requiredAtLeastOneUpperCaseValidator,
        requiredNoSpaceValidator,
        requiredAtLeastOneSpecialCharacterValidator,
        requiredAtLeastOneNumericValidator } from '../../services/form.validator';

@Component({
  selector: 'app-password-rules',
  templateUrl: './password-rules.component.html',
  styleUrls: ['./password-rules.component.scss']
})
export class PasswordRulesComponent implements OnInit {
  @Input() validateForm;

  constructor( private formBuilder: FormBuilder ) {}

  ngOnInit() {
  }

}

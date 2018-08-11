import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor-page.component.html',
  styleUrls: [
    '../../../auth/containers/sign-up-page/sign-up-page.component.scss',
    '../../../auth/components/sign-up-form/sign-up-form.component.scss',
    '../../../shared/components/sign-up-footer/sign-up-footer.component.scss'
]
})
export class TwoFactorPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: [
    './settings-page.component.scss',
    '../../components/user-profile/user-profile.component.scss'
]
})
export class SettingsPageComponent implements OnInit {

  modalRef: BsModalRef;
  constructor( private router: Router) {
    console.log(this.router.url);
  }

  openModal(template: TemplateRef<any>) {
  }

  ngOnInit() {
  }

}

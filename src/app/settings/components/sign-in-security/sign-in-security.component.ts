import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-sign-in-security',
  templateUrl: './sign-in-security.component.html',
  styleUrls: [
    './sign-in-security.component.scss',
    '../user-profile/user-profile.component.scss'
]
})
export class SignInSecurityComponent implements OnInit {
  modalRef: BsModalRef;
  templateType = '';
  constructor( private modalService: BsModalService ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.templateType = 'change-password';
    this.modalRef = this.modalService.show(template);
  }

}

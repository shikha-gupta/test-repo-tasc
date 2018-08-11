import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  modalRef: BsModalRef;
  selectedTemplate: string;
  templateData: any;
  userData: any;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>, updateKey: string) {
    this.selectedTemplate = updateKey;
    this.templateData = this.userData[updateKey];
    this.modalRef = this.modalService.show(template);
  }
  stringifyAddress(oAddress) {
    let sAddress = '';
    sAddress = oAddress.street ? oAddress.street : sAddress;
    sAddress = oAddress.city ? sAddress.length > 0 ? `${sAddress} ${oAddress.street}, ` : sAddress : sAddress;
    sAddress = oAddress.state ? sAddress.length > 0 ? `${sAddress} ${oAddress.state}, ` : sAddress : sAddress;
    sAddress = oAddress.zip ? sAddress.length > 0 ? `${sAddress} ${oAddress.zip}` : sAddress : sAddress;
    return sAddress;
  }
  ngOnInit() {
    this.userData = {
      tasc_id: '9823-0498-0298',
      name: 'Pratik',
      primary_email: {
        value: 'pratik.srivastava@kiwitech.com',
        isVerified: false
      },
      alt_email: {
        value: 'pratik10ec@gmail.com',
        isVerified: false
      },
      mobile: {
        value: 1234567890,
        isVerified: false,
      },
      home_phone: 5544778899,
      work_phone: 4454545454,
      primary_address: {
        street: '554, Abc Street',
        city: 'Xyz City',
        state: 'Oevfs',
        zip: '547812'
      },
      gender: 'Male',
      date_of_birth: '29/4/1992'
    };
  }

}

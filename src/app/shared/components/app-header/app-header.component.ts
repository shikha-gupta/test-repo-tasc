import { Component, OnInit } from '@angular/core';

import { AWSService } from '../../../auth/services/aws.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  isCollapsed = false;
  isCollapsedone = false;
  isCollapsetrans = false;
  constructor( public awsService: AWSService ) { }

  ngOnInit() {
  }

}

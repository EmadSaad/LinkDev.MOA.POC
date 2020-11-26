import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbItem } from '../breadcrumb.component';
import { TranslateService } from '@ngx-translate/core';
import { MODONbreadcrumbs } from '../../../../Globals';

@Component({
  selector: 'app-breadcrumbroute',
  templateUrl: './breadcrumbroute.component.html',
  styleUrls: ['./breadcrumbroute.component.scss']
})
export class BreadcrumbrouteComponent implements OnInit {


  @Input() public CurrnetComponentName: string;
  @Input() IsLastOne: boolean
  CurrentComponent: BreadCrumbItem;
  constructor(public translate: TranslateService) { 
  // 
   //this.CurrentComponent = MODONbreadcrumbs.find(x => x.ComponentName === 'Home');
  }

  ngOnInit() {
    this.CurrentComponent = MODONbreadcrumbs.find(x => x.ComponentName.toLocaleLowerCase().trim() === this.CurrnetComponentName.toLocaleLowerCase().trim());
  }

}

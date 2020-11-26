import { Component, OnInit } from '@angular/core';
import { Mode } from '../../../shared/form-guide/utility/enums/enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-authorized-page',
  templateUrl: './auth-authorized-page.component.html',
  styleUrls: ['./auth-authorized-page.component.css']
})
export class AuthAuthorizedPageComponent implements OnInit {

  class: string;
  Message: string;
  mode: Mode = Mode.Error;
  constructor(public translateService: TranslateService) { }
  ngOnInit() {

  }
 
}

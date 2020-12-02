import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   copyRightsYear : number ;
    constructor() {
    }

  ngOnInit() {
    this.copyRightsYear = (new Date()).getFullYear();
  }

}

import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imageSrc: string;
  imageSrcAr: string = "./assets/images/ECZA-Logo.png";
  imageSrcEn: string = "./assets/images/ECZA-Logo.png";
  constructor() {
  }

  ngOnInit() {
    debugger;
    this.imageSrc = localStorage.getItem("lang") === "en" ? this.imageSrcEn : this.imageSrcAr;
  }
  ngAfterViewInit() {
  }
}

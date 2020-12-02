import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  
  constructor(private translate: TranslateService,private titleService:Title) {
    this.titleService.setTitle("Modon | Not found");
  }
  ngOnInit() {
    document.querySelector(".inner-layout .container").classList.remove("container");
  }
  ngOnDestroy() {
    document.querySelector(".inner-layout >div").classList.add("container");
  }
}

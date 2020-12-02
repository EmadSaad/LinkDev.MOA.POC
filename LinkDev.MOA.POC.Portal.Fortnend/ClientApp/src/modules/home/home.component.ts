import { Component, OnInit } from '@angular/core';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component'
import { IUserData } from '../auth/models/User';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from '../shared/services/token.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userData?: IUserData;
  isAuthorized: boolean;
  constructor(private translate: TranslateService, private tokenService: TokenService, private titleService:Title) {
    this.titleService.setTitle("Modon | Home");
    tokenService.isAuthenticated()
    .subscribe(
      data => {
        this.isAuthorized = data;
      });
  }
  ngOnInit() {
    document.querySelector("body").setAttribute("id", "home-page");
    document.querySelector("#home-page .inner-layout .container").classList.remove("container");
    document.querySelector(".why-register").classList.add("container-fluid");
    document.querySelector(".service-catalog").classList.add("container");
  }
  ngOnDestroy() {
    document.querySelector("body").removeAttribute("id");
    document.querySelector(".inner-layout").classList.add("container");
  }
  

}

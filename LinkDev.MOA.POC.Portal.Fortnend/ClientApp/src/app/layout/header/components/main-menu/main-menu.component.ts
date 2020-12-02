import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PortalServicesService } from 'src/modules/shared/Services/Portal-Service/portal-services.service';
import { ServiceCatogoriesModel } from 'src/modules/shared/Models/service-catogories.model';
import { TokenService } from 'src/modules/shared/services/token.service';
@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  has_bg: boolean = false;
  servicesCategory:ServiceCatogoriesModel[] = [];
  isAuthorized: boolean;
  @HostListener('document:click', ['$event']) clickout(event) {
    this.has_bg = false;
  }
  constructor(private translate: TranslateService,private portalServices:PortalServicesService,private tokenService: TokenService) {
    tokenService.isAuthenticated()
    .subscribe(
      data => {
        this.isAuthorized = data;
      });
    this.portalServices.getServicesCategories().subscribe(categories => {
      if (categories.Content && this.isAuthorized) {
        this.servicesCategory = categories.Content;
        this.portalServices.setServiceCategories(categories.Content);
      }
    })
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  enableDropdownBg(event){
   event.stopPropagation();
    this.has_bg = !this.has_bg;
  }
}

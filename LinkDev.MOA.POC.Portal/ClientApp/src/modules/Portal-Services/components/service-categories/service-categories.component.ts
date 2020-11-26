import { Component, OnInit } from '@angular/core';
import { PortalServicesService } from 'src/modules/shared/Services/Portal-Service/portal-services.service';
import { ServiceCatogoriesModel } from 'src/modules/shared/Models/service-catogories.model';
import { TranslateService } from '@ngx-translate/core';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
@Component({
  selector: 'service-categories',
  templateUrl: './service-categories.component.html'
})

export class ServiceCategoriesComponent implements OnInit {

  servicesCategory: ServiceCatogoriesModel[];
  constructor(private portalServices: PortalServicesService, private translateService: TranslateService) {}

  ngOnInit() {
    SharedHelper.showLoader();
    this.portalServices.getServiceCategories().subscribe(categories => {
      if (categories.length > 0) {
        this.servicesCategory = categories;
        SharedHelper.hideLoader();
      }
    })
  }
}

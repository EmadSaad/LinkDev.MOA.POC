import { Component, OnInit } from '@angular/core';
import { PortalServicesService } from 'src/modules/shared/Services/Portal-Service/portal-services.service';
import { ServiceCatogoriesResponseModel } from 'src/modules/shared/Models/services-by-category-Response.model';
import { TranslateService } from '@ngx-translate/core';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'services-by-category',
  templateUrl: './services-by-category.component.html'
})

export class ServicesByCategoryComponent implements OnInit {

  servicesByCategory: ServiceCatogoriesResponseModel = new ServiceCatogoriesResponseModel;
  code: string;
  constructor(private portalServices: PortalServicesService, private translateService: TranslateService,private route: ActivatedRoute) { }

  ngOnInit() { 
    SharedHelper.showLoader();
    this.code = this.route.snapshot.params['code'];
    this.portalServices.setCategory(this.code);
    this.portalServices.getServicesByCategory(this.code).subscribe(services => {
      if (services.Content) {
        this.servicesByCategory = services.Content;
        SharedHelper.hideLoader();
      }
    });
  }
}

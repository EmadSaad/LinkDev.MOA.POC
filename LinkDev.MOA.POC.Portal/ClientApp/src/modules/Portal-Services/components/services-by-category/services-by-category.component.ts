import { Component, OnInit } from '@angular/core';
import { PortalServicesService } from 'src/modules/shared/Services/Portal-Service/portal-services.service';
import { ServiceCatogoriesResponseModel } from 'src/modules/shared/Models/services-by-category-Response.model';
import { TranslateService } from '@ngx-translate/core';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { ActivatedRoute} from '@angular/router';
import { RelatedServiceCatogoriesModel } from 'src/modules/shared/Models/related-services-by-category.model';

@Component({
  selector: 'services-by-category',
  templateUrl: './services-by-category.component.html'
})

export class ServicesByCategoryComponent implements OnInit {

  servicesByCategory: ServiceCatogoriesResponseModel = new ServiceCatogoriesResponseModel;
  code: string;
  constructor(private portalServices: PortalServicesService, private translateService: TranslateService,private route: ActivatedRoute) { 
    this.servicesByCategory={ServiceCategoryName:"Permits",Services:[{Name: "Infra Structure Permit",Description: "This Service Allows you to generate an Infra Staructure Permit",Code:"1"}]}
  }

  ngOnInit() { 
    //SharedHelper.showLoader();
    this.code = this.route.snapshot.params['code'];
    this.portalServices.setCategory(this.code);
    SharedHelper.hideLoader();
    if(this.code==='1')
    {
      
    }

  /*  this.portalServices.getServicesByCategory(this.code).subscribe(services => {
      if (services.Content) {
        this.servicesByCategory = services.Content;
        SharedHelper.hideLoader();
      }
    });*/
  }
 
}

import { Component, OnInit} from '@angular/core';
import { PortalServicesService } from 'src/modules/shared/Services/Portal-Service/portal-services.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetailsResponseModel } from 'src/modules/shared/Models/service-details-response.model';

@Component({
  selector: 'service-details',
  templateUrl: './service-details.component.html'
})

export class ServiceDetailsComponent implements OnInit {

  service:ServiceDetailsResponseModel = new ServiceDetailsResponseModel;
  Prerequisites:string[] = [];
  code:string;
  constructor(private portalServices:PortalServicesService,private translateService: TranslateService,private route:ActivatedRoute) {}

  ngOnInit() {
    SharedHelper.showLoader();
    this.code = this.route.snapshot.params['serviceCode'];
    this.portalServices.getServiceDetails(this.code).subscribe(service =>{
      if(service.Content){
        this.service = service.Content;
        this.Prerequisites = this.service.ServicePrerequisites;
        this.portalServices.setCategory(this.service.CategoryCode);
        SharedHelper.hideLoader();
      } 
    })
    
  }
}

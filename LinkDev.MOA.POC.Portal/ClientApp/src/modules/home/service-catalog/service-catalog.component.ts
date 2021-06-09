import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PortalServicesService } from '../../shared/Services/Portal-Service/portal-services.service';
import { ServiceCatogoriesModel } from '../../shared/Models/service-catogories.model';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
@Component({
  selector: 'service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.scss']
})
export class ServiceCatalogComponent implements OnInit {
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: true,
    //centeredSlides: true,
    //spaceBetween: 20,
    //loop: true,
    //slidesOffsetBefore: 0,
  };
  categories: ServiceCatogoriesModel[] = [];
  constructor(private portalServices: PortalServicesService) { 
    this.categories= this.Setcategories;
  }
  get Setcategories():ServiceCatogoriesModel[]{

    let categories:ServiceCatogoriesModel[]=[{Code:"1",Description:"Service That provices customer to extract ECZA Licenses",IconName:"licenses.png",Name:"Permits"}]
   return categories;
  }
  ngOnInit() {
    debugger;
   /* SharedHelper.showLoader();
    this.portalServices.getServiceCategories().subscribe(savedCategories => {
      if (savedCategories.length > 0) {
        this.categories = savedCategories;
        SharedHelper.hideLoader();
      }
      else
        SharedHelper.hideLoader();
    })*/
  }

}

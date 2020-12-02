import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WhyRegisterComponent } from './components/why-register.component';
import { SwiperModule,SWIPER_CONFIG,SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { PortalServicesModule } from '../Portal-Services/portal-services.module';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};
@NgModule({
    imports: [
        HomeRoutingModule,
        SwiperModule,
        TranslateModule,
        PortalServicesModule
    ],
    declarations: [
        HomeComponent, WhyRegisterComponent, ServiceCatalogComponent
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        },
    ]
})
export class HomeModule { }

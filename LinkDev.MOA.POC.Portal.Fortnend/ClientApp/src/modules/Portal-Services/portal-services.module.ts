// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalServicesRoutingModule } from './portal-services-routing.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { TranslateModule } from '@ngx-translate/core';


// Components
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ServiceCategoriesComponent } from './components/service-categories/service-categories.component';
import { ServicesByCategoryComponent } from './components/services-by-category/services-by-category.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { PortalServicesComponent } from './portal-services.component';
import { TruncateTextPipe } from '../shared/pipes/truncate-text.pipe';

@NgModule({
    declarations: [
        ServiceCategoriesComponent,
        ServicesByCategoryComponent,
        ServiceDetailsComponent,
        PortalServicesComponent,
        ServiceCardComponent,
        TruncateTextPipe
    ],
    imports: [
        CommonModule,
        PortalServicesRoutingModule,
        TranslateModule,
        BreadcrumbModule,
    ],
    exports: [ServiceCardComponent]
})
export class PortalServicesModule { }

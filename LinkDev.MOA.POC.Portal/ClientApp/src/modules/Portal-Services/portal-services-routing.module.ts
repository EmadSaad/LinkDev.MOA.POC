import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceCategoriesComponent } from './components/service-categories/service-categories.component';
import { ServicesByCategoryComponent } from './components/services-by-category/services-by-category.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { PortalServicesComponent } from './portal-services.component';

const routes: Routes = [
  {
    path: '', component: PortalServicesComponent,
    children: [
      { path: '', component: ServiceCategoriesComponent },
      { path: 'services/:code', component: ServicesByCategoryComponent },
      { path: 'service-details/:serviceCode', component: ServiceDetailsComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalServicesRoutingModule { }

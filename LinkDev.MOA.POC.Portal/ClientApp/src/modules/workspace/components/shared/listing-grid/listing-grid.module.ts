import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/modules/shared/shared.module';
import { ListingGridComponent } from './listing-grid.component';
import { TableModule } from 'primeng/table';





@NgModule({
  declarations: [ListingGridComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableModule
  ],
  exports:[ListingGridComponent]
})
export class ListingGridModule { }

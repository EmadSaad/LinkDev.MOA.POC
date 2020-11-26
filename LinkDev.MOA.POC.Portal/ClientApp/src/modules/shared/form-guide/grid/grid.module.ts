import { NgModule } from '@angular/core';
import { GridComponent } from './components/grid.component';
import { SharedModule } from '../../shared.module';
import { MutliselectModule } from '../multiselect/mutliselect.module';

@NgModule({
  declarations: [
    GridComponent,
  ],
  imports: [
    SharedModule,
    MutliselectModule,
  ],
  exports: [
    GridComponent,
  ],
  providers: [
  ]
})
export class GridModule { }

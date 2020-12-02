import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MutliselectModule } from '../multiselect/mutliselect.module';
import { GridEmitterComponent } from './components/gridEmitter.component';

@NgModule({
  declarations: [
    GridEmitterComponent,
  ],
  imports: [
    SharedModule,
    MutliselectModule,
  ],
  exports: [
    GridEmitterComponent,
  ],
  providers: [
  ]
})
export class GridEmitterModule { }

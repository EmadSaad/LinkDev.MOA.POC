import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from '../components/counter.component';
import { OnlyNumberModule } from '../../directives/only-number.module';


@NgModule({
  declarations: [
    CounterComponent,
    
  ],
  imports:[
    CommonModule,
    FormsModule,
    OnlyNumberModule

  ],
  exports:[
    CounterComponent
  ]
})
export class CounterModule { }

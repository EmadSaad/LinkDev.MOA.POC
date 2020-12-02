import { NgModule } from '@angular/core';
import { AlertComponent } from '../components/alerts.component';
import { SharedModule } from 'src/modules/shared/shared.module';
@NgModule({
    declarations: [
        AlertComponent
    ],
  imports: [
    SharedModule
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertsModule { }

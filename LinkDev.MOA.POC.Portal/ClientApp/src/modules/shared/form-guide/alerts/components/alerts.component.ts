import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { } from 'src/modules/shared/form-guide/message/modules/message.module';
import { Router, NavigationStart } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { browserRefresh } from 'src/app/app.component';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';

@Component({ selector: 'alert', templateUrl: './alerts.component.html' })
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private routeSubscription: Subscription;
  message: any;

  constructor(
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {

    if (browserRefresh) {
      this.router.navigateByUrl('/');
    }
    SharedHelper.showLoader();


    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'message message-success success-msg';
            message.iconCssClass = 'icon icon-success';
            break;
          case 'error':
            message.cssClass = 'message message-error error-msg';
            message.iconCssClass = 'icon icon-cancel-music';
            break;
          case 'warning':
            message.cssClass = 'message message-warning warning-msg';
            message.iconCssClass = 'icon icon-warning';
            break;
          case 'info':
            message.cssClass = 'message message-info';
            message.iconCssClass = 'icon icon-info';
            break;
        }
        this.message = message;
        SharedHelper.hideLoader();
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
}

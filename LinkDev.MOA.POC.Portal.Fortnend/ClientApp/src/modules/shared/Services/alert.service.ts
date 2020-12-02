import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, interval } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
//import { url } from 'inspector';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;
  alert: alertModel;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    // return interval(500).pipe(
    //   map(() => this.alert),
    //   // distinctUntilChanged()
    // );
    return this.subject.asObservable();
  }
  success(message: string, urlLink: string = '', urlLinkTitle?: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    setTimeout(() => {
      this.subject.next({ type: 'success', text: message, url: urlLink, urlLinkTitle: urlLinkTitle });
    }, 2000);
    // this.subject.next({ type: 'success', text: message });
  }

  error(message: string, urlLink: string = '', urlLinkTitle?: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    setTimeout(() => {
      this.subject.next({ type: 'error', text: message, url: urlLink, urlLinkTitle: urlLinkTitle });
    }, 2000);
    // this.subject.next({ type: 'error', text: message });
  }
  warning(message: string, urlLink: string = '', urlLinkTitle?: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    setTimeout(() => {
      this.subject.next({ type: 'warning', text: message, url: urlLink, urlLinkTitle: urlLinkTitle });
    }, 2000);
    //  this.subject.next({ type: 'warning', text: message });
  }
  info(message: string, urlLink: string = '', urlLinkTitle?: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    setTimeout(() => {
      this.alert = { type: 'info', text: message, url: urlLink, urlLinkTitle: urlLinkTitle };
    }, 2000);
    // this.subject.next({ type: 'info', text: message });
  }
  clear() {
    // clear by calling subject.next() without parameters
    this.alert = null;
    this.subject.next(null);
  }
}

export interface alertModel {
  type: string;
  text: string;
  url: string;
  urlLinkTitle: string
}

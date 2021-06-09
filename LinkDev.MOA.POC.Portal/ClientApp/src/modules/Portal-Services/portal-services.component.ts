import { Component, OnInit } from '@angular/core';
import { PortalServicesService } from '../shared/Services/Portal-Service/portal-services.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Title } from '@angular/platform-browser';
import { log } from 'console';
@Component({
    selector: 'app-portal-services',
    templateUrl: './portal-services.component.html'
})

export class PortalServicesComponent implements OnInit {
    breadcrmbComponent: string;
    currentUrl: string;
    constructor(private portalServices: PortalServicesService, location: Location,private route:ActivatedRoute, private router: Router,private titleService: Title) {
        router.events.subscribe(val => {
            if (location.path() != "") {
                this.currentUrl = location.path();
            }
        });
        this.titleService.setTitle("ECZA | Services");
    }

    ngOnInit() {
        if (this.currentUrl !== '/modon-services') {
            setTimeout(() => {
                this.portalServices.getCategory().subscribe(code => {
                    if (code) {
                        this.breadcrmbComponent = code;
                    }
                });
            });
        }
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log("route changed");
                if (event.url === '/modon-services') {
                    setTimeout(() => {
                        this.breadcrmbComponent = "";
                    });
                }
                else {
                    console.log("not equal modon services");
                    setTimeout(() => {
                        this.portalServices.getCategory().subscribe(code => {
                            if (code) {
                                console.log(code);
                                this.breadcrmbComponent = code;
                                console.log(this.breadcrmbComponent);
                            }
                        });
                    });
                }
            }
        });
    } 
}

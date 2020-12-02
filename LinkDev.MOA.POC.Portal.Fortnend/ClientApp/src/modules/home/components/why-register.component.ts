import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/modules/shared/services/token.service';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { AuthService } from 'src/modules/auth/services/auth.service'
import { AlertService } from '../../shared/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-why-register',
  templateUrl: './why-register.component.html',
  styleUrls: ['./why-register.component.scss']
})
export class WhyRegisterComponent implements OnInit {
  isAuthorized: boolean;
  constructor(private tokenService: TokenService, protected AuthService: AuthService, protected alertService: AlertService, protected router: Router){
    tokenService.isAuthenticated()
    .subscribe(
      data => {
        this.isAuthorized = data;
      });
  }
  ngOnInit() {
    document.querySelector(".main-menu").classList.add('no-bg');
  }
  ngOnDestroy(){
    document.querySelector(".main-menu").classList.remove('no-bg');
  }
  public show: boolean = true;



  public type: string = 'component';

  public disabled: boolean = false;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: true,
    // updateOnWindowResize: true,
    breakpoints: {
      1200: {
        slidesPerView: 1,
        spaceBetween: 10,
        mousewheel: true,
      },
      1920: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    }
  };

 

  public RedirectToLogin() {
    this.router.navigate(['auth', 'login']);
  }
}

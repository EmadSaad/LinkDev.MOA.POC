import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from 'src/modules/shared/services/token.service';

@Component({
  selector: 'app-iam-login',
  templateUrl: './iam-login.component.html',
  styleUrls: ['./iam-login.component.css']
})
export class IamLoginComponent implements OnInit {
  

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected tokenService: TokenService
  ) { }

  ngOnInit() {
    let Token = this.activatedRoute.snapshot.queryParams["Token"];
    this.tokenService.setUserToken(Token);
    console.log(Token);
    
    let UserData = this.activatedRoute.snapshot.queryParams["UserData"];
    this.tokenService.setUserData(JSON.parse(UserData));
    console.log(UserData);

      let ExpiresIn = this.activatedRoute.snapshot.queryParams["ExpiresIn"];
      this.tokenService.setUserTokenExpiration(ExpiresIn);
    console.log(ExpiresIn);
    window.location.href = '/';
  }

}

import { Component, OnInit } from '@angular/core';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { HttpErrorResponse } from '@angular/common/http';
import { APIService } from '../../../shared/Services/API-Service/api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation-mail',
  templateUrl: './activation-mail.component.html',
  styleUrls: ['./activation-mail.component.css']
})
export class ActivationMailComponent implements OnInit {
  Message: string = "error";
  class: string = "error-select";
  mode: Mode;
  ErrorMode = Mode.Error;
  SuccessMode = Mode.Success;
  public Email: string = "";
 
  constructor(public api: APIService, protected activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.SetSuccess("Activation.ActivationMailSuccess");
  }
  SetSuccess(message: string) {
    this.mode = Mode.Success;
    this.class = "success-select";
    this.Message = message;
    SharedHelper.hideLoader();
  }

  Resendactivationemail() {
    this.Email = this.activatedRoute.snapshot.queryParams["Email"];
    SharedHelper.showLoader();
    this.api.Get<ApiGenericResponse<string>>("api/ProfileManagement/ResendActivationMail?Email=" + this.Email).subscribe(
      res => {
        SharedHelper.hideLoader();
        if (res.ResponseCode === ResponseCode.Error) {
          this.SetError(res.FriendlyResponseMessage);
        }
        else 
          this.SetSuccess("Activation.ResendActivationMailSuccess");
      },
      error => {
        SharedHelper.hideLoader();
        this.SetError("Auth.EmailConfirmationError");
      }
    );
  }

  SetError(message: string) {
    this.mode = Mode.Error;
    this.class = "error-select";
    this.Message = message;
    SharedHelper.hideLoader();
  }
}

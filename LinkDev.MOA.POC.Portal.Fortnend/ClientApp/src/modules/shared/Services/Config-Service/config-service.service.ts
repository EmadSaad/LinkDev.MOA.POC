import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static APIURL: string;
  static MOAAPIURL: string;
  static CRMAPI: string;
  static OldModonURL: string;
  static PasswordValidationPattern: string;
  static EmailValidationPattern: string;
  static MobileValidationPattern: string;
  static NumberValidationPattern: string;
  static recaptchaSiteKey: string;
  static IdentityNumberValidationPattern: string;
  static NewMobileValidationPattern: string;
  static NewPhoneValidationPattern: string;
  //static GoogleSiteKey: string;
  constructor(private http: HttpClient) { }
  load() {
    const jsonFile = 'assets/config/config.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: any) => {
        ConfigService.CRMAPI = response.CRMAPI;
        ConfigService.APIURL = response.APIURL;
        ConfigService.MOAAPIURL = response.MOAAPIURL;
        ConfigService.PasswordValidationPattern = response.PasswordValidationPattern;
        ConfigService.EmailValidationPattern = response.EmailValidationPattern;
        ConfigService.MobileValidationPattern = response.MobileValidationPattern;
        ConfigService.NumberValidationPattern = response.NumberValidationPattern;
        ConfigService.recaptchaSiteKey = response.recaptchaSiteKey;
        ConfigService.IdentityNumberValidationPattern = response.IdentityNumberValidationPattern;
        ConfigService.NewMobileValidationPattern = response.NewMobileValidationPattern;
        ConfigService.NewPhoneValidationPattern = response.NewPhoneValidationPattern;
        ConfigService.OldModonURL = response.OldModonURL;
        //ConfigService.GoogleSiteKey = response.GoogleSiteKey;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }

}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

// @Injectable({
//     providedIn: 'root'
// })
// export class AppConfigService {

//     private appConfig: any;
//     static settings: IAPPConfig;
//     private jsonFile = '';
//     constructor(private http: HttpClient) { }

//     loadAppConfig() {
//         if (environment.name === 'Local') {
//             this.jsonFile = '../../../assets/config/config.json';
//         } else {
//             this.jsonFile = `../../../assets/config/config.${environment.name}.json`;
//         }

//         return this.http.get(this.jsonFile)
//             .toPromise()
//             .then(data => {
//                 this.appConfig = data;
//                 AppConfigService.settings = data as IAPPConfig;
//             });
//     }

//     get apiBaseUrl() {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.apiBaseUrl;
//     }

//     get recaptchaKey(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.recaptchaKey;
//     }
//     get googleMapsToken(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.googleMapsToken;
//     }
//     get emailValidationPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.EmailValidationPattern;
//     }
//     get mobileValidationPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.MobileValidationPattern;
//     }
//     get passwordValidationPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.PasswordValidationPattern;
//     }
//     get numberValidationPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.NumberValidationPattern;
//     }
//     get inpection_results_page_max_size(): number {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.inpection_results_page_max_size;
//     }
//     get idleTime(): number {
//         return this.appConfig.idleTime != null ? this.appConfig.idleTime : 1;
//     }
//     get decimalNumbersPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.decimalNumbersPattern;
//     }
//     get mobileNumberPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.mobileNumberPattern;
//     }
//     get urlPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.urlPattern;
//     }
//     get GlobalMobileNumberPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.GlobalMobileNumberPattern;
//     }
//     get PositiveDecimalNumbersPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.PositiveDecimalNumbersPattern;
//     }
//     get PositiveNumber(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.PositiveNumber;
//     }
//     get ScriptPattern(): string {
//         if (!this.appConfig) {
//             throw Error('Config file not loaded!');
//         }
//         return this.appConfig.ScriptPattern;
//   }
//     get investmentGuidDocumentCode(): string {
//       if (!this.appConfig) {
//         throw Error('Config file not loaded!');
//       }
//       return this.appConfig.investmentGuidDocumentCode;
//     }
// }

    




// export interface IAPPConfig {
//     apiBaseUrl: string;
//     recaptchaKey: string;
//     googleMapsToken: string;
//     idleTime: number;
//     MobileValidationPattern: string;
//     EmailValidationPattern: string;
//     PasswordValidationPattern: string
//     ArabicValidationPattern: string;
//     NumberValidationPattern: string;
//     decimalNumbersPattern:string;
//     GlobalMobileNumberPattern:string;
//     ScriptPattern:string;
//     urlPattern:string;
//     PositiveNumber: string;
//     PositiveDecimalNumbersPattern: string;
//     investmentGuidDocumentCode : string;
//     numberValidationBiggerThanZeroPattern: string;
//     decimalNumbersBiggerThanZeroPattern: string;


// }

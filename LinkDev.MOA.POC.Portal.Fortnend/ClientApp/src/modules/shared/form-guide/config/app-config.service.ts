import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IAppConfig } from './app-config.model';
import { Injectable } from '@angular/core';

declare var _spPageContextInfo;

@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient) {}

    load() {
      var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    //   const jsonFile = full + `/Style Library/Adahi/adahi-app/assets/config/config.json`;
    const jsonFile = _spPageContextInfo.siteAbsoluteUrl + '/Style%20Library/Adahi/adahi-app/assets/config/config.json'
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : IAppConfig) => {
               AppConfig.settings = <IAppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}`);
            });
        });
    }
}

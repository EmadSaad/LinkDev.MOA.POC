import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { IAppConfig } from '../../config/app-config.model';
import { AppConfig } from '../..//config/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class AttachmentService {

    appSettings: IAppConfig;

    constructor(private httpService: HttpService) {
        this.appSettings = AppConfig.settings;
    }

    download(url) {
        return this.httpService.get(url, "blob");
    }

} 

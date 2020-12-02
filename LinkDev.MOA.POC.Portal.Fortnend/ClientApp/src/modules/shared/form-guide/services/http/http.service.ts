import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators'
import { AcceptLanguageHeader, Language } from '../../utility/enums/enums';
import { LoadingScreenService } from '../loader/loader.service';
import { AppConfig } from '../../config/app-config.service';
import { Helper } from '../../utility/helper/helper';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private headers: any;
    private responseType: any;

    constructor(private _http: HttpClient, private LoadingScreenService: LoadingScreenService) { }

    public post<T>(url: string, body: any, options?: object ,checkCurrentUser = false): Observable<T> {
        this.LoadingScreenService.startLoading();

        let result$ = new Observable<T>((observer) => {
            let req$ = this._http.post<T>(url, body, this._getOptions(options)).pipe(share(), catchError(this.handleError));
            if (checkCurrentUser && Helper.userInfo().isUserLogged) {

                if (Helper.userInfo().isAdmin) {
                    // location.href = "/" + Language[this.getCurrentLanguage()] + AppConfig.settings.homePageUrl;
                    observer.complete();
                    return;
                }

                // this.getCurrentUser().subscribe(() => {
                //     req$.subscribe(observer);
                // }, (err) => observer.error(err));
            }
            else {
                req$.subscribe(observer);
            }
        }).pipe(share());

        result$.subscribe(() => this.LoadingScreenService.stopLoading(), () => this.LoadingScreenService.stopLoading());
        return result$;
    }

    public get<T>(url: string, responseType?: any, options?: object): Observable<T> {

        this.LoadingScreenService.startLoading();

        let requestOptions = this._getOptions(options);
        if (responseType) {
            this.responseType = responseType as 'json'
            requestOptions["responseType"] = this.responseType;
        }

        var req$ = this._http.get<T>(url, requestOptions).pipe(share(), catchError(this.handleError));
        req$.subscribe(() => this.LoadingScreenService.stopLoading(), () => this.LoadingScreenService.stopLoading());
        return req$;

    }

    public delete<T>(url: string, options?: object): Observable<T> {

        this.LoadingScreenService.startLoading();

        var req$ = this._http.delete<T>(url, this._getOptions(options)).pipe(share(), catchError(this.handleError));
        req$.subscribe(() => this.LoadingScreenService.stopLoading(), () => this.LoadingScreenService.stopLoading());
        return req$;
    }

    public put<T>(url: string, body: any, options?: object, checkCurrentUser = false): Observable<T> {

        this.LoadingScreenService.startLoading();

        let result$ = new Observable<T>((observer) => {
            let req$ = this._http.put<T>(url, body, this._getOptions(options)).pipe(share(), catchError(this.handleError));
            if (checkCurrentUser && Helper.userInfo().isUserLogged) {

                if (Helper.userInfo().isAdmin) {
                    // location.href = "/" + Language[this.getCurrentLanguage()] + AppConfig.settings.homePageUrl;
                    observer.complete();
                    return;
                }

                // this.getCurrentUser().subscribe(() => {
                //     req$.subscribe(observer);
                // }, (err) => observer.error(err));
            }
            else {
                req$.subscribe(observer);
            }
        }).pipe(share());

        result$.subscribe(() => this.LoadingScreenService.stopLoading(), () => this.LoadingScreenService.stopLoading());
        return result$;
    }


    private getAcceptHeader(): string {
        return AcceptLanguageHeader[this.getCurrentLanguage()];
    }

    private getCurrentLanguage(): number {
        // return _spPageContextInfo.currentLanguage;
        return;
    }

    private handleError = (error: any): Observable<any> => {
        if (error.status == 401) {
            // location.href = "/" + Language[this.getCurrentLanguage()] + AppConfig.settings.signUrl + "?ReturnUrl=" + document.location.pathname + document.location.search + document.location.hash;
            return;
        }
        return throwError(error)
    };

    private getCurrentUser() {
        // return this.get<any>(AppConfig.settings.authenticationApi + '/users/current/');
    }

    private _getOptions(options: any) {

        if (options == null) {
            options = {};
        }

        if (options.headers == null) {
            options.headers = {};
        }
        
        options.headers["Accept-Language"] = options.headers["Accept-Language"] || this.getAcceptHeader();
        return options;
    }
}
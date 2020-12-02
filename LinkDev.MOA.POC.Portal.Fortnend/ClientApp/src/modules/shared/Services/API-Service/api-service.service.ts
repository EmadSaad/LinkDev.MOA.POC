import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  rootURL: string = "";
  token: string = "";
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.rootURL = ConfigService.APIURL;
  }

  Get<T>(url: string): Observable<T> {
    var headers = new HttpHeaders({
      'Accept-Language': this.translate.currentLang,
      'Content-type': "application/json",
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    });
    //if (localStorage.getItem("id_token")) {
      //headers = headers.append('Authorization', localStorage.getItem("id_token"));
    if (localStorage.getItem("authKey")) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem("authKey")}`);
    }
    var httpOptions = {
      headers: headers
    }
    if(url.startsWith("http"))
    return this.http.get<T>(url, httpOptions).pipe();
    else
    return this.http.get<T>(this.rootURL + url, httpOptions).pipe();
  }


  Post<T>(url: string, body: any): Observable<T> {
    var headers = new HttpHeaders({
      'Accept-Language': this.translate.currentLang,
      'Content-type': "application/json"
    });

    if (localStorage.getItem("authKey")) {
      headers = headers.append('Authorization', `Bearer ${localStorage.getItem("authKey")}`);
    }

    var httpOptions = {
      headers: headers
    };
    if(url.startsWith("http"))
    return this.http.post<T>(url, body, httpOptions).pipe();
    else
    return this.http.post<T>(this.rootURL + url, body, httpOptions).pipe();
  }

    PostFile<T>(url: string, body: any): Observable<T> {
    var headers = new HttpHeaders({
      'Accept-Language': this.translate.currentLang,
    });
      //if (localStorage.getItem("id_token")) {
      //headers = headers.append('Authorization', localStorage.getItem("id_token"));
      if (localStorage.getItem("authKey")) {
        headers = headers.append('Authorization', `Bearer ${localStorage.getItem("authKey")}`);
      }
    //if (localStorage.getItem("contact-id")) {
    //  headers = headers.append('ContactId', localStorage.getItem("contact-id"));
    //}
    var httpOptions = {
      headers: headers
    };
    if(url.startsWith("http"))
    return this.http.post<T>(url, body, httpOptions).pipe();
    else
    return this.http.post<T>(this.rootURL + url, body, httpOptions).pipe();
  }

  Put<T>(url: string, body: any): Observable<T> {
    var headers = new HttpHeaders({
      'Accept-Language': this.translate.currentLang,
      'Content-type': "application/json"
    });

    headers = headers.append('Authorization', 'Basic bW9kb246TW9kb24xMjM0');
    headers = headers.append('messageID', Guid.create().toString());

    var httpOptions = {
      headers: headers
    };

    return this.http.put<T>(url, body, httpOptions).pipe();
  }

  PutValue<T>(url: string, body: any): Observable<T> {
    var headers = new HttpHeaders({
    });

    headers = headers.append('Authorization', 'Basic bW9kb246TW9kb24xMjM0');
    headers = headers.append('messageID', Guid.create().toString());

    var httpOptions = {
      headers: headers
    };

    return this.http.put<T>(url, body, httpOptions).pipe();
  }

  PutFileNote<T>(url: string, body: any): Observable<T> {
    var headers = new HttpHeaders({
    });

    headers = headers.append('Authorization', 'Basic bW9kb246TW9kb24xMjM0');

    var httpOptions = {
      headers: headers
    };

    return this.http.put<T>(url, body, httpOptions).pipe();
  }

  GetTicket<T>(url: string): Observable<T> {
    var headers = new HttpHeaders({
      'Content-type': "application/json",
      'Cache-Control': 'no-cache'
    });

    headers = headers.append('Authorization', 'Basic bW9kb246TW9kb24xMjM0');
    headers = headers.append('messageID', Guid.create().toString());

    var httpOptions = {
      headers: headers
    }
    return this.http.get<T>(url, httpOptions).pipe();
  }

  GetTicketList<T>(url: string): Observable<T> {
    var headers = new HttpHeaders({
      'Content-type': "application/json",
      'Cache-Control': 'no-cache'
    });

    headers = headers.append('Authorization', 'Basic bW9kb246TW9kb24xMjM0');
    headers = headers.append('messageID', Guid.create().toString());

    var httpOptions = {
      headers: headers
    }
    return this.http.get<T>(url, httpOptions).pipe();
  }

  PostComment<T>(url: string, body: any): Observable<T> {
    var headers = new HttpHeaders({
      'Content-type': "application/json",
      'Cache-Control': 'no-cache'
    });

    headers = headers.append('Authorization', 'Basic bW9kb246TW9kb24xMjM0');
    headers = headers.append('messageID', Guid.create().toString());

    var httpOptions = {
      headers: headers
    }
    return this.http.post<T>(url, body, httpOptions).pipe();
  }
}

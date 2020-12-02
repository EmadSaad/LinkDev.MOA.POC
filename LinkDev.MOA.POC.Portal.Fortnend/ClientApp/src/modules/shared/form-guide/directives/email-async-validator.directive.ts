import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors, NgControl } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { CONSTANTS } from '../utility/const/const';
import { CheckEmailExistanceStatus } from '../enums/checkEmailStatus';
import { map, filter, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

@Directive({
  selector: '[emailAsyncValidator]'
})
export class EmailAsyncValidatorDirective implements AsyncValidator, OnInit {

  @Input("emailAsyncValidator")
  emailValue$: Subject<String>

  control: AbstractControl;

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }



  resultObs$: Observable<any>;
  controlvalues$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private http: HttpService, el: ElementRef) {

  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    this.control = control;
    console.log(this.emailValue$);
    return this.emailValue$.pipe(switchMap(value => this.chk(value)), debounceTime(400), distinctUntilChanged())

  }

  public chk(val) {
    if (this.control.hasError('emailExistButNotActivated'))
      delete this.control.errors.emailExistButNotActivated;

    if (this.control.hasError('emailExist'))
      delete this.control.errors.emailExist;

    if (this.control.errors) {
      return observableOf(null);
    }
    return this.checkEmail(val).pipe(map((status: CheckEmailExistanceStatus) => {
      if (status == CheckEmailExistanceStatus.EmailExist) {
        return { emailExist: true }
      }
      if (status == CheckEmailExistanceStatus.EmailExistButNotActivated) {
        return { emailExistButNotActivated: true }
      }
      return null;
    }), catchError(() => observableOf(null)));

  }

  public checkEmail(email: string): Observable<any> {
    let url = CONSTANTS.urls.authentication + "checkemail";
    return this.http.post(url, { 'email': email });
  }
}


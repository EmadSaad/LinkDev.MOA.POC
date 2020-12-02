import { ApplicationRef, ElementRef } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Helper {

    public static boostrapModule(appRef: ApplicationRef, ...compontents: any[]) {

        if (document.readyState.toLowerCase() == "complete") {
            compontents.forEach((component) => {
                appRef.bootstrap(component);
            });
        }
        else {
            window.onload = () => {
                compontents.forEach((component) => {
                    appRef.bootstrap(component);
                });
            }
        }

    }

    public static getQueryStringByName(name): string | null {
        var qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < qstring.length; i++) {
            var urlparam = qstring[i].split('=');
            if (urlparam[0].toLowerCase() == name.toLowerCase()) {
                return urlparam[1];
            }
        }
    }

    public static focusOnError(formElementRef: ElementRef) {

        let form = formElementRef.nativeElement as HTMLElement;
        let firstInvalid: HTMLElement;

        if (form) {

            firstInvalid
            let invalidElments = Array.prototype.slice.call((form.querySelectorAll(".ng-invalid")) as NodeListOf<HTMLElement>);
            firstInvalid = invalidElments.find(e => !e.hidden);

            //firstInvalid = form.querySelector(".ng-invalid") as HTMLElement;

            if (firstInvalid) {

                let inputs: HTMLInputElement[];
                inputs = Array.prototype.slice.call((firstInvalid.querySelectorAll("input") as NodeListOf<HTMLInputElement>))
                let input = inputs.find(e => e.getAttribute("type") != "hidden" && !e.hidden);

                if (input) { input.focus(); }

                else {
                    let parentElment = firstInvalid.closest(".form-row") as HTMLElement
                    if (parentElment) {
                        parentElment.tabIndex = 100;
                        parentElment.focus();
                        parentElment.removeAttribute("tabindex");
                    }
                }

            }
        }
    }

    public static goToTop() {
        let w = document.querySelector("#s4-workspace");
        w.scrollTop = 0;
    }

    public static userInfo(): { isAdmin: boolean, isUserLogged: boolean } {

        let info = { isAdmin: false, isUserLogged: false };
        // if (_spPageContextInfo.userId == 0) {
        //     info.isUserLogged = false;
        // }
        // else {
        //     info.isUserLogged = true;
        //     if (_spPageContextInfo.systemUserKey && _spPageContextInfo.systemUserKey.toLowerCase().indexOf("i:0#.f|") != -1) {
        //         info.isAdmin = false;
        //     }
        //     else {
        //         info.isAdmin = true;
        //     }
        // }
        return info;
    }

    public static addToolTipToShareIcons(iconSelector,title){

        let shareComponent = document.getElementsByClassName(iconSelector);
        if (shareComponent != null && shareComponent.length > 0) {
         
         shareComponent[0].setAttribute("title",title);
        }
      
    }

    public static getCurrentUserEmail() : string
    {
        if(Helper.userInfo().isAdmin || !Helper.userInfo().isUserLogged)
        {
        return null;
        }

        // return _spPageContextInfo.userEmail.toLowerCase();
    }

    public static toFormData(obj, ...fileNames: string[]) {
        let formData = new FormData();
        Object.keys(obj).forEach(key => {
            if (fileNames.includes(key)) {
                formData.append(key, obj[key], obj[key].name);
            } else {
                formData.append(key, obj[key]);
            }
        });
        return formData;
    }

    public static  dateToAdahiDate(date: Date): NgbDateStruct {
        return { day: date.getUTCDate(), month: date.getMonth() + 1, year: date.getUTCFullYear() };
      }
}

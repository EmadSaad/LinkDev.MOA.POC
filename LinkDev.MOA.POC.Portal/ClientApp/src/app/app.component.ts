import { Component, Inject, AfterViewInit, OnDestroy } from "@angular/core";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { DomSanitizer } from "@angular/platform-browser";

import { HttpClient } from "@angular/common/http";
import { UserIdleService } from "angular-user-idle";
import { Subscription } from "rxjs";
import { Router, NavigationStart } from "@angular/router";
export let browserRefresh = false;

@Component({
  providers: [HttpClient],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  textareaModel;
  textboxModel;
  multiselectModel;
  title = "General Entertainment Authority";
  cssUrl = "";
  dir = "";
  currentLang = "ar";
  private cssAr = "./assets/css/style-ar.min.css";
  private cssEn = "./assets/css/styles.min.css";
  private dirAr = "rtl";
  private dirEn = "ltr";
  private selectors = {
    fontSize: "font-size-",
    fontSizeMeduim: "font-size-m",
    html: "html"
  };
  geaCSSLink = "";
  subscription: Subscription;
  constructor(
    translate: TranslateService,
    protected userIdle: UserIdleService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.currentLang = localStorage.getItem("lang") || this.currentLang;
    translate.addLangs(["en", "ar"]);
    translate.setDefaultLang(this.currentLang);
    translate.use(this.currentLang);
    translate.currentLang = this.currentLang;
    localStorage.setItem("lang", this.currentLang);
    this.cssUrl = translate.currentLang === "en" ? this.cssEn : this.cssAr;
    this.dir = localStorage.getItem("lang") === "en" ? this.dirEn : this.dirAr  ;
    this.updateGoogleCaptchaLanguage(translate.currentLang);

    this.userIdle.onTimeout().subscribe(s => { });
  }

  updateGoogleCaptchaLanguage(selectedLanguage) {
    var recaptchaDiv = document.getElementsByTagName("re-captcha");
    if (recaptchaDiv.length > 0) {
      var iframeGoogleCaptcha =
        recaptchaDiv[0].children[0].children[0].children[0];
      iframeGoogleCaptcha.setAttribute(
        "src",
        iframeGoogleCaptcha
          .getAttribute("src")
          .replace(/hl=(.*?)&/, "hl=" + selectedLanguage + "&")
      );
    }
  }
  ngOnInit() {
    document.head.innerHTML +=
      '<link id="geaCSSLink" href="" rel="stylesheet" type="text/css" />';

    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
      }
    });
  }
  ngAfterViewInit() {
    document.getElementById("geaCSSLink").setAttribute("href", this.cssUrl);
    document.getElementById("html").setAttribute("dir", this.dir);
    //this.setFontSize();
    // this.setContrast();
  }

  emailOnBlur() { }

  onFileChanged() { }

  setFontSize() {
    var fontSize = localStorage.getItem("fontSize");
    if (!fontSize) {
      document
        .getElementById(this.selectors.fontSizeMeduim)
        .classList.add("underlined");
      localStorage.setItem("fontSize", "m");
      return;
    }
    document
      .getElementById(this.selectors.html)
      .setAttribute("font-size", fontSize);
    document
      .getElementById(this.selectors.fontSize + fontSize)
      .classList.add("underlined");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setContrast() {
    var isContrasted = localStorage.getItem("isContrasted");
    if (!isContrasted || isContrasted == "false") {
      document.getElementById("html").classList.remove("contrast");
      return;
    }
    document.getElementById("html").classList.add("contrast");
  }
}

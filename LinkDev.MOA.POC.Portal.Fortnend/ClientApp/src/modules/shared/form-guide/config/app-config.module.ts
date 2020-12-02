import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppConfig } from './app-config.service';

export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.load();
}

@NgModule({
    providers: [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig], multi: true
        }
    ],
})

export class AppConfigModule { }

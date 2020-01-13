import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/components/layout.component';

import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthInterceptor } from './auth.interceptor';
import { environment } from '@environments/environment';

import { CookieService } from 'ngx-cookie-service';

import * as Sentry from '@sentry/browser';

import { MaterialModule } from '@material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AgendaComponent } from './acu/components/agenda/agenda.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AcuModule } from './acu/acu.module';

// if (environment.production === true) {
Sentry.init({
  dsn: 'https://7d756537d9ae48a49195bdef6a69b908@sentry.io/1869535'
});
// }

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AcuModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,

  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  entryComponents: [AgendaComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenet/home/home.component';
import { CountriesComponent } from './componenet/countries/countries.component';
import { NavbarComponent } from './componenet/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componenet/dashboard/dashboard.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountriesComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,

    HttpClientModule,
    Ng2GoogleChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

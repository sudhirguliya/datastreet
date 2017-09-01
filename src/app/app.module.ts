import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import {AccordionModule} from "ng2-accordion";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

//service
import {FinancialRatioService,DirectorService,IndustryService,CompanyService,StatementService,TrademarkService,LegalService,AuthenticationService } from './_services/index';
import { AuthGuard } from './_guards/index';
// Routing Module
import { AppRoutingModule } from './app.routing';
import { DatePickerModule } from 'ng2-datepicker';
import * as moment from 'moment'
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { IndustryLayoutComponent } from './layouts/industry-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AutocompleteModule } from 'ng2-input-autocomplete';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    AccordionModule,
    HttpModule,
    DatePickerModule,
    JsonpModule,
    AngularMultiSelectModule,
    AutocompleteModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    LogoutComponent,
    IndustryLayoutComponent,
    DashboardLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    GoogleChart
  ],
  providers: [FinancialRatioService,IndustryService,CompanyService,StatementService,TrademarkService,LegalService,AuthenticationService,AuthGuard,DirectorService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

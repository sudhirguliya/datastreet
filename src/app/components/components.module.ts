import { NgModule } from '@angular/core';

import { ButtonsComponent } from './buttons.component';
import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SocialButtonsComponent } from './social-buttons.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { CommonModule } from '@angular/common';
// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalsComponent } from './modals.component';
import { DataTablesModule } from 'angular-datatables';
// Tabs Component
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Components Routing
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
  imports: [
    ComponentsRoutingModule,
    ModalModule.forRoot(),
    DataTablesModule.forRoot(),
    TabsModule,
    CommonModule
  ],
  declarations: [
    ButtonsComponent,
    CardsComponent,
    FormsComponent,
    ModalsComponent,
    SocialButtonsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent
  ]
})
export class ComponentsModule { }

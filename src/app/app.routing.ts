import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { IndustryLayoutComponent } from './layouts/industry-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './_guards/index';
export const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'logout',  component: LogoutComponent},
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'industry',
    pathMatch: 'full'
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'industry',canActivate: [AuthGuard],
        loadChildren: './industry/industry.module#IndustryModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'financial-ratio',
        loadChildren: './financial-ratio/financial-ratio.module#FinancialRatioModule'
      }
      
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'my-dashboard',
        loadChildren: './mydashboard/mydashboard.module#MydashboardModule'
      }
      
    ]
  },
  
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Trademark'
    },
    children: [
      {
        path: 'trademark',
        loadChildren: './trademark/trademark.module#TrademarkModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Leagal Cases'
    },
    children: [
      {
        path: 'legal',
        loadChildren: './legal/legal.module#LegalModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'company',canActivate: [AuthGuard],
        loadChildren: './company/company.module#CompanyModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Director'
    },
    children: [
      {
        path: 'director',
        loadChildren: './director/director.module#DirectorModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'director-list',
        loadChildren: './director-list/director-list.module#DirectorListModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'document',
        loadChildren: './document/document.module#DocumentModule'
      }
      
    ]
  },
  {
    path: '',
    component: IndustryLayoutComponent,
    data: {
      title: 'Financial Statement'
    },
    children: [
      {
        path: 'financial-statement',
        loadChildren: './finacial_statement/finacial_statement.module#Finacial_statementModule'
      }
      
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

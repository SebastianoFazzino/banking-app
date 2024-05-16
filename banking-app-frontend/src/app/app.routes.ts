import { Routes } from '@angular/router';
import {LoanFormComponent} from "./pages/loan-form/loan-form.component";
import {LoanResponseComponent} from "./pages/loan-response/loan-response.component";

export const routes: Routes = [
  {
    path: 'loan-request',
    component: LoanFormComponent
  },
  {
    path: 'loan-response',
    component: LoanResponseComponent
  },
  {
    path: '',
    redirectTo: 'loan-request',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'loan-request'
  }
];

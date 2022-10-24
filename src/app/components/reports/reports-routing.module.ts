import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateReportComponent } from './generate-report/generate-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:"generate-report",
        component: GenerateReportComponent,
        data:{
          title:"Generar Reporte",
          breadcrumb:"Generar Reporte",
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

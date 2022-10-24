import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ReportsRoutingModule } from './reports-routing.module';


import { GenerateReportComponent } from './generate-report/generate-report.component';

@NgModule({
  declarations: [ GenerateReportComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class ReportsModule { }

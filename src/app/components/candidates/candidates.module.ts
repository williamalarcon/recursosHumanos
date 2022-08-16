import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { CandidateRoutingModule } from './candidates-routing.module';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CandidatesListComponent, EditCandidateComponent, CreateCandidateComponent],
  imports: [
    NgxDatatableModule.forRoot({
      messages: {
      emptyMessage: 'No hay datos disponibles',
      totalMessage: 'total',
      selectedMessage: 'selected'
      }
      }),
    CommonModule,
    CandidateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    NgbModule,
    GalleryModule.forRoot(),

  ]
})
export class CandidatesModule { }
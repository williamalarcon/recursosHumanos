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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CandidatesListComponent, EditCandidateComponent, EditProfileComponent, CreateCandidateComponent],
  imports: [
    NgxDatatableModule.forRoot({
      messages: {
      emptyMessage: 'No data to display',
      totalMessage: 'total',
      selectedMessage: 'selected'
      }
      }),
      NgSelectModule,
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

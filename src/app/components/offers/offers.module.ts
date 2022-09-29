import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './offers.routing.module';
import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { OffersListComponent } from './offers-list/offers-list.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [OffersListComponent, EditOfferComponent, CreateOfferComponent, ViewCandidatesComponent],
  imports: [
    NgxDatatableModule,
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    NgbModule,
    GalleryModule.forRoot()

  ]
})
export class OffersModule { }

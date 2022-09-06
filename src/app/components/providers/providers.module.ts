import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { ProviderRoutingModule } from './providers-routing.module';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ProvidersListComponent, EditProviderComponent, CreateProviderComponent],
  imports: [
    NgxDatatableModule.forRoot({
      messages: {
      emptyMessage: 'No data to display',
      totalMessage: 'total',
      selectedMessage: 'selected'
      }
      }),
    CommonModule,
    ProviderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    NgbModule,
    GalleryModule.forRoot(),

  ]
})
export class ProvidersModule { }

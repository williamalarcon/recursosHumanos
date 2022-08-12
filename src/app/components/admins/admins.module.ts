import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins.routing.module';
import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { AdminListComponent } from './admins-list/admin-list.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminListComponent, EditAdminComponent, CreateAdminComponent],
  imports: [
    NgxDatatableModule,
    CommonModule,
    AdminsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    GalleryModule.forRoot(),

  ]
})
export class AdminsModule { }

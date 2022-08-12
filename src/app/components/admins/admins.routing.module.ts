import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from './admins-list/admin-list.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"admin-list",
        component:AdminListComponent,
        data:{
          title:"Administrators List",
          breadcrumb:"Administrators List",
        },
      },
      {
        path:"create-admin",
        component: CreateAdminComponent,
        data:{
          title:"Create Admin",
          breadcrumb:"Create Admin",
        }
      },
      {
        path:"edit-admin",
        component: EditAdminComponent,
        data:{
          title:"Edit Admin",
          breadcrumb:"Edit Admin",
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }

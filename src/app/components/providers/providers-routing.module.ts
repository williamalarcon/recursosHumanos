import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProviderComponent } from './create-provider/create-provider.component';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"create-provider",
        component:CreateProviderComponent,
        data:{
          title:"Create Provider",
          breadcrumb:"Create Provider",
        }
      },
      {
        path:"edit-provider",
        component: EditProviderComponent,
        data:{
          title:"Edit Provider",
          breadcrumb:"Edit Provider",
        }
      },
      {
        path:"providers-list",
        component:ProvidersListComponent,
        data:{
          title:"Providers List",
          breadcrumb:"Providers List",
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }

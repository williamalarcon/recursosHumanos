import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersListComponent } from './offers-list/offers-list.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"offers-list",
        component: OffersListComponent,
        data:{
          title:"List",
          breadcrumb:"List",
        },
      },
      {
        path:"create-offer",
        component: CreateOfferComponent,
        data:{
          title:"Create",
          breadcrumb:"Create",
        }
      },
      {
        path:"edit-offer",
        component: EditOfferComponent,
        data:{
          title:"Edit",
          breadcrumb:"Edit",
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

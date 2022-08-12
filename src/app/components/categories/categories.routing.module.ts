import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"categories-list",
        component:CategoriesListComponent,
        data:{
          title:"List",
          breadcrumb:"List",
        },
      },
      {
        path:"create-category",
        component: CreateCategoryComponent,
        data:{
          title:"Create",
          breadcrumb:"Create",
        }
      },
      {
        path:"edit-category",
        component: EditCategoryComponent,
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

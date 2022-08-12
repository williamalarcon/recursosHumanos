import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"team-details",
        component:TeamDetailsComponent,
        data:{
          title:"Users List",
          breadcrumb:"Users List",
        },
      },
      {
        path:"create-profile",
        component:CreateProfileComponent,
        data:{
          title:"Create User",
          breadcrumb:"Create User",
        }
      },
      {
        path:"edit-profile",
        component:EditProfileComponent,
        data:{
          title:"Edit User",
          breadcrumb:"Edit User",
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"create-candidate",
        component:CreateCandidateComponent,
        data:{
          title:"Create Candidate",
          breadcrumb:"Create Candidate",
        }
      },
      {
        path:"edit-candidate",
        component: EditCandidateComponent,
        data:{
          title:"Edit Candidate",
          breadcrumb:"Edit Candidate",
        }
      },
      {
        path:"candidates-list",
        component:CandidatesListComponent,
        data:{
          title:"Candidates List",
          breadcrumb:"Candidates List",
        }
      },
      {
        path:"edit-profile",
        component: EditProfileComponent,
        data:{
          title:"Profile",
          breadcrumb:"Profile",
        }
      },
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }

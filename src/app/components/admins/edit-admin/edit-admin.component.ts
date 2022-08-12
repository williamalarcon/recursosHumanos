import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { ProfileService } from '../../../shared/httpClient/profile.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  public myProfile: FormGroup;
  public editProfile: FormGroup;
  cargos = [];
  sub;
  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              public toaster: ToastrService,
              private profileService: ProfileService) {
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  console.log("suscribirse");
                  this.getInfoDetail(params.id);
                });
   }

  ngOnInit(): void {
    this.editProfile = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [null]
    })
  }



  getInfoDetail(id){
    this.profileService.getDataById(id).subscribe(
      data  => {
          this.editProfile.controls['id'].setValue(data['id']);
          this.editProfile.controls['firstName'].setValue(data['first_name']);
          this.editProfile.controls['lastName'].setValue(data['last_name']);
          this.editProfile.controls['email'].setValue(data['email']);
         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  updateObject(data){
    this.profileService.updateAdmin(data);
  }

}

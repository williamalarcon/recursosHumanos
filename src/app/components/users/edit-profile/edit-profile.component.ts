import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { ProfileService } from '../../../shared/httpClient/profile.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { ToastrService } from 'ngx-toastr';
import { DivisionsService } from '../../../shared/httpClient/divisions.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public myProfile: FormGroup;
  public editProfile: FormGroup;
  divisions = [];
  titles = [];
  sub;
  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              private __divisionsService: DivisionsService,
              private __titlesService: TitlesService,
              public toaster: ToastrService,
              private profileService: ProfileService) {
                this.getDivisions(data => {this.divisions = data;});
                this.getTitles(data => {this.titles = data;});
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
      email: ['', [Validators.required, Validators.email]],
      division: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      companyMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      password: ['']
    })
  }

  getCargos(dataComp){
    this.chargesService.sentGetAllCharges().subscribe(data  => {dataComp(data);});   
  }


  getInfoDetail(id){
    this.profileService.getDataById(id).subscribe(
      data  => {
          this.editProfile.controls['id'].setValue(data['id']);
          this.editProfile.controls['firstName'].setValue(data['first_name']);
          this.editProfile.controls['lastName'].setValue(data['last_name']);
          this.editProfile.controls['title'].setValue(data['title']);
          this.editProfile.controls['companyMobile'].setValue(data['company_mobile']);
          this.editProfile.controls['division'].setValue(data['division']);
          this.editProfile.controls['email'].setValue(data['email']);
         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  getDivisions(dataComp){
    this.__divisionsService.getAllData().subscribe(data  => { dataComp(data);});   
  }

  getTitles(dataComp){
    this.__titlesService.getAllData().subscribe(data  => {  dataComp(data);});   
  }


  updateInfo(data){
    this.profileService.updateUser(data);
  }

  get f() { return this.editProfile.controls; }

}

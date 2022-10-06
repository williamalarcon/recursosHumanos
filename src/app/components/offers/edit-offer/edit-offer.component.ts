import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { OffersService } from '../../../shared/httpClient/offers.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {
  public myProfile: FormGroup;
  public editProfile: FormGroup;
  listCategories = [];
  sub;
  submitted = false;


  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              public toaster: ToastrService,
              private __offerService: OffersService,
              private __categoriesService: CategoriesService) {
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.getInfoDetail(params.id);
                });
   }

  ngOnInit(): void {
    this.editProfile = this.fb.group({
      id: [''],
      jobCategory: ['', [Validators.required]],
      employer: ['', []],
      jobTitle: ['', [Validators.required]],
      jobLocation: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobPaying: ['', [Validators.required]],
      jobTime: ['', [Validators.required]],
      JobAdderLink: ['', []],
      jobDescription: ['', [Validators.required]],
      skills: ['', []],
      about: ['', []],
      questions: ['', []]
    });
    this.getCategories(data => {this.listCategories = data;});
  }



  getInfoDetail(id){
    this.__offerService.getDataById(id).subscribe(
      data  => {
          this.editProfile.controls['id'].setValue(data['id']);
          this.editProfile.controls['jobCategory'].setValue(data['jobCategory']);
          this.editProfile.controls['employer'].setValue(data['employer']);
          this.editProfile.controls['jobTitle'].setValue(data['jobTitle']);
          this.editProfile.controls['jobLocation'].setValue(data['jobLocation']);
          this.editProfile.controls['jobType'].setValue(data['jobType']);
          this.editProfile.controls['jobPaying'].setValue(data['jobPaying']);
          this.editProfile.controls['jobTime'].setValue(data['JobTime']);
          this.editProfile.controls['JobAdderLink'].setValue(data['jobAdderLink']);
          this.editProfile.controls['jobDescription'].setValue(data['jobDescription']);
          this.editProfile.controls['skills'].setValue(data['skills']);
          this.editProfile.controls['about'].setValue(data['about']);
          this.editProfile.controls['questions'].setValue(data['questions']);

         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  updateObject(data){
    this.__offerService.updateObject(data);
  }

  getCategories(dataComp){
    this.__categoriesService.getAllData().subscribe(data => {
        dataComp(data);
    })
  }

  get f() { return this.editProfile.controls; }

}

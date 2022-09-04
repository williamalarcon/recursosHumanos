import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { OffersService } from '../../../shared/httpClient/offers.service';


@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  public myProfile: FormGroup;
  public createObject: FormGroup;
  listCategories = [];
  submitted = false;
  

  constructor(private fb: FormBuilder, 
              private __categoriesService: CategoriesService,
              private __offersService: OffersService,
              ) { 
  }

  ngOnInit(): void {
    this.createObject = this.fb.group({
      jobCategory: ['', [Validators.required]],
      employer: ['', []],
      jobTitle: ['', [Validators.required]],
      jobLocation: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobPaying: ['', [Validators.required]],
      jobTime: ['', [Validators.required]],
      JobAdderLink: ['', []],
      jobVacancy: ['', []],
      jobDescription: ['', [Validators.required]],
      skills: ['', []],
      about: ['', []],
      questions: ['', []],
      publish: ['', [Validators.required]]

    });

    this.getCategories(data => {this.listCategories = data;});
  }


  
  getCategories(dataComp){
    this.__categoriesService.getAllData().subscribe(data => {
        dataComp(data);
    })
  }


  cProfile(data){
    this.__offersService.createObject(data);
  }


  get f() { return this.createObject.controls; }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { ProviderService } from '../../../shared/httpClient/provider.service';
import { ConsultantsService } from '../../../shared/httpClient/consultants.service';
import { CandidatesService } from '../../../shared/httpClient/candidates.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';
import { removeSpaces} from '../../../shared/validators/removeSpaces';
import { Observable } from 'rxjs';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {
  public mySubject: FormGroup;
  public createSubject: FormGroup;
  public modelD: NgbDateStruct;
  public industryInterest = [];
  public listProviders = [];
  public listConsultants = [];
  public providerSelected = null;
  public consultantSelected = null;
  public acceptTerms = false;
  public titles = [];
  public cv;
  public pt;

  submitted = false;
  constructor(private fb: FormBuilder, 
              private __categoriesService: CategoriesService,
              private __consultantsService: ConsultantsService,
              private __ProviderService: ProviderService,
              private toaster: ToastrService,
              private __titlesService: TitlesService,
              private __candidatesService: CandidatesService,
              private subjectsService: SubjectsService) { 

  }

  ngOnInit(): void {
    this.createSubject = this.fb.group({
      candidateFirstName: ['',[Validators.required]],
      candidateLastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      unit: ['', []],
      suburb: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required, Validators.maxLength(4)]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      candidateProfile: ['', [Validators.required]],
      otherProfile: ['', []],
      industryInterest: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      providerRegion: ['',],
      providerSiteLocation: ['',],
      consultantTitle: ['',],
      consultant: ['', [Validators.required]],
      cv: ['', []],
      presentationLetter: ['', []],


   

    });

    this.getCategories(data => {this.industryInterest = data;});
    this.getProviders(data => { this.listProviders = data;});
    this.getTitles(data => {this.titles = data;});
  }


  getTitles(dataComp){
    this.__titlesService.getAllData().subscribe(data  => {  dataComp(data);});   
  }



  getCategories(dataComp){
    this.__categoriesService.getAllData().subscribe(data => {
        dataComp(data);
    })
  }

  getProviders(dataComp){
    this.__ProviderService.getAllData().subscribe(data => {
        dataComp(data);
    })
  }
  
  checked(value): void {
    this.acceptTerms = value;
    
  }


  selectCV(event): void {
    this.cv = event.target.files;
  }

  selectPT(event): void {
    this.pt = event.target.files;
  }



  cSubject(data){
    this.submitted = true;
    if (this.createSubject.invalid) {
      return;
    }
    const formData = new  FormData();
    if(this.cv != undefined){
      formData.append('cv', this.cv[0]);
    }
    if(this.pt != undefined){
      formData.append('pt', this.pt[0]);
    }
    
    formData.append("data",JSON.stringify(data));
    this.__candidatesService.createObject(formData);
  }


  selectProvider(data){
    this.providerSelected = data.target.value;
    this.__ProviderService.getDataById(this.providerSelected).subscribe(result => {
      this.createSubject.controls['providerRegion'].setValue(result['providerRegion']);
      this.createSubject.controls['providerSiteLocation'].setValue(result['providerSite']);
    })
    this.getConsultants(data => {
      this.listConsultants = [...data];  
    });  

  }

  getConsultants(dataComp){
    this.__consultantsService.getAllData(this.providerSelected).subscribe(results => {
      dataComp(results);
      this.listConsultants.sort(function(obj1, obj2) {
        return obj2.f - obj1.f;
      });

    })
  }


  selectConsultant(data){
    this.__consultantsService.getDataById(data.target.value).subscribe(result => {
      this.createSubject.controls['consultantTitle'].setValue(result['title_name']);
    })
  }

  get f() { return this.createSubject.controls; }
}

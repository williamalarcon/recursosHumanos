import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { ProviderService } from '../../../shared/httpClient/provider.service';
import { ConsultantsService } from '../../../shared/httpClient/consultants.service';
import { CandidatesService } from '../../../shared/httpClient/candidates.service';
import { TypeguidesService } from '../../../shared/httpClient/typeguides/typeguides.service';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from "rxjs/operators"; 

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.scss']
})
export class EditCandidateComponent implements OnInit {
  public myProfile: FormGroup;
  public editObject: FormGroup;
  sub;
  submitted = false;
  public modelD: NgbDateStruct;
  public industryInterest = [];
  public listProviders = [];
  public listConsultants = [];
  public titles = [];
  public providerSelected = null;
  public consultantSelected = null;
  public acceptTerms = false;
  public visibleCV = null;
  public visiblePT = null;
  public cv;
  public pt;


  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              public toaster: ToastrService,
              private __titlesService: TitlesService,
              private __categoriesService: CategoriesService,
              private __candidatesService: CandidatesService,
              private __consultantsService: ConsultantsService,
              private __ProviderService: ProviderService,
              private typeguidesService: TypeguidesService,
              private subjectsService: SubjectsService) {
                          
              this.getCategories(data => {this.industryInterest = data;});
              this.getProviders(data => { this.listProviders = data;});
              this.getTitles(data => {this.titles = data;});
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.getInfoDetail(params.id);
                });
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

  
  getTitles(dataComp){
    this.__titlesService.getAllData().subscribe(data  => {  dataComp(data);});   
  }

  
  selectProvider(data){
    this.providerSelected = (data.target)? data.target.value: data;
    this.__ProviderService.getDataById(this.providerSelected).subscribe(result => {
      this.editObject.controls['providerRegion'].setValue(result['providerRegion']);
      this.editObject.controls['providerSiteLocation'].setValue(result['providerSite']);
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
    this.consultantSelected = (data.target)? data.target.value: data;
    this.__consultantsService.getDataById(this.consultantSelected).subscribe(result => {
      this.editObject.controls['consultantTitle'].setValue(result['title_name']);
    })
  }

    
  selectProfile(data){
    if(data.target.value == 'Other'){
      this.editObject.controls['otherProfile'].setValidators([Validators.required]);
      this.editObject.controls['otherProfile'].updateValueAndValidity();
    }else {
      this.editObject.controls['otherProfile'].setValidators([]);
      this.editObject.controls['otherProfile'].updateValueAndValidity();
    }
    
  }



  ngOnInit(): void {
    this.editObject = this.fb.group({
      id: [''],
      candidateFirstName: ['',[Validators.required]],
      candidateLastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      unit: ['', []],
      suburb: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
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
    })
  }

  get f() { return this.editObject.controls; }

  checked(value): void {
    this.acceptTerms = value;
  }

  openFile(file){
    if(file == "cv"){
      window.open("analisysrh.nuvoll.com/api/private/files/cv/"+this.visibleCV, "_blank");
    }else if(file = "pt"){
      window.open("analisysrh.nuvoll.com/api/private/files/pt/"+this.visibleCV, "_blank");
    }
  }

  getInfoDetail(id){
    this.__candidatesService.getDataById(id).subscribe(
      data  => {
            this.editObject.controls['id'].setValue(data['id']);
            this.editObject.controls['candidateFirstName'].setValue(data['first_name']);
            this.editObject.controls['candidateLastName'].setValue(data['last_name']);
            this.editObject.controls['address'].setValue(data['address']);
            this.editObject.controls['unit'].setValue(data['unit']);
            this.editObject.controls['suburb'].setValue(data['suburb']);
            this.editObject.controls['state'].setValue(data['state']);
            this.editObject.controls['postcode'].setValue(data['postcode']);
            this.editObject.controls['email'].setValue(data['email']);
            this.editObject.controls['gender'].setValue(data['gender']);
            this.editObject.controls['mobile'].setValue(data['mobile']);
            this.editObject.controls['candidateProfile'].setValue(data['candidateProfile']);
            this.editObject.controls['otherProfile'].setValue(data['otherProfile']);
            this.editObject.controls['provider'].setValue(data['provider']);
            this.editObject.controls['providerRegion'].setValue(data['providerRegion']);
            this.editObject.controls['providerSiteLocation'].setValue(data['providerSiteLocation']);
          
            let date = new Date(data['dateofbirth']);
            this.editObject.controls['dateOfBirth'].setValue({year:date.getFullYear(),month:date.getMonth()+1,day:date.getUTCDate()});
            
            this.visiblePT = (data['pt']== null)?false: data['pt'];
            this.visibleCV = (data['cv']== null)?false: data['cv'];

            this.providerSelected =  data['provider'];
            this.getConsultants(data => {
              this.listConsultants = [...data];  
            });
            
            this.editObject.controls['consultant'].setValue(data['consultant']);
            this.selectConsultant(data['consultant'])

            this.__ProviderService.getDataById(data['provider']).subscribe(result => {
              this.editObject.controls['providerRegion'].setValue(result['providerRegion']);
              this.editObject.controls['providerSiteLocation'].setValue(result['providerSite']);
            });

            this.__candidatesService.getCandidates(id).subscribe(result => {
              Object.keys(result).map((key) => {
                this.editObject.controls['industryInterest'].setValue([...this.editObject.controls['industryInterest'].value,result[key]['id_categorie']]);
              });
            });

         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  
  selectCV(event): void {
    this.cv = event.target.files;
  }

  selectPT(event): void {
    this.pt = event.target.files;
  }

  eSubject(data){
    this.submitted = true;
    if (this.editObject.invalid) {
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
    this.__candidatesService.updateObject(formData);
  }

  


}

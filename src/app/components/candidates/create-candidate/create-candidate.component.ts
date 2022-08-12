import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { TypeguidesService } from '../../../shared/httpClient/typeguides/typeguides.service';
import { removeSpaces} from '../../../shared/validators/removeSpaces';
import { Observable } from 'rxjs';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {
  public mySubject: FormGroup;
  public createSubject: FormGroup;
  public modelD: NgbDateStruct;
  industryInterest = [];
  typeGuides = [];
  clasificacion = null;
  submitted = false;

  constructor(private fb: FormBuilder, 
              private __categoriesService: CategoriesService,
              private typeguidesService: TypeguidesService,
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
      postcode: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      candidateProfile: ['', [Validators.required]],
      otherProfile: ['', [Validators.required]],
      industryInterest: ['', [Validators.required]],
      termins: ['', [Validators.required]],
      cv: ['', [Validators.required]],
      presentationLetter: ['', [Validators.required]],
    })
  }


  getCategories(dataComp){
    this.__categoriesService.getAllData().subscribe(result => {

      console.log(result);
      /*result.map(item => {
        if(item.active =  1){
          this.industryInterest.push(item.name)
        }
      })*/
    })
  }



  cSubject(data){
    this.submitted = true;
    if (this.createSubject.invalid) {
      return;
    }

    this.subjectsService.sendCreateRequest(data);
  }

  selectClasificacion(data){
    this.clasificacion = data;
    if(this.clasificacion != 2){
      this.createSubject.controls['tipoGuia'].setValue("");
    }
  }

  get f() { return this.createSubject.controls; }
}

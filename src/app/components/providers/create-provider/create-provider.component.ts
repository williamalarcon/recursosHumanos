import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { AreaService } from '../../../shared/httpClient/areas/area.service';
import { TypeguidesService } from '../../../shared/httpClient/typeguides/typeguides.service';
import { removeSpaces} from '../../../shared/validators/removeSpaces';


@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {
  public mySubject: FormGroup;
  public createSubject: FormGroup;
  areas = [];
  typeGuides = [];
  clasificacion = null;
  submitted = false;

  constructor(private fb: FormBuilder, 
              private areaService: AreaService,
              private typeguidesService: TypeguidesService,
              private subjectsService: SubjectsService) { 
    this.getAreas(data => {this.areas = data;});
    this.getTypeGuides(data => {this.typeGuides = data;});

  }

  ngOnInit(): void {
    this.createSubject = this.fb.group({
      providerCompany: ['',[Validators.required]],
      abn: ['', [Validators.required]],
      address: ['', [Validators.required]],
      unit: ['', []],
      suburb: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      providerRegion: ['', [Validators.required]],
      providerSite: ['', [Validators.required]],
      providerConsultantFirstName: ['', [Validators.required]],
      providerConsultantLastName: ['', [Validators.required]],
      providerConsultantTitle: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })
  }


  getAreas(dataComp){
    this.areaService.sentGetAllAreas().subscribe(data  => {dataComp(data);});   
  }

  getTypeGuides(dataComp){
    this.typeguidesService.getListTipos().subscribe(data  => {dataComp(data);});   
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

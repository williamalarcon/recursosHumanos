import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { AreaService } from '../../../shared/httpClient/areas/area.service';
import { TypeguidesService } from '../../../shared/httpClient/typeguides/typeguides.service';
import { removeSpaces} from '../../../shared/validators/removeSpaces';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  public myProfile: FormGroup;
  public editSubject: FormGroup;
  sub;
  submitted = false;
  clasificacion = null;
  typeGuides = [];
  areas = [];

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              public toaster: ToastrService,
              private areaService: AreaService,
              private typeguidesService: TypeguidesService,
              private subjectsService: SubjectsService) {
                this.getAreas(data => {this.areas = data;});
                this.getTypeGuides(data => {this.typeGuides = data;});
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.getInfoDetail(params.id);
                });
   }

  ngOnInit(): void {
    this.editSubject = this.fb.group({
      id: [''],
      area: ['',[Validators.required]],
      nombre: ['', [Validators.required, removeSpaces]],
      descripcion: ['',[Validators.required, removeSpaces]],
      tipoGuia: [''],
      clasificacion: ['', [Validators.required]]
    })
  }

  get f() { return this.editSubject.controls; }

  
  getAreas(dataComp){
    this.areaService.sentGetAllAreas().subscribe(data  => {dataComp(data);});   
  }

  getTypeGuides(dataComp){
    this.typeguidesService.getListTipos().subscribe(data  => {dataComp(data);});   
  }

  getInfoDetail(id){
    this.subjectsService.sendGetInfoRequest(id).subscribe(
      data  => {
          this.editSubject.controls['id'].setValue(data['id']);
          this.editSubject.controls['area'].setValue(data['id_area']);
          this.editSubject.controls['nombre'].setValue(data['nombre']);
          this.editSubject.controls['descripcion'].setValue(data['descripcion']);
          this.editSubject.controls['tipoGuia'].setValue(data['tipoGuia']);
          this.editSubject.controls['clasificacion'].setValue(data['clasificacion']);
          this.clasificacion = data['clasificacion'];
          
         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  eSubject(data){
    this.submitted = true;
    if (this.editSubject.invalid) {
      return;
    }
    this.subjectsService.sendUpdateRequest(data);
  }

  
  selectClasificacion(data){
    this.clasificacion = data;
    if(this.clasificacion != 2){
      this.editSubject.controls['tipoGuia'].setValue("");
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  public myProfile: FormGroup;
  public editProfile: FormGroup;
  cargos = [];
  sub;
  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              public toaster: ToastrService,
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
      name: ['', [Validators.required]],
    })
  }



  getInfoDetail(id){
    this.__categoriesService.getDataById(id).subscribe(
      data  => {
          this.editProfile.controls['id'].setValue(data['id']);
          this.editProfile.controls['name'].setValue(data['name']);
         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  updateObject(data){
    this.__categoriesService.updateObject(data);
  }

}

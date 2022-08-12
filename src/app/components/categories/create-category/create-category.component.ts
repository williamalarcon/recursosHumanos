import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { DivisionsService } from '../../../shared/httpClient/divisions.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public myProfile: FormGroup;
  public createProfile: FormGroup;
  divisions = [];
  titles = [];
  

  constructor(private fb: FormBuilder, 
              private __categoriesService: CategoriesService
              ) { 
  }

  ngOnInit(): void {
    this.createProfile = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  cProfile(data){
    this.__categoriesService.createObject(data);
  }

}

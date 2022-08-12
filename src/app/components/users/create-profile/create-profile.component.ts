import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../shared/httpClient/profile.service';
import { DivisionsService } from '../../../shared/httpClient/divisions.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  public myProfile: FormGroup;
  public createProfile: FormGroup;
  divisions = [];
  titles = [];
  

  constructor(private fb: FormBuilder, 
              private profileService: ProfileService,
              private __divisionsService: DivisionsService,
              private __titlesService: TitlesService,
              ) { 
    this.getDivisions(data => {this.divisions = data;});
    this.getTitles(data => {this.titles = data;});
  }

  ngOnInit(): void {
    this.createProfile = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      division: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      title: ['', [Validators.required]],
      companyMobile: ['', [Validators.required]],
    });
  }

  
  getDivisions(dataComp){
    this.__divisionsService.getAllData().subscribe(data  => { dataComp(data);});   
  }

  getTitles(dataComp){
    this.__titlesService.getAllData().subscribe(data  => {  dataComp(data);});   
  }

  cProfile(data){
    let random =  (Math.random() + 1).toString(36).substring(8);
    this.profileService.sendCreateRequest(data, random);
  }

}

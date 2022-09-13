import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { ProfileService } from '../../../shared/httpClient/profile.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { MustMatch } from 'src/app/shared/validators/passwordMatch';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  public myProfile: FormGroup;
  public setPassword: FormGroup;
  public acceptTerms = false;
  private userId =  null;
  sub;
  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              public toaster: ToastrService,
              private profileService: ProfileService) {
   }

  ngOnInit(): void {
    this.setPassword = this.fb.group({
      id: [''],
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
      
    },
    {
      validator: MustMatch('password', 'cnfPassword')
    })
  }

    
  checked(value): void {
    this.acceptTerms = value;
    
  }



  updateObject(data){
    this.profileService.setPassword(data);
  }

}

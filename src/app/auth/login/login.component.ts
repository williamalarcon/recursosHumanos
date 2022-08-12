import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../../shared/httpClient/data.service';
import { StorageService } from "../../shared/services/storage.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


type UserFields = 'user' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  public username: string;
  public password: string;

  

  public newUser = false;
  public signup: boolean;
  public user: firebase.User;
  public loginForm: FormGroup;
  public registraionForm: FormGroup;

  public formErrors: FormErrors = {
    'user': '',
    'password': '',
  };

  public errorMessage: any;

  constructor(private dataService: DataService, 
              private fb: FormBuilder,
              public router: Router, 
              public toaster: ToastrService,
              private storageService: StorageService,
              private route: ActivatedRoute) {

      
      this.registraionForm = this.fb.group({
        // mobileNumber: [null, [Validators.required]]
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
      this.loginForm = fb.group({
        user: ['', [Validators.required]],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  public toggle() {
    this.signup = !this.signup;
  }

  // Login With Google
  loginGoogle() {
    
  }

  // Login With Twitter
  loginTwitter(): void {
    
  }

  // Login With Facebook
  loginFacebook() {
    
  }


  correctLogin(data){
    this.storageService.setCurrentSession(data);
    this.router.navigateByUrl('/dashboard/default');
  }


  // Simple Login
  login(l) {
    this.dataService.sendLoginRequest(this.loginForm.value['user'], this.loginForm.value['password']).subscribe(
      data => this.correctLogin(data),
      error => this.toaster.error(error.error.message)
    );
  }

}

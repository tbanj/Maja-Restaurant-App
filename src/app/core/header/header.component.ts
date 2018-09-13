import { Subscription } from 'rxjs/internal/Subscription';
import { ModalComponent } from 'angular-custom-modal';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

        // showDropdown: boolean =false;
loginSubscription: Subscription;
signupSubscription: Subscription;

// @ViewChild('completeModal') completeModal: ElementRef;
@ViewChild('completeModal') modal: ModalComponent;

    showDropdown = false;
    shoppingDisable = false;
    buttondisabled = false;
    mm: string;

    @ViewChild('f') loginForm: NgForm ;
    nameUser = false;
    nameUserText = '';
    nameUserSuccess = false;
    nameUserTextSuccess = '';

    @ViewChild('s') signupForm: NgForm ;
    commentSuccessSignup = false;
    commentSuccesssignupcheck =  '' ;
    commentSignup = false;
    commentsignupcheck =  '' ;


    ngOnInit() {

        // signin
        this.loginSubscription = this.authService.errorMessageSignin.subscribe(
            (signCheck: string) => {
                this.commentSuccessSignup = false;
                this.commentSignup = false;
              if (signCheck === 'auth/wrong-password') {
                this.nameUser = true;
                this.nameUserText = 'incorrect email or password inputted';

            } if ( signCheck === 'correct') {

                this.nameUserSuccess = true;
              this.nameUserTextSuccess = 'Login successful';
              this.loginForm.resetForm();
            }
            }
          );


          // signup
          this.signupSubscription = this.authService.errorMessageRegister.subscribe(
            (signUpCheck: string) => {                // this.nameUserSuccess = false;
              if (signUpCheck === 'error') {

                // this.commentSignup = true;
                this.commentSignup = true;
                this.commentsignupcheck = 'This email has been made use by another user';
            }
            if (signUpCheck === 'success') {
                this.commentSuccessSignup = true;
              this.commentSuccesssignupcheck = 'Account created successfully, click the login button ';
              console.log(this.commentSuccesssignupcheck);
              this.signupForm.resetForm();
            }
            }

          );

    }

// @Output() featureSelected = new EventEmitter<string>();
    constructor(private datastorage: DataStorageService, public authService: AuthService,
    public router: Router) {

     }




    // toggleDropdown() {
    //     this.showDropdown = this.showDropdown;
    // }
    // onSelect(feature: string) {
    //    this.featureSelected.emit(feature);
    // }

    onSaveData() {
        this.datastorage.storeRecipes()
        .subscribe(
            (response: Response) => {
            console.log(response);
        },
        (error) => {console.log(error); }
    // , (error) => {console.log(error); }
         );
    }




    // }

    onSignIn (form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signinUser(email, password);
        console.log(email + password);


        // this.loginComment = this.authService.errordisp();
      }

    // we have already initialize the observable at
    onFetchData() {
        this.datastorage.getRecipes();
    }

    onLogout () {
        this.mm = 'work';
        this.buttondisabled = true;
        this.authService.logout();
        this.authService.isNotAuthenticated();
        alert('logout successful');
    }


    onSignUp(form: NgForm) {

        const email = form.value.email;
        const password = form.value.passwordRegister;
        console.log(email + password);
        this.authService.signupUser(email, password);


      }

    isDisabled(countLink: number) {

    }
    ngOnDestroy() {
       this.signupSubscription.unsubscribe();
       this.loginSubscription.unsubscribe();
    }
}

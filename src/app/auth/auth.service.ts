import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    token: string;


    // is use to send comment to the user
    userActivated = new Subject;
    errorMessageRegister = new Subject;
    errorMessageSignin = new Subject;

    constructor(private router: Router) {

    }

    signupUser (email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(

            (response) => { console.log(response);
                this.router.navigate(['/']);
                this.errorMessageRegister.next('success');

        }
        )
        .catch(
            (error: any) => { console.log(error);

            this.errorMessageRegister.next('error');

                }
        );


    }
    // (token: string) => {
    //     this.token = token;
    //     this.errorMessageT.next('correct');
    // }
    signinUser (email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            (response) => { console.log(response);
                this.router.navigate(['/']);
                this.errorMessageSignin.next('correct');
            firebase.auth().currentUser.getIdToken()
            .then( (token: string) => { this.token = token; } );
        }
            // this.errorMessage = 'registration successful'; }
        ).catch(
            (error: any) => { console.log(error);
               //
                this.errorMessageSignin.next('auth/wrong-password');

                console.log('auth failed'); }
        );

    }

    // is use store token sent from firebase
    getToken() {
         firebase.auth().currentUser.getIdToken()
        .then( (token: string) => { this.token = token; } );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
    isNotAuthenticated() {
        return this.token = null;
    }

    logout() {
        firebase.auth().signOut();
    }
}


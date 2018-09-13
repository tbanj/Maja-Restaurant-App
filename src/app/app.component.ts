import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe' ;
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCVeqDaMFAqPlBhk1V0XgF_De71GeYAYEs',
    authDomain: 'ng-recipe-maja-36cda.firebaseapp.com'
    });
  }



    // onNavigate(feature: string) {
    //     this.loadedFeature = feature ;

    // }
}

// to use firebase it have to be configured at app component since
// that is the starting point & components of all other components




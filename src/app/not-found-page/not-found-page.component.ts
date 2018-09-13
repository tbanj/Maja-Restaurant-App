import { ActivatedRoute, Params, Data } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit, OnDestroy {

  dataSubscription: Subscription;
  errorMessage;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // .data is use to subscribe & data from routing path
    // .params is use to subscribe & extract url & data on that url page
    this.dataSubscription = this.activatedRoute.data.subscribe((data: Data) => {
      this.errorMessage = data['message'];
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}

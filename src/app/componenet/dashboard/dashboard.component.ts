import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  @Input()
  totalConfirmed;
  @Input()
  totalDeaths;
  @Input()
  totalRecovered;
  @Input()
  totalActive;
  ngOnInit(): void {
  }

}

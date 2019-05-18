import { Component, OnInit } from '@angular/core';
import { Lease } from '../Lease';

@Component({
  selector: 'app-leases-list',
  templateUrl: './leases-list.component.html',
  styleUrls: ['./leases-list.component.css']
})
export class LeasesListComponent implements OnInit {
  leases: Lease[];
  constructor() { }

  ngOnInit() {
  }

  //TODO: HTTP REQUEST FOR USER LEASES

}

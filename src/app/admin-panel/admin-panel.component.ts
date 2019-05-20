import { Component, OnInit } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  leases:Lease[];
  constructor(private service:LeaseService) { }

  ngOnInit() {
      this.service.getAllLeases().subscribe(l=>this.leases=l)
  }

}

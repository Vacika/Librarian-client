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
  currentDate:Date;
  constructor(private service:LeaseService) {
      this.currentDate=new Date();
   }

  ngOnInit() {
      this.service.getAllLeases().subscribe(l=>this.leases=l)

  }
  isExpired(l:Lease):boolean{
      return this.currentDate.getTime() > Date.parse(l.due_time);
  }

}

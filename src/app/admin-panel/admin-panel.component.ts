import { Component, OnInit } from '@angular/core';
import { Lease } from '../Lease';
import { LeaseService } from '../lease.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    currentDate=new Date();

    constructor() { }

    ngOnInit() {
    }


}

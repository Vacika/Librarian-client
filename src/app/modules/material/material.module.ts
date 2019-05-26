import { NgModule } from '@angular/core';
import {
    MatFormFieldModule, MatProgressBarModule, MatCardModule,
    MatButtonModule, MatInputModule, MatToolbarModule, MatTableModule,
    MatDialogModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule,
    MatCheckboxModule, MatTooltipModule, MatPaginatorModule
} from '@angular/material';

const components = [
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule
];

@NgModule({
    imports: [components],
    exports: [components]
})
export class MaterialModule { }

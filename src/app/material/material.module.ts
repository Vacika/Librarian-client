import { NgModule } from '@angular/core';
import {
    MatFormFieldModule, MatProgressBarModule, MatCardModule,
    MatButtonModule, MatInputModule, MatToolbarModule, MatTableModule,
    MatDialogModule,MatCheckbox, MatCheckboxModule
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
    MatCheckboxModule
];

@NgModule({
    imports: [components],
    exports: [components]
})
export class MaterialModule { }

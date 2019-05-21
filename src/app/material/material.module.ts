import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatProgressBarModule, MatCardModule, MatButtonModule, MatInputModule, MatToolbarModule, MatTableModule } from '@angular/material';

const components = [
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule
];

@NgModule({
  imports: [components],
  exports: [components]
})
export class MaterialModule { }

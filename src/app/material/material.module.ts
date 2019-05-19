import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatProgressBarModule, MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';

const components = [
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
];

@NgModule({
  imports: [components],
  exports: [components]
})
export class MaterialModule { }

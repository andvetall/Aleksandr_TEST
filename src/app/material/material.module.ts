import { NgModule } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule
  ]
})

export class MaterialModule {}

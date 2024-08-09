import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
//* you must add angular modules in imports and exports

const CUSTOM_MODULES = [
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [...CUSTOM_MODULES],
  exports: [...CUSTOM_MODULES],
})
export class MaterialModule {}

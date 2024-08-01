import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

//* you must add angular modules in imports and exports

@NgModule({
  declarations: [],
  imports: [MatGridListModule, MatButtonModule, MatCardModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule],
})
export class MaterialModule {}

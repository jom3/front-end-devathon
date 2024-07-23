import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

//* you must add angular modules in imports and exports

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
  ],
  exports:[
    MatButtonModule,
  ]
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [],
  imports: [MaterialModule],
  exports:[MaterialModule]
})
export class SharedModule {}

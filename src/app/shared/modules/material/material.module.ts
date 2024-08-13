import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

//* you must add angular modules in imports and exports
@NgModule({
  declarations: [],
  imports: [MatGridListModule, MatButtonModule, MatCardModule, MatSidenavModule, MatDialogModule, MatIconModule],
  exports: [MatGridListModule, MatButtonModule, MatCardModule, MatSidenavModule, MatDialogModule, MatIconModule],
})
export class MaterialModule {}

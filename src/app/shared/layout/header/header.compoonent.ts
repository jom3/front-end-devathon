import { Component } from "@angular/core";
import { SharedModule } from "../../shared.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class HeaderComponent { }

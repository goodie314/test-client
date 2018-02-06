import {NgModule} from "@angular/core";
import {DisplayInfoComponent} from "./display-info.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [DisplayInfoComponent],
  providers: [],
  declarations: [DisplayInfoComponent]
})

export class DisplayInfoModule {
}

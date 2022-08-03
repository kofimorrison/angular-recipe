import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  imports: [SharedModule, FormsModule, AuthRoutingModule],
  exports: [AuthComponent],
  declarations: [AuthComponent],
})
export class AuthModule {}

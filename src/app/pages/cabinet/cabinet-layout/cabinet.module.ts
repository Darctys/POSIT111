import { NgModule } from '@angular/core';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {IconsProviderModule} from "../../../icons-provider.module";
import {StudentsListComponent} from "../students-list/students-list.component";
import {OffersListModule} from "../offers-list/offers-list.module";
import {StudentsListModule} from "../students-list/students-list.module";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {StudentsDetailModule} from "../../student-detail/students-detail.module";
import {FormsListModule} from "../forms-list/forms-list.module";
import {FormsCreateModule} from "../form-create/forms-create.module";

@NgModule({
  imports: [
    CabinetRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    OffersListModule,
    StudentsListModule,
    CommonModule,
    StudentsDetailModule,
    FormsListModule,
    FormsCreateModule
  ],
  declarations: [
    CabinetComponent,
  ],
  exports: [CabinetComponent]
})
export class CabinetModule { }

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
import {FacesPosModule} from "../faces-pos/faces-pos.module";
import {FacesPosAddModule} from "../faces-pos/faces-pos-add/faces-pos-add.module";
import {FacesPosEditModule} from "../faces-pos/faces-pos-edit/faces-pos-edit.module";
import {FacesPosDetailModule} from "../faces-pos/faces-pos-detail/faces-pos-detail.module";
import {OffersAddModule} from "../offers-list/offers-add/offers-add.module";
import {OffersEditModule} from "../offers-list/offers-edit/offers-edit.module";

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
    FormsCreateModule,
    FacesPosModule,
    FacesPosAddModule,
    FacesPosEditModule,
    FacesPosDetailModule,
    OffersListModule,
    OffersAddModule,
    OffersEditModule
  ],
  declarations: [
    CabinetComponent,
  ],
  exports: [CabinetComponent]
})
export class CabinetModule { }

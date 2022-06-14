import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FacesPosAddComponent} from "./faces-pos-add.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  imports: [
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzUploadModule,
    NzIconModule,
  ],
  declarations: [FacesPosAddComponent],
  exports: [FacesPosAddComponent]
})
export class FacesPosAddModule { }

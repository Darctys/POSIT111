import { NgModule } from '@angular/core';
import { FacesPosComponent } from './faces-pos.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {FacesPosAddModule} from "./faces-pos-add/faces-pos-add.module";
import {FacesService} from "../services/faces.service";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SearchPipe} from "./pipes/search.pipe";

@NgModule({
  imports: [
    NzTableModule,
    CommonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    FacesPosAddModule,
    NzIconModule,
  ],
  declarations: [
    FacesPosComponent,
    SearchPipe,
  ],
  exports: [FacesPosComponent, SearchPipe],
  providers:[FacesService]
})
export class FacesPosModule { }

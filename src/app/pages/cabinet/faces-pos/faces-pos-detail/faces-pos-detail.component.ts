import { Component, OnInit } from '@angular/core';
import {FacesService} from "../../services/faces.service";
import {ActivatedRoute} from "@angular/router";
import {IFaceInterface} from "../../interfaces/face.interface";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FacesPosAddComponent} from "../faces-pos-add/faces-pos-add.component";
import {FacesPosEditComponent} from "../faces-pos-edit/faces-pos-edit.component";
import {FormBuilder} from "@angular/forms";
import {InstituteEnum} from "../../enums/institute.enum";

@Component({
  selector: 'faces-pos-detail',
  templateUrl: './faces-pos-detail.component.html',
  styleUrls: ['./faces-pos-detail.component.css']
})
export class FacesPosDetailComponent implements OnInit {

  public face!: IFaceInterface;
  public instituteEnum = InstituteEnum;

  constructor(
    private _facesService: FacesService,
    private _route: ActivatedRoute,
    private _modal:NzModalService,
    private _fb: FormBuilder,
  ) {}

  public ngOnInit() {
    const id: string = this._route.snapshot.queryParams['id']
    this.face = this._facesService.getFace(id);
  }

  public createEditFaceModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Изменить данные лица POS',
      nzContent: FacesPosEditComponent,
      nzComponentParams: {
        face: this.face,
      },
    });
  }
}

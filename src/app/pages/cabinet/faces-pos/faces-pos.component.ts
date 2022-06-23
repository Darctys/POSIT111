import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FacesPosAddComponent} from "./faces-pos-add/faces-pos-add.component"
import {FacesService} from "../services/faces.service";
import {IFaceInterface} from "../interfaces/face.interface";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {InstituteEnum} from "../enums/institute.enum";
import {RequestService} from "../services/request.service";
import {switchMap, tap} from "rxjs";
import {FacesPosEditComponent} from "./faces-pos-edit/faces-pos-edit.component";

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IFaceInterface> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IFaceInterface> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'face-pos',
  templateUrl: './faces-pos.component.html',
  styleUrls: ['./faces-pos.component.css']
})
export class FacesPosComponent implements OnInit {

  public searchValue = '';
  public instituteEnum = InstituteEnum;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Имя',
      sortOrder: null,
      sortFn: (a: IFaceInterface, b: IFaceInterface) => a.fullName.localeCompare(b.fullName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: this.facesService.filterList,
      filterFn: (list: string[], item: IFaceInterface) => list.some(fullName => item.fullName.indexOf(fullName) !== -1),
    },
    {
      name: 'Институт',
      sortOrder: null,
      sortFn: (a: IFaceInterface, b: IFaceInterface) => a.institute.localeCompare(b.institute),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: IFaceInterface) => list.some(institute => item.institute.indexOf(institute) !== -1),
      filterMultiple: true,
      listOfFilter: this.facesService.filterList,
    }
  ];

  constructor(
    private _router: Router,
    private _modal: NzModalService,
    public facesService: FacesService,
    private _requestService: RequestService
  ) {
    this._requestService.getAllFaces().subscribe(
      (data: any) => this.facesService.faceList = data
    )
  }

  ngOnInit() {
    console.log(this.facesService.instituteFilterList)
  }

  public navigateToFacePosDetail(id: number): void {
    this._router.navigateByUrl(`cabinet/faces-pos/?id=${id}`).then()
  }

  public mapPhoto(photo: string): string {
    return "data:image/png;base64,".concat(photo)
  }

  public deleteStudent(id: string): void {
    this._requestService.deleteFaceById(id).pipe(
      tap(() => this.facesService.deleteFace(id)),
      switchMap((data) => {
        return this._requestService.getAllFaces()
      })
    ).subscribe()
  }

  public createAddFaceModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить лицо POS',
      nzContent: FacesPosAddComponent
    });
  }

  public search(): void {
    this.facesService.faceList.filter((item: IFaceInterface) => item.fullName.indexOf(this.searchValue) !== -1);
  }

  public createEditFaceModal(id: string): void {
    const face = this.facesService.getFace(id)
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Изменить данные лица POS',
      nzContent: FacesPosEditComponent,
      nzComponentParams: {
        face: face,
      },
    });
  }
}

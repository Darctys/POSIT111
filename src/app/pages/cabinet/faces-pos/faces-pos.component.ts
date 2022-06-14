import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FacesPosAddComponent} from "./faces-pos-add/faces-pos-add.component"
import {FacesService} from "../services/faces.service";
import {IFaceInterface} from "../interfaces/face.interface";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {InstituteEnum} from "../enums/institute.enum";

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
      listOfFilter: this.facesService.instituteFilterList,
      filterFn: (list: string[], item: IFaceInterface) => list.some(fullName => item.fullName.indexOf(fullName) !== -1),
    },
    {
      name: 'Институт',
      sortOrder: null,
      sortFn: (a: IFaceInterface, b: IFaceInterface) => a.institute.localeCompare(b.institute),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: IFaceInterface) => list.some(institute => item.institute.indexOf(institute) !== -1),
      filterMultiple: true,
      listOfFilter: this.facesService.instituteFilterList,
    }
  ];

  constructor(
    private _router: Router,
    private _modal: NzModalService,
    public facesService: FacesService,
  ) {
    console.log(this.facesService.faceList)
  }

  ngOnInit() {
    console.log(this.facesService.instituteFilterList)
  }

  public navigateToFacePosDetail(id: number): void {
    this._router.navigateByUrl(`cabinet/faces-pos/?id=${id}`).then()
  }

  public deleteStudent(id: string): void {
    this.facesService.deleteFace(id);
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
}

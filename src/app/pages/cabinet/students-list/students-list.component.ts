import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {StudentAddComponent} from "./student-add/student-add.component";
import {StudentsService} from "../services/students.service";
import {IStudentInterface} from "../interfaces/student.interface";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {InstituteEnum} from "../enums/institute.enum";
import {RequestService} from "../services/request.service";
import {StudentEditComponent} from "./edit-student/edit-student.component";
import {from, switchMap, tap} from "rxjs";



interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IStudentInterface> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IStudentInterface> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-welcome',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnChanges {

  public searchValue = '';
  public instituteEnum = InstituteEnum;
  public students: IStudentInterface[] = []
  public filterList: NzTableFilterList = [];

  public listOfColumns: ColumnItem[] = [
    {
      name: 'Имя',
      sortOrder: null,
      sortFn: (a: IStudentInterface, b: IStudentInterface) => a.fullName.localeCompare(b.fullName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter:this.studentsService.filterList,
      filterFn: (list: string[], item: IStudentInterface) => list.some(fullName => item.fullName.indexOf(fullName) !== -1),
    },
    {
      name: 'Институт',
      sortOrder: null,
      sortFn: (a: IStudentInterface, b: IStudentInterface) => a.institute.localeCompare(b.institute),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: IStudentInterface) => list.some(institute => item.institute.indexOf(institute) !== -1),
      filterMultiple: true,
      listOfFilter: this.studentsService.filterList,
    },
  ];

  constructor(
   private _router: Router,
   private _modal: NzModalService,
   private _requestService: RequestService,
   public studentsService: StudentsService,

  ) {
      this._requestService.getAllStudents().subscribe(
        (data: any) => this.studentsService.studentList = data
      )
      this.studentsService.initFilterList()
      this.studentsService.instituteFilterList.subscribe((value) => {
          this.filterList = value
          console.log(this.filterList)
        }
      )
  }



  ngOnChanges(){

  }

  public navigateToStudentDetail(id: string): void {
    this._router.navigateByUrl(`cabinet/student/?id=${id}`).then()
  }

  public deleteStudent(id: string): void {
    this._requestService.deleteStudentById(id).pipe(
      tap(() => this.studentsService.deleteStudent(id)),
      switchMap((data) => {
          return this._requestService.getAllStudents()
      })
    ).subscribe()
  }

  public createAddStudentModal(): void {
    console.log(this.studentsService.studentList)
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить студента',
      nzContent: StudentAddComponent
    });
  }

  public createEditStudentModal(id: string): void {
    this._requestService.getStudentById(id).subscribe((student) => {
      const modal: NzModalRef = this._modal.create({
        nzTitle: 'Изменить данные студента',
        nzContent: StudentEditComponent,
        nzComponentParams: {
          student: student as IStudentInterface,
        },
      });
    })


  }

  public search(): void {
    this.studentsService.studentList.filter((item: IStudentInterface) => item.fullName.indexOf(this.searchValue) !== -1);
  }
}

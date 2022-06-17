import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentsService} from "../../services/students.service";
import {IStudentInterface} from "../../interfaces/student.interface";
import {RequestService} from "../../services/request.service";
import {switchMap, tap} from "rxjs";


@Component({
  selector: 'student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit{

  public validateForm!: FormGroup;

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _studentsService: StudentsService,
    private _requestService: RequestService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [null, [Validators.required]],
      institute: [null, [Validators.required]],
      isContract: [null, [Validators.required]],
      academicGroup: [null, [Validators.required]],
      posIdCard: [null, [Validators.required]],
      studentIdCard: [null, [Validators.required]],
      hasElectronicSignature: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  public confirm(): void {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      return
    }
    this._requestService.saveStudentById(this.toModel()).pipe(
      switchMap((value: any) => {
        this._studentsService.addStudent(value)
        return this._requestService.getAllStudents()
      }),
      tap(() =>
        this._modal.destroy()
      )
    ).subscribe()

    // this._studentsService.addStudent(this.toModel())

  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): IStudentInterface{
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.value.institute,
      isContract: this.validateForm.value.isContract === 'true',
      academicGroup: this.validateForm.value.academicGroup,
      email: this.validateForm.value.email,
      hasElectronicSignature: this.validateForm.value.hasElectronicSignature === 'true',
      phone: this.validateForm.value.phone,
      posIdCard: this.validateForm.value.posIdCard,
      studentIdCard: this.validateForm.value.studentIdCard,
      login: this.validateForm.value.login,
      password: this.validateForm.value.password
    }
  }
}

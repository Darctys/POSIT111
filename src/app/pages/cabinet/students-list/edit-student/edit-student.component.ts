import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentsService} from "../../services/students.service";
import {IStudentInterface} from "../../interfaces/student.interface";
import {RequestService} from "../../services/request.service";
import {switchMap, tap} from "rxjs";


@Component({
  selector: 'student-edit',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class StudentEditComponent implements OnInit{

  public validateForm!: FormGroup;
  public id!: string
  public student!: IStudentInterface

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _studentsService: StudentsService,
    private _requestService: RequestService,
  ) {

  }

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [this.student.fullName, [Validators.required]],
      institute: [this.student.institute, [Validators.required]],
      isContract: [String(this.student.isContract), [Validators.required]],
      academicGroup: [this.student.academicGroup, [Validators.required]],
      posIdCard: [this.student.posIdCard, [Validators.required]],
      studentIdCard: [this.student.studentIdCard, [Validators.required]],
      hasElectronicSignature: [String(this.student.hasElectronicSignature), [Validators.required]],
      phone: [this.student.phone, [Validators.required]],
      email: [this.student.email, [Validators.required]],
      login: [this.student.login, [Validators.required]],
      password: [this.student.password, [Validators.required]],
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
      tap(() => {
        this._studentsService.editStudent(this.toModel())
        this._modal.destroy();
      })
    ).subscribe()
  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): IStudentInterface{
    console.log(this.validateForm.value.isContract);
    console.log(this.validateForm.value.hasElectronicSignature)
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.value.institute,
      isContract: this.validateForm.value.isContract === 'true',
      academicGroup: this.validateForm.value.academicGroup,
      email: this.validateForm.value.email,
      hasElectronicSignature: this.validateForm.value.isContract === 'true',
      phone: this.validateForm.value.phone,
      posIdCard: this.validateForm.value.posIdCard,
      studentIdCard: this.validateForm.value.studentIdCard,
      id: this.student.id,
      password: this.validateForm.value.password,
      login: this.validateForm.value.login
    }
  }
}

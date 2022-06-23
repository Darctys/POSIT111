import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FacesService} from "../../services/faces.service";
import {IFaceInterface} from "../../interfaces/face.interface";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {switchMap, tap} from "rxjs";
import {RequestService} from "../../services/request.service";


@Component({
  selector: 'faces-pos-add',
  templateUrl: './faces-pos-add.component.html',
  styleUrls: ['./faces-pos-add.component.css']
})
export class FacesPosAddComponent implements OnInit{

  public validateForm!: FormGroup;
  public image: string = '';
  public fileList: NzUploadFile[] = [];

  public fd = new FormData();

  public beforeUpload = (file: NzUploadFile): boolean => {
    console.log(file)
    this.fileList = [file]
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (e) => this.image = e.target.result;
    reader.readAsDataURL(file as unknown as Blob);
    return false;
  };

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _facesService: FacesService,
    private _requestService: RequestService
  ) {}



  ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [null, [Validators.required]],
      institute: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      photo: [null],
      description: [null, [Validators.required]],
      vkLink: [null, [Validators.required]],
      tgLink: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  public OnFileSelected(event: any) {
    let image = event.target.files[0];
    const file: File = event.target.files[0].arrayBuffer().then((g: any) => {
      console.log(g)
      }
    )
    const reader = new FileReader();
    // @ts-ignore
    reader.onload = (e) => this.image = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.fd.append('image',event.target.files[0], event.target.files[0].name)
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
    // this._facesService.addFace(this.toModel())
    this._modal.destroy();
    this._requestService.saveFaceById(this.toModel()).pipe(
      switchMap((value: any) => {
        this._facesService.addFace(value)
        return this._requestService.getAllFaces()
      }),
      tap(() =>
        this._modal.destroy()
      )
    ).subscribe()

  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): IFaceInterface{
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.value.institute,
      birthday: this.validateForm.value.birthday,
      photo: this.image.split('base64,')[1],
      description: this.validateForm.value.description,
      vkLink: this.validateForm.value.vkLink,
      tgLink: this.validateForm.value.tgLink,
      phone: this.validateForm.value.phone,
      email: this.validateForm.value.email,
    }
  }
}

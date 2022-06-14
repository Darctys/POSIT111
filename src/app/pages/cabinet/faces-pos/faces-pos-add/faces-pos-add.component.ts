import { Component, OnInit } from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FacesService} from "../../services/faces.service";
import {IFaceInterface} from "../../interfaces/face.interface";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";


@Component({
  selector: 'faces-pos-add',
  templateUrl: './faces-pos-add.component.html',
  styleUrls: ['./faces-pos-add.component.css']
})
export class FacesPosAddComponent implements OnInit{

  public validateForm!: FormGroup;
  public image: NzUploadFile[] = [];

  public fd = new FormData();

  public startUpload = (file: NzUploadFile): boolean => {
    this.image = this.image.concat(file);
    const fd = new FormData();
    fd.append('image', this.image[0].originFileObj as Blob)
    console.log(fd)
    return false;
  }

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private _facesService: FacesService
  ) {}



  ngOnInit(): void {
    this.validateForm = this._fb.group({
      fullName: [null, [Validators.required]],
      institute: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      description: [null, [Validators.required]],
      vkLink: [null, [Validators.required]],
      tgLink: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  }

  public OnFileSelected(event: any) {
    console.log(<File>event.target.files[0])
    this.fd.append('image',event.target.files[0], event.target.files[0].name)
    console.log(this.fd)
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
    this._facesService.addFace(this.toModel())
    this._modal.destroy();
  }
  public cancel(): void {
    this._modal.destroy();
  }

  public toModel(): IFaceInterface{
    return {
      fullName: this.validateForm.value.fullName,
      institute: this.validateForm.value.institute,
      birthday: this.validateForm.value.birthday,
      photo: this.image[0].url!,
      description: this.validateForm.value.description,
      vkLink: this.validateForm.value.vkLink,
      tgLink: this.validateForm.value.tgLink,
      phone: this.validateForm.value.phone,
      email: this.validateForm.value.email,
      faceId: (this._facesService.faceList.length + 1).toString(),
    }
  }
}

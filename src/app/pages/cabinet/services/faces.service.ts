import {Injectable} from "@angular/core";
import {IFaceInterface} from "../interfaces/face.interface";
import {FormModel} from "../forms-list/models/form-list.model";
import {InstituteEnum} from "../enums/institute.enum";
import {IinstituteFilterList} from "../interfaces/IinstituteFilterList";

@Injectable()
export class FacesService {
  public faceList: IFaceInterface[] = [];
  public instituteFilterList: IinstituteFilterList[] = [];
  public formsLst: FormModel[] = [];

  constructor() {
    this.initFaces();
    this._initFilterList();
  }
  public initFaces(): void{
    this.faceList = [
      {
        faceId: '12345678',
        fullName: 'Петров Петр Петрович',
        birthday: new Date(2003, 2, 1),
        institute: InstituteEnum.Inmt,
        photo: 'photo',
        description: 'Это Петр',
        vkLink: 'http://vk.com/angelinashkatova',
        tgLink: '@angelina_shkatova',
        email: 'petrov@nau.ru',
        phone: '+7-800-555-35-35'
      },
      {
        faceId: '12345679',
        fullName: 'Иванов Иван Иванович',
        birthday: new Date(2004, 3, 2),
        institute: InstituteEnum.Rtf,
        photo: 'photoIvan',
        description: 'Это Иван',
        vkLink: 'http://vk.com/angelinashkatova',
        tgLink: '@angelina_shkatova',
        email: 'ivanov@nau.ru',
        phone: '+7-800-555-36-36'
      },
      {
        faceId: '12345670',
        fullName: 'Сидоров Сидр Сидорович',
        birthday: new Date(2005, 4, 3),
        institute: InstituteEnum.Rtf,
        photo: 'photoSidr',
        description: 'Это Сидр',
        vkLink: 'http://vk.com/angelinashkatova',
        tgLink: '@angelina_shkatova',
        email: 'sidorov@nau.ru',
        phone: '+7-800-555-37-37'
      }
    ];
  }

  private _initFilterList():void {
    const filterValues: Set<string> = new Set()
    this.faceList.forEach((face:IFaceInterface) => {
      filterValues.add(face.institute);
    });
    filterValues.forEach((value: string) => {
      switch (value) {
        case InstituteEnum.Rtf:
          this.instituteFilterList.push({text: 'ИРИТ-РТФ', value: value});
          break;
        case InstituteEnum.Info:
          this.instituteFilterList.push({text: 'ИНФО', value: value});
          break;
        case InstituteEnum.Inmt:
          this.instituteFilterList.push({text: 'ИНМТ', value: value});
          break;
      }
    });
  }

  public addFace(face: IFaceInterface):void{
    this.faceList = [
      ...this.faceList,
      face
    ];
  }

  public deleteFace(faceId: string):void{
    this.faceList = this.faceList.filter(item => item.faceId !== faceId);
  }

  public getFace(faceId: string): IFaceInterface {
    return this.faceList.find((x: IFaceInterface) => x.faceId === faceId)!
  }

  public editFace(face: IFaceInterface): void {
    this.faceList.forEach((x:IFaceInterface) => {
      if (x.faceId===face.faceId){
        console.log(face)
        Object.assign(x, face)
      }
    })
  }
}

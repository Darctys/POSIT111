import {Injectable} from "@angular/core";
import {IStudentInterface} from "../interfaces/student.interface";
import {IinstituteFilterList} from "../interfaces/IinstituteFilterList";
import {InstituteEnum} from "../enums/institute.enum";
import {FormModel} from "../forms-list/models/form-list.model";


@Injectable()
export class StudentsService {
  public studentList: IStudentInterface[] = [];
  public instituteFilterList: IinstituteFilterList[] = []
  public formsLst: FormModel[] = []

  constructor() {
    this.initStudents()
    this._initFilterList()
  }
  public initStudents(): void{
    this.studentList = [
      {
        userId: '1434324124',
        fullName: 'Парамонов Никита Сергеевич',
        isContract: false,
        academicGroup: 'РИ-200018',
        posIdCard: '333',
        studentIdCard: '234324',
        hasElectronicSignature: true,
        email: 'email@mail.ru',
        phone: '799999999',
        institute: 'Rtf',
      },
      {
        userId: '12432152',
        fullName: 'Сычев Тимофей Михайлович',
        isContract: false,
        academicGroup: 'РИ-200016',
        posIdCard: '222',
        studentIdCard: '234324',
        hasElectronicSignature: true,
        email: 'email@mail.ru',
        phone: '799999999',
        institute: 'Inmt',
      },
      {
        userId: '342314214',
        fullName: 'Шкатова Ангелина Валерьевна',
        isContract: false,
        academicGroup: 'РИ-200017',
        posIdCard: '111',
        studentIdCard: '234324',
        hasElectronicSignature: true,
        email: 'email@mail.ru',
        phone: '799999999',
        institute: 'Info',
      },
    ];
  }

  private _initFilterList():void {
    const filterValues: Set<string> = new Set()
    this.studentList.forEach((student:IStudentInterface) => {
      filterValues.add(student.institute);
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

  public addStudent(student: IStudentInterface):void{
    this.studentList = [
      ...this.studentList,
      student
    ];
  }

  public deleteStudent(userId: string):void{
    this.studentList = this.studentList.filter(item => item.userId !== userId);
  }

  public getStudent(userId: string): IStudentInterface {
    return this.studentList.find((x: IStudentInterface) => x.userId === userId)!
  }
  public editStudent(student: IStudentInterface): void {
    this.studentList.forEach((x:IStudentInterface) => {
      if (x.userId===student.userId){
        console.log(student)
        Object.assign(x, student)
      }
    })
  }
}

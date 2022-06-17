import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IStudentInterface} from "../interfaces/student.interface";
import {switchMap} from "rxjs";
import {IOfferInterface} from "../interfaces/offer.interface";
import {IFaceInterface} from "../interfaces/face.interface";



@Injectable()
export class RequestService {
  constructor(private http: HttpClient) {

  }

  public getAllStudents() {
    return this.http.post('https://localhost:7247/api/v1/Students/get_all',null);
  }
  public getStudentById(id: string) {
    return this.http.post('https://localhost:7247/api/v1/Students/get',{id: id});
  }
  public deleteStudentById(id: string) {
    return this.http.post('https://localhost:7247/api/v1/Students/delete',{id: id});
  }
  public saveStudentById(student: IStudentInterface) {
    return this.http.post('https://localhost:7247/api/v1/Students/save',student);
  }

  public getAllOffers() {
    return this.http.post('https://localhost:7247/api/v1/Offers/get_all',null);
  }
  public getOfferById(id: string) {
    return this.http.post('https://localhost:7247/api/v1/Offers/get',{id: id});
  }
  public deleteOfferById(id: string) {
    return this.http.post('https://localhost:7247/api/v1/Offers/delete',{id: id});
  }
  public saveOffersById(offer: IOfferInterface) {
    return this.http.post('https://localhost:7247/api/v1/Offers/save',offer);
  }

  public getAllFaces() {
    return this.http.post('https://localhost:7247/api/v1/Faces/get_all',null);
  }
  public getFaceById(id: string) {
    return this.http.post('https://localhost:7247/api/v1/Faces/get',{id: id});
  }
  public deleteFaceById(id: string) {
    return this.http.post('https://localhost:7247/api/v1/Faces/delete',{id: id});
  }
  public saveFaceById(face: IFaceInterface) {
    return this.http.post('https://localhost:7247/api/v1/Faces/save',face);
  }

}

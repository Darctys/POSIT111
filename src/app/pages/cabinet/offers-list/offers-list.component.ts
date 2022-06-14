import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {OffersAddComponent} from "./offers-add/offers-add.component";
import {OffersService} from "../services/offers.service";
import {IOfferInterface} from "../interfaces/offer.interface";
import {OffersEditComponent} from "./offers-edit/offers-edit.component";
import {StudentEditComponent} from "../students-list/edit-student/edit-student.component";

@Component({
  selector: 'offers',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

  public searchValue = '';

  constructor(
    private _router: Router,
    private _modal: NzModalService,
    public offersService: OffersService,
  ) {
    console.log(this.offersService.offerList)
  }

  public deleteOffer(id: string): void {
    this.offersService.deleteOffer(id);
  }

  public editOffer(id: string): void {
    const offer = this.offersService.getOffer(id);
    this.editOfferModal(offer)
  }

  public createAddOfferModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить предложение',
      nzContent: OffersAddComponent
    });
  }

  public editOfferModal(offer: IOfferInterface): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Изменить преложение',
      nzContent: OffersEditComponent,
      nzComponentParams: {
        offer: offer,
      },
    });
  }


  public search(): void {
    this.offersService.offerList.filter((item: IOfferInterface) => item.title.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
  }
}

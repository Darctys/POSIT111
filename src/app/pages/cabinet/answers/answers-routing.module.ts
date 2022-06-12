import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsListComponent} from "../students-list/students-list.component";
import {OffersListComponent} from "../offers-list/offers-list.component";
import {StudentsDetailComponent} from "../../student-detail/students-detail.component";
import {FormsListComponent} from "../forms-list/forms-list.component";
import {FormsCreateComponent} from "../form-create/forms-create.component";
import {AnswersComponent} from "./answers.component";

const routes: Routes = [
  { path: '', component: AnswersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule {

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import {StudentsListComponent} from "../students-list/students-list.component";
import {OffersListComponent} from "../offers-list/offers-list.component";
import {StudentsDetailComponent} from "../../student-detail/students-detail.component";
import {FormsListComponent} from "../forms-list/forms-list.component";
import {FormsCreateComponent} from "../form-create/forms-create.component";

const routes: Routes = [
  { path: '', component: CabinetComponent, children:
      [
        {
          path: 'students',
          component: StudentsListComponent,
        },
        {
          path: 'offers',
          component: OffersListComponent
        },
        {
          path: 'forms',
          component: FormsListComponent
        },
        {
          path: 'add-form',
          component: FormsCreateComponent
        },
        {
          path: 'edit-form/:id',
          component: FormsCreateComponent
        },
        {
          path: 'student/:id',
          component: StudentsDetailComponent,
          pathMatch: 'full',
        }
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule {

}

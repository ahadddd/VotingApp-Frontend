import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../User/User/User.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent
      }
    ])
  ],
  declarations: [UserComponent]
})
export class UserModule { }

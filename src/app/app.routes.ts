import { Routes, RouterModule, RouterOutlet  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { ToastrModule, ToastrService } from 'ngx-toastr';

export const routes: Routes = 
[
    { path: '', component: HomeComponent },
    { path: 'members', component: MemberListComponent,canActivate:[AuthGuard] },
    { path: 'members/:id', component: MemberDetailComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'messages', component: MessageComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
    declarations: [
      ],
    imports: [
        RouterModule.forRoot(routes),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
          })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
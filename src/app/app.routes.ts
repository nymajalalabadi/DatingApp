import { Routes, RouterModule, RouterOutlet  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessageComponent } from './message/message.component';
import { InjectionToken, NgModule } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-change.guard';

export const routes: Routes = 
[
    { path: '', component: HomeComponent },
    { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
    { path: 'members/:username', component: MemberDetailComponent },
    { path: 'member/edit', component: EditMemberComponent, canDeactivate: [PreventUnsavedChangesGuard] },
    { path: 'lists', component: ListsComponent },
    { path: 'messages', component: MessageComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
      ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ToastrModule.forRoot({
            positionClass :'toast-bottom-right'
          })
    ],
    exports: [
        RouterModule,
        ToastrModule
    ],
    providers: [
        {provide : ToastrService},
        {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi : true}
    ]
})

export class AppRoutingModule { }
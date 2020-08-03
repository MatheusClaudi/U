import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PokerPlanningComponent } from './pages/poker-planning/poker-planning.component';
import { CreateUsComponent } from './pages/create-us/create-us.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './helpers/guards/authentication.guard';
import { RetrospectiveService } from './services/retrospective.service';

import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HeaderComponent } from './components/header/header.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { CardComponent } from './components/card/card.component';
import { RetrospectiveComponent } from './pages/retrospective/retrospective.component';
import { ConfComponent } from './pages/conf/conf.component';
import { PlanningComponent } from './pages/planning/planning.component';

import { authInterceptorProviders } from './helpers/authentication.interceptor';
import { CreatePlanningComponent } from './pages/create-planning/create-planning.component';
import { UserInRoomListComponent } from './components/voting/user-in-room-list/user-in-room-list.component';
import { ShareRoomComponent } from './components/voting/share-room/share-room.component';
import { StoryDescriptionComponent } from './components/voting/story-description/story-description.component';
import { PokerComponent } from './components/voting/poker/poker.component';
import { DevPlanningComponent } from './pages/dev-planning/dev-planning.component';
import { UnlogedUserEntryComponent } from './pages/unloged-user-entry/unloged-user-entry.component';
import { MenuComponent } from './components/menu/menu.component';
import { QrcodeRetrospectiveComponent } from './components/qrcode-retrospective/qrcode-retrospective.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { LabelsComponent } from './pages/labels/labels.component';
import { AdminGuard } from './helpers/guards/admin.guard';
import { UnlogedGuard } from './helpers/guards/unloged.guard';
import { ChartsModule } from 'ng2-charts';
import { ResultChartComponent } from './components/result-chart/result-chart.component';
import { TagMenuComponent } from './components/tag-menu/tag-menu.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterFeedbackComponent } from './components/filter-feedback/filter-feedback.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { FeedbackProjectComponent } from './pages/feedback-project/feedback-project.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { EditFeedbackComponent } from './pages/edit-feedback/edit-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    PokerPlanningComponent,

    ResetPasswordComponent,
    ForgotPasswordComponent,
    CreateUsComponent,
    HeaderComponent,
    UserNavComponent,
    CardComponent,

    RetrospectiveComponent,
    ConfComponent,

    PlanningComponent,
    CreatePlanningComponent,
    UserInRoomListComponent,

    ShareRoomComponent,
    StoryDescriptionComponent,
    PokerComponent,
    DevPlanningComponent,
    UnlogedUserEntryComponent,
    ResultChartComponent,

    MenuComponent,
    QrcodeRetrospectiveComponent,
    NotFoundComponent,
    UserAccountComponent,
    ActivateAccountComponent,
    UsersComponent,
    AddUserComponent,
    LabelsComponent,
    TagMenuComponent,
    CreateBoardComponent,
    EditUserComponent,
    FeedbackComponent,
    FilterFeedbackComponent,
    SelectUserComponent,
    FeedbackProjectComponent,
    CreateFeedbackComponent,
    UserSelectComponent,
    EditFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClickOutsideModule,
    NgbModule,
    RouterModule,
    NgxQRCodeModule,
    ChartsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    AuthService,
    TokenService,
    UserService,
    authInterceptorProviders,
    RetrospectiveService,
    AuthGuard,
    AdminGuard,
    UnlogedGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

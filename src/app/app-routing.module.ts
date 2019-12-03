import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { HelpComponent } from './help/help.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "upload", component: UploadComponent},
  { path: "help", component: HelpComponent},
  { path: "tags", component:TagsComponent},
  { path: "users", component: UsersComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

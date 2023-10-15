import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"main",component:AppComponent},
  {path:" ",redirectTo:'/login',pathMatch:'full'},
  {path:"**",redirectTo:"/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

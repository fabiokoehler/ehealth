import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AdminModule} from './admin/admin.module';
import {AdminAuthGuard} from './admin/services/admin-auth-guard.service';
import {AppComponent} from './app.component';
import {LoginComponent} from './core/components/login/login.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {ProductsComponent} from './shopping/components/products/products.component';
import {ShoppingModule} from './shopping/shopping.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
    ])
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

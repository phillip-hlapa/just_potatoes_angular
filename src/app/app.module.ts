import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table'


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommunicationComponent } from './communication/communication.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { VieworedersComponent } from './vieworeders/vieworeders.component';
import {MatButtonModule} from "@angular/material/button";
import { DebugComponent } from './debug/debug.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { CdkTableModule} from '@angular/cdk/table';
import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';
@NgModule({
    imports: [

        SpinnerCircularModule,
        CdkTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatButtonModule,

    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    HomeComponent,
    LogoutComponent,
    CommunicationComponent,
    VieworedersComponent,
    DebugComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

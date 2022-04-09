import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockComponent } from './shared/block/block.component';
import { RoofComponent } from './shared/roof/roof.component';
import { BaseComponent } from './shared/base/base.component';
import { FloorComponent } from './shared/floor/floor.component';
import { HomeComponent } from './pages/home/home.component';
import { TopViewComponent } from './pages/top-view/top-view.component';
import { SideViewComponent } from './pages/side-view/side-view.component';
import { CorridorComponent } from './shared/corridor/corridor.component';
import { IconComponent } from './shared/icon/icon.component';
import { TimerAlarmComponent } from './shared/modals/timer-alarm/timer-alarm.component';
import { TimerComponent } from './shared/timer/timer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditShopComponent } from './shared/modals/edit-shop/edit-shop.component';
import { LoginComponent } from './pages/login/login.component';
import { NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlockComponent,
    TopViewComponent,
    SideViewComponent,
    RoofComponent,
    BaseComponent,
    FloorComponent,
    CorridorComponent,
    IconComponent,
    TimerAlarmComponent,
    TimerComponent,
    EditShopComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

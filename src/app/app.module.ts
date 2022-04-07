import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';
import { ReadingRoomsComponent } from './components/reading-rooms/reading-rooms.component';
import { CoreModule } from '../core/core.module';
import { ReadingRoomCardComponent } from './components/reading-room-card/reading-room-card.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { FormsModule } from '@angular/forms';
import { PlacementTestComponent } from './components/placement-test/placement-test.component';
import { CharactersOnlyValidator } from '../customDirectives/CharactersOnly';

@NgModule({
  declarations: [
    HomeComponent,
    AdvertiseComponent,
    ReadingRoomsComponent,
    ReadingRoomCardComponent,
    RegisterLoginComponent,
    PlacementTestComponent,
    CharactersOnlyValidator
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    
  ],
  exports:[AdvertiseComponent,ReadingRoomCardComponent,ReadingRoomsComponent,HomeComponent],
  providers:[]
})
export class HomeModule { }

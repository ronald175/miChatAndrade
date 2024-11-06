import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: 'rooms', loadChildren: () => import('./Components/room-picker/room-picker.module').then(m => m.RoomPickerModule) },
	{ path: 'chat/:roomId', loadChildren: () => import('./Components/chat/chat.module').then(m => m.ChatModule) },
	{ path: '', redirectTo: 'rooms', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
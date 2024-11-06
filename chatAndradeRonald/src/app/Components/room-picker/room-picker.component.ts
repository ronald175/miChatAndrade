import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TOPICS } from '../../data/topics';
import { ChatService } from '../../Services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-picker',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './room-picker.component.html',
  styleUrl: './room-picker.component.scss'
})
export class RoomPickerComponent {
  salas: any[] = TOPICS;

	selectedRoom: string | null = null;
	nombre: string | null = localStorage.getItem('nombre') ?? null;

	constructor(
		private router: Router,
		private chatService: ChatService,
	) {}

	ingresarSala() {
		if (!this.selectedRoom) {
			alert('Seleccione una sala');
			return;
		}

		if (!this.nombre) {
			alert('Ingrese un nombre');
			return;
		}

		localStorage.setItem('nombre', this.nombre);

		this.chatService.clearMessages();
		this.router.navigate(['/chat', this.selectedRoom]);
	}
}
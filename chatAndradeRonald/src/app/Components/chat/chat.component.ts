import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../Services/chat.service';
import { TOPICS } from '../../data/topics';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  users: any = [];
	user: string;

	roomId: string;
	roomName: string;
	messages: any[] = [];

	message: string | null = null;

  constructor(
		private _activatedRoute: ActivatedRoute,
		private chatService: ChatService,
	) {
		this.roomId = this._activatedRoute.snapshot.paramMap.get('roomId') ?? '';
		this.user = localStorage.getItem('nombre') ?? '';

		this.roomName = TOPICS.find(t => t.id === this.roomId)?.name ?? '';
	}

  ngOnInit(): void {
		this.joinRoom();

		this.chatService.messages$.subscribe((res) => {
			this.messages = res;
		});

		this.chatService.connectedUsers$.subscribe((res) => {
			this.users = res;
		});
	}

  async joinRoom() {
		try {
			await this.chatService.joinRoom(this.user, this.roomId)
		} catch {
			setTimeout(() => this.joinRoom(), 1000)
		}
	}

	sendMessage() {
		if (!this.message) return;

		this.chatService.sendMessage(this.message)
		.then(() => {
			this.message = null;
		});
	}

}

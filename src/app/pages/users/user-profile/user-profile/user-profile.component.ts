import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service'; // upewnij się, że ścieżka jest poprawna
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true
})
export class UserProfileComponent implements OnInit {
  userData: any;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        this.error = 'Błąd podczas pobierania danych użytkownika.';
        console.error(err);
      }
    });
  }
}

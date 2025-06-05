import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/profile']); // przekierowanie po zalogowaniu
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Nieprawidłowe dane logowania';
      }
    });
  }
}

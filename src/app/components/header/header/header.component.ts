import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.loggedIn$;
  }
  onLogout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
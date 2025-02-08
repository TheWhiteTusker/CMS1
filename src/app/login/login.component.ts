import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId: string = '';  // Ensure this is defined
  password: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.userId === 'admin' && this.password === 'password') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

type AuthMode = 'login' | 'signup';

@Component({
  selector: 'app-auth',
  standalone: false,
  styleUrl: './auth.css',
  templateUrl: './auth.html',
})
export class Auth implements OnInit {
  protected mode: AuthMode = 'login';
  protected errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const requestedMode = params.get('mode');
      if (requestedMode === 'signup') {
        this.mode = 'signup';
      }
    });
  }

  protected setMode(mode: AuthMode): void {
    this.mode = mode;
    this.errorMessage = '';
  }

  protected submit(form: NgForm): void {
    const { name = '', email = '', password = '' } = form.value;
    this.errorMessage = '';

    if (this.mode === 'signup') {
      this.authService.register(name.trim(), email, password);
      this.router.navigate(['/home']);
      return;
    }

    if (this.authService.login(email, password)) {
      this.router.navigate(['/home']);
      return;
    }

    this.errorMessage = 'Invalid credentials. Please check your email and password and try again.';
    form.resetForm({ email });
  }
}

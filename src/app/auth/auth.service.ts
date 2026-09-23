import { Injectable, signal } from '@angular/core';

interface StoredAccount {
  email: string;
  name: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly accountKey = 'zomato-account';
  private readonly sessionKey = 'zomato-authenticated';
  readonly isAuthenticated = signal(this.hasActiveSession());

  register(name: string, email: string, password: string): void {
    // This demo stores credentials locally until a real authentication API is connected.
    const account: StoredAccount = { name, email: email.toLowerCase(), password };
    localStorage.setItem(this.accountKey, JSON.stringify(account));
    this.startSession();
  }

  login(email: string, password: string): boolean {
    const account = this.getAccount();
    const valid = account?.email === email.trim().toLowerCase() && account.password === password;
    if (valid) {
      this.startSession();
    }
    return valid;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.isAuthenticated.set(false);
  }

  private startSession(): void {
    localStorage.setItem(this.sessionKey, 'true');
    this.isAuthenticated.set(true);
  }

  private hasActiveSession(): boolean {
    return localStorage.getItem(this.sessionKey) === 'true' && this.getAccount() !== null;
  }

  private getAccount(): StoredAccount | null {
    const storedAccount = localStorage.getItem(this.accountKey);
    if (!storedAccount) {
      return null;
    }

    try {
      return JSON.parse(storedAccount) as StoredAccount;
    } catch {
      localStorage.removeItem(this.accountKey);
      return null;
    }
  }
}

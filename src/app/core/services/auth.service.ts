import { Injectable } from '@angular/core'
import { LoginData } from 'src/app/core/models/auth.model'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  constructor(private router: Router) {}
  isAuth = true
  userId = 12345
  email? = ''

  login(data: Partial<LoginData>) {
    this.isAuth = true
    this.email = data.email
    this.router.navigate(['/'])
  }

  logout() {
    this.isAuth = false
    this.email = ''
    this.router.navigate(['/login'])
  }
}

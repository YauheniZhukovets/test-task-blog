import { Injectable } from '@angular/core'
import { LoginData } from 'src/app/core/models/auth.model'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  isAuth = false
  email?: string | null
  userId = 12321

  login(data: Partial<LoginData>) {
    this.isAuth = true
    this.email = data.email

    localStorage.setItem('auth', 'true')
    localStorage.setItem('email', `${data.email}`)

    this.router.navigate(['/'])
  }

  logout() {
    this.isAuth = false
    this.email = ''

    localStorage.removeItem('auth')
    localStorage.removeItem('email')

    this.router.navigate(['/login'])
  }

  me() {
    if (localStorage.getItem('auth')) {
      this.isAuth = true
    }

    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email')
    }
  }
}

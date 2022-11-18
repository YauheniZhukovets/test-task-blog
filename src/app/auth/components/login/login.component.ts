import { Component } from '@angular/core'
import { AuthService } from 'src/app/core/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'blog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  constructor(private authService: AuthService) {}

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onLoginSubmit() {
    this.authService.login(this.loginForm.value)
  }
}

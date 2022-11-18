import { Component } from '@angular/core'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'blog-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logoutHandler() {
    this.authService.logout()
  }
}

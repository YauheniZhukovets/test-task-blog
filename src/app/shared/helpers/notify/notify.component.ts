import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Notify } from 'src/app/core/models/notify.model'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'blog-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {
  notify$?: Observable<Notify | null>

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notify$ = this.notificationService.notify$
  }

  closeNotification() {
    this.notificationService.clear()
  }
}

import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, EMPTY } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Article } from 'src/app/core/models/article.model'
import { NotificationService } from 'src/app/core/services/notification.service'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  article$ = new BehaviorSubject<Article>({ body: '', id: 0, title: '', userId: 0 })

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  getArticle(id: number) {
    this.http
      .get<Article>(`${environment.baseUrl}/posts/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(article => {
        this.article$.next(article)
      })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}

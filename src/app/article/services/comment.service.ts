import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Comment } from 'src/app/article/models/comment.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { NotificationService } from 'src/app/core/services/notification.service'

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  comments$ = new BehaviorSubject<Comment[]>([])
  userEmail = this.authService.email

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  getAllComments(id: number) {
    this.http
      .get<Comment[]>(`${environment.baseUrl}/posts/${id}/comments`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(comments => {
        this.comments$.next(comments)
      })
  }

  addComment(data: { name?: string; body?: string; postId: number }) {
    const requestData = { ...data, email: this.userEmail }
    this.http
      .post<Comment>(`${environment.baseUrl}/posts/${data.postId}/comments`, requestData)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(comment => {
          const stateComments = this.comments$.getValue()
          const newId = stateComments.length + 1
          return [...stateComments, { ...comment, id: newId }]
        })
      )
      .subscribe(comments => {
        this.comments$.next(comments)
      })
  }

  deleteComment(id: number) {
    const stateComments = this.comments$.getValue()
    const newStateComments = stateComments.filter(comment => comment.id !== id)

    this.comments$.next(newStateComments)
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}

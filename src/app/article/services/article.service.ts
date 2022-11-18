import { Injectable } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Article } from 'src/app/core/models/article.model'
import { Comment } from 'src/app/article/models/comment.model'
import { AuthService } from 'src/app/core/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  article$ = new BehaviorSubject<Article>({ body: '', id: 0, title: '', userId: 0 })
  comments$ = new BehaviorSubject<Comment[]>([])

  userEmail = this.authService.email
  constructor(private http: HttpClient, private authService: AuthService) {}

  getArticle(id: number) {
    this.http.get<Article>(`${environment.baseUrl}/posts/${id}`).subscribe(article => {
      this.article$.next(article)
    })
  }

  getAllComments(id: number) {
    this.http.get<Comment[]>(`${environment.baseUrl}/posts/${id}/comments`).subscribe(comments => {
      this.comments$.next(comments)
    })
  }

  addComment(data: { name: string; body: string; postId: number }) {
    const requestData = { ...data, email: this.userEmail }
    this.http
      .post<Comment>(`${environment.baseUrl}/posts/${data.postId}/comments`, requestData)
      .pipe(
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
}

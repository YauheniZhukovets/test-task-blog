import { Component, OnInit } from '@angular/core'
import { ArticleService } from 'src/app/article/services/article.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Article } from 'src/app/core/models/article.model'
import { Comment } from 'src/app/article/models/comment.model'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'blog-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$!: Observable<Article>
  comments$!: Observable<Comment[]>

  commentTitle = ''
  commentDescription = ''
  userEmail = this.authService.email

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const articleId = Number(this.route.snapshot.paramMap.get('id'))

    if (articleId) {
      this.article$ = this.articleService.article$
      this.comments$ = this.articleService.comments$

      this.articleService.getArticle(articleId)
      this.articleService.getAllComments(articleId)
    }
  }

  backToBlogHandler() {
    this.router.navigate([``])
  }

  addCommentHandler(id: number) {
    this.articleService.addComment({
      postId: id,
      name: this.commentTitle,
      body: this.commentDescription,
    })

    this.commentTitle = ''
    this.commentDescription = ''
  }

  deleteCommentHandler(id: number) {
    this.articleService.deleteComment(id)
  }
}

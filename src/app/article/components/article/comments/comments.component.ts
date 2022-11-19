import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Comment } from 'src/app/article/models/comment.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { CommentService } from 'src/app/article/services/comment.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'blog-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() articleId!: number

  comments$!: Observable<Comment[]>

  commentForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  })

  userEmail = this.authService.email

  constructor(private commentService: CommentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.comments$ = this.commentService.comments$
    this.commentService.getAllComments(this.articleId)
  }

  get name() {
    return this.commentForm.get('name')
  }

  get description() {
    return this.commentForm.get('description')
  }

  deleteCommentHandler(id: number) {
    this.commentService.deleteComment(id)
  }

  onCommentSubmit(articleId: number) {
    this.commentService.addComment({
      postId: articleId,
      name: this.commentForm.value.name,
      body: this.commentForm.value.description,
    })

    this.commentForm.reset()
  }
}

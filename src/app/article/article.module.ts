import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ArticleRoutingModule } from './article-routing.module'
import { ArticleComponent } from './components/article/article.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommentsComponent } from './components/article/comments/comments.component'

@NgModule({
  declarations: [ArticleComponent, CommentsComponent],
  imports: [CommonModule, ArticleRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ArticleModule {}

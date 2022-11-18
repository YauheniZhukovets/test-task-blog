import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ArticleRoutingModule } from './article-routing.module'
import { ArticleComponent } from './components/article/article.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ArticleRoutingModule, SharedModule, FormsModule],
})
export class ArticleModule {}

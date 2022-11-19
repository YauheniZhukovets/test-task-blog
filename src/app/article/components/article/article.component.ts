import { Component, OnInit } from '@angular/core'
import { ArticleService } from 'src/app/article/services/article.service'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { Article } from 'src/app/core/models/article.model'

@Component({
  selector: 'blog-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article$!: Observable<Article>

  articleId!: number

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const articleId = Number(this.route.snapshot.paramMap.get('id'))
    this.articleId = articleId

    if (articleId) {
      this.article$ = this.articleService.article$
      this.articleService.getArticle(articleId)
    }
  }
}

import { Component, OnInit } from '@angular/core'
import { BlogService } from 'src/app/blog/services/blog.service'
import { Observable } from 'rxjs'
import { DomainArticle } from 'src/app/core/models/article.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { ActivatedRoute, Params } from '@angular/router'
import { SortType } from 'src/app/core/types/sort.type'

@Component({
  selector: 'blog-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  articles$!: Observable<DomainArticle[]>

  currentPage!: number
  selectedSort?: string

  options = [
    { value: 'id', name: 'по номеру' },
    { value: 'title', name: 'по названию' },
    { value: 'body', name: 'по описанию' },
  ]

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.articles$ = this.blogService.articles$

    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['_page']) ? Number(params['_page']) : 1
      this.getArticlesHandler(params['_page'] ? params['_page'] : 1)
    })
  }

  sortArticlesHandler(e: Event) {
    const sort = (e.currentTarget as HTMLSelectElement).value
    this.selectedSort = sort
    this.blogService.changeSortArticle(sort as SortType)
  }

  getArticlesHandler(page: number) {
    this.blogService.getAllArticles(page)
  }

  changeFavoriteHandler(data: { id: number; favorite: boolean; favCount: number }) {
    this.blogService.changeFavoriteCount(data)
  }
}

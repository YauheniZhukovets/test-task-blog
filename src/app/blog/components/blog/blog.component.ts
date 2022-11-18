import { Component, OnInit } from '@angular/core'
import { BlogService } from 'src/app/blog/services/blog.service'
import { Observable } from 'rxjs'
import { DomainArticle, SortType } from 'src/app/core/models/article.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'blog-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  articles$!: Observable<DomainArticle[]>

  currentPage = ''
  userId = this.authService.userId

  selectedSort?: string
  options = [
    { value: 'id', name: 'По номеру' },
    { value: 'title', name: 'По названию' },
    { value: 'body', name: 'По описанию' },
  ]

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.articles$ = this.blogService.articles$

    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = params['_page'] ? params['_page'] : 1
      this.getArticles(params['_page'] ? params['_page'] : 1)
    })
  }

  sortPost(e: Event) {
    const sort = (e.currentTarget as HTMLSelectElement).value
    this.selectedSort = sort
    this.blogService.changeSortArticle(sort as SortType)
  }

  getArticles(page: number) {
    this.blogService.getAllArticles(page)
  }

  nextArticlesPortionHandler() {
    const page = Number(this.route.snapshot.queryParamMap.get('_page'))
    const nextPage = page ? page + 1 : 2

    this.router.navigate([''], {
      queryParams: {
        _page: nextPage,
      },
    })
  }

  prevArticlesPortionHandler() {
    const page = Number(this.route.snapshot.queryParamMap.get('_page'))
    const prevPage = page > 1 ? page - 1 : 1

    this.router.navigate([''], {
      queryParams: {
        _page: prevPage,
      },
    })
  }

  changeFavoriteHandler(data: { id: number; favorite: boolean; favCount: number }) {
    this.blogService.changeFavoriteCount(data)
  }
}

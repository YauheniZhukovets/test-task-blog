import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'blog-articles-pagination',
  templateUrl: './articles-pagination.component.html',
  styleUrls: ['./articles-pagination.component.scss'],
})
export class ArticlesPaginationComponent {
  @Input() currentPage!: number

  constructor(private route: ActivatedRoute, private router: Router) {}

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
}

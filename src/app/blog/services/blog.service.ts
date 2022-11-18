import { Injectable } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Article, DomainArticle, SortType } from 'src/app/core/models/article.model'

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  articles$ = new BehaviorSubject<DomainArticle[]>([])
  favoriteCount!: number
  favorited!: boolean

  constructor(private http: HttpClient) {}

  get favCuntRandom() {
    this.favoriteCount = Math.floor(Math.random() * 1001)
    return this.favoriteCount
  }

  get isFavRandom() {
    this.favorited = Math.random() < 0.5
    return this.favorited
  }

  getAllArticles(page: number) {
    this.http
      .get<Article[]>(`${environment.baseUrl}/posts?_page=${page}`)
      .pipe(
        map(el => {
          return el.map(article => {
            return {
              ...article,
              favoritesCount: this.favCuntRandom,
              favorited: this.isFavRandom,
            }
          })
        })
      )
      .subscribe(articles => {
        this.articles$.next(articles)
      })
  }

  changeFavoriteCount(data: { id: number; favorite: boolean; favCount: number }) {
    const stateArticles = this.articles$.getValue()

    const newDate = {
      id: data.id,
      favoritesCount: data.favorite ? data.favCount - 1 : data.favCount + 1,
      favorited: !data.favorite,
    }

    const newArticles = stateArticles.map(article =>
      article.id === data.id ? { ...article, ...newDate } : article
    )
    this.articles$.next(newArticles)
  }

  changeSortArticle(sort: SortType) {
    const stateArticles = this.articles$.getValue()
    if (sort !== 'id') {
      this.articles$.next(
        stateArticles.sort((a, b) => (a[sort] as SortType).localeCompare(b[sort] as SortType))
      )
    } else {
      this.articles$.next(stateArticles.sort((a, b) => a[sort] - b[sort]))
    }
  }
}

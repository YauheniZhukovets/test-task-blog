export type SortType = 'title' | 'body' | 'id'

export interface Article {
  userId: number
  id: number
  title: string
  body: string
}

export interface DomainArticle extends Article {
  favoritesCount: number
  favorited: boolean
}

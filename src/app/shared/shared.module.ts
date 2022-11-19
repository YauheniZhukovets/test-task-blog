import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './layout/header/header.component'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { ArticlesPaginationComponent } from './helpers/articles-pagination/articles-pagination.component'
import { NotifyComponent } from './helpers/notify/notify.component'

@NgModule({
  declarations: [HeaderComponent, ArticlesPaginationComponent, NotifyComponent],
  imports: [CommonModule, FormsModule, RouterLink],
  exports: [HeaderComponent, ArticlesPaginationComponent, NotifyComponent],
})
export class SharedModule {}

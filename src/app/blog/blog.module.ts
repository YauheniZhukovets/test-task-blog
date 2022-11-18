import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BlogRoutingModule } from './blog-routing.module'
import { BlogComponent } from './components/blog/blog.component'
import { FormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, FormsModule, SharedModule],
})
export class BlogModule {}

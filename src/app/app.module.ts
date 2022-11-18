import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { AuthModule } from 'src/app/auth/auth.module'
import { CoreModule } from 'src/app/core/core.module'
import { ArticleModule } from 'src/app/article/article.module'
import { BlogModule } from 'src/app/blog/blog.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    ArticleModule,
    BlogModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

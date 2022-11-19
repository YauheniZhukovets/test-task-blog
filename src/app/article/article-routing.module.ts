import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArticleComponent } from 'src/app/article/components/article/article.component'
import { AuthGuard } from 'src/app/core/guards/auth.guard'

const routes: Routes = [{ path: ':id', component: ArticleComponent, canActivate: [AuthGuard] }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}

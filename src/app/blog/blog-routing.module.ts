import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlogComponent } from 'src/app/blog/components/blog/blog.component'
import { AuthGuard } from 'src/app/core/guards/auth.guard'

const routes: Routes = [
  { path: '', component: BlogComponent, pathMatch: 'full', canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

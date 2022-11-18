import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './layout/header/header.component'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FormsModule, RouterLink],
  exports: [HeaderComponent],
})
export class SharedModule {}

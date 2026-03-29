import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  imports: [NgOptimizedImage],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  @Input() imageSrc: string = '';
  @Input() displayedName: string = '';
  @Input() userName: string = '';
}

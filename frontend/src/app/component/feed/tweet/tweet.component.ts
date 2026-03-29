import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import type { Tweet } from '../../../model/Tweet';
import { UserMenuComponent } from '../../user-menu/user-menu.component';
import { TweetTimeComponent } from './tweet-time/tweet-time.component';

@Component({
  selector: 'app-tweet',
  imports: [MatIcon, MatIconButton, UserMenuComponent, TweetTimeComponent],
  templateUrl: './tweet.component.html',
  styleUrls: ['../feed.component.scss', './tweet.component.scss'],
})
export class TweetComponent {
  tweet = input.required<Tweet>();
}

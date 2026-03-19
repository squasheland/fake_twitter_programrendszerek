import { Component } from '@angular/core';
import { NewTweetComponent } from "./new_tweet/new_tweet.component";
import { TweetComponent } from './tweet/tweet.component';

@Component({
  selector: 'app-feed',
  imports: [NewTweetComponent, TweetComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {}

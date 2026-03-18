import { Component } from '@angular/core';
import { NewTweetComponent } from "./new_tweet/new_tweet.component";

@Component({
  selector: 'app-feed',
  imports: [NewTweetComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {}

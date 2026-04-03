import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { NewTweetComponent } from './new_tweet/new_tweet.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetService } from '../../service/tweet.service';
import type { TweetResponse } from '../../../../../common/tweet/TweetResponse';

@Component({
  selector: 'app-feed',
  imports: [NewTweetComponent, TweetComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  private readonly tweetService = inject(TweetService);
  private readonly scrollThreshold = 200;
  private nextPage = 1;

  protected readonly tweets = signal<TweetResponse[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly hasMore = signal(true);

  ngOnInit(): void {
    this.loadNextPage();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.tryLoadNextPage();
  }

  private tryLoadNextPage(): void {
    if (this.isNearBottom()) {
      this.loadNextPage();
    }
  }

  private isNearBottom(): boolean {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - this.scrollThreshold;
  }

  private loadNextPage(): void {
    if (this.isLoading() || !this.hasMore()) {
      return;
    }

    this.isLoading.set(true);

    this.tweetService.getTweetsForFeed(this.nextPage).subscribe({
      next: (response) => {
        this.tweets.update((currentTweets) => [...currentTweets, ...response.tweets]);
        this.hasMore.set(response.hasMore);
        this.nextPage = response.page + 1;
        queueMicrotask(() => this.tryLoadNextPage());
      },
      error: () => {
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}

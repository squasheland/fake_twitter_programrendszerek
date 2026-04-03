import { Component, ChangeDetectionStrategy, inject, input, signal, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import type { TweetResponse } from '../../../../../../common/tweet/TweetResponse';
import { UserMenuComponent } from '../../user-menu/user-menu.component';
import { TweetTimeComponent } from './tweet-time/tweet-time.component';
import { TweetService } from '../../../service/tweet.service';

@Component({
  selector: 'app-tweet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, MatIconButton, UserMenuComponent, TweetTimeComponent],
  templateUrl: './tweet.component.html',
  styleUrls: ['../feed.component.scss', './tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  tweet = input.required<TweetResponse>();

  private tweetService = inject(TweetService);

  protected isLiked = signal(false);
  protected likeCount = signal(0);
  protected isLikeLoading = signal(false);

  ngOnInit(): void {
    this.isLiked.set(this.tweet().isLiked);
    this.likeCount.set(this.tweet().likesCount);
  }

  protected onLikeClick(): void {
    if (this.isLikeLoading()) return;

    const wasLiked = this.isLiked();
    const prevCount = this.likeCount();

    this.isLiked.set(!wasLiked);
    this.likeCount.set(wasLiked ? prevCount - 1 : prevCount + 1);
    this.isLikeLoading.set(true);

    this.tweetService.handleLike(this.tweet().id).subscribe({
      next: (response) => {
        this.isLiked.set(response.isLiked);
        this.likeCount.set(response.likesCount);
        this.isLikeLoading.set(false); 
      },
      error: () => {
        this.isLiked.set(wasLiked);
        this.likeCount.set(prevCount);
        this.isLikeLoading.set(false);
      },
    });
  }
}

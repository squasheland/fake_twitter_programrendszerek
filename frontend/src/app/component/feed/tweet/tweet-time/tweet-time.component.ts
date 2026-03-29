import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tweet-time',
  imports: [DatePipe],
  templateUrl: './tweet-time.component.html',
  styleUrl: './tweet-time.component.scss',
  providers: [DatePipe],
})
export class TweetTimeComponent {
  date = input.required<Date | string>();

  private datePipe = inject(DatePipe);

  relativeTime = computed(() => {
    const now = new Date();
    const then = new Date(this.date());
    const diffMs = now.getTime() - then.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMin < 60) return `${diffMin}p`;
    else if (diffDays < 1) return `${Math.floor(diffMin / 60)}ó`;
    else if (diffYears < 1) return this.datePipe.transform(then, 'MMM d') ?? '';
    else return this.datePipe.transform(then, 'y. MMM d.') ?? '';
  });

  fullDate = computed(() => new Date(this.date()));
}

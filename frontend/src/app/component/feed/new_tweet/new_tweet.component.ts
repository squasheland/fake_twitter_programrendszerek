import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule} from '@angular/material/button';
import {form, FormField} from '@angular/forms/signals';
import { TweetService } from '../../../service/tweet.service';

@Component({
  selector: 'app-new-tweet',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormField, TextFieldModule],
  templateUrl: './new_tweet.component.html',
  styleUrl: './new_tweet.component.scss',
})
export class NewTweetComponent {
  tweetForm = form(signal({content: ''}));
  tweetService = inject(TweetService);


  sendTweet(event: Event) {
    event.preventDefault();

    console.log('Content: ',this.tweetForm.content().value());
    console.log("Tweet sent!");

    this.tweetService.postTweet(this.tweetForm.content().value()).subscribe({
      next: (response) => {
        console.log('Tweet posted successfully:', response);
      },
      error: (error) => {
      }
    });

    this.tweetForm.content().value.set('');
  }

}

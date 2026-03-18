import { Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule} from '@angular/material/button';
import {form, FormField} from '@angular/forms/signals';

@Component({
  selector: 'app-new-tweet',
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormField, TextFieldModule],
  templateUrl: './new_tweet.component.html',
  styleUrl: './new_tweet.component.scss',
})
export class NewTweetComponent {
  tweetForm = form(signal({content: ''}));

  sendTweet(event: Event) {
    event.preventDefault();

    console.log('Content: ',this.tweetForm.content().value());
    console.log("Tweet sent!");

    this.tweetForm.content().value.set('');
  }
}

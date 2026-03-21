import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-tweet',
  imports: [NgOptimizedImage, MatIcon, MatIconButton],
  templateUrl: './tweet.component.html',
  styleUrls: [ '../feed.component.scss', './tweet.component.scss'],
})
export class TweetComponent {}

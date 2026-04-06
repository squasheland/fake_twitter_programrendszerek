import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="profile-nav" role="tablist" aria-label="Profile sections">
      <button role="tab" [attr.aria-selected]="true" class="tab active">Tweets</button>
      <button role="tab" [attr.aria-selected]="false" class="tab">Responses</button>
      <button role="tab" [attr.aria-selected]="false" class="tab">Likes</button>
    </nav>
  `,
  styles: [`
    .profile-nav {
      display: flex;
      border-bottom: 1px solid #e1e8ed;
    }
    .tab {
      flex: 1;
      padding: 14px 0;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      color: grey;
    }
    .tab:focus-visible {
      outline: 2px solid #1da1f2;
      outline-offset: -2px;
    }
    .tab.active {
      border-bottom-color: #1da1f2;
      color: #1da1f2;
    }
  `],
})
export class ProfileNavComponent {}

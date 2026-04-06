import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../service/user.service';
import type { UserResponse } from '../../../../../../common/user/UserResponse';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private userService = inject(UserService);

  protected readonly currentUser = signal<UserResponse | null>(null);

  ngOnInit(): void {
    const username = this.userService.getCurrentUserName();
    if (username) {
      this.userService.getUserProfile(username).subscribe({
        next: (profile) => this.currentUser.set(profile),
        error: () => {},
      });
    }
  }
}

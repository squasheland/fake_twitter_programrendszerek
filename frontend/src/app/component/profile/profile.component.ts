import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import type { UserResponse } from '../../../../../common/user/UserResponse';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProfileHeaderComponent, ProfileNavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  protected readonly profile = signal<UserResponse | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) {
      this.error.set('No username provided');
      this.isLoading.set(false);
      return;
    }

    this.userService.getUserProfile(username).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('User not found');
        this.isLoading.set(false);
      },
    });
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { UserResponse } from '../../../../../../common/user/UserResponse';

@Component({
  selector: 'app-profile-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input.required<UserResponse>();

  protected readonly hasRealPfp = computed(() => {
    const pfp = this.profile().pfp;
    return !!pfp && (pfp.startsWith('http://') || pfp.startsWith('https://'));
  });

  protected readonly avatarInitial = computed(() =>
    this.profile().displayName.charAt(0).toUpperCase()
  );
}

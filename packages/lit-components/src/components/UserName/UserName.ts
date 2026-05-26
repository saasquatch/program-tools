import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { UserNameView } from './UserNameView';
import { useDemoUserName, useUserName } from './useUserName';

export interface UserNameProps {
  fallbackText: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-user-name': HTMLElement;
  }
}

export const UserName = useComponent<UserNameProps>(
  (host) => {
    const props: UserNameProps = {
      fallbackText: 'Anonymous',
      ...getProps(host),
    };

    const hookProps = isDemo() ? useDemoUserName(props) : useUserName(props);

    return UserNameView({ ...props, ...hookProps });
  },
  'sql-user-name',
  ['fallback-text'] as const
);

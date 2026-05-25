import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { LogoutCurrentUserView } from './LogoutCurrentUserView';
import { useLogoutCurrentUser } from './useLogoutCurrentUser';

export interface LogoutCurrentUserProps {
  buttonText: string;
  buttonType: 'primary' | 'secondary' | 'danger' | 'text';
  size: 'small' | 'medium' | 'large';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-logout-current-user': HTMLElement;
  }
}

export const LogoutCurrentUser = useComponent<LogoutCurrentUserProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<LogoutCurrentUserProps>;
    const buttonType = rawProps.buttonType;
    const size = rawProps.size;
    const props: LogoutCurrentUserProps = {
      buttonText: rawProps.buttonText || 'Logout',
      buttonType:
        buttonType === 'primary' || buttonType === 'secondary' || buttonType === 'danger'
          ? buttonType
          : 'text',
      size: size === 'small' || size === 'large' ? size : 'medium',
    };

    const hookProps = useLogoutCurrentUser();

    return LogoutCurrentUserView({ ...props, ...hookProps });
  },
  'sql-logout-current-user',
  ['button-text', 'button-type', 'size'] as const
);

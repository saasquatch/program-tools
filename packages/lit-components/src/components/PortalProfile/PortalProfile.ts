import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalProfileView } from './PortalProfileView';
import { usePortalProfile } from './usePortalProfile';

export interface PortalProfileProps {
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  submitLabel: string;
  headerText: string;
  showCountry: boolean;
  countryLabel: string;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-profile': HTMLElement;
  }
}

export const PortalProfile = useComponent<PortalProfileProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalProfileProps, unknown>>;
    const props: PortalProfileProps = {
      firstNameLabel: typeof rawProps.firstNameLabel === 'string' ? rawProps.firstNameLabel : 'First Name',
      lastNameLabel: typeof rawProps.lastNameLabel === 'string' ? rawProps.lastNameLabel : 'Last Name',
      emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Save Changes',
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Profile',
      showCountry: parseBoolean(rawProps.showCountry, false),
      countryLabel: typeof rawProps.countryLabel === 'string' ? rawProps.countryLabel : 'Country',
    };

    const hookProps = usePortalProfile(props);

    return PortalProfileView({ ...props, ...hookProps });
  },
  'sql-portal-profile',
  ['first-name-label', 'last-name-label', 'email-label', 'submit-label', 'header-text', 'show-country', 'country-label'] as const
);

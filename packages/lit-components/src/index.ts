/**
 * Lit Components Library
 * Web components built with Lit and Haunted for state management
 */

// Export all components
export { CounterComponent } from './components/CounterComponent';
export * from './components/NavigationMenu';
export * from './components/NavigationSidebar';
export * from './components/NavigationSidebarItem';
export * from './components/CouponCode';
export * from './components/ReferralCode';
export * from './components/ReferralCodes';
export * from './components/ShareButton';
export * from './components/ShareCode';
export * from './components/ShareLink';
export * from './components/Route';
export * from './components/Router';
export * from './components/Tab';
export * from './components/Tabs';
export * from './components/BigStat';
export * from './components/Leaderboard';
export * from './components/LeaderboardRank';
export * from './components/DividedLayout';
export * from './components/StatContainer';
export * from './components/LinkButton';
export * from './components/Pagination';
export * from './components/PopupContainer';
export * from './components/ProgramExplainer';
export * from './components/ProgramExplainerStep';
export * from './components/Scroll';
export * from './components/CloseButton';
export * from './components/FormMessage';
export * from './components/Image';
export * from './components/Empty';
export * from './components/Brand';
export * from './components/TitledSection';
export * from './components/Hero';
export * from './components/HeroImage';
export * from './components/InputField';
export * from './components/CheckboxField';
export * from './components/DropdownField';
export * from './components/PasswordField';
export * from './components/NameFields';
export * from './components/RadioCard';
export * from './components/PortalContainer';
export * from './components/PortalLogin';
export * from './components/PortalRegister';
export * from './components/PortalForgotPassword';
export * from './components/PortalResetPassword';
export * from './components/PortalChangePassword';
export * from './components/PortalProfile';
export * from './components/PortalFooter';
export * from './components/PortalFrame';
export * from './components/ReferralTable';
export * from './components/RewardsTable';
export * from './components/InvoiceTable';
export * from './components/TableCell';
export * from './components/TableRow';
export * from './components/PayoutButtonScroll';
export * from './components/TaskCard';
export * from './components/Timeline';
export * from './components/TimelineEntry';
export * from './components/UserName';
export * from './components/QRCode';
export * from './components/ReferralCard';
export * from './components/ReferralIframe';
export * from './components/RewardExchangeList';
export * from './components/HeaderLogo';
export * from './components/TextSpan';
export * from './components/ProgramMenu';
export * from './components/LogoutCurrentUser';
export * from './components/TaxAndCash';
export * from './components/TaxAndCashDashboard';
export * from './components/BankingInfoForm';
export * from './components/PayoutDetailsCard';
export * from './components/PayoutStatusAlert';
export * from './components/UserInfoForm';
export * from './components/IndirectTaxForm';
export * from './components/DocusignForm';
export * from './components/WidgetVerification';
export * from './components/CodeVerification';
export * from './components/EmailVerification';
export * from './components/LeadForm';
export * from './components/EditProfile';
export * from './components/InstantAccessRegistration';
export * from './components/ReferredRegistration';
export * from './components/CardFeed';
export * from './components/BaseRegistration';
export * from './components/GoogleSignIn';

export * from './components/PortalEmailVerification';
export * from './components/PortalVerifyEmail';
export * from './components/PortalRegistrationForm';
export * from './components/PortalChangeMarketing';
export * from './components/PortalLogout';
export * from './components/PortalProtectedRoute';
export * from './components/PortalGoogleLogin';
export * from './components/PortalGoogleRegistrationForm';
export * from './components/MarketingEmailsCheckbox';
export * from './components/ContextRouter';
export * from './components/GraphQLClientProvider';

// Export hooks
export { HostContext, useHost, withHostProvider } from './hooks/useHost';

// Version
export const VERSION = '0.0.0';

import { setImplementation } from '@saasquatch/universal-hooks';
import * as haunted from 'haunted';

import { setUseHostImplementation } from '@saasquatch/component-boilerplate';

// Re-export useHost for component-boilerplate compatibility
import { useHost } from './hooks/useHost';

// UI adapter layer: configure Shoelace as the default UI implementation.
// To swap to a different framework, replace the next three statements with
// the corresponding bootstrap import and `setUI(<otherAdapter>)` call.
// Consumers can also call `setUI()` from this package's public API before
// any component renders to override the implementation at runtime.
import './ui/shoelace/bootstrap';
import { shoelaceUI } from './ui/shoelace';
import { setUI } from './ui';
setUI(shoelaceUI);

// Re-export the UI adapter contract so downstream consumers can plug in
// their own implementation without forking this package.
export { setUI, getUI, UI } from './ui';
export type { UIComponents } from './ui/types';

// Set Haunted as the implementation for universal-hooks
setImplementation(haunted);
setUseHostImplementation(useHost);

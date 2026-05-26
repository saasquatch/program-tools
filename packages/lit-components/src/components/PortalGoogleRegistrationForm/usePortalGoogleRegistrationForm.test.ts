import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];
  const values: unknown[] = [];

  return {
    setters,
    values,
    useState: vi.fn((initial: unknown) => {
      const index = setters.length;
      const setter = vi.fn();
      setters.push(setter);
      return [index < values.length ? values[index] : initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { usePortalGoogleRegistrationForm } from './usePortalGoogleRegistrationForm';

describe('usePortalGoogleRegistrationForm', () => {
  const props = {
    nextPage: '/next',
    redirectPath: '/verify-email',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submitLabel: 'Register',
    loginLabel: 'Sign in',
    confirmPasswordLabel: 'Confirm Password',
    confirmPassword: true,
    disablePasswordValidation: false,
    hideInputs: false,
    pageLabel: 'Register',
    loginPath: '/login',
    loginCTA: 'Already have an account?',
    requiredFieldErrorMessage: 'Cannot be empty',
    networkErrorMessage: 'Network request failed.',
    passwordMismatchErrorMessage: 'Passwords do not match.',
    invalidEmailErrorMessage: 'Must be a valid email address',
    formDisabledErrorMessage: 'Form disabled',
    meetsRequirementsText: 'Password has met all requirements',
    doesNotMeetRequirementsText: 'Password must meet the following requirements:',
    minErrorText: 'be a minimum of 8 characters',
    uppercaseErrorText: 'contain at least 1 uppercase character',
    lowercaseErrorText: 'contain at least 1 lowercase character',
    hasErrorText: 'contain at least 1 number or symbol',
    formKey: 'portal-form',
    googleButtonText: 'signup_with',
  } as const;

  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return the initial base state', () => {
    const result = usePortalGoogleRegistrationForm(props as any);

    expect(result.mode).toBe('base');
    expect(result.baseEmail).toBe('');
    expect(result.firstName).toBe('');
    expect(result.lastName).toBe('');
    expect(result.email).toBe('');
    expect(result.password).toBe('');
    expect(result.confirmPasswordValue).toBe('');
    expect(result.validationErrors).toEqual({});
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.passwordHelpText).toContain(props.doesNotMeetRequirementsText);
  });

  it('should validate an empty email on base submit', async () => {
    const result = usePortalGoogleRegistrationForm(props as any);
    const event = createEvent();

    await result.onBaseSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[7]).toHaveBeenCalledWith({ email: 'Cannot be empty' });
  });

  it('should validate an invalid email on base submit', async () => {
    universalHooksMock.values.push(undefined, 'invalid-email');
    const result = usePortalGoogleRegistrationForm(props as any);

    await result.onBaseSubmit(createEvent());

    expect(universalHooksMock.setters[7]).toHaveBeenCalledWith({
      email: 'Must be a valid email address',
    });
  });

  it('should transition to manual mode when the base form is valid', async () => {
    universalHooksMock.values.push(undefined, 'user@example.com');
    const result = usePortalGoogleRegistrationForm(props as any);

    await result.onBaseSubmit(createEvent());

    expect(universalHooksMock.setters[7]).toHaveBeenCalledWith({});
    expect(universalHooksMock.setters[4]).toHaveBeenCalledWith('user@example.com');
    expect(universalHooksMock.setters[8]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith('manual');
  });

  it('should decode google credentials and transition to google mode', () => {
    const payload = JSON.stringify({
      email: 'google@example.com',
      given_name: 'Ada',
      family_name: 'Lovelace',
    });
    const base64Payload = btoa(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    const credential = `header.${base64Payload}.signature`;
    const result = usePortalGoogleRegistrationForm(props as any);

    result.onGoogleInit(new CustomEvent('init-complete', { detail: { credential } }));

    expect(universalHooksMock.setters[10]).toHaveBeenCalledWith(credential);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('google@example.com');
    expect(universalHooksMock.setters[4]).toHaveBeenCalledWith('google@example.com');
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Ada');
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Lovelace');
    expect(universalHooksMock.setters[7]).toHaveBeenCalledWith({});
    expect(universalHooksMock.setters[8]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith('google');
  });

  it('should dispatch a navigate event for login', () => {
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = usePortalGoogleRegistrationForm(props as any);

    result.onLogin();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:navigate');
    expect(event.detail).toEqual({ path: '/login' });
  });

  it('should validate required fields on submit', async () => {
    const result = usePortalGoogleRegistrationForm(props as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[8]).toHaveBeenNthCalledWith(1, '');
    expect(universalHooksMock.setters[8]).toHaveBeenNthCalledWith(2, 'Cannot be empty');
  });

  it('should validate password requirements on submit', async () => {
    universalHooksMock.values.push(undefined, '', '', '', 'user@example.com', 'short', 'short');
    const result = usePortalGoogleRegistrationForm(props as any);

    await result.onSubmit(createEvent());

    expect(result.passwordHelpText).toContain(props.minErrorText);
    expect(result.passwordHelpText).toContain(props.uppercaseErrorText);
    expect(result.passwordHelpText).toContain(props.lowercaseErrorText);
    expect(result.passwordHelpText).toContain(props.hasErrorText);
    expect(universalHooksMock.setters[8]).toHaveBeenNthCalledWith(2, result.passwordHelpText);
  });

  it('should dispatch the submit event when the manual form is valid', async () => {
    universalHooksMock.values.push(
      'manual',
      'user@example.com',
      'Ada',
      'Lovelace',
      'user@example.com',
      'Valid123!',
      'Valid123!'
    );
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = usePortalGoogleRegistrationForm(props as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[9]).toHaveBeenNthCalledWith(1, true);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:portal-google-registration-submit');
    expect(event.detail).toEqual({
      mode: 'manual',
      formKey: 'portal-form',
      nextPage: '/next',
      redirectPath: '/verify-email',
      email: 'user@example.com',
      firstName: 'Ada',
      lastName: 'Lovelace',
      password: 'Valid123!',
      googleCredential: undefined,
    });
    expect(universalHooksMock.setters[9]).toHaveBeenNthCalledWith(2, false);
  });
});

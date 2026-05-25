import { useState } from '@saasquatch/universal-hooks';
import type { WidgetVerificationProps } from './WidgetVerification';

export function useWidgetVerification(props: WidgetVerificationProps) {
  const [verified, setVerified] = useState(false);
  const [step, setStep] = useState<'input' | 'verifying' | 'success' | 'error'>('input');

  function onVerify(code: string) {
    setStep('verifying');
    const event = new CustomEvent('sq:widget-verify', {
      bubbles: true,
      composed: true,
      detail: { type: props.verificationType, code },
    });
    document.dispatchEvent(event);
    setTimeout(() => {
      setVerified(true);
      setStep('success');
    }, 1000);
  }

  return { verified, step, onVerify };
}

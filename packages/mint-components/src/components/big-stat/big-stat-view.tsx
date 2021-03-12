import { h } from '@stencil/core';

export interface BigStatViewProps {
  statvalue: string;
}

export function BigStatView(props: BigStatViewProps, children) {
  return (
    <div part="stat-wrapper">
      <div part="stat-value" style={{ fontSize: 'var(--sl-font-size-x-large)', textAlign: 'center' }}>
        {props.statvalue}
      </div>
      <div part="stat-description" style={{ fontSize: 'var(--sl-font-size-small)', textTransform: 'uppercase', textAlign: 'center' }}>
        {children}
      </div>
    </div>
  );
}

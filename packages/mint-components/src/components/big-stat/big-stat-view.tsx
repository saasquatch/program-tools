import { h } from '@stencil/core';
export interface BigStatViewProps {
  statvalue: number;
  statdescription: string;
}

export function BigStatView(props: BigStatViewProps) {
  return (
    <div part="stat-wrapper">
      <div part="stat-value" style={{ fontSize: 'var(--sl-font-size-x-large)', textAlign: 'center' }}>
        {props.statvalue || 0}
      </div>
      <div part="stat-description" style={{ fontSize: 'var(--sl-font-size-small)', textTransform: 'uppercase', textAlign: 'center' }}>
        {props.statdescription}
      </div>
    </div>
  );
}

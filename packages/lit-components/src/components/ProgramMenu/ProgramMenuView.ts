import { html } from 'lit';
import { ProgramMenuItem, ProgramMenuProps } from './ProgramMenu';
import { useProgramMenu } from './useProgramMenu';

export function ProgramMenuView(props: ProgramMenuProps & ReturnType<typeof useProgramMenu>) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <sl-select
      value="${props.selected}"
      @sl-change=${(event: Event) => props.onSelect((event.target as HTMLInputElement).value)}
      ?disabled=${props.loading}
    >
      ${props.programs.map(
        (program: ProgramMenuItem) =>
          html`<sl-option value="${program.programId}"
            >${program.program?.name || program.programId}</sl-option
          >`
      )}
    </sl-select>
  `;
}

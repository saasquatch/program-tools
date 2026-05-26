import { html } from 'lit';
import { UI } from '../../ui';
import { ProgramMenuItem, ProgramMenuProps } from './ProgramMenu';
import { useProgramMenu } from './useProgramMenu';

export function ProgramMenuView(props: ProgramMenuProps & ReturnType<typeof useProgramMenu>) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${UI.Select({
      value: props.selected,
      onChange: (event: Event) => props.onSelect((event.target as HTMLInputElement).value),
      disabled: props.loading,
      children: html`${props.programs.map(
        (program: ProgramMenuItem) =>
          html`${UI.Option({ value: program.programId, children: program.program?.name || program.programId })}`
      )}`,
    })}
  `;
}

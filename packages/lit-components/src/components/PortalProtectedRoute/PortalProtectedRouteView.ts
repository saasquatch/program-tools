import { html } from 'lit';
import { UI } from '../../ui';
import type { PortalProtectedRouteProps } from './PortalProtectedRoute';
import { usePortalProtectedRoute } from './usePortalProtectedRoute';

export function PortalProtectedRouteView(
  _props: PortalProtectedRouteProps & ReturnType<typeof usePortalProtectedRoute>
) {
  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    ${_props.isAuthenticated ? html`<slot></slot>` : html`${UI.Spinner({})}`}
  `;
}

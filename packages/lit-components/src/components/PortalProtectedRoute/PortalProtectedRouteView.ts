import { html } from 'lit';
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
    ${_props.isAuthenticated ? html`<slot></slot>` : html`<sl-spinner></sl-spinner>`}
  `;
}

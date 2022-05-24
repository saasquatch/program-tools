export interface RouteProps {
  path: string;
}
/**
 * @uiName Route (for pages)
 */
export declare class SqmRoute {
  ignored: boolean;
  /**
   * @uiName Navigation path name
   */
  path: string;
  disconnectedCallback(): void;
  render(): any;
}

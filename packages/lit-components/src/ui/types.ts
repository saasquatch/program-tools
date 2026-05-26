/**
 * Framework-agnostic UI component contract.
 *
 * Every entry on `UIComponents` is a function that takes a normalized,
 * framework-neutral props object and returns a Lit `TemplateResult`.
 *
 * Concrete implementations (Shoelace today, anything else tomorrow) live in
 * `src/ui/<framework>/` and must satisfy this interface in full.
 *
 * Views consume these via the `UI` proxy in `src/ui/registry.ts` so they never
 * reference framework-specific tags such as `<sl-input>` directly.
 */
import type { TemplateResult } from 'lit';

/** Anything Lit can render inside an `html` template (`html`, strings, etc.). */
export type Renderable = TemplateResult | string | number | boolean | null | undefined;

export type UISize = 'small' | 'medium' | 'large';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'neutral'
  | 'warning'
  | 'danger'
  | 'text';

export type AlertVariant = 'primary' | 'success' | 'neutral' | 'warning' | 'danger';

export type BadgeVariant = 'primary' | 'success' | 'neutral' | 'warning' | 'danger';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type TooltipTrigger = 'click' | 'hover' | 'focus' | 'manual';

/** Shared base for every component: lets views forward `class`, `part`, `style`, etc. */
export interface CommonProps {
  className?: string;
  part?: string;
  exportparts?: string;
  style?: string;
  slot?: string;
  id?: string;
}

export interface InputProps extends CommonProps {
  label?: string;
  name?: string;
  value?: string;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  size?: UISize;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  helpText?: Renderable;
  error?: Renderable;
  passwordToggle?: boolean;
  prefix?: Renderable;
  suffix?: Renderable;
  children?: Renderable;
  onInput?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  onFocus?: (event: Event) => void;
}

export interface SelectProps extends CommonProps {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  size?: UISize;
  helpText?: Renderable;
  error?: Renderable;
  children?: Renderable;
  onChange?: (event: Event) => void;
  onBlur?: (event: Event) => void;
}

export interface OptionProps extends CommonProps {
  value: string;
  disabled?: boolean;
  children?: Renderable;
}

export interface CheckboxProps extends CommonProps {
  name?: string;
  value?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  size?: UISize;
  children?: Renderable;
  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
}

export interface ButtonProps extends CommonProps {
  variant?: ButtonVariant;
  size?: UISize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  pill?: boolean;
  outline?: boolean;
  caret?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  prefix?: Renderable;
  suffix?: Renderable;
  children?: Renderable;
  onClick?: (event: Event) => void;
}

export interface IconButtonProps extends CommonProps {
  name: string;
  label?: string;
  src?: string;
  disabled?: boolean;
  onClick?: (event: Event) => void;
}

export interface IconProps extends CommonProps {
  name?: string;
  src?: string;
  label?: string;
}

export interface BadgeProps extends CommonProps {
  variant?: BadgeVariant;
  pill?: boolean;
  pulse?: boolean;
  children?: Renderable;
}

export interface SpinnerProps extends CommonProps {}

export interface AlertProps extends CommonProps {
  variant?: AlertVariant;
  open?: boolean;
  closable?: boolean;
  duration?: number;
  icon?: Renderable;
  children?: Renderable;
}

export interface TooltipProps extends CommonProps {
  content?: string;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger | string;
  open?: boolean;
  disabled?: boolean;
  skidding?: number;
  distance?: number;
  hoist?: boolean;
  children?: Renderable;
}

export interface DialogProps extends CommonProps {
  label?: string;
  open?: boolean;
  noHeader?: boolean;
  children?: Renderable;
  onRequestClose?: (event: Event) => void;
  onAfterHide?: (event: Event) => void;
  onShow?: (event: Event) => void;
  onAfterShow?: (event: Event) => void;
}

export interface DropdownProps extends CommonProps {
  open?: boolean;
  placement?: TooltipPlacement;
  disabled?: boolean;
  trigger?: Renderable;
  hoist?: boolean;
  children?: Renderable;
  onShow?: (event: Event) => void;
  onHide?: (event: Event) => void;
}

export interface MenuProps extends CommonProps {
  children?: Renderable;
  onSelect?: (event: Event) => void;
}

export interface MenuItemProps extends CommonProps {
  value?: string;
  disabled?: boolean;
  type?: 'normal' | 'checkbox';
  checked?: boolean;
  children?: Renderable;
}

export interface TabGroupProps extends CommonProps {
  placement?: 'top' | 'bottom' | 'start' | 'end';
  activation?: 'auto' | 'manual';
  children?: Renderable;
  onTabShow?: (event: Event) => void;
}

export interface TabProps extends CommonProps {
  panel: string;
  active?: boolean;
  closable?: boolean;
  disabled?: boolean;
  children?: Renderable;
}

export interface TabPanelProps extends CommonProps {
  name: string;
  active?: boolean;
  children?: Renderable;
}

/**
 * The complete UI surface that every adapter must implement.
 * Adding a new entry here forces every adapter to satisfy it,
 * giving us compile-time guarantees that nothing is missing.
 */
export interface UIComponents {
  Input(props: InputProps): TemplateResult;
  Select(props: SelectProps): TemplateResult;
  Option(props: OptionProps): TemplateResult;
  Checkbox(props: CheckboxProps): TemplateResult;
  Button(props: ButtonProps): TemplateResult;
  IconButton(props: IconButtonProps): TemplateResult;
  Icon(props: IconProps): TemplateResult;
  Badge(props: BadgeProps): TemplateResult;
  Spinner(props: SpinnerProps): TemplateResult;
  Alert(props: AlertProps): TemplateResult;
  Tooltip(props: TooltipProps): TemplateResult;
  Dialog(props: DialogProps): TemplateResult;
  Dropdown(props: DropdownProps): TemplateResult;
  Menu(props: MenuProps): TemplateResult;
  MenuItem(props: MenuItemProps): TemplateResult;
  TabGroup(props: TabGroupProps): TemplateResult;
  Tab(props: TabProps): TemplateResult;
  TabPanel(props: TabPanelProps): TemplateResult;
}

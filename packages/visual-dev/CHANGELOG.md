# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

## [2.0.0] - 2023-09-07

### Changed

- Moved to webpack 5 build for storybook
- Update to Storybook 7
- Add code coverage with istanbul
- Components added
  - \<ButtonDropdownView>
    - New dropdown menu with button style handle
- Components changed
  - \<AlertView>
    - Update to new design system
  - \<ButtonView>
    - Update to new design system
    - Remove pill style
  - \<CheckboxView>
    - Update to new design system
  - \<DataTableView>
    - Update to new design system
  - \<GlobalStyle>
    - Update to new design system including new style tokens as CSS variables
    - Export font families, link styles, and typography styles as `FontFamilyRules`, `LinkRules`, and `TypographyRules` respectively.
  - \<IconView>
    - Add user, impact, and download icons added
  - \<InputView>
    - Update to new design system
  - \<LoadingSpinner>
    - Update to new design system
    - **Breaking** change exports to use dot notation
  - \<ModalView>
    - Update to new design system
    - Add new `maxWidth` prop
  - \<RadioView>
    - Update to new design system
  - \<RadioActionView>
    - Update to new design system
  - \<RadioCardView>
    - Update to new design system
  - \<SelectView>
    - Update to new design system
  - \<SwitchView>
    - Update to new design system
  - \<TabsView>
    - Update to new design system
  - \<TagView>
    - Update to new design system
  - \<TagInputView>
    - Update to new design system
  - \<TextAreaView>
    - Update to new design system
  - \<TextAreaView>
    - Update to new design system

## [1.9.0] - 2023-08-08

### Changed

- Components changed
  - \<AlertView>
    - Improved spacing when alert has no title
  - \<IconView>
    - Two new icons (cookie and upload)

## [1.8.0] - 2023-05-15

### Changed

- Components changed
  - \<BadgeView>
    - Changed name of the default badge prop from `info` to `default-style`
    - Added new badge style for `info`
  - \<GlobalStyle>
    - Added a new info colours as CSS variables
  - \<ModalContentView>
    - Added a new `maxHeight` prop
  - \<RadioCardView>
    - Improved handling of combined disabled and selected state (now shows selection)
    - Improved the look of the disabled state
  - \<SelectView>
    - Improved handling of the combobox multiselect width so it no longer always line breaks as soon as a tag is added

## [1.7.4] - 2023-05-08

### Changed

- \<CheckboxView> and \<SwitchView>
  - Fix a bug in onChange handling.

## [1.7.3] - 2023-05-04

### Changed

- Fixed a build issue which caused 1.7.2 changes to not be applied.

## [1.7.2] - 2023-05-03

### Changed

- Components changed
  - \<TagInput>
    - Reduce height to match normal inputs

## [1.7.1] - 2023-04-20

### Changed

- Updated license copyright to be in line with SaaSquatch open-source policy.

## [1.7.0] - 2023-04-06

### Added

- Added new demo hooks in stories to remove unnecessary repeat code.

  - `useComboboxDemo()`
  - `useMultiSelectDemo()`
  - `useSelectDemo()`

## [1.6.0] - 2023-04-03

### Added

- \<GlobalStyle>
  - `--sq-header-four` - new token for header size
- \<Icon>
  - New SVG's for the HubSpot Integration
- \<Alert>

  - Added props `textCritical` & `textWarning` to display a new text style alert banner without a background color

- New components added
  - \<Details>
    - Custom details component, used to show and hide content
  - \<ProgressBar>
    - Progress bar with configurable steps and styles

### Changed

- Components changed
  - \<LoadingSpinner>
    - Added `margin` prop to overwrite default margin
  - \<Modal>
    - Changed header font size from `--sq-font-size-header-one` to `--sq-font-size-header-three`
    - added cursor pointer to the close icon
  - \<RadioCard>
    - Added new `titleIconSlot`
  - \<Tabs>
    - Added bottom border to tabs containter

## [1.5.0] - 2023-03-01

### Added

- New components added
  - \<ScrollNav> - Side navigation that can be inserted into a page

### Changed

- Components changed
  - \<Button>
    - Fixed disable state handling
  - \<DataTable>
    - Added shimmer effect to loading skeleton
  - \<Icon>
    - Added props for css tooltip on icon hover
  - \<SelectView>
    - Added disabled item state
  - \<GlobalStyles>
    - Added color tokens for editor and docs site
    - Updated font sizes

## [1.4.0] - 2023-02-13

### Added

- \<GlobalStyle>
  - `--sq-border-radius-small` - new token for border radii
- \<Icon>
  - new svg's for first_badge, infinity, gift_filled, and data.
- \<RadioCard>
  - Prop for customCSS
  - Reduced inital height to 95px from 138px
- \<SelectView>
  - Add `padding-bottom: var(--sq-spacing-xxx-small)` when select is open to avoid bouncing when the menu is opened

### Changed

- Components changed
  - \<RadioCard>
    - Refactored `RadioCardGroupView` to now use dot notation `RadioCardView.GroupView`
    - Updated title & description props to now allow for `string | React.ReactNode`
    - Removed unnecessary ternary conditionals
    - Changed `min-height` from `138px` to `95px`
  - \<SelectView>
    - Remove extra padding causing icons to look misaligned inside of a ComboBox
  - \<Radio>
    - Fix radio alignment

## [1.3.0] - 2023-1-16

### Changed

- Added storyshots-puppeteer visual testing

- Components changed
  - \<SelectView>
    - Introduce the `FrameView` subview which allows list items to be specified in the controller. Used in place of `ListView`
    - Export previously internal helper views and function: `ItemView`, `ItemToNode`, and `ItemToString`
    - Support for combobox style multiselect, `tagSlot` is now rendered when using the `useCombobox` hook
  - \<Checkbox>
    - Fix a bug with checkbox labels not wrapping

## [1.2.1] - 2022-11-30

### Changed

- Components changed
  - \<Dropdown>
    - Fixed a visual regression with the upwards menu direction where there was an unnecessary gap between the handle and list

## [1.2.0] - 2022-11-29

### Added

- \<TagInput>
  - Added an input that supports tags before the functional input, can be used for tag or email input

### Changed

- Components changed
  - \<Accordion>
    - Fixed bug where the cursor would not enter pointer mode when hovering over the accordion facade
  - \<SelectView>
    - refactor such that \<Select> shares a codebase with \<SelectView> and its subcomponents.
    - Added support for the DownshiftJS multiselect hook, see stories for implementation details
  - \<ObjectFieldTemplate>
    - allow custom CSS properties on the fields container from `customCSS` in `ui:options`
  - \<RJSFCheckbox>
    - Support field labels from `ui:options`
  - \<Datatable>
    - `emptyGraphic` - added support for custom empty graphics displayed above `emptyContent`
    - `emptyFilterGraphic` - added support for custom empty graphics displayed above `emptyFilterContent`
  - \<RJSFInput>
    - `"ui:placeholder"` - support for input field placeholders
  - \<FieldTemplate>
    - allow custom CSS properties on the field from `customCSS` in `ui:options`
  - \<Badge>
    - `size` - added new "small" badge size (default is "medium")
  - \<IconButton>
    - Fix cursor not entering pointer mode when hovering button
  - \<DisplayDropdown>
    - Add a new style of select/dropdown component, typically used in table rows
  - \<GlobalStyle>
    - `--sq-surface-overlay` - new background color token for elements which overlay the main page surface
    - `--sq-surface-dark` - new dark background color token

## [1.1.1] - 2022-09-22

### Changed

- Components changed
  - \<Icon>
    - Removed center alignment from default icon styling, and added prop to overwrite existing styles and center the icon
  - \<Dropdown>
    - Change the look of the pill style dropdown so borders don't interfere with content

## [1.1.0] - 2022-09-21

### Added

- New components added

  - \<Slider> - slider style input
  - \<TableRow> - alternate to \<Row> that displays children cells directly (instead of mapping through an object)

- Added / Updated props to the following components:

  - \<Checkbox>

    - `customContainerCSS` - used to overwrite existing styles on the checkbox container
    - `label` - updated type to accept React nodes

  - \<DataTable>

    - `loading` - added a loading boolean
    - `loadingSlot` - loading slot to show a custom loading view
    - `headerSlot` - used to add custom header
    - `footerSlot` - used to add custom footer

  - \<Pagination>

    - `loading` - loading boolean which renders a skeleton when true
    - `hidePerPage` - configure how many items you would like to hide per page

  - \<Dropdown>

    - `emptyText` - text shown if no items are provided
    - `description` - description that appears below an items child
    - `sideDescription` - secondary item description that appears to the right of an items child
    - `checked` - displays a checkmark before the item
    - `placeholder` - displays text inside the button when no value is selected

  - \<Icon>

    - `cursor` - set the cursor property when icon is hovered (eg. "pointer")

  - \<Popover>

    - `padding` - apply a custom padding value

  - \<Select>

    - `empty` - added empty boolean
    - `emptySlot` - empty slot to show custom empty views
    - `emptySlot` - loading slot to show custom loading views
    - `customIcon` - allow custom icons other than the chevron

### Changed

- Components changed

  - \<Button>
    - decreased the size of the button by a couple pixels
    - added tab index to icon button for tabbing through form fields
    - updated icon size by a few pixels
  - \<Checkbox>
    - updated label prop
    - added customContainerCSS prop
  - \<DataTable>
    - added new props for empty, loading, header, & footer slots
    - added a table row slot
  - \<Pagination>
    - added new props for showing a specific number of items in the table as well as a loading boolean
  - \<Row>
    - Updated props to be of the correct type
  - \<Dropdown>
    - Updated to use correct naming pattern
    - added new props
  - \<Graphics>
    - added new id to fix graphics component
  - \<Icon>
    - added new prop
    - new svg's for link_box & open_tab
  - \<LoadingSpinner>
    - center aligned the spinner & added a width and height
  - \<Input>
  - \<Popover>
    - added a new prop
  - \<Select>
    - added new props
    - changed the html element type of the container from div button to accomadate tabbing through inputs in a form
  - \<GlobalStyle>
    - updated pixel sizing for our font sizing & line height CSS variables

- Updated the following components to use new CSS variables
  - \<Alert>
  - \<Badge>
  - \<Button>
  - \<Card>
  - \<DataTable>
  - \<Dropdown>
  - \<Form>
  - \<Input>
  - \<Modal>
  - \<RadioAction>
  - \<Select>
  - \<Select2>
  - \<Switch>
  - \<Tag>
  - \<TextArea>
  - \<Tooltip>

## [1.0.2] - 2022-08-02

### Changed

- Update global CSS variables to match new portal design system variables

## [1.0.1] - 2022-07-21

### Changed

- Fix icons in safari by adding width to svg
- Make Modal buttons more configurable
- More SVG icon options added
- Remove stopPropagation from select list to prevent conflict with Popper.js

## [1.0.0] - 2022-06-01

### Added

- New visual-dev components:
  - \<Accordion>
  - \<Alert>
  - \<ArrayFieldTemplate>
  - \<Avatar>
  - \<Badge>
  - \<Button>
  - \<Card>
  - \<Checkbox>
  - \<Combobox>
  - \<CopyWrapper>
  - \<DataTable>
  - \<Dropdown>
  - \<ErrorListTemplate>
  - \<FieldTemplate>
  - \<Form>
  - \<GlobalStyle>
  - \<Input>
  - \<List>
  - \<Modal>
  - \<ObjectFieldTemplate>
  - \<Popover>
  - \<Radio
  - \<RadioAction>
  - \<RadioCard>
  - \<Select>
  - \<Select2>
  - \<Switch>
  - \<Tabs>
  - \<Tag>
  - \<TextArea>
  - \<Tooltip>

[unreleased]: https://github.com/saasquatch/program-tools/compare/visual-dev%402.0.0...HEAD
[2.0.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%402.0.0
[1.9.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.9.0
[1.8.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.8.0
[1.7.4]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.7.4
[1.7.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.7.3
[1.7.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.7.2
[1.7.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.7.1
[1.7.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.7.0
[1.6.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.6.0
[1.5.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.5.0
[1.4.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.4.0
[1.3.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.3.0
[1.2.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.2.1
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.1.1
[1.1.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.1.0
[1.0.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.2
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.1
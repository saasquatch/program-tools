# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

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
    - refactor such that <Select> shares a codebase with <SelectView> and its subcomponents.
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
  - \<TableRow> - alternate to <Row> that displays children cells directly (instead of mapping through an object)

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
  - <GlobalStyle>
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

[unreleased]: https://github.com/saasquatch/program-tools/compare/visual-dev%401.2.0...HEAD
[1.2.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.2.0
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.1.1
[1.1.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.1.0
[1.0.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.2
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.1

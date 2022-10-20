# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Components changed
  - \<Select>
    - refactor such that <Select> shares a codebase with <SelectView> and its subcomponents.

## [1.1.1] - 2022-09-22

### Changed

- Components changed
  - \<Icon>
    - removed center alignment from default icon styling, and added prop to overwrite existing styles and center the icon
  - \<ObjectFieldTemplate>
    - allow custom CSS properties on the fields container

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

[unreleased]: https://github.com/saasquatch/program-tools/compare/visual-dev%401.1.1...HEAD
[1.1.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.1.1
[1.1.0]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.1.0
[1.0.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.2
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.1

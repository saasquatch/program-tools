# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.3] - 2022-09-

### Added

- New components added

  - \<Slider>
  - \<TableRow>

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
  - \<Badge>
  - \<Button>
  - \<Checkbox>
  - \<DataTable>
  - \<Pagination>
  - \<Row>
  - \<Dropdown>
  - \<Graphics>
  - \<Icon>
  - \<Input>
  - \<Popover>
  - \<Select>
  - \<Select2>

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

[unreleased]: https://github.com/saasquatch/program-tools/compare/visual-dev%401.0.3...HEAD
[1.0.3]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.3
[1.0.2]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.2
[1.0.1]: https://github.com/saasquatch/program-tools/releases/tag/%40saasquatch/visual-dev%401.0.1

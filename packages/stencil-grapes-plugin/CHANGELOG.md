# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2021-12-23

### Added

- Throws helpful errors for invalid JSON

## [1.0.1] - 2021-06-23

### Added

- Newly supported JS Doc tag:
  - @uiOptions - must be valid JSON

## [1.0.0] - 2021-04-21

### Added

- Initial release. Creates a grapesjs.js file to be used as a plugin for the GrapesJS Editor.
- uiSchema is generated from each component's JS Doc tags
  - Supported JS Doc tags:
    - @uiWidget
    - @uiOrder
    - @uiEnum
    - @uiEnumNames
    - @uiType

# Changelog

All notable changes to the File Upload Secure Validator module will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.1] - 2025-12-19

### Fixed
- Fixed all GitLab CI code quality warnings
  - Created .cspell.json with project-specific dictionary (FUSV, Stefanos, Petrakis, dcre)
  - Applied PHPCS auto-fixes using correct Drupal,DrupalPractice coding standard
  - Fixed line length warnings in test files (SettingsFormTest.php, ServiceIntegrationTest.php)
  - Removed LegacyRequirementsHook attribute causing PHPStan errors
  - Result: All PHPCS violations resolved (0 errors, 0 warnings)
  - All GitLab CI quality checks now passing

## [2.2.0] - 2025-12-19

### BREAKING CHANGES
- **Dropped support for Drupal 9.5 and Drupal 10**
  - Module now requires Drupal 11.0 or higher
  - Updated `core_version_requirement` to `^11`
  - Added module-level composer.json with Drupal ^11 requirement
  - PHP requirement remains >=8.1

### Added
- Comprehensive functional test coverage for file upload validation
  - FileUploadValidationTest.php with 7 test methods and 54 assertions
  - Tests for legitimate file validation (PDF, CSV, XML, DOCX, XLSX)
  - Tests for falsified extension detection
  - Tests for missing file error handling
- Comprehensive settings form test coverage
  - SettingsFormTest.php with 5 test methods and 44 assertions
  - Tests for form rendering and default values display
  - Tests for configuration saving and empty configuration handling
  - Tests for form access control and permissions
- Expanded kernel test coverage for configuration and service integration
  - Enhanced DefaultConfigTest.php (4 test methods)
  - New ServiceIntegrationTest.php (7 test methods and 66 assertions)
  - Tests for service registration and dependency injection
  - Tests for MIME type equivalence groups
  - Tests for configuration management

### Changed
- Fixed all Drupal 11.3+ deprecation warnings
  - Added #[RunTestsInSeparateProcesses] attribute to all test classes
  - Added #[LegacyRequirementsHook] attribute to hook_requirements()
- Improved test file path handling for better reliability
- Enhanced test assertions for better validation coverage

### Fixed
- Fixed Unit test data provider method to be static (PHPUnit requirement)
  - Made `fileUploadScenariosProvider()` method static
  - Removed `$this` usage from static method context
  - Fixed TranslatableMarkup object comparison in Unit tests
  - All GitLab CI tests now passing

### Technical Details
- Total new tests: 23 tests with 164 assertions
- All tests passing with zero deprecations
- Fully compatible with Drupal 11.3+ and PHP 8.4
- Test coverage includes functional, kernel, and form validation scenarios

## [2.1.0] - 2024-01-15

### Added
- GitLab CI integration for automated testing
- Minor code aesthetic improvements

### Changed
- Code cleanup and formatting improvements

## [2.0.1] - 2023-10-01

### Added
- Drupal 10 compatibility updates

### Fixed
- Updated dependencies for Drupal 10 support

## [2.0.0] - Initial Release

### Added
- Core file upload validation functionality
- MIME type detection using fileinfo extension
- MIME type equivalence groups configuration
- Settings form for managing MIME type equivalence groups
- Service for validating uploaded files
- Hook implementation for file validation

[Unreleased]: https://git.drupalcode.org/project/file_upload_secure_validator/-/compare/2.2.1...2.2.x
[2.2.1]: https://git.drupalcode.org/project/file_upload_secure_validator/-/compare/2.2.0...2.2.1
[2.2.0]: https://git.drupalcode.org/project/file_upload_secure_validator/-/compare/2.1.0...2.2.0
[2.1.0]: https://git.drupalcode.org/project/file_upload_secure_validator/-/compare/2.0.1...2.1.0
[2.0.1]: https://git.drupalcode.org/project/file_upload_secure_validator/-/compare/2.0.0...2.0.1
[2.0.0]: https://git.drupalcode.org/project/file_upload_secure_validator/-/releases/2.0.0

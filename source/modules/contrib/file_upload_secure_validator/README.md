# File Upload Secure Validator

A Drupal module that provides enhanced security for file uploads by validating that the actual file content matches the declared file extension and MIME type.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Maintainers](#maintainers)
- [License](#license)

## Overview

File Upload Secure Validator (FUSV) prevents malicious file uploads by detecting when a file's actual content doesn't match its declared extension. For example, it will block a PHP file renamed to have a `.txt` extension, protecting your site from potential security vulnerabilities.

This module uses the PHP `fileinfo` extension to detect the actual MIME type of uploaded files and compares it against the expected MIME type based on the file extension.

## Features

- **Real MIME Type Detection**: Uses PHP's fileinfo extension to determine the actual content type of uploaded files
- **Falsified Extension Detection**: Blocks files where the extension doesn't match the actual file content
- **MIME Type Equivalence Groups**: Configure groups of MIME types that should be considered equivalent (e.g., `text/csv` and `text/plain`)
- **Comprehensive Test Coverage**: 23 automated tests with 164 assertions covering functional, kernel, and form validation scenarios
- **Drupal 11.3+ Compatible**: Fully tested with Drupal 11.3 and PHP 8.4
- **User-Friendly Error Messages**: Clear feedback when file validation fails
- **Easy Configuration**: Simple admin form for managing MIME type equivalence groups

## Requirements

- **Drupal**: 11.0 or higher
- **PHP**: 8.1 or higher
- **PHP Extension**: fileinfo (typically enabled by default)

The module will automatically check for the fileinfo extension during installation and display a warning if it's not available.

## Installation

### Using Composer (Recommended)

```bash
composer require drupal/file_upload_secure_validator
drush en file_upload_secure_validator
```

### Manual Installation

1. Download the module from [Drupal.org](https://www.drupal.org/project/file_upload_secure_validator)
2. Extract to `modules/contrib/file_upload_secure_validator`
3. Enable the module:
   ```bash
   drush en file_upload_secure_validator
   ```

## Configuration

### Accessing the Settings

Navigate to: **Administration** → **Configuration** → **Media** → **File Upload Secure Validator**

Or use the direct path: `/admin/config/media/file_upload_secure_validator`

### MIME Type Equivalence Groups

Some file types may have multiple valid MIME types. You can configure equivalence groups to allow these variations:

1. Go to the settings page
2. Enter MIME type equivalence groups in CSV format (one group per line)
3. Example:
   ```
   text/csv,text/plain,application/csv
   text/xml,application/xml
   image/svg+xml,image/svg
   ```

### Default Equivalence Groups

The module includes sensible defaults for common file types:

- **CSV Files**: `text/csv`, `text/plain`, `application/csv`, etc.
- **XML Files**: `text/xml`, `application/xml`
- **SVG Images**: `image/svg+xml`, `image/svg`
- **Microsoft Office**: DOCX, XLSX equivalence groups
- **Certificate Files**: Various certificate MIME types

## How It Works

### Validation Process

1. User uploads a file through a Drupal file field
2. The module intercepts the upload using `hook_file_validate()`
3. The actual MIME type is detected using PHP's `finfo_file()` function
4. The detected MIME type is compared against the expected MIME type
5. If there's a mismatch (and no equivalence group allows it), the upload is rejected

### Example Scenarios

**✅ Allowed:**
- A legitimate PDF file with `.pdf` extension
- A CSV file detected as `text/plain` (in default equivalence group)
- An XML file with either `text/xml` or `application/xml` MIME type

**❌ Blocked:**
- A PHP file renamed to `.txt`
- An executable file renamed to `.pdf`
- Any file where the content doesn't match the extension

## Testing

The module includes comprehensive automated tests:

### Running Tests

#### All Tests
```bash
# Using DDEV
ddev exec SIMPLETEST_BASE_URL=https://your-site.ddev.site \
  SIMPLETEST_DB=mysql://db:db@db/db \
  vendor/bin/phpunit -c web/core web/modules/contrib/file_upload_secure_validator/tests

# Using Drush
drush test-run file_upload_secure_validator
```

#### Functional Tests Only
```bash
ddev exec SIMPLETEST_BASE_URL=https://your-site.ddev.site \
  vendor/bin/phpunit -c web/core \
  web/modules/contrib/file_upload_secure_validator/tests/src/Functional/
```

#### Kernel Tests Only
```bash
ddev exec SIMPLETEST_DB=mysql://db:db@db/db \
  vendor/bin/phpunit -c web/core \
  web/modules/contrib/file_upload_secure_validator/tests/src/Kernel/
```

### Test Coverage

- **Functional Tests**: 12 tests, 98 assertions
  - File upload validation (PDF, CSV, XML, DOCX, XLSX)
  - Falsified extension detection
  - Settings form functionality
  - Access control and permissions
  
- **Kernel Tests**: 11 tests, 66 assertions
  - Configuration management
  - Service registration and dependency injection
  - MIME type equivalence groups
  - Missing file handling

## Troubleshooting

### "Fileinfo extension not available" Warning

**Problem**: Installation warning about missing fileinfo extension.

**Solution**: 
- On Ubuntu/Debian: `sudo apt-get install php-fileinfo`
- On Windows: Uncomment `php_fileinfo.dll` in `php.ini`
- Restart your web server after installation

### Files Being Incorrectly Rejected

**Problem**: Legitimate files are being blocked.

**Solutions**:
1. Check if the file type has multiple valid MIME types
2. Add a MIME type equivalence group in the settings
3. Test with the actual file to see what MIME type is detected

### Permission Denied When Accessing Settings

**Problem**: Can't access `/admin/config/media/file_upload_secure_validator`

**Solution**: Ensure your user has the "Administer File Upload Secure Validator configuration" permission.

## Development

### Running Code Quality Checks

```bash
# PHP CodeSniffer
ddev exec vendor/bin/phpcs --standard=Drupal,DrupalPractice \
  web/modules/contrib/file_upload_secure_validator

# PHPStan
ddev exec vendor/bin/phpstan analyze \
  web/modules/contrib/file_upload_secure_validator
```

### Contributing

Contributions are welcome! Please:

1. Fork the repository on [Drupal.org](https://git.drupalcode.org/project/file_upload_secure_validator)
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a merge request

## Maintainers

- **Stefanos Petrakis** - [stefanos.petrakis](https://www.drupal.org/u/stefanospetrakis)
- **_dcre_** - [_dcre_](https://www.drupal.org/u/_dcre_)

## Support

- **Issue Queue**: [https://www.drupal.org/project/issues/file_upload_secure_validator](https://www.drupal.org/project/issues/file_upload_secure_validator)
- **Project Page**: [https://www.drupal.org/project/file_upload_secure_validator](https://www.drupal.org/project/file_upload_secure_validator)

## License

This project is licensed under the GPL-2.0-or-later license - see the [LICENSE.txt](LICENSE.txt) file for details.

## Related Modules

- **[Secure Form](https://www.drupal.org/project/secure_form)**: Protects forms from spam and malicious submissions
- **[File MIME Type Enforcer](https://www.drupal.org/project/file_mime_type_enforcer)**: Enforces file MIME type validation on file uploads
- **[MIME Detect](https://www.drupal.org/project/mimedetect)**: Alternative MIME type detection for uploaded files

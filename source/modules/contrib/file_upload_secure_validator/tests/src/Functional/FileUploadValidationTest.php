<?php

namespace Drupal\Tests\file_upload_secure_validator\Functional;

use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\field\Entity\FieldConfig;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\file\Entity\File;
use Drupal\node\Entity\NodeType;
use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests file upload validation through the file upload system.
 *
 * This test validates that the file_upload_secure_validator module correctly
 * intercepts file uploads and blocks files with mismatched MIME types.
 *
 * @group file_upload_secure_validator
 */
#[RunTestsInSeparateProcesses]
class FileUploadValidationTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'node',
    'file',
    'field',
    'file_upload_secure_validator',
  ];

  /**
   * A user with permission to create content.
   *
   * @var \Drupal\user\UserInterface
   */
  protected $webUser;

  /**
   * The content type for testing.
   *
   * @var \Drupal\node\Entity\NodeType
   */
  protected $contentType;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    // Create a content type for testing.
    $this->contentType = NodeType::create(
          [
            'type' => 'test_content',
            'name' => 'Test Content Type',
          ]
      );
    $this->contentType->save();

    // Create a file field on the content type.
    $this->createFileField('field_test_file', 'node', 'test_content');

    // Create a user with permissions to create content.
    $this->webUser = $this->drupalCreateUser(
          [
            'create test_content content',
            'edit own test_content content',
          ]
      );
  }

  /**
   * Tests that legitimate PDF files pass validation.
   */
  public function testLegitimatePdfFilePassesValidation() {
    $this->drupalLogin($this->webUser);

    // Get the path to a legitimate PDF test file.
    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_pdf.pdf';
    $this->assertFileExists($test_file, 'Test PDF file exists');

    // Upload the file programmatically.
    $file = File::create(
          [
            'uri' => $test_file,
            'filename' => 'test.pdf',
            'filemime' => 'application/pdf',
          ]
      );

    // Validate the file using the validation service.
    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);

    // Assert no errors were returned.
    $this->assertEmpty($errors, 'Legitimate PDF file passed validation');
  }

  /**
   * Tests that a file with falsified extension is blocked.
   */
  public function testFalsifiedExtensionIsBlocked() {
    $this->drupalLogin($this->webUser);

    // Get the path to a PDF file with .txt extension (falsified).
    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_pdf.txt';
    $this->assertFileExists($test_file, 'Test falsified file exists');

    // Upload the file programmatically.
    $file = File::create(
          [
            'uri' => $test_file,
            'filename' => 'test.txt',
            'filemime' => 'text/plain',
          ]
      );

    // Validate the file using the validation service.
    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);

    // Assert that errors were returned.
    $this->assertNotEmpty($errors, 'Falsified file was blocked');
    $this->assertCount(1, $errors, 'Exactly one error was returned');

    // Check that the error message is correct.
    $error_message = (string) $errors[0];
    $this->assertStringContainsString('problem with this file', $error_message);
    $this->assertStringContainsString('text/plain', $error_message);
    $this->assertStringContainsString('application/pdf', $error_message);
  }

  /**
   * Tests that CSV files pass validation.
   */
  public function testCsvFilePassesValidation() {
    $this->drupalLogin($this->webUser);

    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_csv.csv';
    $this->assertFileExists($test_file, 'Test CSV file exists');

    $file = File::create(
          [
            'uri' => $test_file,
            'filename' => 'test.csv',
            'filemime' => 'text/csv',
          ]
      );

    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);
    $this->assertEmpty($errors, 'CSV file passed validation');
  }

  /**
   * Tests that XML files pass validation.
   */
  public function testXmlFilePassesValidation() {
    $this->drupalLogin($this->webUser);

    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_xml.xml';
    $this->assertFileExists($test_file, 'Test XML file exists');

    $file = File::create(
          [
            'uri' => $test_file,
            'filename' => 'test.xml',
            'filemime' => 'text/xml',
          ]
      );

    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);
    $this->assertEmpty($errors, 'XML file passed validation');
  }

  /**
   * Tests that DOCX files pass validation.
   */
  public function testDocxFilePassesValidation() {
    $this->drupalLogin($this->webUser);

    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_docx.docx';
    $this->assertFileExists($test_file, 'Test DOCX file exists');

    $file = File::create(
          [
            'uri' => $test_file,
            'filename' => 'test.docx',
            'filemime' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ]
      );

    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);
    $this->assertEmpty($errors, 'DOCX file passed validation');
  }

  /**
   * Tests that XLSX files pass validation.
   */
  public function testXlsxFilePassesValidation() {
    $this->drupalLogin($this->webUser);

    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_xlsx.xlsx';
    $this->assertFileExists($test_file, 'Test XLSX file exists');

    $file = File::create(
          [
            'uri' => $test_file,
            'filename' => 'test.xlsx',
            'filemime' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ]
      );

    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);
    $this->assertEmpty($errors, 'XLSX file passed validation');
  }

  /**
   * Tests that missing files generate appropriate errors.
   */
  public function testMissingFileGeneratesError() {
    $this->drupalLogin($this->webUser);

    // Create a file object pointing to a non-existent file.
    $file = File::create(
          [
            'uri' => '/tmp/nonexistent_file.pdf',
            'filename' => 'missing.pdf',
            'filemime' => 'application/pdf',
          ]
      );

    $errors = \Drupal::service('file_upload_secure_validator')->validate($file);

    $this->assertNotEmpty($errors, 'Missing file generated an error');
    $this->assertCount(1, $errors, 'Exactly one error was returned');

    $error_message = (string) $errors[0];
    $this->assertStringContainsString('InvalidArgumentException', $error_message);
  }

  /**
   * Creates a file field on an entity.
   *
   * @param string $name
   *   The name of the field.
   * @param string $entity_type
   *   The entity type.
   * @param string $bundle
   *   The bundle.
   * @param array $settings
   *   Field storage settings.
   * @param array $field_settings
   *   Field instance settings.
   */
  protected function createFileField($name, $entity_type, $bundle, array $settings = [], array $field_settings = []) {
    $field_storage = FieldStorageConfig::create(
          [
            'entity_type' => $entity_type,
            'field_name' => $name,
            'type' => 'file',
            'settings' => $settings,
            'cardinality' => FieldStorageDefinitionInterface::CARDINALITY_UNLIMITED,
          ]
      );
    $field_storage->save();

    $field_config = FieldConfig::create(
          [
            'field_storage' => $field_storage,
            'bundle' => $bundle,
            'label' => 'Test File Field',
            'settings' => $field_settings,
          ]
      );
    $field_config->save();

    return $field_config;
  }

}

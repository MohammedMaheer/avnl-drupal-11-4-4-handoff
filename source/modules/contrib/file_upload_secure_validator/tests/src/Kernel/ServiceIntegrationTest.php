<?php

namespace Drupal\Tests\file_upload_secure_validator\Kernel;

use Drupal\file\Entity\File;
use Drupal\file\Validation\FileValidationEvent;
use Drupal\KernelTests\KernelTestBase;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;
use Symfony\Component\Validator\ConstraintViolationList;

/**
 * Tests the file_upload_secure_validator service integration.
 *
 * @group file_upload_secure_validator
 */
#[RunTestsInSeparateProcesses]
class ServiceIntegrationTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'file',
    'system',
    'user',
    'file_upload_secure_validator',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->installEntitySchema('user');
    $this->installEntitySchema('file');
    $this->installSchema('file', ['file_usage']);
    $this->installConfig(['file_upload_secure_validator']);
  }

  /**
   * Tests that the service is properly registered.
   */
  public function testServiceIsRegistered() {
    $service = \Drupal::service('file_upload_secure_validator');
    $this->assertNotNull($service, 'Service is registered and available');
    $this->assertInstanceOf(
          'Drupal\file_upload_secure_validator\Service\FileUploadSecureValidator',
          $service,
          'Service is an instance of FileUploadSecureValidator'
      );
    $eventSubscriber = \Drupal::service('file_upload_secure_validator.subscriber');
    $this->assertNotNull($eventSubscriber, 'Event subscriber is registered and available');
    $this->assertInstanceOf(
          'Drupal\file_upload_secure_validator\EventSubscriber\FileValidationSubscriber',
          $eventSubscriber,
          'Event subscriber is an instance of FileValidationSubscriber'
      );
  }

  /**
   * Tests that the service can be dependency injected.
   */
  public function testServiceDependencyInjection() {
    $container = \Drupal::getContainer();

    // Test that the service can be retrieved from the container.
    $this->assertTrue($container->has('file_upload_secure_validator'), 'Service is in the container');
    // Test that the event subscriber can be retrieved from the container.
    $this->assertTrue($container->has('file_upload_secure_validator.subscriber'), 'Event subscriber is in the container');

    $service = $container->get('file_upload_secure_validator');
    $this->assertNotNull($service, 'Service can be retrieved from container');
    $this->assertInstanceOf(
          'Drupal\file_upload_secure_validator\Service\FileUploadSecureValidator',
          $service,
          'Service retrieved from container is an instance of FileUploadSecureValidator'
      );
    $eventSubscriber = $container->get('file_upload_secure_validator.subscriber');
    $this->assertNotNull($eventSubscriber, 'Event subscriber can be retrieved from container');
    $this->assertInstanceOf(
          'Drupal\file_upload_secure_validator\EventSubscriber\FileValidationSubscriber',
          $eventSubscriber,
          'Event subscriber retrieved from container is an instance of FileValidationSubscriber'
      );
  }

  /**
   * Tests that the service validates files correctly.
   */
  public function testServiceValidatesFiles() {
    // Get the module path for test resources.
    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');
    $test_file_path = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_pdf.pdf';

    // Create a file entity.
    $file = File::create(
          [
            'uri' => $test_file_path,
            'filename' => 'test.pdf',
            'filemime' => 'application/pdf',
          ]
      );

    // Validate the file.
    $violations = $this->validateViaEvent($file);

    // Should have no errors for a legitimate PDF.
    $this->assertCount(0, $violations, 'No violations for a legitimate PDF file');
  }

  /**
   * Tests that the service uses configuration.
   */
  public function testServiceUsesConfiguration() {
    $config = \Drupal::configFactory()->getEditable('file_upload_secure_validator.settings');

    // Get the module path for test resources.
    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');

    // Test with a CSV file (which is in the equivalence groups).
    $csv_file_path = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_csv.csv';
    $csv_file = File::create(
          [
            'uri' => $csv_file_path,
            'filename' => 'test.csv',
            'filemime' => 'text/csv',
          ]
      );

    $violations = $this->validateViaEvent($csv_file);
    $this->assertCount(0, $violations, 'CSV file passes validation with default config');

    // Modify the configuration to remove CSV equivalence groups.
    $config->set('mime_types_equivalence_groups', [])->save();

    // CSV should still pass because the MIME types match exactly.
    $violations = $this->validateViaEvent($csv_file);
    $this->assertCount(0, $violations, 'CSV file still passes when MIME types match exactly');
  }

  /**
   * Tests that the service detects MIME type mismatches.
   */
  public function testServiceDetectsMismatch() {
    // Get the module path for test resources.
    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');

    // Test with a falsified file (PDF with .txt extension).
    $falsified_file_path = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_pdf.txt';
    $falsified_file = File::create(
          [
            'uri' => $falsified_file_path,
            'filename' => 'test.txt',
            'filemime' => 'text/plain',
          ]
      );

    $violations = $this->validateViaEvent($falsified_file);

    $this->assertNotEmpty($violations->count(), 'Falsified file generates errors');
    $this->assertCount(1, $violations, 'Exactly one error is returned');

    // Check the error message.
    $error_message = (string) $violations->get(0)->getMessage();
    $this->assertStringContainsString('problem with this file', $error_message);
  }

  /**
   * Tests that the service handles missing files gracefully.
   */
  public function testServiceHandlesMissingFiles() {
    // Create a file object pointing to a non-existent file.
    $missing_file = File::create(
          [
            'uri' => '/tmp/nonexistent_file_test.pdf',
            'filename' => 'missing.pdf',
            'filemime' => 'application/pdf',
          ]
      );

    $violations = $this->validateViaEvent($missing_file);

    $this->assertNotEmpty($violations->count(), 'Missing file generates errors');
    $this->assertEquals(1, $violations->count(), 'Exactly one error is returned');

    // Check that the error mentions the exception.
    $error_message = (string) $violations->get(0)->getMessage();
    $this->assertStringContainsString('InvalidArgumentException', $error_message);
  }

  /**
   * Tests that the service respects MIME type equivalence groups.
   */
  public function testServiceRespectsEquivalenceGroups() {
    // Get the module path for test resources.
    $module_path = \Drupal::service('extension.list.module')->getPath('file_upload_secure_validator');

    // Test with an XML file.
    // According to the default config, text/xml and application/xml
    // are equivalent.
    $xml_file_path = \Drupal::root() . '/' . $module_path . '/tests/src/Unit/resources/original_xml.xml';

    // Create a file with text/xml MIME type.
    $xml_file = File::create(
          [
            'uri' => $xml_file_path,
            'filename' => 'test.xml',
            'filemime' => 'text/xml',
          ]
      );

    $violations = $this->validateViaEvent($xml_file);
    $this->assertEmpty($violations->count(), 'XML file passes validation with text/xml MIME type');
  }

  /**
   * Validates a file using both the event subscriber and the service.
   *
   * This is used to test that the event subscriber properly integrates with
   * the service and that validation errors are added to the event violations
   * as expected.
   *
   * @param \Drupal\file\Entity\File $file
   *   The file to validate.
   *
   * @return \Symfony\Component\Validator\ConstraintViolationList
   *   The list of constraint violations.
   */
  protected function validateViaEvent(File $file): ConstraintViolationList {
    $violations = new ConstraintViolationList();
    $event = new FileValidationEvent($file, $violations);
    $dispatcher = \Drupal::service('event_dispatcher');
    $dispatcher->dispatch($event, FileValidationEvent::class);
    return $violations;
  }

}

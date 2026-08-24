<?php

namespace Drupal\Tests\file_upload_secure_validator\Functional;

use Drupal\Tests\BrowserTestBase;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests the file_upload_secure_validator settings form.
 *
 * @group file_upload_secure_validator
 */
#[RunTestsInSeparateProcesses]
class SettingsFormTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['file_upload_secure_validator'];

  /**
   * A user with permission to administer the module.
   *
   * @var \Drupal\user\UserInterface
   */
  protected $adminUser;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    // Create an admin user with permission to configure the module.
    $this->adminUser = $this->drupalCreateUser(
          [
            'administer file upload secure validator configuration',
          ]
      );
  }

  /**
   * Tests that the settings form renders correctly.
   */
  public function testSettingsFormRenders() {
    $this->drupalLogin($this->adminUser);
    $this->drupalGet('admin/config/media/file_upload_secure_validator');

    $this->assertSession()->statusCodeEquals(200);
    $this->assertSession()->pageTextContains('MIME types equivalence group(s)');
    $this->assertSession()->fieldExists('mime_types_equivalence_groups');
  }

  /**
   * Tests that default values are displayed in the form.
   */
  public function testDefaultValuesDisplay() {
    $this->drupalLogin($this->adminUser);
    $this->drupalGet('admin/config/media/file_upload_secure_validator');

    // Check that the textarea contains some default MIME types.
    $page_content = $this->getSession()->getPage()->getContent();
    $this->assertStringContainsString('text/csv', $page_content);
    $this->assertStringContainsString('text/xml', $page_content);
  }

  /**
   * Tests that configuration can be saved through the form.
   */
  public function testConfigurationSaving() {
    $this->drupalLogin($this->adminUser);
    $this->drupalGet('admin/config/media/file_upload_secure_validator');

    // Prepare new MIME type equivalence groups.
    $new_mime_groups = "test/mime1,test/mime2\ntest/mime3,test/mime4";

    // Submit the form with new values.
    $this->submitForm(
          [
            'mime_types_equivalence_groups' => $new_mime_groups,
          ], 'Save configuration'
      );

    // Check for success message - this confirms the form was submitted
    // and saved successfully.
    $this->assertSession()->pageTextContains('The configuration options have been saved.');

    // Verify configuration exists and is an array.
    $config = $this->config('file_upload_secure_validator.settings');
    $saved_groups = $config->get('mime_types_equivalence_groups');
    $this->assertIsArray($saved_groups, 'Saved configuration is an array');
  }

  /**
   * Tests that empty configuration can be saved.
   */
  public function testEmptyConfigurationSaving() {
    $this->drupalLogin($this->adminUser);
    $this->drupalGet('admin/config/media/file_upload_secure_validator');

    // Submit empty configuration.
    $this->submitForm(
          [
            'mime_types_equivalence_groups' => '',
          ], 'Save configuration'
      );

    // Check for success message.
    $this->assertSession()->pageTextContains('The configuration options have been saved.');

    // Verify empty configuration was saved.
    $config = $this->config('file_upload_secure_validator.settings');
    $saved_groups = $config->get('mime_types_equivalence_groups');

    $this->assertIsArray($saved_groups);
    $this->assertEmpty($saved_groups);
  }

  /**
   * Tests that only users with proper permissions can access the form.
   */
  public function testFormAccessControl() {
    // Test with anonymous user.
    $this->drupalGet('admin/config/media/file_upload_secure_validator');
    $this->assertSession()->statusCodeEquals(403);

    // Test with authenticated user without permissions.
    $regular_user = $this->drupalCreateUser();
    $this->drupalLogin($regular_user);
    $this->drupalGet('admin/config/media/file_upload_secure_validator');
    $this->assertSession()->statusCodeEquals(403);

    // Test with admin user.
    $this->drupalLogin($this->adminUser);
    $this->drupalGet('admin/config/media/file_upload_secure_validator');
    $this->assertSession()->statusCodeEquals(200);
  }

}

<?php

namespace Drupal\Tests\file_upload_secure_validator\Kernel;

use Drupal\KernelTests\KernelTestBase;
use PHPUnit\Framework\Attributes\RunTestsInSeparateProcesses;

/**
 * Tests that the installed config matches the default config.
 *
 * @group Config
 * @group file_upload_secure_validator
 */
#[RunTestsInSeparateProcesses]
class DefaultConfigTest extends KernelTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['file_upload_secure_validator'];

  /**
   * Tests if installed config is equal to the exported config.
   */
  public function testDefaultConfigurationExists() {
    $this->installConfig(['file_upload_secure_validator']);
    $config = $this->config('file_upload_secure_validator.settings');
    $this->assertNotNull($config->get('mime_types_equivalence_groups'));
  }

  /**
   * Tests that MIME type equivalence groups are properly structured.
   */
  public function testMimeTypesEquivalenceGroupsStructure() {
    $this->installConfig(['file_upload_secure_validator']);
    $config = $this->config('file_upload_secure_validator.settings');
    $mime_groups = $config->get('mime_types_equivalence_groups');

    // Should be an array.
    $this->assertIsArray($mime_groups, 'MIME type equivalence groups is an array');

    // Should not be empty.
    $this->assertNotEmpty($mime_groups, 'MIME type equivalence groups is not empty');

    // Each group should be an array.
    foreach ($mime_groups as $group) {
      $this->assertIsArray($group, 'Each MIME type equivalence group is an array');
      $this->assertNotEmpty($group, 'Each MIME type equivalence group is not empty');
    }
  }

  /**
   * Tests that default MIME type groups contain expected values.
   */
  public function testDefaultMimeTypeGroups() {
    $this->installConfig(['file_upload_secure_validator']);
    $config = $this->config('file_upload_secure_validator.settings');
    $mime_groups = $config->get('mime_types_equivalence_groups');

    // Flatten all MIME types for easier searching.
    $all_mime_types = [];
    foreach ($mime_groups as $group) {
      $all_mime_types = array_merge($all_mime_types, $group);
    }

    // Check for common MIME types that should be in the config.
    $expected_mime_types = [
      'text/csv' => TRUE,
      'text/xml' => TRUE,
      'image/svg+xml' => TRUE,
      // PDF should NOT be in equivalence groups.
      'application/pdf' => FALSE,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => TRUE,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => TRUE,
    ];

    foreach ($expected_mime_types as $mime_type => $should_exist) {
      if ($should_exist) {
        $this->assertContains($mime_type, $all_mime_types, "MIME type '$mime_type' is in equivalence groups");
      }
      else {
        $this->assertNotContains($mime_type, $all_mime_types, "MIME type '$mime_type' should not be in equivalence groups");
      }
    }
  }

  /**
   * Tests that configuration can be modified and saved.
   */
  public function testConfigurationCanBeModified() {
    $this->installConfig(['file_upload_secure_validator']);
    $config = $this->config('file_upload_secure_validator.settings');

    // Get the current groups.
    $original_groups = $config->get('mime_types_equivalence_groups');

    // Add a new test group.
    $new_group = ['test/mime-type1', 'test/mime-type2'];
    $modified_groups = $original_groups;
    $modified_groups[] = $new_group;

    // Save the modified configuration.
    $config_editable = \Drupal::configFactory()->getEditable('file_upload_secure_validator.settings');
    $config_editable->set('mime_types_equivalence_groups', $modified_groups);
    $config_editable->save();

    // Reload and verify the change.
    $config_reloaded = $this->config('file_upload_secure_validator.settings');
    $groups_after_save = $config_reloaded->get('mime_types_equivalence_groups');

    $this->assertCount(count($original_groups) + 1, $groups_after_save, 'New group was added');
    $this->assertEquals($new_group, $groups_after_save[count($groups_after_save) - 1], 'New group matches what was saved');
  }

}

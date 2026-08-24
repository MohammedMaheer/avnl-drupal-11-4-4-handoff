<?php

namespace Drupal\Tests\captcha_pack\Functional;

use Drupal\captcha\Entity\CaptchaPoint;
use Drupal\Tests\BrowserTestBase;

/**
 * Tests different captcha types.
 */
class CaptchaPackTests extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['captcha', 'captcha_pack', 'foo_captcha'];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * Testing the protection of the user log in form.
   */
  public function testCaptchaOnLoginForm() {
    // Create user and test log in without CAPTCHA.
    $user = $this->drupalCreateUser();
    $this->drupalLogin($user);

    // Log out again.
    $this->drupalLogout();

    // Set a CAPTCHA on login form.
    $this->setCaptcha('user_login_form', 'foo_captcha/Foo CAPTCHA');

    // Go to the login page and check the page response.
    $this->drupalGet('user/login');
    $this->assertSession()->statusCodeEquals(200);

    // Check if the page contains the description.
    $description = \Drupal::config('captcha.settings')->get('description');
    $this->assertSession()->pageTextContains($description);

    // Try to log in, which should fail.
    $edit = [
      'name' => $user->getUsername(),
      'pass' => $user->pass_raw,
      'captcha_response' => '?',
    ];
    $this->submitForm($edit, 'Log in', 'user-login-form');

    // Check for error message.
    $this->assertSession()->pageTextContains('The answer you entered for the CAPTCHA was not correct.');

    // Go to the login page and check the page response.
    $this->drupalGet('user/login');
    $this->assertSession()->statusCodeEquals(200);

    // Try to log in, which should work.
    $edit = [
      'name' => $user->getUsername(),
      'pass' => $user->pass_raw,
      'captcha_response' => 'foo',
    ];
    $this->submitForm($edit, 'Log in', 'user-login-form');

    $this->assertSession()->pageTextContains($user->getUsername());
  }

  /**
   * Helper function to set the captcha type.
   */
  public function setCaptcha($form_id, $captcha_type) {
    /** @var \Drupal\captcha\CaptchaPointInterface $captcha_point */
    $captcha_point = CaptchaPoint::load($form_id);

    if ($captcha_point) {
      $captcha_point->setCaptchaType($captcha_type);
    }
    else {
      $captcha_point = new CaptchaPoint([
        'formId' => $form_id,
        'captchaType' => $captcha_type,
      ], 'captcha_point');
    }
    $captcha_point->enable();

    $captcha_point->save();
  }

}

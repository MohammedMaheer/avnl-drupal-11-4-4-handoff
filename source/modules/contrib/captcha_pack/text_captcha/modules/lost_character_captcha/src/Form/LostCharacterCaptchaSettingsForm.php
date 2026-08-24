<?php

namespace Drupal\lost_character_captcha\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Function for the settings form.
 */
class LostCharacterCaptchaSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'lost_character_captcha_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['lost_character_captcha.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('lost_character_captcha.settings');
    // Form element for the number of characters to lose.
    $form['lost_character_captcha_quantity'] = [
      '#type' => 'select',
      '#title' => $this->t('Number of characters to lose'),
      '#default_value' => $config->get('lost_character_captcha_quantity'),
      '#description' => $this->t('Select how many characters should be lost in the CAPTCHA.'),
      '#options' => array_combine([1, 2, 3], [1, 2, 3]),
    ];
    // Form element for hinting.
    $form['lost_character_captcha_enable_hint'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Put "_" where the characters are lost as a hint'),
      '#default_value' => $config->get('lost_character_captcha_enable_hint'),
      '#description' => $this->t('Enable this option to make it easier to determine the lost characters.'),
    ];
    $default = 'information language interesting vocabulary communication computer security presentation infrastructure videotape yesterday xylophone workforce validation supervisor standalone multimedia grapefruit friendship aboriginal alphabetical agriculture atmosphere candidature catastrophe audiovisual fingerprint keyboard testimonial supervision supermarket temperature terminology telephonist ultraviolet scholarship spaceflight shoplifting punctuation screwdriver quarterback';
    // Form elements for the word pool.
    _text_captcha_word_pool_form_items($form,
      'lost_character_captcha_word_pool',
      'Word pool',
      'Enter the words to use, separated with spaces. Make sure every word is unambiguously recognizable when characters are lost. Avoid for example verbs, adverbs, plural forms, too short words, names. Also make sure the words are well known to your intended public.',
      $default
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $lost_quantity = (int) $form_state->getValue('lost_character_captcha_quantity');
    $hinting = (int) ($form_state->getValue('lost_character_captcha_enable_hint'));
    $min_length = 3 + 2 * $lost_quantity + (1 - $hinting);
    // Check the number of words in the pool.
    _text_captcha_word_pool_validate(
      'lost_character_captcha_word_pool',
      $form_state,
      3,
      $min_length,
      'The following words are too short (at least @minimum_length characters needed for the current settings of characters to lose and hinting): <div>@words</div>'
    );

    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('lost_character_captcha.settings');
    $config
      ->set('lost_character_captcha_enable_hint', (bool) $form_state->getValue('lost_character_captcha_enable_hint'))
      ->set('lost_character_captcha_quantity', $form_state->getValue('lost_character_captcha_quantity'));
    foreach ($form_state->getValues() as $label => $value) {
      if (strpos($label, 'lost_character_captcha_word_pool') !== FALSE) {
        $config->set($label, $value);
      }
    }
    $config->save();

    parent::SubmitForm($form, $form_state);
  }

}

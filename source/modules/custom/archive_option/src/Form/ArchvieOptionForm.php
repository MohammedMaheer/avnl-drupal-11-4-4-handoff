<?php  
/**  
 * @file  
 * Contains Drupal\welcome\Form\MessagesForm.  
 */  
namespace Drupal\archive_option\Form;  

use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class ArchvieOptionForm extends ConfigFormBase {  
/**  
   * {@inheritdoc}  
   */  
  protected function getEditableConfigNames() {  
    return [  
      'archive_option.adminsettings',  
    ];  
  }  

  /**  
   * {@inheritdoc}  
   */  
  public function getFormId() {  
    return 'archive_option_form';  
  }  
  /**  
   * {@inheritdoc}  
   */  
  public function buildForm(array $form, FormStateInterface $form_state) {  
    $config = $this->config('archive_option.adminsettings');  
    
    $node_types = \Drupal\node\Entity\NodeType::loadMultiple();
    $options = [];
    foreach ($node_types as $node_type) {
        $options[$node_type->id()] = $node_type->label();
    }
    
    $form['archive_option'] = [  
      '#type' => 'checkboxes',  
      '#title' => $this->t('Select Content Type'),  
      '#options' => $options,
      '#required' => true,
      '#description' => $this->t('Select content type'),  
      '#default_value' => $config->get('archive_option'),  
      '#prefix' => '<div id="contentTypeList" class="alignLeft">',
      '#suffix' => '</div>',
    ];
    $form['archive_section_start'] = [
        '#prefix' => '<div id="contentTypeAdays" class="alignRight">',
    ];
    foreach ($node_types as $node_type) {
        $form[$node_type->id().'_archive_days'] = [  
          '#type' => 'number',  
          '#title' => $this->t('Archive days for @type', ['@type' => $node_type->label()]),  
          '#name' => $node_type->id().'_archive_days',
          '#description' => $this->t('Content older than this many days will be archived. Default is 365 days.'),
          '#min' => 1,
          '#max' => 3650, // 10 years max
          '#states' => array(
            'visible' => array(
              ':input[name="archive_option['.$node_type->id().']"]' => array('checked' => TRUE),
            ),
          ),  
          '#default_value' => $config->get($node_type->id().'_archive_days') ?: 365,  
        ]; 
    }
    $form['archive_section_end'] = [
        '#suffix' => '</div>',
    ];
    return parent::buildForm($form, $form_state);  
  }
  /**  
   * {@inheritdoc}  
   */  
  public function validateForm (array &$form, FormStateInterface $form_state) {
        // INIT
        $values = $form_state->getValues();
        $node_types = \Drupal\node\Entity\NodeType::loadMultiple();
        $selected_node_type = array();
        foreach($values['archive_option'] as $node_type_id => $node_type_value){
            if($values['archive_option'][$node_type_id]!=""){
                $selected_node_type[] = $node_type_value;
            }
        }
        foreach($selected_node_type as $key => $value){
           foreach ($node_types as $node_type) {
               if($selected_node_type[$key] == $node_type->id()){
                    $field_name = $node_type->id().'_archive_days';
                    $field_name_value = $values[$field_name];
                    if($field_name_value == ""){
                        //$form_state->setErrorByName($field_name, t('Please enter digits value for '.$node_type->label()));
                    }
                    if (!preg_match("/^[0-9]+$/", $field_name_value)) {
                        //$form_state->setErrorByName($field_name, t('Please enter only digits value for '.$node_type->label()));
                    }
                }
            }
        }
        
                
  }
  /**  
   * {@inheritdoc}  
   */  
  public function submitForm(array &$form, FormStateInterface $form_state) {  
     
    parent::submitForm($form, $form_state);  
    $node_types = \Drupal\node\Entity\NodeType::loadMultiple();
    $values = $form_state->getValues();
    //var_dump($values);
    $checkArray = array();
    foreach ($values as $keys => $value) {
        foreach($node_types as $node_type){
            if($keys == $node_type->id().'_archive_days'){
                if($values[$keys] != ""){
                    $checkArray[$keys] = $values[$keys];
                }
            }
        }
    }
    
    $this->config('archive_option.adminsettings')->set('archive_option', $form_state->getValue('archive_option'))->save();  
    foreach($checkArray as $key => $vals){
        $this->config('archive_option.adminsettings')->set($key, $vals)->save();  
    }
  }  
}  

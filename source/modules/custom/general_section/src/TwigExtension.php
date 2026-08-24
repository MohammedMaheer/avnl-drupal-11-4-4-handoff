<?php
namespace Drupal\general_section;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
 
/**
 * Class DefaultService.
 *
 * @package Drupal\demo_module
 */
class TwigExtension extends AbstractExtension {
 
  /**
   * {@inheritdoc}
   * This function must return the name of the extension. It must be unique.
   */
  public function getName(): string {
    return 'block_display';
  }
 
  /**
   * In this function we can declare the extension function.
   */
  public function getFunctions(): array {
    return [
      new TwigFunction('get_email_with_format', [$this, 'get_email_with_format']),
      new TwigFunction('get_body_email_with_format', [$this, 'get_body_email_with_format']),
    ];
  }
  // email fild data convert
  public function get_email_with_format($emaildata) {
      $emaildata1 = '';
      if(!empty($emaildata)){
          foreach($emaildata as $data){
            $email_at = str_replace("@", "[at]", $data["value"]);
            $emaildata1 = str_replace(".", "[dot]",$email_at); 
          }     
        return $emaildata1;
      }else{
        return $emaildata;
      }
   
   }
// description part get email and convert
   public function get_body_email_with_format($edata) {
    //echo 'hi';exit;
    if(!empty($edata)){
        preg_match_all('/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/', $edata["#text"], $potentialEmails);
        $detail = [];
        $email = [];
        $i=0;
        foreach($potentialEmails as $pos){
          foreach($pos as $pos1){
          //print_r($pos1);
            $detail[] = $pos[$i];
            $email_at = str_replace("@", "[at]", $pos[$i]);
            $email[] = str_replace(".", "[dot]",$email_at);
            $i++;
          }
        }
      
      $edata = str_replace(array_values($detail),array_values($email),$edata);
      
      return $edata;
    }else{
      return $edata;
    }
   
   }
 
 }

?>

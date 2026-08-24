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
      $text = (string) ($edata['#text'] ?? '');
      preg_match_all('/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/', $text, $potentialEmails);
      $detail = $potentialEmails[0];
      $email = array_map(
        static fn(string $address): string => str_replace('.', '[dot]', str_replace('@', '[at]', $address)),
        $detail,
      );

      $edata = str_replace($detail, $email, $edata);
      
      return $edata;
    }else{
      return $edata;
    }
   
   }
 
 }

?>

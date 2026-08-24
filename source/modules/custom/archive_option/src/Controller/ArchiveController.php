<?php 
namespace Drupal\archive_option\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
//use Drupal\Core\Controller\EntityTypeInterface;

/**
 * Returns responses for module routes.
 */
class ArchiveController extends ControllerBase {
  /*
   * Archive Node Type Listing
   */  
  public function listing() {
        $node_types = \Drupal\node\Entity\NodeType::loadMultiple();
        $config = $this->config('archive_option.adminsettings'); 
        $items = [];
        $archive_options = $config->get('archive_option');
        if (is_array($archive_options)) {
            foreach($archive_options as $key => $value){
                if($value!=""){
                    foreach ($node_types as $node_type) {
                        if($node_type->id() == $value){
                            $title = $node_type->label();
                        }
                    }
                    $items[] = [
                      '#type' => 'link',
                      '#title' => $title,
                      '#url' => Url::fromRoute('archive_option.node_archive_list', [
                        'node_type' => str_replace('_', '-', $value),
                      ]),
                    ];
                }
            }
        }
        return array(
            '#title' => $this->t('Archive Listing'),
            '#theme' => 'item_list',
            '#items' => $items,
            '#attributes' => ['class' => ['archiveListingWrap', 'bulletText']],
            '#cache' => [
              'tags' => ['config:archive_option.adminsettings'],
              'contexts' => ['languages:language_url', 'user.permissions'],
            ],
        );
  }
  /*
   * Archive Node Type Listing With it's archive data
   */  
  public function archivedatalisting($node_type){
      // Convert hyphens back to underscores for machine name
      $node_type = str_replace('-', '_', $node_type);
      
      $node_types = \Drupal\node\Entity\NodeType::loadMultiple();
      $ntypeArray = array();
      foreach ($node_types as $nodetype) {
          if($nodetype->id() == $node_type){
              $ntypeArray[] = $nodetype->label();
          }
      }
      
      if(!empty($ntypeArray)){
        $config = $this->config('archive_option.adminsettings'); 
        $archive_options = $config->get('archive_option');
        
        // Check if this node type is configured for archiving
        if (!$archive_options || !isset($archive_options[$node_type]) || $archive_options[$node_type] === '') {
          throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
        }
        
        $title = $ntypeArray[0];
        
        // Get archived content
        $archived_content = $this->getArchivedContent($node_type);
        
        return array(
            '#title' => $this->t('@title Archive Listing', ['@title' => $title]),
            '#theme' => 'item_list',
            '#items' => $archived_content,
            '#empty' => $this->t('No archived content available.'),
            '#cache' => [
              'tags' => ['node_list:' . $node_type],
              'contexts' => ['url.path', 'user.permissions'],
            ],
        );
      }else{
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException();
      }
  }
  
  /*
   * Get archived content for a specific node type
   */
  private function getArchivedContent($node_type) {
    $config = $this->config('archive_option.adminsettings'); 
    
    // Map node type to filter field (from the module's existing logic)
    $type_to_filter = [
      'news' => 'field_single_date',
      'career_vacancy' => 'field_single_date_time',
      'downloads' => 'field_date',
      'events' => 'field_date_range',
      'message_board' => 'field_single_date',
      'procurement_manuals' => 'field_archive_date',
      'press_release' => 'field_single_date',
    ];
    
    $archival_days = $config->get($node_type . '_archive_days') ?: 365; // Default to 365 days
    $archived_items = [];
    
    // Get archived nodes
    $query = \Drupal::entityQuery('node')
      ->condition('type', $node_type)
      ->condition('status', 1)
      ->sort('created', 'DESC')
      ->accessCheck(TRUE);
      
    // Add date filter if the field exists
    if (isset($type_to_filter[$node_type])) {
      $cutoff_date = date('Y-m-d', strtotime('-' . $archival_days . ' days'));
      $date_field = $type_to_filter[$node_type];
      
      // Try to add date condition, but continue even if field doesn't exist
      try {
        $query->condition($date_field, $cutoff_date, '<');
      } catch (\Exception $e) {
        // Field doesn't exist, just continue without date filter
      }
    }
    
    $nids = $query->execute();
    
    if (!empty($nids)) {
      $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
      
      foreach ($nodes as $node) {
        $archived_items[] = [
          '#type' => 'link',
          '#title' => $node->getTitle(),
          '#url' => $node->toUrl(),
          '#attributes' => [
            'class' => ['archive-item-link'],
          ],
        ];
      }
    }
    
    return $archived_items;
  }
  
}


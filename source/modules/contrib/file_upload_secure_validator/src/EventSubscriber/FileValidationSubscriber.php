<?php

namespace Drupal\file_upload_secure_validator\EventSubscriber;

use Drupal\file\Validation\FileValidationEvent;
use Drupal\file_upload_secure_validator\Service\FileUploadSecureValidator;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Validator\ConstraintViolation;

/**
 * Event subscriber for validating file uploads using the Fileinfo extension.
 */
class FileValidationSubscriber implements EventSubscriberInterface {

  /**
   * Constructs the file validation subscriber.
   *
   * @param \Drupal\file_upload_secure_validator\Service\FileUploadSecureValidator $fileUploadSecureValidatorService
   *   The file upload secure validator service.
   */
  public function __construct(
    private readonly FileUploadSecureValidator $fileUploadSecureValidatorService,
  ) {}

  /**
   * Call the file validation service and add any error messages as violations.
   *
   * @param \Drupal\file\Validation\FileValidationEvent $event
   *   The file validation event.
   */
  public function onFileValidate(FileValidationEvent $event) {
    $file = $event->file;
    $violations = $event->violations;
    $errorMessages = $this->fileUploadSecureValidatorService->validate($file);
    if (count($errorMessages) == 1) {
      $message = array_shift($errorMessages);
      $violation = new ConstraintViolation($message, $message, [], $file, '', $file);
      $violations->add($violation);
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      FileValidationEvent::class => 'onFileValidate',
    ];
  }

}

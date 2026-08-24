<?php

namespace Drupal\general_security_patches\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Adds conservative application-level response security headers.
 */
class HeaderResponseSubscriber implements EventSubscriberInterface {

  /**
   * Adds headers that are safe for both public and administrative responses.
   */
  public function onResponse(ResponseEvent $event): void {
    $response = $event->getResponse();

    $response->headers->set('X-Content-Type-Options', 'nosniff');
    $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
    $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), payment=(), usb=()');

    if (!$response->headers->has('X-Frame-Options')) {
      $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
    }

    // Do not override Drupal's cacheability headers here. Page Cache, Dynamic
    // Page Cache, and reverse proxies must be able to honor Drupal metadata.
    $response->headers->remove('X-Powered-By');
    $response->headers->remove('X-Generator');
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents(): array {
    return [
      KernelEvents::RESPONSE => ['onResponse', -10],
    ];
  }

}

<?php

namespace Drupal\newsletter_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides an 'AddToAny' block.
 *
 * @Block(
 *   id = "newsletter_block",
 *   admin_label = @Translation("Newsletter Block"),
 * )
 */
class NewsletterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'newsletter_block',
    ];
  }

}

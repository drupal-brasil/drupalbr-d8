<?php

namespace Drupal\follow_buttons\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides an 'AddToAny' block.
 *
 * @Block(
 *   id = "follow_buttons_block",
 *   admin_label = @Translation("Follow buttons"),
 * )
 */
class FollowButtonsBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'follow_buttons',
    ];
  }

}

<?php

namespace Drupal\aura_sections\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Com ho fem' block.
 *
 * @Block(
 *   id = "aura_theme_comhofem",
 *   admin_label = @Translation("AURA Com ho fem"),
 *   category = @Translation("AURA Sections")
 * )
 */
class ComHofemBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'block__aura_theme_comhofem',
      '#attached' => [
        'library' => [
          'aura_sections/comhofem',
        ],
      ],
    ];
  }

}

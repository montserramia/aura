<?php

namespace Drupal\aura_sections\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a configurable Hero block.
 *
 * @Block(
 *   id = "aura_hero_block",
 *   admin_label = @Translation("AURA Hero Section"),
 *   category = @Translation("AURA Sections")
 * )
 */
class HeroBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'title' => $this->t('Com pot beneficiar la IA el teu projecte, pas a pas'),
      'subtitle' => $this->t('Un procés pensat perquè passis de la idea a la pràctica amb seguretat.'),
      'button_text' => $this->t('Parlem-ne amb calma'),
      'button_link' => '#contact',
      'background_video' => '/themes/custom/aura_theme/video/hero-1.webm',
      'background_video_poster' => '/themes/custom/aura_theme/images/20260318182325.png',
    ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->configuration;

    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Títol'),
      '#default_value' => $config['title'],
      '#required' => TRUE,
    ];

    $form['subtitle'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Subtítol'),
      '#default_value' => $config['subtitle'],
    ];

    $form['button_text'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Text del botó'),
      '#default_value' => $config['button_text'],
    ];

    $form['button_link'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Enllaç del botó'),
      '#default_value' => $config['button_link'],
      '#description' => $this->t('Permet #ancora interna o URL absoluta.'),
    ];

    $form['background_video'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Vídeo de fons (WEBM)'),
      '#default_value' => $config['background_video'],
    ];

    $form['background_video_poster'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Imatge pòster del vídeo (PNG/JPG)'),
      '#default_value' => $config['background_video_poster'],
      '#description' => $this->t('Mostrada mentre es carrega el vídeo. Ex: /themes/custom/aura_theme/images/frame_000.png'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    foreach ([
      'title',
      'subtitle',
      'button_text',
      'button_link',
      'background_video',
      'background_video_poster',
    ] as $field) {
      $this->configuration[$field] = $form_state->getValue($field);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'aura_hero',
      '#title' => $this->configuration['title'],
      '#subtitle' => $this->configuration['subtitle'],
      '#button_text' => $this->configuration['button_text'],
      '#button_link' => $this->configuration['button_link'],
      '#background_video' => $this->configuration['background_video'],
      '#background_video_poster' => $this->configuration['background_video_poster'],
      '#attached' => [
        'library' => [
          'aura_sections/hero',
        ],
      ],
    ];
  }

}

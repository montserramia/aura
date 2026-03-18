<?php

namespace Drupal\aura_stats\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller for article statistics.
 */
class StatsController extends ControllerBase {

  /**
   * Track a view for an article.
   *
   * @param int $nid
   *   The node ID.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   JSON response with new count.
   */
  public function trackView($nid) {
    $nid = (int) $nid;

    // Verificar que el node existeix
    $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
    if (!$node) {
      return new JsonResponse(['error' => 'Node not found'], 404);
    }

    $database = \Drupal::database();

    // Comprovar si ja existeix un registre
    $exists = $database->query(
      'SELECT totalcount FROM {node_counter} WHERE nid = :nid',
      [':nid' => $nid]
    )->fetchField();

    if ($exists !== FALSE) {
      // Actualitzar registre existent
      $database->query(
        'UPDATE {node_counter} SET totalcount = totalcount + 1, daycount = daycount + 1, timestamp = :timestamp WHERE nid = :nid',
        [':nid' => $nid, ':timestamp' => time()]
      );
    }
    else {
      // Crear nou registre
      $database->query(
        'INSERT INTO {node_counter} (nid, totalcount, daycount, timestamp) VALUES (:nid, 1, 1, :timestamp)',
        [':nid' => $nid, ':timestamp' => time()]
      );
    }

    // Obtenir el nou comptador
    $new_count = $database->query(
      'SELECT totalcount FROM {node_counter} WHERE nid = :nid',
      [':nid' => $nid]
    )->fetchField();

    return new JsonResponse([
      'success' => TRUE,
      'new_count' => (int) $new_count,
    ]);
  }

  /**
   * Track a like for an article.
   *
   * @param int $nid
   *   The node ID.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   JSON response with new count.
   */
  public function trackLike($nid) {
    $nid = (int) $nid;

    // Verificar que el node existeix
    $node = \Drupal::entityTypeManager()->getStorage('node')->load($nid);
    if (!$node) {
      return new JsonResponse(['error' => 'Node not found'], 404);
    }

    $database = \Drupal::database();

    try {
      // Comprovar si ja existeix un registre
      $exists = $database->query(
        'SELECT like_count FROM {aura_stats_likes} WHERE nid = :nid',
        [':nid' => $nid]
      )->fetchField();

      if ($exists !== FALSE) {
        // Actualitzar registre existent
        $database->query(
          'UPDATE {aura_stats_likes} SET like_count = like_count + 1 WHERE nid = :nid',
          [':nid' => $nid]
        );
      }
      else {
        // Crear nou registre
        $database->query(
          'INSERT INTO {aura_stats_likes} (nid, like_count) VALUES (:nid, 1)',
          [':nid' => $nid]
        );
      }

      // Obtenir el nou comptador
      $new_count = $database->query(
        'SELECT like_count FROM {aura_stats_likes} WHERE nid = :nid',
        [':nid' => $nid]
      )->fetchField();

      return new JsonResponse([
        'success' => TRUE,
        'new_count' => (int) $new_count,
      ]);
    }
    catch (\Exception $e) {
      return new JsonResponse([
        'success' => FALSE,
        'error' => $e->getMessage(),
        'new_count' => 0,
      ], 500);
    }
  }

}

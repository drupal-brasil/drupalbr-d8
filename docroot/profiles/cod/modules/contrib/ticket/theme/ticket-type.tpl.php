<?php
/**
 * @file
 * A basic template for ticket type entities
 *
 * Available variables:
 *   TODO: Add documentation.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
?>
<div class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <h3><?php print render($content['ticket_type_label']); ?></h3>
  <div class="content"<?php print $content_attributes; ?>>
    <?php print render($content['ticket_type_description']); ?>
  </div>
</div>

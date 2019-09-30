<?php
/**
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */
get_header();
global $temp_iframe_url;
?>
    <iframe src="<?=$temp_iframe_url?>" style="width:100%; height: 100%"></iframe>
<?php
get_footer();

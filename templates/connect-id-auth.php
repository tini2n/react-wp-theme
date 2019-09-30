<?php
/**
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */
get_header();
$home_url     = home_url();
$redirect_url = isset( $_GET['src_url'] ) && $_GET['src_url'] && strpos( esc_url( urldecode( $_GET['src_url'] ) ), $home_url ) === 0 ? esc_url( urldecode( $_GET['src_url'] ) ) : $home_url;
?>
<?php
get_footer();
?>

<script type="text/javascript">
    window.location='<?=$redirect_url?>'
</script>

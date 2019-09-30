<?php
/**
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */
get_header();
$subscription_id = isset( $_GET['s_id'] ) ? absint( $_GET['s_id'] ) : '';
$src_url         = $subscription_id ? add_query_arg( [ 'subscription' => $subscription_id ], home_url( '/' . Theme::SUBSCRIBE_SLUG ) ) : home_url( '/' . Theme::SUBSCRIBE_SLUG );
$redirect_url    = \modules\theme\ConnectId::get_login_url( false, $src_url );
?>
<?php
get_footer();
?>

<script type="text/javascript">
    window.location='<?=$redirect_url?>'
</script>

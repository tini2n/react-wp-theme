<?php get_header();
//var_dump(\modules\theme\ConnectId::get_login_url());
?>
    <div id="app"></div>
<?php

if ( isset( $_GET['to_oauth'] ) ) {
	?>
    <script>
        window.location.href='<?php \modules\theme\ConnectId::get_login_url() ?>'
    </script>
	<?php
}
get_footer();

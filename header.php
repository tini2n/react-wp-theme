<!DOCTYPE html>
<html <?php language_attributes() ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ) ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta name="theme-color" content="#de302f">
    <meta name="format-detection" content="telephone=no">
    <?php wp_head() ?>
	<?php if ( isset( $_GET['gtm_test'] ) ) { ?>
        <!-- Google Tag Manager -->
        <script>(function ( w, d, s, l, i ) {
                w[ l ]=w[ l ] || [];
                w[ l ].push( {
                    'gtm.start':
                        new Date().getTime(), event: 'gtm.js'
                } );
                var f                         =d.getElementsByTagName( s )[ 0 ],
                    j=d.createElement( s ), dl=l != 'dataLayer' ? '&l=' + l : '';
                j.async=true;
                j.src=
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore( j, f );
            })( window, document, 'script', 'dataLayer', 'GTM-PZTW2H9' );</script>
        <!-- End Google Tag Manager -->
	<?php } ?>
</head>
<body <?php body_class( 'with-hovers not-editor' ) ?>>
<?php if ( isset( $_GET['gtm_test'] ) ) { ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PZTW2H9"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->
<?php } ?>
<?php do_action( 'header' ) ?>


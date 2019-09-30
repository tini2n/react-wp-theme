<?php

namespace modules\shortcode;

use modules\shortcode\shortcodes\Ad;
use modules\shortcode\shortcodes\Article;
use modules\shortcode\shortcodes\Articles;
use modules\shortcode\shortcodes\Factbox;
use modules\shortcode\shortcodes\Quote;
use WPKit\Module\AbstractModuleInitialization;

use modules\article\Functions as ArticleFunctions;

/**
 * Class Initialization
 *
 * @package modules\shortcode
 */
class Initialization extends AbstractModuleInitialization {
	public function register_shortcodes() {
		new Factbox();
		new Article();
		new Quote();
		new Articles();
		new Ad();
	}

	public function add_action_current_screen() {
		$current_screen = get_current_screen();

		if ( class_exists( 'Shortcode_UI' ) && ! in_array( $current_screen->id, [
				ArticleFunctions::POST_TYPE,
			] ) ) {
			remove_action( 'media_buttons', [ \Shortcode_UI::get_instance(), 'action_media_buttons' ] );

			/*if ( $current_screen->id == Page::PAGE ) {
				add_action( 'edit_form_after_editor', function () {
					add_action( 'media_buttons', [ \Shortcode_UI::get_instance(), 'action_media_buttons' ] );
				} );
			}*/
		}
	}

	public function register_gallery_shortcode() {
		remove_shortcode( 'gallery' );
		add_shortcode( 'gallery', function ( $attr ) {
			return Functions::gallery_output( $attr );
		} );
	}


}

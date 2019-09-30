<?php

namespace modules\settings;

use modules\theme\Helpers;
use WPKit\Module\AbstractFunctions;
use WPKit\Query\PostsLoader;
use modules\article\Functions as ArticleFunctions;


/**
 * Class Functions
 *
 * @package modules\fact
 */
class Functions extends AbstractFunctions {
	const THEME_OPTIONS_NAME = 'theme_settings';
	const HOME_OPTIONS_NAME = 'home_settings';
	const ADS_OPTIONS_NAME = 'ads_settings';
	const FORMS_OPTIONS_NAME = 'formrequest_settings';

	const HOME_POST_FIELD_NAME_PREFIX = 'home-section-post-';
	public static $home_posts_sections = [ 3, 3, 2, 4, 2, 3, 3, 2, 3 ];

	public static function get_header_links_array() {
		$links_array = [];
		$fields      = [
			'header_tips_and_spill_link',
			'header_horse_market_link',
			'header_be_member_link',
			'header_external_login_link'
		];
		foreach ( $fields as $field ) {
			$links_array[ $field ] = esc_url( self::get_rwmb_theme_option( $field ) );
		}

		return $links_array;
	}

	public static function get_rwmb_theme_option( $field_id ) {

		return Helpers::get_rwmb_option( $field_id, self::THEME_OPTIONS_NAME );
	}

	public static function get_rwmb_ads_option( $field_id ) {

		return Helpers::get_rwmb_option( $field_id, self::ADS_OPTIONS_NAME );
	}

	public static function get_front_page_posts_query( $offset = 0 ) {

		$loader         = new PostsLoader( ArticleFunctions::POST_TYPE, array_sum( self::$home_posts_sections ) );
		$selected_posts = self::get_selected_front_posts();
		if ( $selected_posts ) {
			foreach ( $selected_posts as $key => $post_id ) {
				if ( $post_id ) {
					$loader->set_sticky_post( $key, $post_id );
				}
			}
		}
		if ( $offset ) {
			$loader->set_offset( absint( $offset ) );
		}

		return $loader->get_query();
	}

	public static function get_selected_front_posts() {
		$selected_posts = [];
		for ( $i = 0; $i < array_sum( self::$home_posts_sections ); $i ++ ) {
			$post_id          = Helpers::get_rwmb_option( self::HOME_POST_FIELD_NAME_PREFIX . $i, self::HOME_OPTIONS_NAME );
			$selected_posts[] = ( $post_id && get_post_status( absint( $post_id ) ) ) == 'publish' ? absint( $post_id ) : '';
		}

		return $selected_posts;
	}

	public static function get_front_articles_ids( $offset = 0 ) {
		$ids                   = [];
		$append_prepared_posts = Helpers::is_browser_request();
		$f_query               = self::get_front_page_posts_query( $offset );
		if ( $f_query->have_posts() ) {
			$f_query->post_count = count( $f_query->posts );
			while ( $f_query->have_posts() ) {
				$f_query->the_post();
				$id = get_the_ID();
				if ( $id ) {
					$ids[] = $id;
					if ( $append_prepared_posts ) {
						Helpers::add_prepared_post( $id, ArticleFunctions::get_post_array( $id ) );
					}
				}
			}
		}
		wp_reset_postdata();

		return $ids;
	}

	public static function get_footer_columns_data() {
		$l_col = self::get_rwmb_theme_option( 'footer_left_col' );
		$c_col = self::get_rwmb_theme_option( 'footer_center_col' );
		if ( $l_col ) {
			foreach ( $l_col as $i => $l_col_item ) {
				if ( $l_col_item && isset( $l_col_item['text'] ) && $l_col_item['text'] ) {
					$text                = $l_col_item['text'];
					$l_col[ $i ]['text'] = wpautop( $text );
				}
			}
		}
		if ( $c_col ) {
			foreach ( $c_col as $i => $c_col_item ) {
				if ( $c_col_item && isset( $c_col_item['text'] ) && $c_col_item['text'] ) {
					$text                = $c_col_item['text'];
					$c_col[ $i ]['text'] = wpautop( $text );
				}
			}
		}


		return [
			'left_col'   => $l_col,
			'center_col' => $c_col
		];
	}

	public static function get_footer_mail_tlf() {
		return self::get_rwmb_theme_option( 'footer_main_tlf' );
	}

	public static function get_connect_id_client_id() {
		return self::get_rwmb_theme_option( 'connect_id_client_id' );
	}

	public static function get_connect_id_client_secret() {
		return self::get_rwmb_theme_option( 'connect_id_client_secret' );
	}

	public static function get_custom_static_meta() {
		return self::get_rwmb_theme_option( 'head_custom_static_meta' );
	}

	public static function get_gtm_key() {
		return self::get_rwmb_theme_option( 'gtm_key_code' );
	}

	public static function get_supelocal_widget_url() {
		return self::get_rwmb_theme_option( 'innocode_widgets_superlocal' );
	}

	public static function get_tips_src_url() {
		return self::get_rwmb_theme_option( 'tips_settings_src_url' );
	}

	public static function get_horse_market_widget_url() {
		return self::get_rwmb_theme_option( 'innocode_widgets_horse_market' );
	}


	public static function get_custom_header_static_code() {
		return self::get_rwmb_theme_option( 'header_custom_code' );
	}

	public static function get_instagram_token() {
		return self::get_rwmb_theme_option( 'instagram_token' );
	}

	public static function get_instagram_user_id() {
		return self::get_rwmb_theme_option( 'instagram_user_id' );
	}

	public static function get_recaptcha_key() {
		return self::get_rwmb_theme_option( 'google_recaptcha_client_key' );
	}

	public static function get_recaptchan_secret() {
		return self::get_rwmb_theme_option( 'google_recaptcha_client_secret' );
	}

	public static function get_rwmb_formrequest_email( $form_type ) {
		return Helpers::get_rwmb_option( 'form_request_email_' . $form_type, self::FORMS_OPTIONS_NAME );
	}

	public static function get_subscriptions() {
		return self::get_rwmb_theme_option( 'connect_id_subscriptions_subscription' );
	}

	public static function get_fotoware_api_key() {
		return self::get_rwmb_theme_option( 'fotoware_api_key' );
	}


	public static function get_fotoware_app_name() {
		return self::get_rwmb_theme_option( 'fotoware_app_name' );
	}

	public static function get_gdpr_settings() {
		return [
			'gdpr_text'            => self::get_rwmb_theme_option( 'gdpr_text' ),
			'gdpr_button_text'     => self::get_rwmb_theme_option( 'gdpr_button_text' ),
			'gdpr_link_text'       => self::get_rwmb_theme_option( 'gdpr_link_text' ),
			'gdpr_link'            => self::get_rwmb_theme_option( 'gdpr_link' ),
			'gdpr_hidden_bar_text' => self::get_rwmb_theme_option( 'gdpr_hidden_bar_text' ),
		];
	}
}
<?php

/**
 * Class Helpers
 * @package modules\theme
 */

namespace modules\theme;


use WPKit\Fields\WPEditor;


class Helpers {
	private static $_prepared_posts = [];
	private static $_gallery_objects = [];

	private static $_content_ad_objects = [];
	const JSON_ARG_NAME = 'format';


	/**
	 * @param $field WPEditor
	 * @param bool $media
	 * @param array $additional_buttons
	 * @param bool $rewrite_buttons
	 *
	 * @return WPEditor
	 */
	public static function set_editor_field_settings( $field, $media = false, $additional_buttons = [], $rewrite_buttons = false ) {
		if ( $field instanceof WPEditor ) {
			$buttons = [
				'bold',
				'italic',
				'bullist',
				'numlist',
				'underline',
				'undo',
				'redo',
				'link',
				'unlink',
				'removeformat',
				'forecolor'
			];
			if ( $rewrite_buttons ) {
				$buttons = $additional_buttons;
			} else {
				$buttons = array_merge( $buttons, $additional_buttons );
			}
			$field->set_attribute( 'media_buttons', $media );
			$field->set_attribute( 'quicktags', false );
			$field->set_attribute( 'tinymce', [
				//'options'  => '',
				'toolbar1' => implode( ',', $buttons ),
				'toolbar2' => '',
				'toolbar3' => '',
				'toolbar4' => '',
				'plugins'  => 'tabfocus,paste,media,fullscreen,wordpress,wpeditimage,wplink,wpdialogs,table,lists'
			] );
		}

		return $field;
	}

	/**
	 * @param $thumbnail_id
	 * @param array $sizes_map
	 *
	 * @return array|null
	 */
	public static function prepare_thumbnail( $thumbnail_id, array $sizes_map, $caption_include = false ) {
		$thumbnail = null;

		if ( $thumbnail_id ) {
			$thumbnail = [
				'id'     => absint( $thumbnail_id ),
				'name'   => get_the_title( $thumbnail_id ),
				'alt'    => get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true ),
				'url'    => wp_get_attachment_url( $thumbnail_id ),
				'width'  => 0,
				'height' => 0,
				'sizes'  => [],
			];
			if ( $caption_include ) {
				$thumbnail['caption'] = get_post_field( 'post_excerpt', absint( $thumbnail_id ) );
			}

			if ( false !== ( $meta = wp_get_attachment_metadata( $thumbnail_id ) ) ) {
				$thumbnail = wp_parse_args( [
					'width'  => isset( $meta['width'] ) ? $meta['width'] : 0,
					'height' => isset( $meta['height'] ) ? $meta['height'] : 0,
				], $thumbnail );

				foreach (
					array_merge( [
						'' => 'original',
					], $sizes_map ) as $internal => $public
				) {
					if ( false !== ( $size = wp_get_attachment_image_src( $thumbnail_id, $internal ) ) ) {
						$thumbnail['sizes'][ $public ] = [
							'width'  => $size[1],
							'height' => $size[2],
							'url'    => $size[0],
						];
						$size_array                    = [ $size[1], $size[2] ];

						if ( false !== ( $srcset = wp_calculate_image_srcset( $size_array, $size[0], $meta, $thumbnail_id ) ) && false !== ( $sizes = wp_calculate_image_sizes( $size_array, $size[0], $meta, $thumbnail_id ) ) ) {
							$thumbnail['sizes'][ $public ] = wp_parse_args( [
								'srcset' => $srcset,
								'sizes'  => $sizes,
							], $thumbnail['sizes'][ $public ] );
						}
					}
				}
			}
		}

		return $thumbnail;
	}


	/**
	 * @param null $post_id
	 *
	 * @return string
	 */
	public static function get_post_fb_share_link( $post_id = null ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}

		return sprintf( 'https://www.facebook.com/sharer/sharer.php?u=%s', urlencode( wp_get_shortlink( $post_id ) ) );
	}

	/**
	 * @param $str
	 *
	 * @return mixed
	 */
	public static function str_replace_nb_letters( $str ) {

		return str_replace( [ 'å', 'Å', 'ø', 'Ø', 'æ', 'Æ' ], [ 'a', 'A', 'o', 'O', 'ae', 'AE' ], $str );
	}

	/**
	 * @return bool
	 */
	public static function is_development() {
		return in_array( static::get_environment(), [ 'development', 'stage' ] );
	}

	/**
	 * @return bool
	 */
	public static function is_production() {
		return static::get_environment() == 'production';
	}

	/**
	 * @return string
	 */
	public static function get_environment() {
		return defined( 'ENVIRONMENT' ) ? ENVIRONMENT : 'production';
	}

	/**
	 * @return string
	 */
	public static function get_assets_suffix() {
		return '';//static::is_production() ? '.min' : '';
	}

	public static function get_rwmb_meta( $field_id, $args = array(), $post_id = null ) {
		if ( function_exists( 'rwmb_meta' ) ) {
			return rwmb_meta( $field_id, $args, $post_id );
		}

		return null;
	}

	public static function get_rwmb_meta_value( $field_id, $args = array(), $post_id = null ) {
		if ( function_exists( 'rwmb_get_value' ) ) {
			return rwmb_get_value( $field_id, $args = array(), $post_id = null );
		}

		return null;
	}


	public static function get_rwmb_option( $field_id, $opt_page_slug ) {

		return self::get_rwmb_meta( $field_id, array( 'object_type' => 'setting' ), $opt_page_slug );
	}

	/**
	 * Get primary taxonomy term (YoastSEO).
	 *
	 * @param mixed $taxonomy Taxonomy to check for.
	 * @param boolean $term_as_obj Whether to return an object or the term name.
	 * @param int $post_id Post ID.
	 *
	 * @return mixed                The primary term.
	 */
	public static function get_primary_tax_term( $post_id = 0, $taxonomy = 'category', $term_as_obj = true ) {
		if ( 0 === $post_id ) {
			$post_id = get_the_ID();
		}
		$terms = get_the_terms( $post_id, $taxonomy );
		// Check if post has a tax term assigned.
		if ( $terms ) {
			if ( class_exists( 'WPSEO_Primary_Term' ) ) {
				// Show the post's 'Primary' term.
				// Check that the feature is available and that a primary term is set.
				$wpseo_primary_term = new \WPSEO_Primary_Term( $taxonomy, $post_id );
				$wpseo_primary_term = $wpseo_primary_term->get_primary_term();

				// Set the term object.
				$term_obj = get_term( $wpseo_primary_term );
				if ( is_wp_error( $term_obj ) ) {
					$term_obj = $terms[0];
				}
			} else {
				$term_obj = $terms[0];
			}
			if ( ! empty( $term_obj ) ) {
				return $term_as_obj ? $term_obj : $term_obj->name;
			}
		}

		return null;
	}

	public static function build_html_link( $attrs ) {
		$class    = isset( $attrs['class'] ) ? esc_html( $attrs['class'] ) : '';
		$href     = isset( $attrs['href'] ) ? esc_html( $attrs['href'] ) : '';
		$text     = isset( $attrs['text'] ) ? $attrs['text'] : '';
		$action   = isset( $attrs['action'] ) ? ' data-action="' . esc_html( $attrs['action'] ) . '" ' : '';
		$download = isset( $attrs['download'] ) && $attrs['download'] ? ' download ' : '';
		$item_id  = isset( $attrs['item_id'] ) ? $attrs['item_id'] : '';
		$target   = isset( $attrs['target'] ) ? $attrs['target'] : '';

		return sprintf( '<a href="%s" target="%s" class="%s" %s %s data-item_id="%s">%s</a>', $href, $target, $class, $action, $download, $item_id, $text );

	}

	public static function add_prepared_post( $post_id, $post_data ) {
		if ( ! isset( self::$_prepared_posts[ $post_id ] ) ) {
			self::$_prepared_posts[ $post_id ] = $post_data;
		}
	}

	public static function get_prepared_posts_array() {
		return self::$_prepared_posts;
	}

	public static function add_gallery_object( $key, $post_data ) {
		if ( ! isset( self::$_gallery_objects[ $key ] ) ) {
			self::$_gallery_objects[ $key ] = $post_data;
		}
	}

	public static function get_gallery_objects_array() {

		return self::$_gallery_objects;
	}
	public static function add_content_ad_object( $key, $post_data ) {
		if ( ! isset( self::$_content_ad_objects[ $key ] ) ) {
			self::$_content_ad_objects[ $key ] = $post_data;
		}
	}

	public static function get_content_ad_objects_array() {

		return self::$_content_ad_objects;
	}

	public static function is_browser_request() {
		return ! self::is_json_requested() && ! self::is_rest_request() && ! self::is_ajax_request();
	}

	public static function is_json_requested() {
		return isset( $_GET[ Helpers::JSON_ARG_NAME ] ) && $_GET[ Helpers::JSON_ARG_NAME ] == 'json';
	}

	public static function is_rest_request() {
		return defined( 'REST_REQUEST' ) && REST_REQUEST;
	}

	public static function is_ajax_request() {
		return ( defined( 'DOING_AJAX' ) && DOING_AJAX );
	}

	public static function is_page_template( $page_id, $template_name ) {
		$template = get_post_meta( $page_id, '_wp_page_template', true );
		if ( $template ) {
			$template = str_replace( [ 'templates/', '.php' ], [ '', '' ], $template );
		}

		return $template == $template_name;
	}


}
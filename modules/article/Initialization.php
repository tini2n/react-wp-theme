<?php

namespace modules\article;


use WPKit\Module\AbstractInitialization;
use WPKit\PostType\PostType;

use modules\ads\Functions as AdsFunctions;

/**
 * Class Initialization
 *
 * @package modules\fact
 */
class Initialization extends AbstractInitialization {

	/**
	 * @var PostType[]
	 */
	protected $_post_types = [];

	public function register_custom_post_types() {
		$post_type = new PostType( Functions::POST_TYPE, __( 'Article', TEXT_DOMAIN ), [
			'name'               => __( 'Article', TEXT_DOMAIN ),
			'singular_name'      => __( 'Article', TEXT_DOMAIN ),
			'add_new'            => __( 'Add Article', TEXT_DOMAIN ),
			'add_new_item'       => __( 'New Article', TEXT_DOMAIN ),
			'edit_item'          => __( 'Edit Article', TEXT_DOMAIN ),
			'new_item'           => __( 'New Article', TEXT_DOMAIN ),
			'all_items'          => __( 'All Articles', TEXT_DOMAIN ),
			'view_item'          => __( 'View Article', TEXT_DOMAIN ),
			'search_items'       => __( 'Search Article', TEXT_DOMAIN ),
			'not_found'          => __( 'No Article found', TEXT_DOMAIN ),
			'not_found_in_trash' => __( 'No Article found in Trash', TEXT_DOMAIN ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Articles', TEXT_DOMAIN ),
		] );
		$post_type->set_supports( [ 'title', 'thumbnail', 'editor', 'excerpt' ] );
		$post_type->set_hierarchical( false );
		$post_type->set_use_archive( false );
		$post_type->set_show_in_nav_menus( true );
		$post_type->set_rewrite( [ 'slug' => 'artikkel', 'with_front' => true ] );
		$post_type->set_menu_icon( 'dashicons-media-spreadsheet' );
		$this->_post_types[ Functions::POST_TYPE ] = $post_type;
		add_action( 'init', function () {
			register_taxonomy_for_object_type( Functions::CATEGORY, Functions::POST_TYPE );
			register_taxonomy_for_object_type( Functions::TAG, Functions::POST_TYPE );
		} );

	}

	public static function add_filter_rwmb_meta_boxes( $meta_boxes ) {
		$metabox_name = Functions::POST_TYPE . '_general';
		$fields       = [];
		$current_user = wp_get_current_user();
		$std          = $current_user ? $current_user->display_name : '';

		foreach ( Functions::$general_meta_fields as $key => $data ) {
			$field = [
				'name' => __( ucfirst( str_replace( '_', ' ', $key ) ), TEXT_DOMAIN ),
				'id'   => $metabox_name . '_' . $key,
			];
			$field = array_merge( $field, $data );
			if ( $key == 'text_by' ) {
				$field['std'] = $std;
			}

			$fields[] = $field;

		}
		$meta_boxes[] = [
			'id'         => $metabox_name . '_top',
			'title'      => __( 'Subtitle', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'context'    => 'form_top',
			'priority'   => 'high',
			'fields'     => [
				[
					'id'   => $metabox_name . '_top_subtitle',
					'name' => __( 'Subtitle', TEXT_DOMAIN ),
					'type' => 'text',
				],
			]
		];

		$meta_boxes[] = [
			'id'         => $metabox_name,
			'title'      => __( 'General', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'context'    => 'normal',
			'priority'   => 'high',
			'fields'     => $fields
		];
		$meta_boxes[] = [
			'id'         => Functions::POST_TYPE . '_add_images',
			'title'      => __( 'Additional images', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'context'    => 'side',
			'priority'   => 'low',
			'fields'     => [
				[
					'type'             => 'image_advanced',
					'id'               => 'additional_images',
					'name'             => __( 'Select images', TEXT_DOMAIN ),
					'force_delete'     => false,
					'max_file_uploads' => 10,
					'max_status'       => 'false',
					'image_size'       => 'thumbnail'
				]
			]
		];


		/// Tax side banners
		$fields = [];
		for ( $i = 1; $i <= AdsFunctions::ADS_PLACES['tag']['count']; $i ++ ) {
			$fields[] = [
				'name'       => __( 'Taxonomy banner ' . $i . ' Desktop', TEXT_DOMAIN ),
				'id'         => 'tax_object_ads_banners_' . $i,
				'type'       => 'post',
				'field_type' => 'select_advanced',
				'post_type'  => AdsFunctions::POST_TYPE
			];
			$fields[] = [
				'name'       => __( 'Taxonomy banner ' . $i . ' Mobile', TEXT_DOMAIN ),
				'id'         => 'tax_object_ads_banners_' . $i . '_mob',
				'type'       => 'post',
				'field_type' => 'select_advanced',
				'post_type'  => AdsFunctions::POST_TYPE
			];
		}
		$meta_boxes[] = [
			'id'         => 'tax_object_ads',
			'title'      => __( 'Taxonomy Archive Ads', TEXT_DOMAIN ),
			'taxonomies' => [ Functions::CATEGORY, Functions::TAG ],
			'priority'   => 'high',
			'fields'     => $fields
		];

		/// Article side banners
		$fields       = [];
		$fields[]     = [
			'name'       => __( 'Article banner Left', TEXT_DOMAIN ),
			'id'         => 'tax_article_object_ads_banners_1',
			'type'       => 'post',
			'field_type' => 'select_advanced',
			'post_type'  => AdsFunctions::POST_TYPE
		];
		$fields[]     = [
			'name'       => __( 'Article banner Right', TEXT_DOMAIN ),
			'id'         => 'tax_article_object_ads_banners_2',
			'type'       => 'post',
			'field_type' => 'select_advanced',
			'post_type'  => AdsFunctions::POST_TYPE
		];
		$meta_boxes[] = [
			'id'         => 'tax_article_object_ads',
			'title'      => __( 'Single articles  Ads', TEXT_DOMAIN ),
			'taxonomies' => Functions::CATEGORY,
			'priority'   => 'high',
			'fields'     => $fields
		];

		return $meta_boxes;

	}

	public static function register_require_cat() {
		add_filter( 'rpc_post_types', function ( $default_post_types ) {
			$default_post_types[ Functions::POST_TYPE ] = [
				Functions::CATEGORY => [ 'message' => __( 'Please select a category before publishing this article.', TEXT_DOMAIN ) ]
			];

			return $default_post_types;
		} );
	}

	public static function add_action_pre_get_posts( $query ) {
		if ( $query->is_main_query() && is_feed() ) {
			$query->set( 'post_type', [ Functions::POST_TYPE ] );
			if ( ( is_home() || is_front_page() ) ) {
				$front_ids = \modules\settings\Functions::get_front_articles_ids();
				$query->set( 'post__in', $front_ids );
				$query->set( 'orderby', 'post__in' );
				$query->set( 'order', 'ASC' );
				$query->set( 'posts_per_page', count( $front_ids ) );
			}
		}
	}

	public static function admin_register_excerpt_under_title( ){

		add_action( 'admin_menu', function () {
			remove_meta_box( 'postexcerpt', 'article', 'normal' );
		} );

		add_action( 'add_meta_boxes', function ( $post_type ) {
			if ( in_array( $post_type, array( 'article' ) ) ) {
				add_meta_box(
					'article_custom_postexcerpt',
					__( 'Excerpt' ),
					'post_excerpt_meta_box',
					$post_type,
					'after_title',
					'high'
				);
			}
		} );

	}


}
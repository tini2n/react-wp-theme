<?php

namespace modules\tv;


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
		$post_type = new PostType( Functions::POST_TYPE, __( 'TV', TEXT_DOMAIN ), [
			'name'               => __( 'TV', TEXT_DOMAIN ),
			'singular_name'      => __( 'TV', TEXT_DOMAIN ),
			'add_new'            => __( 'Add TV', TEXT_DOMAIN ),
			'add_new_item'       => __( 'New TV', TEXT_DOMAIN ),
			'edit_item'          => __( 'Edit TV', TEXT_DOMAIN ),
			'new_item'           => __( 'New TV', TEXT_DOMAIN ),
			'all_items'          => __( 'All TVs', TEXT_DOMAIN ),
			'view_item'          => __( 'View TV', TEXT_DOMAIN ),
			'search_items'       => __( 'Search TV', TEXT_DOMAIN ),
			'not_found'          => __( 'No TV found', TEXT_DOMAIN ),
			'not_found_in_trash' => __( 'No TV found in Trash', TEXT_DOMAIN ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'TVs', TEXT_DOMAIN ),
		] );
		$post_type->set_supports( [ 'title', 'thumbnail', 'editor', 'excerpt' ] );
		$post_type->set_hierarchical( false );
		$post_type->set_use_archive( true );
		$post_type->set_show_in_nav_menus( true );
		$post_type->set_rewrite( [ 'slug' => 'tv', 'with_front' => true ] );
		$post_type->set_menu_icon( 'dashicons-media-spreadsheet' );
		$this->_post_types[ Functions::POST_TYPE ] = $post_type;

	}

	public static function add_filter_rwmb_meta_boxes( $meta_boxes ) {
		$metabox_name = Functions::POST_TYPE . '_general';
		$fields       = [];
		foreach ( Functions::$general_meta_fields as $key => $data ) {
			$field = [
				'name' => __( ucfirst( str_replace( '_', ' ', $key ) ), TEXT_DOMAIN ),
				'id'   => $metabox_name . '_' . $key,
				'type' => $data['type']
			];
			if ( isset( $data['pattern'] ) ) {
				$field['pattern'] = $data['pattern'];
			}
			if ( isset( $data['desc'] ) ) {
				$field['desc'] = $data['desc'];

			}
			if ( isset( $data['required'] ) ) {
				$field['required'] = true;
			}
			$fields[] = $field;

		}
		$meta_boxes[] = [
			'id'         => $metabox_name,
			'title'      => __( 'General', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'context'    => 'normal',
			'priority'   => 'high',
			'fields'     => $fields
		];

		$fields       = [];
		$fields[]     = [
			'name'       => __( 'TV banner Left', TEXT_DOMAIN ),
			'id'         => 'tv_object_ads_banners_1',
			'type'       => 'post',
			'field_type' => 'select_advanced',
			'post_type'  => AdsFunctions::POST_TYPE
		];
		$fields[]     = [
			'name'       => __( 'TV banner Right', TEXT_DOMAIN ),
			'id'         => 'tv_object_ads_banners_2',
			'type'       => 'post',
			'field_type' => 'select_advanced',
			'post_type'  => AdsFunctions::POST_TYPE
		];
		$meta_boxes[] = [
			'id'         => 'tv_object_ads',
			'title'      => __( 'TV  Ads', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'priority'   => 'high',
			'fields'     => $fields
		];


		return $meta_boxes;
	}


}
<?php

namespace modules\formrequest;


use WPKit\Module\AbstractInitialization;
use WPKit\PostType\PostType;

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
		$post_type = new PostType( Functions::POST_TYPE, __( 'FormRequest', TEXT_DOMAIN ), [
			'name'               => __( 'FormRequest', TEXT_DOMAIN ),
			'singular_name'      => __( 'FormRequest', TEXT_DOMAIN ),
			'add_new'            => __( 'Add FormRequest', TEXT_DOMAIN ),
			'add_new_item'       => __( 'New FormRequest', TEXT_DOMAIN ),
			'edit_item'          => __( 'Edit FormRequest', TEXT_DOMAIN ),
			'new_item'           => __( 'New FormRequest', TEXT_DOMAIN ),
			'all_items'          => __( 'All FormRequests', TEXT_DOMAIN ),
			'view_item'          => __( 'View FormRequest', TEXT_DOMAIN ),
			'search_items'       => __( 'Search FormRequest', TEXT_DOMAIN ),
			'not_found'          => __( 'No FormRequest found', TEXT_DOMAIN ),
			'not_found_in_trash' => __( 'No FormRequest found in Trash', TEXT_DOMAIN ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'FormRequests', TEXT_DOMAIN ),
		] );
		$post_type->set_supports( [ 'title', 'excerpt' ] );
		$post_type->set_hierarchical( false );
		$post_type->set_use_archive( true );
		$post_type->set_show_in_nav_menus( false );
		//$post_type->set_rewrite( [ 'slug' => 'artikkel', 'with_front' => true ] );
		$post_type->set_menu_icon( 'dashicons-media-spreadsheet' );
		$this->_post_types[ Functions::POST_TYPE ] = $post_type;


	}

	public static function add_action_template_redirect() {
		if ( is_singular( [ Functions::POST_TYPE ] )  ) {
			wp_redirect( get_post_type_archive_link( Functions::POST_TYPE ) );
		}
	}

	public static function add_filter_rwmb_meta_boxes( $meta_boxes ) {
		$metabox_name = Functions::POST_TYPE . '_form_fields';
		$fields       = [];
		$current_user = wp_get_current_user();

		foreach ( Functions::get_form_fields() as $key => $data ) {
			$field = [
				'name' => __( ucfirst( str_replace( '_', ' ', $key ) ), TEXT_DOMAIN ),
				'id'   => $metabox_name . '_' . $key,
			'type'=>'text',

				];
			//$field = array_merge( $field, $data );

			$fields[] = $field;

		}


		$meta_boxes[] = [
			'id'         => $metabox_name,
			'title'      => __( 'Form Fields', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'context'    => 'normal',
			'priority'   => 'high',
			'fields'     => $fields
		];
		return $meta_boxes;
	}




}
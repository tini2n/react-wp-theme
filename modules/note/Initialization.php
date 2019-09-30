<?php

namespace modules\note;


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
		$post_type = new PostType( Functions::POST_TYPE, __( 'Note', TEXT_DOMAIN ), [
			'name'               => __( 'Note', TEXT_DOMAIN ),
			'singular_name'      => __( 'Note', TEXT_DOMAIN ),
			'add_new'            => __( 'Add Note', TEXT_DOMAIN ),
			'add_new_item'       => __( 'New Note', TEXT_DOMAIN ),
			'edit_item'          => __( 'Edit Note', TEXT_DOMAIN ),
			'new_item'           => __( 'New Note', TEXT_DOMAIN ),
			'all_items'          => __( 'All Notes', TEXT_DOMAIN ),
			'view_item'          => __( 'View Note', TEXT_DOMAIN ),
			'search_items'       => __( 'Search Note', TEXT_DOMAIN ),
			'not_found'          => __( 'No Note found', TEXT_DOMAIN ),
			'not_found_in_trash' => __( 'No Note found in Trash', TEXT_DOMAIN ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Notes', TEXT_DOMAIN ),
		] );
		$post_type->set_supports( [ 'title', 'excerpt' ] );
		$post_type->set_hierarchical( false );
		$post_type->set_use_archive( true );
		$post_type->set_show_in_nav_menus( false );
		//$post_type->set_rewrite( [ 'slug' => 'artikkel', 'with_front' => true ] );
		$post_type->set_menu_icon( 'dashicons-media-spreadsheet' );
		$this->_post_types[ Functions::POST_TYPE ] = $post_type;
		add_action( 'init', function () {
			register_taxonomy_for_object_type( Functions::CATEGORY, Functions::POST_TYPE );
		} );

	}

	public static function add_action_template_redirect() {
		if ( is_singular( [ Functions::POST_TYPE ] ) || is_tax( [ Functions::CATEGORY ] ) ) {
			wp_redirect( get_post_type_archive_link( Functions::POST_TYPE ) );
		}
	}

	public static function register_require_cat() {

			add_filter( 'rpc_post_types', function ( $default_post_types ) {
				$default_post_types[ Functions::POST_TYPE ] = [
					Functions::CATEGORY => [ 'message' => __( 'Please select a category before publishing this note.', TEXT_DOMAIN ) ]
				];


				return $default_post_types;
			} );
	}


}
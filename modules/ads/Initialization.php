<?php

namespace modules\ads;


use WPKit\Module\AbstractInitialization;
use WPKit\PostType\PostType;
use WPKit\Taxonomy\Taxonomy;

use modules\article\Functions as ArticleFunctions;

/**
 * Class Initialization
 *
 * @package modules\ads
 */
class Initialization extends AbstractInitialization {

	/**
	 * @var PostType[]
	 */
	protected $_post_types = [];

	public function register_custom_post_types() {
		$post_type = new PostType( Functions::POST_TYPE, __( 'Ads', TEXT_DOMAIN ), [
			'name'               => __( 'Ads', TEXT_DOMAIN ),
			'singular_name'      => __( 'Ads', TEXT_DOMAIN ),
			'add_new'            => __( 'Add Ads', TEXT_DOMAIN ),
			'add_new_item'       => __( 'New Ads', TEXT_DOMAIN ),
			'edit_item'          => __( 'Edit Ads', TEXT_DOMAIN ),
			'new_item'           => __( 'New Ads', TEXT_DOMAIN ),
			'all_items'          => __( 'All Adss', TEXT_DOMAIN ),
			'view_item'          => __( 'View Ads', TEXT_DOMAIN ),
			'search_items'       => __( 'Search Ads', TEXT_DOMAIN ),
			'not_found'          => __( 'No Ads found', TEXT_DOMAIN ),
			'not_found_in_trash' => __( 'No Ads found in Trash', TEXT_DOMAIN ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Ads', TEXT_DOMAIN ),
		] );
		$post_type->set_supports( [ 'title', 'thumbnail' ] );
		$post_type->set_pluralize( false );
		$post_type->set_hierarchical( false );
		$post_type->set_show_in_nav_menus( false );
		//$post_type->set_rewrite( [ 'slug' => 'artikkel', 'with_front' => true ] );
		$post_type->set_menu_icon( 'dashicons-analytics' );
		$post_type->add_column_thumbnail( __( 'Image', TEXT_DOMAIN ) );
		$post_type->add_column( __( 'Views', TEXT_DOMAIN ), function ( $column ) {
			echo Functions::get_views( get_the_ID() );
		} );
		$post_type->add_column( __( 'Clicks', TEXT_DOMAIN ), function ( $column ) {
			echo Functions::get_clicks( get_the_ID() );
		} );

		$post_type->add_column( __( 'CTR', TEXT_DOMAIN ), function ( $column ) {
			$val = Functions::get_conversion( get_the_ID() );
			echo $val ? $val . '%' : '';
		} );
		$this->_post_types[ Functions::POST_TYPE ] = $post_type;

	}

	public static function add_action_template_redirect() {
		if ( is_singular( [ Functions::POST_TYPE ] ) ) {
			wp_redirect( home_url() );
		}
	}

	public static function register_taxonomy() {
		$tax = new Taxonomy( Functions::ADS_BUYER, __( 'Ads buyer', TEXT_DOMAIN ) );
		$tax->set_hierarchical( true );
		$tax->add_post_type( Functions::POST_TYPE );
		$tax->set_show_in_nav_menus(false);
		$tax->set_pluralize( false );
	}

	public static function add_filter_rwmb_meta_boxes( $meta_boxes ) {

		$meta_boxes[] = [
			'id'         => Functions::POST_TYPE . '_statistics',
			'title'      => __( 'Month statistics', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'priority'   => 'high',
			'fields'     => [

				[
					'id'       => Functions::POST_TYPE . '_month_views',
					'name'     => __( 'Views', TEXT_DOMAIN ),
					'type'     => 'text',
					'std'      => 0,
					'readonly' => true,
					'disabled' => true,
				],
				[
					'id'       => Functions::POST_TYPE . '_month_clicks',
					'name'     => __( 'Clicks', TEXT_DOMAIN ),
					'type'     => 'text',
					'std'      => 0,
					'readonly' => true,
					'disabled' => true,
				],
				[
					'id'       => Functions::POST_TYPE . '_month_conversion',
					'name'     => __( 'CTR', TEXT_DOMAIN ),
					'type'     => 'text',
					'std'      => '0%',
					'readonly' => true,
					'disabled' => true,
				],
				[
					'id'       => Functions::POST_TYPE . '_last_statistics_update',
					'name'     => __( 'Last statistics update', TEXT_DOMAIN ),
					'type'     => 'text',
					'readonly' => true,
					'disabled' => true,
				],


			]
		];
		$meta_boxes[] = [
			'id'         => Functions::POST_TYPE . '_general',
			'title'      => __( 'General', TEXT_DOMAIN ),
			'post_types' => Functions::POST_TYPE,
			'priority'   => 'high',
			'fields'     => [
				[
					'id'       => Functions::POST_TYPE . '_general_url',
					'name'     => __( 'Url', TEXT_DOMAIN ),
					'type'     => 'url',
					'required' => true,
				],

			]
		];


		return $meta_boxes;
	}

	public static function register_update_ga_report_cron() {

		if ( ! wp_next_scheduled( 'update_ga_report' ) ) {
			wp_schedule_event( strtotime( 'today + 1 day' ), 'daily', 'update_ga_report' );
		}

		add_action( 'update_ga_report', function () {
			Functions::update_statistics();
		} );

	}
}
<?php

namespace modules\settings;

use WPKit\Module\AbstractInitialization;

use modules\article\Functions as ArticleFunctions;
use modules\formrequest\Functions as FormrequestFunctions;

use modules\ads\Functions as AdsFunctions;

/**
 * Class Initialization
 *
 * @package modules\fact
 */
class Initialization extends AbstractInitialization {

	public function register_custom_post_types() {

	}

	public function add_filter_mb_settings_pages( $settings_pages ) {
		$settings_pages[] = [
			'id'          => 'theme-settings',
			'option_name' => Functions::THEME_OPTIONS_NAME,
			'menu_title'  => __( 'Theme settings', TEXT_DOMAIN ),
			'icon_url'    => 'dashicons-admin-generic',
			//'style'       => 'no-boxes',
			'columns'     => 1,
			'tabs'        => array(
				'general'      => __( 'General', TEXT_DOMAIN ),
				//'header'       => __( 'Header', TEXT_DOMAIN ),
				'footer'       => __( 'Footer', TEXT_DOMAIN ),
				'tracking'     => __( 'Tracking', TEXT_DOMAIN ),
				'integrations' => __( 'Integrations', TEXT_DOMAIN ),
				//	'design'  => 'Tracking',
			),
			'position'    => 81,
		];
		$settings_pages[] = [
			'id'          => 'home-settings',
			'option_name' => Functions::HOME_OPTIONS_NAME,
			'menu_title'  => __( 'Home settings', TEXT_DOMAIN ),
			'icon_url'    => 'dashicons-admin-generic',
			//'style'       => 'no-boxes',
			'columns'     => 1,
			'position'    => 82,
			/*'tabs'        => [
				'articles' => __( 'Articles', TEXT_DOMAIN ),
				'tips'  => __( 'Tips', TEXT_DOMAIN )
			]*/
		];
		$settings_pages[] = [
			'id'          => 'ads-settings',
			'option_name' => Functions::ADS_OPTIONS_NAME,
			'menu_title'  => __( 'Ads settings', TEXT_DOMAIN ),
			'icon_url'    => 'dashicons-analytics',
			//'style'       => 'no-boxes',
			'columns'     => 1,
			'position'    => 82,
		];
		$settings_pages[] = [
			'id'          => 'formrequest-settings',
			'option_name' => Functions::FORMS_OPTIONS_NAME,
			'menu_title'  => __( 'Settings', TEXT_DOMAIN ),
			'icon_url'    => 'dashicons-analytics',
			//'style'       => 'no-boxes',
			'parent'      => 'edit.php?post_type=' . FormrequestFunctions::POST_TYPE,
			'columns'     => 1,
			'position'    => 82,
		];


		return $settings_pages;
	}

	public function add_filter_rwmb_meta_boxes( $meta_boxes ) {

		//$meta_boxes[] = $this->_general_settings();
		//$meta_boxes[] = $this->_header_settings();
		$meta_boxes[] = $this->_footer_settings();
		$meta_boxes[] = $this->_general_gdpr_settings();
		$meta_boxes[] = $this->_integration_connect_id_settings();
		$meta_boxes[] = $this->_integration_connect_id_subscriptions();
		$meta_boxes[] = $this->_integration_instagram_settings();
		$meta_boxes[] = $this->_integration_recaptcha_settings();
		$meta_boxes[] = $this->_integration_widgets_settings();
		$meta_boxes[] = $this->_integration_tips_settings();
		$meta_boxes[] = $this->_integration_fotoware_id_settings();

		$meta_boxes[] = $this->_form_request_settings();


		$meta_boxes[] = $this->_tracking_settings();
		$meta_boxes   = array_merge( $meta_boxes, $this->_home_settings() );
		$meta_boxes   = array_merge( $meta_boxes, $this->_ads_settings() );

		return $meta_boxes;
	}

	/*protected function _general_settings() {

		return array(
			'id'             => 'general',
			'title'          => 'General',
			'settings_pages' => 'theme-settings',
			'tab'            => 'general',
			'fields'         => []
		);
	}*/

	protected function _home_settings() {
		$sections = [];
		$counter  = 0;
		foreach ( Functions::$home_posts_sections as $key => $posts_count ) {
			$section_key = $key + 1;
			$fields      = [];
			for ( $i = 1; $i <= $posts_count; $i ++ ) {
				$fields[] = [
					'name'        => sprintf( __( "Article %s", TEXT_DOMAIN ), $i ),
					'id'          => Functions::HOME_POST_FIELD_NAME_PREFIX . $counter,
					'type'        => 'post',
					'post_type'   => [ ArticleFunctions::POST_TYPE ],
					'placeholder' => __( 'Select an article', TEXT_DOMAIN )
				];
				$counter ++;
			}
			$sections[] = array(
				'id'             => "home-section-$section_key",
				'title'          => sprintf( __( 'Articles Section %s', TEXT_DOMAIN ), $section_key ),
				'settings_pages' => 'home-settings',
				//'tab'=>'articles',
				'fields'         => $fields
			);
		}

		return $sections;
	}

	protected function _form_request_settings() {
		$form_types = FormrequestFunctions::$form_types;
		$fields     = [];
		foreach ( $form_types as $form_type ) {
			$form_type_title = ucfirst( str_replace( '_', ' ', $form_type ) );
			$fields[]        = array(
				'name' => __( 'Email for notifications for form [' . $form_type_title . ']', TEXT_DOMAIN ),
				'id'   => 'form_request_email_' . $form_type,
				'type' => 'email',
			);
		}

		return array(
			'id'             => 'form_request_settings',
			'title'          => __( 'Form request settings' ),
			'settings_pages' => 'formrequest-settings',
			'fields'         => $fields
		);
	}

	protected function _header_settings() {
		return array(
			'id'             => 'header',
			'title'          => __( 'Header links' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'header',
			'fields'         => array(
				array(
					'name' => __( 'Tips and Spill link', TEXT_DOMAIN ),
					'id'   => 'header_tips_and_spill_link',
					'type' => 'url',
				),
				array(
					'name' => __( 'Hestemarked link', TEXT_DOMAIN ),
					'id'   => 'header_horse_market_link',
					'type' => 'url',
				),
				array(
					'name' => __( 'Bli abonnent link', TEXT_DOMAIN ),
					'id'   => 'header_be_member_link',
					'type' => 'url',
				),
				array(
					'name' => __( 'External login link', TEXT_DOMAIN ),
					'id'   => 'header_external_login_link',
					'type' => 'url',
				),
			),
		);

	}

	protected function _integration_fotoware_id_settings() {
		return array(
			'id'             => 'fotoware',
			'title'          => __( 'Fotoware settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name' => __( 'Api key (auth key)', TEXT_DOMAIN ),
					'id'   => 'fotoware_api_key',
					'type' => 'text',
				),
				array(
					'name' => __( 'App name', TEXT_DOMAIN ),
					'id'   => 'fotoware_app_name',
					'type' => 'text',
				)
			),
		);

	}

	protected function _integration_connect_id_settings() {
		return array(
			'id'             => 'connect_id',
			'title'          => __( 'ConnectId settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name' => __( 'Client ID', TEXT_DOMAIN ),
					'id'   => 'connect_id_client_id',
					'type' => 'text'
				),
				array(
					'name' => __( 'Client Secret', TEXT_DOMAIN ),
					'id'   => 'connect_id_client_secret',
					'type' => 'text'
				),
			),
		);

	}

	protected function _general_gdpr_settings() {
		return array(
			'id'             => 'gdpr',
			'title'          => __( 'GDPR settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'general',
			'fields'         => array(
				array(
					'name' => __( 'Text', TEXT_DOMAIN ),
					'id'   => 'gdpr_text',
					'type' => 'text'
				),
				array(
					'name' => __( 'Button text', TEXT_DOMAIN ),
					'id'   => 'gdpr_button_text',
					'type' => 'text'
				),
				array(
					'name' => __( 'Link text', TEXT_DOMAIN ),
					'id'   => 'gdpr_link_text',
					'type' => 'text'
				),
				array(
					'name' => __( 'Link', TEXT_DOMAIN ),
					'id'   => 'gdpr_link',
					'type' => 'url'
				),
				array(
					'name' => __( 'Hidden bar text', TEXT_DOMAIN ),
					'id'   => 'gdpr_hidden_bar_text',
					'type' => 'text'
				),
			),
		);

	}

	protected function _integration_connect_id_subscriptions() {
		return array(
			'id'             => 'connect_id_subscriptions',
			'title'          => __( 'ConnectId Subscriptions ' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name'       => __( 'Subscription', TEXT_DOMAIN ),
					'id'         => 'connect_id_subscriptions_subscription',
					'type'       => 'group',
					'clone'      => true,
					'sort_clone' => true,
					'max_clone'  => 3,
					'fields'     => [
						array(
							'name' => __( 'Title', TEXT_DOMAIN ),
							'id'   => 'title',
							'type' => 'text'
						),
						array(
							'name' => __( 'Excerpt', TEXT_DOMAIN ),
							'id'   => 'excerpt',
							'type' => 'text'
						),
						array(
							'name' => __( 'Red label text', TEXT_DOMAIN ),
							'id'   => 'prom_label',
							'type' => 'text'
						),
						array(
							'name' => __( 'Footnote', TEXT_DOMAIN ),
							'id'   => 'remark',
							'type' => 'text'
						),
						array(
							'name'    => __( 'Text', TEXT_DOMAIN ),
							'id'      => 'text',
							'type'    => 'wysiwyg',
							'raw'     => false,
							'options' => array(
								'textarea_rows' => 4,
								'teeny'         => true,
							),
						),
						array(
							'name'    => __( 'Full Text', TEXT_DOMAIN ),
							'id'      => 'full_text',
							'type'    => 'wysiwyg',
							'raw'     => false,
							'options' => array(
								'textarea_rows' => 4,
								'teeny'         => true,
							),
						),
						array(
							'name' => __( 'Month Price', TEXT_DOMAIN ),
							'id'   => 'month_price',
							'type' => 'number',
						),
						/*array(
							'name' => __( 'Yearly Month Price', TEXT_DOMAIN ),
							'id'   => 'yearly_month_price',
							'type' => 'number',
							'min'  => '0'
						),*/
						array(
							'name' => __( 'Enable "Day of week" options', TEXT_DOMAIN ),
							'id'   => 'enable_day_options',
							'type' => 'checkbox',
						),

						array(
							'name'    => __( 'Product ID', TEXT_DOMAIN ),
							'id'      => 'product_id',
							'type'    => 'select',
							'std'     => 'TRAV',
							'options' => [
								'TRAV'  => 'TRAV',
								'TRIN'  => 'TRIN',
								'TRAV2' => 'TRAV2',
								'TRNE'  => 'TRNE',
								'TRTID' => 'TRTID',
								'TRTOD' => 'TRTOD'
							],
							'hidden'  => array( 'enable_day_options', true )
						),
						array(
							'name'    => __( 'Product Code', TEXT_DOMAIN ),
							'id'      => 'product_code',
							'type'    => 'select',
							'std'     => 'TRAV',
							'options' => [
								'101' => '101',
								'111' => '111',
								'112' => '112',
								'113' => '113',
								'114' => '114',
								'115' => '115'
							],
							'hidden'  => array( 'enable_day_options', true )
						),
						array(
							'name'      => __( 'Product ID', TEXT_DOMAIN ),
							'id'        => 'product_id_options',
							'type'      => 'group',
							'max_clone' => 2,
							'visible'   => array( 'enable_day_options', true ),
							'clone'     => true,
							'fields'    => [
								array(
									'name' => __( 'Title', TEXT_DOMAIN ),
									'id'   => 'product_option_title',
									'type' => 'text'
								),
								array(
									'name'    => __( 'Product ID', TEXT_DOMAIN ),
									'id'      => 'product_option_id',
									'type'    => 'select',
									'std'     => 'TRAV',
									'options' => [
										'TRAV'  => 'TRAV',
										'TRIN'  => 'TRIN',
										'TRAV2' => 'TRAV2',
										'TRNE'  => 'TRNE',
										'TRTID' => 'TRTID',
										'TRTOD' => 'TRTOD'
									],
								),
								array(
									'name'    => __( 'Product Code', TEXT_DOMAIN ),
									'id'      => 'product_option_code',
									'type'    => 'select',
									'std'     => '101',
									'options' => [
										'101' => '101',
										'111' => '111',
										'112' => '112',
										'113' => '113',
										'114' => '114',
										'115' => '115'
									],
								),
							]
						),
					]
				),

			),
		);

	}

	protected function _integration_recaptcha_settings() {
		return array(
			'id'             => 'google_recaptcha',
			'title'          => __( 'Google Recaptcha settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name' => __( 'Recaptcha Client Key', TEXT_DOMAIN ),
					'id'   => 'google_recaptcha_client_key',
					'type' => 'text'
				),
				array(
					'name' => __( 'Recaptcha  Client Secret', TEXT_DOMAIN ),
					'id'   => 'google_recaptcha_client_secret',
					'type' => 'text'
				),
			),
		);

	}

	protected function _integration_widgets_settings() {
		return array(
			'id'             => 'innocode_widgets',
			'title'          => __( 'Iframe Widgets settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name' => __( 'Superlocal URL', TEXT_DOMAIN ),
					'id'   => 'innocode_widgets_superlocal',
					'type' => 'url'
				),
				array(
					'name' => __( 'Hestemarked URL', TEXT_DOMAIN ),
					'id'   => 'innocode_widgets_horse_market',
					'type' => 'url'
				),
			),
		);

	}

	protected function _integration_tips_settings() {
		return array(
			'id'             => 'tips_settings',
			'title'          => __( 'Tips settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name' => __( 'Tips src URL', TEXT_DOMAIN ),
					'id'   => 'tips_settings_src_url',
					'type' => 'url'
				)
			),
		);

	}

	protected function _integration_instagram_settings() {
		return array(
			'id'             => 'instagram',
			'title'          => __( 'Instagram settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'integrations',
			'fields'         => array(
				array(
					'name' => __( 'User ID', TEXT_DOMAIN ),
					'id'   => 'instagram_user_id',
					'type' => 'text'
				),
				array(
					'name' => __( 'Access Token', TEXT_DOMAIN ),
					'id'   => 'instagram_token',
					'type' => 'text'
				),
			),
		);

	}

	protected function _footer_settings() {
		return [
			'id'             => 'footer',
			'title'          => __( 'Footer settings' ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'footer',
			'columns'        => array(
				'column-1' => 4,
				'column-2' => 4
			),
			'fields'         => [
				[
					'id'   => 'footer_main_tlf',
					'name' => 'Main Tlf number',
					'type' => 'text',
				],
				[ 'type' => 'divider' ],
				[
					'name'        => __( 'Footer left column', TEXT_DOMAIN ),
					'id'          => 'footer_left_col',
					'type'        => 'group',
					'clone'       => true,
					'sort_clone'  => true,
					'collapsible' => true,
					'group_title' => [ 'field' => 'heading' ],
					'fields'      => [
						[
							'id'   => 'heading',
							'name' => 'Heading',
							'type' => 'text',
						],
						[
							'id'   => 'text',
							'name' => 'Text',
							'type' => 'textarea',
							'cols' => 10
						]

					]

				],
				[ 'type' => 'divider' ],
				[
					'name'        => __( 'Footer center column', TEXT_DOMAIN ),
					'id'          => 'footer_center_col',
					'type'        => 'group',
					'clone'       => true,
					'sort_clone'  => true,
					'collapsible' => true,
					'group_title' => [ 'field' => 'heading' ],
					'fields'      => [
						[
							'id'   => 'heading',
							'name' => 'Heading',
							'type' => 'text',
						],
						[
							'id'   => 'tlf',
							'name' => 'Tlf number',
							'type' => 'text',
						],
						[
							'id'   => 'fax',
							'name' => 'Fax number',
							'type' => 'text',
						],
						[
							'id'   => 'email',
							'name' => 'Email',
							'type' => 'email',
						]

					]

				]

			]
		];
	}

	protected function _tracking_settings() {
		return array(
			'id'             => 'tracking_general',
			'title'          => __( 'Tracking', TEXT_DOMAIN ),
			'settings_pages' => 'theme-settings',
			'tab'            => 'tracking',
			'fields'         => [
				[
					'id'   => 'head_custom_static_meta',
					'name' => __( 'Head Custom static Meta', TEXT_DOMAIN ),
					'type' => 'textarea'
				],
				[
					'id'   => 'header_custom_code',
					'name' => __( 'Header Custom static code', TEXT_DOMAIN ),
					'type' => 'textarea'
				],
				[
					'id'   => 'gtm_key_code',
					'name' => __( 'GTM key', TEXT_DOMAIN ),
					'type' => 'text'
				],

			]
		);
	}

	protected function _ads_settings() {
		$sections = [];

		foreach ( AdsFunctions::ADS_PLACES as $ads_key => $ads_place ) {
			$fields = [];
			for ( $i = 1; $i <= $ads_place['count']; $i ++ ) {
				$fields[] = [
					'name'       => __( $ads_place['title'] . ' banner ' . $i . ' Desktop', TEXT_DOMAIN ),
					'id'         => $ads_key . '_ads_banners_' . $i,
					'type'       => 'post',
					'field_type' => 'select_advanced',
					'post_type'  => AdsFunctions::POST_TYPE
				];
				$fields[] = [
					'name'       => __( $ads_place['title'] . ' banner ' . $i . ' Mobile', TEXT_DOMAIN ),
					'id'         => $ads_key . '_ads_banners_' . $i . '_mob',
					'type'       => 'post',
					'field_type' => 'select_advanced',
					'post_type'  => AdsFunctions::POST_TYPE
				];
			}
			$sections[] = [
				'id'             => $ads_key . '_ads_banners',
				'title'          => __( $ads_place['title'] . " settings" ),
				'settings_pages' => 'ads-settings',
				'fields'         => $fields
			];
		}

		$sections[] = [
			'id'             => 'article_ads_banners',
			'title'          => __( 'Article Single settings' ),
			'settings_pages' => 'ads-settings',
			'fields'         => array(
				array(
					'name'       => __( 'Article default left banner', TEXT_DOMAIN ),
					'id'         => 'article_ads_banners_1',
					'type'       => 'post',
					'field_type' => 'select_advanced',
					'post_type'  => AdsFunctions::POST_TYPE
				),
				array(
					'name'       => __( 'Article default right banner', TEXT_DOMAIN ),
					'id'         => 'article_ads_banners_2',
					'type'       => 'post',
					'field_type' => 'select_advanced',
					'post_type'  => AdsFunctions::POST_TYPE
				),
			)
		];

		return $sections;
	}

	public static function register_custom_meta() {
		add_action( 'wp_head', function () {
			echo Functions::get_custom_static_meta();
		} );
		add_action( 'header', function () {
			echo Functions::get_custom_header_static_code();
		} );
	}


}
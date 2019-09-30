<?php

namespace modules\theme;

use WPKit\Module\AbstractThemeInitialization;
use modules\note\Functions as NoteFunctions;
use modules\ads\Functions as AdsFunctions;
//use modules\tip\Functions as TipFunctions;

use modules\settings\Functions as SettingsFunctions;


/**
 * Class Initialization
 *
 * @package modules\theme
 */
class Initialization extends AbstractThemeInitialization {
	/**
	 * @var array
	 */
	protected static $_image_sizes = [
		'content-article'  => [ 260, 180, true ],
		'content-articles' => [ 120, 80, true ],

		'full-width'    => [ 2600 ],
		'content-wrap'  => [ 800, 540, true ],
		'single-small'  => [ 520, 380, true ],
		'grid-big'      => [ 670, 430, true ],
		'grid-small'    => [ 320, 220, true ],
		'grid-small-tv' => [ 320, 180, true ],
		'grid-half'     => [ 500, 340, true ],
		'tiny-square'   => [ 92, 62, true ],
		'tiny'          => [ 100, 70, true ],
		'vertical'      => [ 380, 520, true ],
		'wide-ad'       => [ 980 ],
		'wide-ad-mob'   => [ 300 ],
		'half-ad'       => [ 425 ],
		'tall-ad'       => [ 180 ],
		'rss-img'       => [ 1280, 720, true ]
	];

	/**
	 * Register Image sizes
	 */
	public function register_image_sizes() {
		foreach ( static::$_image_sizes as $key => $data ) {
			$width  = isset( $data[0] ) ? $data[0] : 0;
			$height = isset( $data[1] ) ? $data[1] : 0;
			$crop   = isset( $data[2] ) ? $data[2] : false;

			add_image_size( $key, $width, $height, $crop );
			add_image_size( "{$key}2x", $width * 2, $height * 2, $crop );
		}
	}

	/**
	 * Register dynamic sidebars
	 */
	public function register_dynamic_sidebars() {

	}

	/**
	 * Register NavMenus
	 */
	public function register_nav_menus() {
		register_nav_menus( [ Functions::PUSH_MENU => __( 'Push menu', TEXT_DOMAIN ) ] );
		register_nav_menus( [ Functions::FOOTER_MENU => __( 'Footer menu', TEXT_DOMAIN ) ] );
		register_nav_menus( [ Functions::TOP_MENU => __( 'Top menu', TEXT_DOMAIN ) ] );
		register_nav_menus( [ Functions::NEWS_MENU => __( 'Nehetter menu', TEXT_DOMAIN ) ] );

	}

	/**
	 * Remove Comments
	 */
	public function register_remove_admin_bar_nodes_hook() {

		add_action( 'admin_bar_menu', function ( \WP_Admin_Bar $wp_admin_bar ) {
			$wp_admin_bar->remove_node( 'comments' );
		}, 999 );
	}

	/**
	 * Remove post type supports
	 */
	public function register_remove_post_types_supports() {
		foreach (
			[
				'post',
				'page',
			] as $post_type
		) {
			remove_post_type_support( $post_type, 'comments' );
			remove_post_type_support( $post_type, 'custom-fields' );
		}
	}

	/**
	 *
	 */
	public function add_action_wp_enqueue_scripts() {
		static::_enqueue_styles();
		static::_enqueue_scripts();
	}

	/**
	 *
	 */
	public function add_action_admin_enqueue_scripts() {
		$assets_url = $this->get_theme_assets_url();
		$suffix     = Helpers::get_assets_suffix();

		wp_enqueue_style( 'theme-admin', "$assets_url/build/css/admin$suffix.css" );
	}

	/**
	 *
	 */
	public function add_action_after_setup_theme() {
		add_theme_support( 'post-thumbnails', [ 'post', 'page' ] );
		add_theme_support( 'title-tag' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'rest_output_link_wp_head' );
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		remove_action( 'wp_head', 'wp_shortlink_wp_head' );
	}

	/**
	 *
	 */
	public function add_action_admin_bar_init() {
		remove_action( 'wp_head', '_admin_bar_bump_cb' );
	}

	/**
	 *
	 */
	public function add_action_login_enqueue_scripts() {
		$assets_url = $this->get_theme_assets_url();
		$suffix     = Helpers::get_assets_suffix();

		wp_enqueue_style( 'theme-login', "$assets_url/build/css/login$suffix.css" );
	}


	/**
	 *
	 */
	public function add_action_admin_menu() {
		remove_menu_page( 'edit-comments.php' );
		remove_submenu_page( 'options-general.php', 'options-discussion.php' );
		remove_submenu_page( 'options-general.php', 'options-writing.php' );
		remove_menu_page( 'edit.php' );
		if ( ! is_super_admin() ) {
			remove_submenu_page( 'themes.php', 'themes.php' );
		}
	}

	/**
	 * @param \WP_Screen $current_screen
	 */
	public function add_action_current_screen( $current_screen ) {
		if ( $current_screen->base == 'edit' ) {
			foreach ( [ 'posts', 'pages' ] as $post_type ) {
				add_filter( "manage_{$post_type}_columns", function ( $columns ) {
					unset( $columns['comments'], $columns['author'] );

					return $columns;
				} );
			}
		}
	}

	/**
	 *
	 */
	public function add_action_wp_footer() {
		echo "<noscript>
            <div style=\"position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 20px; background-color: #FFF; text-align: center; color: #000; z-index: 999; border-top: 1px solid #000;\">
                " . __( 'JavaScript is disabled on your browser. Please enable JavaScript or upgrade to a JavaScript-capable browser to use this site.', TEXT_DOMAIN ) . "
            </div>
        </noscript>
        <script>document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace(/\b(no-js)\b/,'');</script>";
	}

	/**
	 * @return string
	 */
	public function add_filter_network_home_url() {
		return home_url( '/' );
	}

	/**
	 * @return string
	 */
	public function add_filter_excerpt_more() {
		return '...';
	}

	/**
	 * @param array $settings
	 *
	 * @return array
	 */
	public function add_filter_tiny_mce_before_init( $settings ) {
		$settings['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';

		return $settings;
	}

	/**
	 * @param array $classes
	 *
	 * @return array
	 */
	public function add_filter_login_body_class( array $classes ) {
		if ( false !== ( $key = array_search( 'wp-core-ui', $classes ) ) ) {
			unset( $classes[ $key ] );
		}

		return $classes;
	}

	/**
	 * @return array
	 */
	public function add_filter_focal_previews_sizes() {
		return array_keys( static::$_image_sizes );
	}

	/**
	 * @return array
	 */
	public function add_filter_aws_lambda_critical_css_styles() {
		return [
			'theme',
		];
	}

	/**
	 * @param string $stylesheet
	 *
	 * @return string
	 */
	public function add_filter_aws_lambda_critical_css_stylesheet( $stylesheet ) {
		$stylesheet = str_replace( '../fonts/', $this->get_theme_assets_url() . '/build/fonts/', $stylesheet );

		return function_exists( 'get_cloudfront_attachment_url' ) ? get_cloudfront_attachment_url( $stylesheet, true ) : $stylesheet;
	}

	/**
	 *
	 */
	public function add_action_aws_lambda_critical_css_printed() {
		add_filter( 'deferred_loading_styles', function () {
			return [
				'theme',
			];
		} );
	}

	/**
	 * @return array|string
	 */
	public function add_filter_deferred_loading_scripts() {
		return '*';
	}

	/**
	 *
	 */
	public function admin_register_editor_stylesheet() {

		$assets_url = $this->get_theme_assets_url();
		$suffix     = Helpers::get_assets_suffix();

		add_editor_style( "$assets_url/build/css/editor$suffix.css" );
	}

	public function add_action_enqueue_block_editor_assets() {
		$assets_url = $this->get_theme_assets_url();
		$suffix     = Helpers::get_assets_suffix();

		wp_enqueue_style(
			'custom-block-editor',
			"$assets_url/build/css/block-editor$suffix.css"
		);
	}

	/**
	 *
	 */
	public function admin_register_remove_meta_boxes() {
		add_action( 'admin_init', function () {
			remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
			remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
			remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
			remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
			remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
		}, 100 );
		add_action( 'add_meta_boxes', function () {
			foreach ( get_post_types() as $post_type ) {
				remove_meta_box( 'commentsdiv', $post_type, 'normal' );
				remove_meta_box( 'commentstatusdiv', $post_type, 'normal' );
				remove_meta_box( 'postcustom', $post_type, 'normal' );
				remove_meta_box( 'authordiv', $post_type, 'normal' );
			}

			remove_meta_box( 'trackbacksdiv', 'post', 'normal' );
		}, 100 );
	}

	/**
	 *
	 */
	public function admin_register_widgets_hook() {
		add_action( 'widgets_init', function () {
			unregister_widget( 'WP_Widget_Calendar' );
			unregister_widget( 'WP_Widget_Archives' );
			unregister_widget( 'WP_Widget_Links' );
			unregister_widget( 'WP_Widget_Meta' );
			unregister_widget( 'WP_Widget_Search' );
			unregister_widget( 'WP_Widget_Categories' );
			unregister_widget( 'WP_Widget_Pages' );
			unregister_widget( 'WP_Widget_Recent_Posts' );
			unregister_widget( 'WP_Widget_Recent_Comments' );
			unregister_widget( 'WP_Widget_RSS' );
			unregister_widget( 'WP_Widget_Tag_Cloud' );
			unregister_widget( 'WP_Nav_Menu_Widget' );
		}, 20 );
	}

	/**
	 *
	 */
	public function admin_register_remove_from_nav_menus() {
		add_action( 'admin_head-nav-menus.php', function () {
			remove_meta_box( 'add-post_tag', 'nav-menus', 'side' );
			remove_meta_box( 'add-post-type-post', 'nav-menus', 'side' );
		} );
	}

	/**
	 *
	 */
	protected function _enqueue_styles() {
		if ( ! is_admin_bar_showing() && ! is_customize_preview() ) {
			wp_deregister_style( 'dashicons' );
		}

		$assets_url = $this->get_theme_assets_url();
		$suffix     = Helpers::get_assets_suffix();

		wp_enqueue_style(
			'theme',
			"$assets_url/build/css/screen$suffix.css"
		);
		wp_enqueue_style(
			'theme-print',
			"$assets_url/build/css/print$suffix.css",
			[],
			null,
			'print'
		);
		if ( Helpers::is_page_template( get_the_ID(), 'contact' ) || Helpers::is_page_template( get_the_ID(), 'tips-oss' ) ) {
			wp_enqueue_style( 'leaflet', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.css', [], null );
		}
	}

	/**
	 *
	 */
	protected function _enqueue_scripts() {
		$assets_url = $this->get_theme_assets_url();
		$suffix     = Helpers::get_assets_suffix();

		// We add 'defer' attribute, so no need to load script in footer.
		// Probably browser can load it faster if it will be placed in header with 'defer'.
		wp_enqueue_script(
			'theme',
			"$assets_url/build/js/common$suffix.js",
			[], null, true
		);
		wp_localize_script( 'theme', "__INITIAL_STATE__", Functions::get_initial_state() );
		wp_localize_script( 'theme', "ThemeSettings", [
			'routes'        => Functions::get_routes(),
			'recaptcha_key' => SettingsFunctions::get_recaptcha_key(),
			'gtm_key'       => SettingsFunctions::get_gtm_key(),
			'widgets'       => [
				'superlocal'  => SettingsFunctions::get_supelocal_widget_url(),
				'horsemarket' => SettingsFunctions::get_horse_market_widget_url()
			],
			'profile'       => [
				'connect_id_auth'         => ConnectId::get_auth_url(),
				'connect_id_registration' => ConnectId::get_registration_url(),
				'is_logged_in'            => ConnectId::is_logged_in(),
				'is_subscribed'           => ConnectId::is_subscribed(),
				'subscriptions'           => ConnectId::get_subscriptions()
			],
			'rest'          => [
				'url'       => esc_url_raw( rest_url() ),
				'nonce'     => wp_create_nonce( 'wp_rest' ),
				'namespace' => \Api::API,
			],
			'products'      => Functions::get_subscription_plans(),
			'countries'     => Functions::get_countries_list(),
			'gdpr'          => SettingsFunctions::get_gdpr_settings()
		] );

	}

	/**
	 * Hook to template_include changing template to json.php
	 */
	public static function register_json_template() {

		add_filter( 'template_include', function ( $template ) {
			if ( Helpers::is_json_requested() ) {
				$template = get_template_directory() . '/json.php';
			}

			return $template;
		} );
	}

	public static function register_conncet_id_endpoint() {
		ConnectId::init();
	}

	public static function register_fotoware_endpoint() {
		Fotoware::init();
	}

	public function register_video_container() {
		add_filter( 'embed_oembed_html', function ( $html, $url, $attr, $post_id ) {
			return '<div class="video-container">' . $html . '</div>';
		}, 99, 4 );

	}

	public function admin_register_admin_js() {
		add_action( 'admin_enqueue_scripts', function () {
			$assets_url = $this->get_theme_assets_url();
			$suffix     = Helpers::get_assets_suffix();
			wp_enqueue_script( 'admin_js', $assets_url . "/build/js/admin.{$suffix}js", [ 'jquery' ], null, true );
			wp_localize_script( 'admin_js', 'AdminSettings', [
				'fotoware_base_url' => Fotoware::SERVER_URL,
				'rest'              => [
					'url'       => esc_url_raw( rest_url() ),
					'nonce'     => wp_create_nonce( 'wp_rest' ),
					'namespace' => \Api::API,
				],
			] );
		} );
	}

	public function add_filter_rwmb_meta_boxes( $meta_boxes ) {
		$metabox_name = 'page_contact_tmpl';
		$meta_boxes[] = [
			'id'         => $metabox_name,
			'title'      => __( 'Contact data', TEXT_DOMAIN ),
			'post_types' => 'page',
			'context'    => 'normal',
			'include'    => [ 'template' => [ 'templates/contact.php', 'templates/tips-oss.php' ] ],
			'priority'   => 'high',
			'fields'     => [
				[
					'id'   => $metabox_name . '_map_hide',
					'name' => __( 'Hide map', TEXT_DOMAIN ),
					'type' => 'checkbox',
				],
				[
					'id'     => $metabox_name . '_map_address',
					'name'   => __( 'Address', TEXT_DOMAIN ),
					'type'   => 'text',
					'hidden' => array( $metabox_name . '_map_hide', true )
				],
				[
					'id'            => $metabox_name . '_map',
					'name'          => __( 'Map', TEXT_DOMAIN ),
					'type'          => 'osm',
					'std'           => '59.9139,10.7522',
					//'api_key'       => 'AIzaSyCctQ-sH9K-nUaQm5oJzHcYSAxpC0O62Kk',
					'address_field' => $metabox_name . '_map_address',
					'hidden'        => array( $metabox_name . '_map_hide', true )
				]
			]
		];

		return $meta_boxes;
	}

	public static function admin_register_rm_preview() {
		add_filter( 'post_row_actions', function ( $actions, $post ) {
			if ( in_array( $post->post_type, [
				NoteFunctions::POST_TYPE,
				AdsFunctions::POST_TYPE,
				//TipFunctions::POST_TYPE
			] ) ) {
				if ( isset( $actions['view'] ) ) {
					unset( $actions['view'] );
				}

			}

			return $actions;
		}, 10, 2 );
	}

	public static function register_rm_fees() {
		$disable_feed = function () {
			wp_die( __( 'No feed available, please visit the <a href="' . esc_url( home_url( '/' ) ) . '">homepage</a>!' ) );
		};

		add_action( 'do_feed', $disable_feed, 1 );
		add_action( 'do_feed_rdf', $disable_feed, 1 );
		add_action( 'do_feed_rss', $disable_feed, 1 );
		add_action( 'do_feed_atom', $disable_feed, 1 );
		add_action( 'do_feed_rss2_comments', $disable_feed, 1 );
		add_action( 'do_feed_atom_comments', $disable_feed, 1 );
		remove_all_actions( 'do_feed_rss2' );
		add_action( 'do_feed_rss2', function ( $for_comments ) {
			if ( $for_comments ) {
				wp_die( __( 'No feed available, please visit the <a href="' . esc_url( home_url( '/' ) ) . '">homepage</a>!' ) );
			} else {
				load_template( get_template_directory() . '/feed-rss2.php' );
			}
		} );
	}

	public static function register_subscription_route() {
		add_rewrite_endpoint( Functions::SUBSCRIBE_SLUG, EP_ROOT );

	}

	public static function add_filter_wpmediacategory_taxonomy() {
		return 'category_media';
	}

	public static function register_media_buttons() {
		add_action( 'media_buttons', function () {
			//$token=get_option('fotoware_token');
			//printf('<a href="%swidgets/selection#access_token=%sTB_iframe=true&width=600&height=550" class="button thickbox fwtrigger1">Add from FotoWeb</a>',Fotoware::SERVER_URL,$token);
			print '<a href="#" class="button fotoweb-btn">Add from FotoWare</a>';
		}, 15 );
	}

	public static function register_subscription_redirect() {
		add_action( 'template_redirect', function () {
			if ( Functions::is_subscription_page() && isset( $_GET['subscription'] ) && $_GET['subscription'] && ! ConnectId::is_logged_in() ) {
				wp_redirect( home_url( '/' . Functions::SUBSCRIBE_SLUG ) );
			}
		} );
	}

}
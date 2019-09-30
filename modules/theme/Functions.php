<?php

namespace modules\theme;

use WPKit\Module\AbstractThemeFunctions;
use \modules\article\Functions as ArticleFunctions;

use \modules\note\Functions as NoteFunctions;
use \modules\tv\Functions as TVFunctions;
use \modules\settings\Functions as SettingsFunctions;

use \modules\ads\Functions as AdsFunctions;

/**
 * Class Functions
 *
 * @package modules\theme
 */
class Functions extends AbstractThemeFunctions {
	/**
	 * GET param name for setting up response type
	 */
	const PUSH_MENU = 'push_menu';
	const FOOTER_MENU = 'footer_menu';
	const NEWS_MENU = 'news_menu';
	const TOP_MENU = 'top_menu';
	const SUBSCRIBE_SLUG = 'abonnere-tariffer';


	/**
	 * Get Initial state for front
	 *
	 * @return array
	 */
	public static function get_initial_state() {
		$state = [
			//'head'         => self::get_head_array(),
			//'header'            => self::get_header_array(),
			'main'              => self::get_main_query_array(),
			'posts_by_ids'      => Helpers::get_prepared_posts_array(),
			'categories_by_ids' => ArticleFunctions::get_categories_array(),
			'tags_by_ids'       => ArticleFunctions::get_tags_array(),
			'footer'            => self::get_footer_array(),
			'menus'             => [
				'push_menu'   => self::get_menu_array( self::PUSH_MENU, 1 ),
				'footer_menu' => self::get_menu_array( self::FOOTER_MENU, 1 ),
				'top_menu'    => self::get_menu_array( self::TOP_MENU, 1 ),
				'news_menu'   => self::get_menu_array( self::NEWS_MENU, 1 ),
			]
		];


		return $state;
	}


	public static function get_routes() {


		global $wp_rewrite;
		//new \WP_Rewrite()
		$article_post_type_obj = get_post_type_object( ArticleFunctions::POST_TYPE );
		$tv_post_type_obj      = get_post_type_object( TVFunctions::POST_TYPE );
		$notice_post_type_obj  = get_post_type_object( NoteFunctions::POST_TYPE );

		return [
			'category'       => '/' . static::permastruct_to_route( $wp_rewrite->get_category_permastruct() ),
			'tv_archive'     => '/' . $tv_post_type_obj->rewrite['slug'],
			'notice_archive' => '/' . $notice_post_type_obj->rewrite['slug'],
			'tag'            => '/' . static::permastruct_to_route( $wp_rewrite->get_tag_permastruct() ),
			//	'search'          => '/'.static::permastruct_to_route( $wp_rewrite->get_search_permastruct() ),
			'article'        => '/' . static::permastruct_to_route( $wp_rewrite->get_extra_permastruct( ArticleFunctions::POST_TYPE ) ),
			'tv'             => '/' . static::permastruct_to_route( $wp_rewrite->get_extra_permastruct( TVFunctions::POST_TYPE ) ),
			'page'           => '/:page',
			'subscription'   => '/' . self::SUBSCRIBE_SLUG,

			'home' => '/',

		];


	}

	/**
	 * @param string $permastruct
	 *
	 * @return string
	 */
	public static function permastruct_to_route( $permastruct ) {
		return trim( preg_replace( '/%(\w+)%/', ':$1', $permastruct ), '/' );
	}

	/**
	 * @return array
	 */
	public static function get_categories_by_ids_array() {
		return [];
	}

	/**
	 * @return array
	 */
	public static function get_head_array() {
		$meta = [];
		ob_start();
		wp_head();
		$head       = ob_get_clean();
		$dom_parser = new \DOMDocument();
		libxml_use_internal_errors( true );
		$dom_parser->loadHTML( mb_convert_encoding( $head, 'HTML-ENTITIES', 'UTF-8' ) );
		libxml_clear_errors();
		$tags                = [
			'meta' => [
				'name',
				'property',
				'content'
			],
			'link' => [ 'rel', 'href', 'title', 'type' ],
		];
		$link_rel_valid_vals = [ 'canonical', 'alternate', 'shortlink' ];
		foreach ( $tags as $tag_name => $tag_data ) {
			if ( $tag_name == 'link' ) {
				$rel_valid = true;
			} else {
				$rel_valid = false;
			}
			$elements = $dom_parser->getElementsByTagName( $tag_name );
			if ( $elements->length ) {
				/**
				 * @var $element \DOMElement
				 */
				foreach ( $elements as $element ) {
					$meta_item = [];
					if ( $rel_valid && ! in_array( $element->getAttribute( 'rel' ), $link_rel_valid_vals ) ) {
						continue;
					}
					foreach ( $tag_data as $tag_data_item ) {
						$meta_item[ $tag_data_item ] = $element->getAttribute( $tag_data_item );
					}
					$meta_item['tag'] = $tag_name;
					$meta[]           = $meta_item;
				}
			}

		}
		$title_elem = $dom_parser->getElementsByTagName( 'title' );
		if ( $title_elem ) {
			/**
			 * @var $first_title_elem \DOMElement
			 */
			$first_title_elem = $title_elem->item( 0 );
			$meta[]           = [ 'tag' => 'title', 'text' => $first_title_elem->textContent ];
		}
		$leaflet_css_elem = $dom_parser->getElementById( 'leaflet-css' );
		if ( $leaflet_css_elem ) {

			$meta[] = [
				'tag'   => 'link',
				'rel'   => 'stylesheet',
				'id'    => 'leaflet',
				'href'  => $leaflet_css_elem->getAttribute( 'href' ),
				'type'  => $leaflet_css_elem->getAttribute( 'type' ),
				'media' => $leaflet_css_elem->getAttribute( 'media' ),
			];
		}

		return $meta;

	}

	public static function get_countries_list() {
		return array
		(
			'AF' => 'Afghanistan',
			'AX' => 'Aland Islands',
			'AL' => 'Albania',
			'DZ' => 'Algeria',
			'AS' => 'American Samoa',
			'AD' => 'Andorra',
			'AO' => 'Angola',
			'AI' => 'Anguilla',
			'AQ' => 'Antarctica',
			'AG' => 'Antigua And Barbuda',
			'AR' => 'Argentina',
			'AM' => 'Armenia',
			'AW' => 'Aruba',
			'AU' => 'Australia',
			'AT' => 'Austria',
			'AZ' => 'Azerbaijan',
			'BS' => 'Bahamas',
			'BH' => 'Bahrain',
			'BD' => 'Bangladesh',
			'BB' => 'Barbados',
			'BY' => 'Belarus',
			'BE' => 'Belgium',
			'BZ' => 'Belize',
			'BJ' => 'Benin',
			'BM' => 'Bermuda',
			'BT' => 'Bhutan',
			'BO' => 'Bolivia',
			'BA' => 'Bosnia And Herzegovina',
			'BW' => 'Botswana',
			'BV' => 'Bouvet Island',
			'BR' => 'Brazil',
			'IO' => 'British Indian Ocean Territory',
			'BN' => 'Brunei Darussalam',
			'BG' => 'Bulgaria',
			'BF' => 'Burkina Faso',
			'BI' => 'Burundi',
			'KH' => 'Cambodia',
			'CM' => 'Cameroon',
			'CA' => 'Canada',
			'CV' => 'Cape Verde',
			'KY' => 'Cayman Islands',
			'CF' => 'Central African Republic',
			'TD' => 'Chad',
			'CL' => 'Chile',
			'CN' => 'China',
			'CX' => 'Christmas Island',
			'CC' => 'Cocos (Keeling) Islands',
			'CO' => 'Colombia',
			'KM' => 'Comoros',
			'CG' => 'Congo',
			'CD' => 'Congo, Democratic Republic',
			'CK' => 'Cook Islands',
			'CR' => 'Costa Rica',
			'CI' => 'Cote D\'Ivoire',
			'HR' => 'Croatia',
			'CU' => 'Cuba',
			'CY' => 'Cyprus',
			'CZ' => 'Czech Republic',
			'DK' => 'Denmark',
			'DJ' => 'Djibouti',
			'DM' => 'Dominica',
			'DO' => 'Dominican Republic',
			'EC' => 'Ecuador',
			'EG' => 'Egypt',
			'SV' => 'El Salvador',
			'GQ' => 'Equatorial Guinea',
			'ER' => 'Eritrea',
			'EE' => 'Estonia',
			'ET' => 'Ethiopia',
			'FK' => 'Falkland Islands (Malvinas)',
			'FO' => 'Faroe Islands',
			'FJ' => 'Fiji',
			'FI' => 'Finland',
			'FR' => 'France',
			'GF' => 'French Guiana',
			'PF' => 'French Polynesia',
			'TF' => 'French Southern Territories',
			'GA' => 'Gabon',
			'GM' => 'Gambia',
			'GE' => 'Georgia',
			'DE' => 'Germany',
			'GH' => 'Ghana',
			'GI' => 'Gibraltar',
			'GR' => 'Greece',
			'GL' => 'Greenland',
			'GD' => 'Grenada',
			'GP' => 'Guadeloupe',
			'GU' => 'Guam',
			'GT' => 'Guatemala',
			'GG' => 'Guernsey',
			'GN' => 'Guinea',
			'GW' => 'Guinea-Bissau',
			'GY' => 'Guyana',
			'HT' => 'Haiti',
			'HM' => 'Heard Island & Mcdonald Islands',
			'VA' => 'Holy See (Vatican City State)',
			'HN' => 'Honduras',
			'HK' => 'Hong Kong',
			'HU' => 'Hungary',
			'IS' => 'Iceland',
			'IN' => 'India',
			'ID' => 'Indonesia',
			'IR' => 'Iran, Islamic Republic Of',
			'IQ' => 'Iraq',
			'IE' => 'Ireland',
			'IM' => 'Isle Of Man',
			'IL' => 'Israel',
			'IT' => 'Italy',
			'JM' => 'Jamaica',
			'JP' => 'Japan',
			'JE' => 'Jersey',
			'JO' => 'Jordan',
			'KZ' => 'Kazakhstan',
			'KE' => 'Kenya',
			'KI' => 'Kiribati',
			'KR' => 'Korea',
			'KW' => 'Kuwait',
			'KG' => 'Kyrgyzstan',
			'LA' => 'Lao People\'s Democratic Republic',
			'LV' => 'Latvia',
			'LB' => 'Lebanon',
			'LS' => 'Lesotho',
			'LR' => 'Liberia',
			'LY' => 'Libyan Arab Jamahiriya',
			'LI' => 'Liechtenstein',
			'LT' => 'Lithuania',
			'LU' => 'Luxembourg',
			'MO' => 'Macao',
			'MK' => 'Macedonia',
			'MG' => 'Madagascar',
			'MW' => 'Malawi',
			'MY' => 'Malaysia',
			'MV' => 'Maldives',
			'ML' => 'Mali',
			'MT' => 'Malta',
			'MH' => 'Marshall Islands',
			'MQ' => 'Martinique',
			'MR' => 'Mauritania',
			'MU' => 'Mauritius',
			'YT' => 'Mayotte',
			'MX' => 'Mexico',
			'FM' => 'Micronesia, Federated States Of',
			'MD' => 'Moldova',
			'MC' => 'Monaco',
			'MN' => 'Mongolia',
			'ME' => 'Montenegro',
			'MS' => 'Montserrat',
			'MA' => 'Morocco',
			'MZ' => 'Mozambique',
			'MM' => 'Myanmar',
			'NA' => 'Namibia',
			'NR' => 'Nauru',
			'NP' => 'Nepal',
			'NL' => 'Netherlands',
			'AN' => 'Netherlands Antilles',
			'NC' => 'New Caledonia',
			'NZ' => 'New Zealand',
			'NI' => 'Nicaragua',
			'NE' => 'Niger',
			'NG' => 'Nigeria',
			'NU' => 'Niue',
			'NF' => 'Norfolk Island',
			'MP' => 'Northern Mariana Islands',
			'NO' => 'Norway',
			'OM' => 'Oman',
			'PK' => 'Pakistan',
			'PW' => 'Palau',
			'PS' => 'Palestinian Territory, Occupied',
			'PA' => 'Panama',
			'PG' => 'Papua New Guinea',
			'PY' => 'Paraguay',
			'PE' => 'Peru',
			'PH' => 'Philippines',
			'PN' => 'Pitcairn',
			'PL' => 'Poland',
			'PT' => 'Portugal',
			'PR' => 'Puerto Rico',
			'QA' => 'Qatar',
			'RE' => 'Reunion',
			'RO' => 'Romania',
			'RU' => 'Russian Federation',
			'RW' => 'Rwanda',
			'BL' => 'Saint Barthelemy',
			'SH' => 'Saint Helena',
			'KN' => 'Saint Kitts And Nevis',
			'LC' => 'Saint Lucia',
			'MF' => 'Saint Martin',
			'PM' => 'Saint Pierre And Miquelon',
			'VC' => 'Saint Vincent And Grenadines',
			'WS' => 'Samoa',
			'SM' => 'San Marino',
			'ST' => 'Sao Tome And Principe',
			'SA' => 'Saudi Arabia',
			'SN' => 'Senegal',
			'RS' => 'Serbia',
			'SC' => 'Seychelles',
			'SL' => 'Sierra Leone',
			'SG' => 'Singapore',
			'SK' => 'Slovakia',
			'SI' => 'Slovenia',
			'SB' => 'Solomon Islands',
			'SO' => 'Somalia',
			'ZA' => 'South Africa',
			'GS' => 'South Georgia And Sandwich Isl.',
			'ES' => 'Spain',
			'LK' => 'Sri Lanka',
			'SD' => 'Sudan',
			'SR' => 'Suriname',
			'SJ' => 'Svalbard And Jan Mayen',
			'SZ' => 'Swaziland',
			'SE' => 'Sweden',
			'CH' => 'Switzerland',
			'SY' => 'Syrian Arab Republic',
			'TW' => 'Taiwan',
			'TJ' => 'Tajikistan',
			'TZ' => 'Tanzania',
			'TH' => 'Thailand',
			'TL' => 'Timor-Leste',
			'TG' => 'Togo',
			'TK' => 'Tokelau',
			'TO' => 'Tonga',
			'TT' => 'Trinidad And Tobago',
			'TN' => 'Tunisia',
			'TR' => 'Turkey',
			'TM' => 'Turkmenistan',
			'TC' => 'Turks And Caicos Islands',
			'TV' => 'Tuvalu',
			'UG' => 'Uganda',
			'UA' => 'Ukraine',
			'AE' => 'United Arab Emirates',
			'GB' => 'United Kingdom',
			'US' => 'United States',
			'UM' => 'United States Outlying Islands',
			'UY' => 'Uruguay',
			'UZ' => 'Uzbekistan',
			'VU' => 'Vanuatu',
			'VE' => 'Venezuela',
			'VN' => 'Viet Nam',
			'VG' => 'Virgin Islands, British',
			'VI' => 'Virgin Islands, U.S.',
			'WF' => 'Wallis And Futuna',
			'EH' => 'Western Sahara',
			'YE' => 'Yemen',
			'ZM' => 'Zambia',
			'ZW' => 'Zimbabwe',
		);
	}

	/**
	 * Get main query data
	 * @return array
	 */
	public static function get_main_query_array() {
		$main_array = [];
		if ( self::is_subscription_page() ) {

		} elseif ( is_front_page() || is_home() ) {
			$main_array['articles']       = SettingsFunctions::get_front_articles_ids();
			$main_array['notes']          = self::get_posts_ids_by_query( [
				'post_type'      => NoteFunctions::POST_TYPE,
				'posts_per_page' => 9,
			] );
			$main_array['tvs']            = TVFunctions::get_last_items_ids();
			$main_array['tips']           = self::get_tips_data();//TipsFunctions::get_last_items_ids();
			$main_array['current_object'] = [ 'type' => 'home' ];
			$main_array['ads']            = AdsFunctions::get_ads_set_by_template( 'home' );

			$main_array['instagram_feed'] = self::get_instagram_feed();


		} elseif ( is_post_type_archive( NoteFunctions::POST_TYPE ) || Helpers::is_page_template( get_the_ID(), 'notes' ) ) {
			$main_array['notes']          = self::get_posts_ids_by_query( [
				'post_type'      => NoteFunctions::POST_TYPE,
				'posts_per_page' => 9,
			] );
			$main_array['current_object'] = [ 'type' => NoteFunctions::POST_TYPE . '_archive' ];
			$main_array['ads']            = AdsFunctions::get_ads_set_by_template( 'notes' );
		} elseif ( is_tag() || is_category() ) {
			$term = get_queried_object();
			$args = [
				'post_type'      => ArticleFunctions::POST_TYPE,
				'posts_per_page' => 21,

			];
			if ( $term instanceof \WP_Term ) {
				if ( $term->taxonomy == ArticleFunctions::CATEGORY ) {
					$args['category_name'] = $term->slug;
				} elseif ( $term->taxonomy == ArticleFunctions::TAG ) {
					$args['tag'] = $term->slug;
				}
				$main_array['current_object'] = [
					'title' => $term->name,
					'slug'  => $term->slug,
					'id'    => $term->term_id,
					'type'  => $term->taxonomy
				];
				$main_array['ads']            = AdsFunctions::get_ads_set_by_template( is_tag() ? 'tag' : 'category', $term->term_id );
			}
			$main_array['articles'] = self::get_posts_ids_by_query( $args );


		} elseif ( is_post_type_archive( TVFunctions::POST_TYPE ) ) {
			$main_array['tvs']            = self::get_posts_ids_by_query( [
				'post_type'      => TVFunctions::POST_TYPE,
				'posts_per_page' => 9,
			] );
			$main_array['current_object'] = [ 'type' => TVFunctions::POST_TYPE . '_archive' ];


		} elseif ( is_page() ) {
			$parent_id = self::get_parent_page( get_the_ID() );
			if ( ! $parent_id ) {
				$parent_id = get_the_ID();
			} else {
				if ( Helpers::is_browser_request() ) {
					Helpers::add_prepared_post( $parent_id, self::get_page_array( $parent_id ) );
				}
			}
			$children = self::get_page_children_ids( $parent_id );
			if ( $children ) {
				$main_array['children'] = $children;
			}
			$main_array['current_object'] = self::get_page_array( get_the_ID(), 'full' );
			if ( Helpers::is_browser_request() ) {
				Helpers::add_prepared_post( get_the_ID(), $main_array['current_object'] );
			}

		} elseif ( is_singular( [ ArticleFunctions::POST_TYPE ] ) ) {
			$post_id                      = get_the_ID();
			$main_array['current_object'] = ArticleFunctions::get_post_array( $post_id, 'full' );
			$main_array['nearest_feed']   = ArticleFunctions::get_nearest_post_ids( $post_id, null, null );

			$main_array['ads'] = AdsFunctions::get_ads_set_by_template( 'article', $post_id );
		} elseif ( is_singular( [ TVFunctions::POST_TYPE ] ) ) {
			$post_id                      = get_the_ID();
			$main_array['current_object'] = TVFunctions::get_post_array( $post_id, 'full' );
			$main_array['ads']            = AdsFunctions::get_ads_set_by_template( 'tv', $post_id );

		} elseif ( is_search() ) {
			$main_array['current_object'] = [ 'type' => 'search' ];
			$main_array['items']          = self::get_search_items( $_GET );
		}
		if ( isset( $_GET['fulfillmentStatus'] ) ) {
			$fulfillment_status               = $_GET['fulfillmentStatus'] == 'success' ? 'success' : 'error';
			$main_array['fulfillment_status'] = $fulfillment_status;
			if ( self::is_subscription_page() ) {
				$main_array['unique_slug'] = sanitize_title( get_query_var( Functions::SUBSCRIBE_SLUG, null ) );
			}
		}


		return $main_array;
	}

	/**
	 * Get footer data
	 * @return array
	 */
	public static function get_footer_array() {
		$data                 = [];
		$data                 = array_merge( SettingsFunctions::get_footer_columns_data(), $data );
		$data['main_tlf']     = SettingsFunctions::get_footer_mail_tlf();
		$data['contact_link'] = self::get_page_url_by_template( 'templates/contact.php' );

		return $data;
	}

	/**
	 * Get header data
	 * @return array
	 */
	public static function get_header_array() {
		return [ 'links' => SettingsFunctions::get_header_links_array() ];
	}

	/**
	 * @param $theme_location
	 *
	 * @return array
	 */
	public static function get_menu_array( $theme_location, $depth = 0 ) {
		$menu_array = [];
		$locations  = get_nav_menu_locations();

		if ( $locations && isset( $locations[ $theme_location ] ) ) {
			//$menu_array = wp_get_nav_menu_items( $locations[ $theme_location ] );
			$walker     = new MenuArrayWalker();
			$menu_array = $walker->walk( wp_get_nav_menu_items( $locations[ $theme_location ] ), $depth );
			if ( ! ConnectId::is_logged_in() ) {
				if ( $menu_array && is_array( $menu_array ) ) {
					foreach ( $menu_array as $index => $item ) {
						if ( $item['classes'] && in_array( 'loggedin-only', $item['classes'] ) ) {
							unset( $menu_array[ $index ] );
						}
					}
				}
			}
		}

		return $menu_array && is_array( $menu_array ) ? array_values( $menu_array ) : [];
	}

	public static function get_posts_by_ids( $ids ) {
		$res = [];
		if ( $ids && is_array( $ids ) ) {
			$ids                = array_filter( $ids, 'absint' );
			$allowed_post_types = [
				ArticleFunctions::POST_TYPE,
				NoteFunctions::POST_TYPE,
				//TipsFunctions::POST_TYPE,
				TVFunctions::POST_TYPE,
				'page'
			];
			$query              = new \WP_Query( [
				'post_type'      => $allowed_post_types,
				'posts_per_page' => count( $ids ),
				'post__in'       => $ids
			] );
			if ( $query->have_posts() ) {
				while ( $query->have_posts() ) {
					$query->the_post();
					$item = self::get_post_array();
					if ( $item ) {
						$res[ get_the_ID() ] = $item;
					}
				}
			}

		}

		return $res;

	}

	public static function get_post_array( $context = '' ) {
		$item = [];
		switch ( get_post_type() ) {
			case ArticleFunctions::POST_TYPE:
				$item = ArticleFunctions::get_post_array( null, $context );
				break;
			case NoteFunctions::POST_TYPE:
				$item = NoteFunctions::get_post_array();

				break;
			/*case TipsFunctions::POST_TYPE:
				$item = TipsFunctions::get_post_array();

				break;*/
			case TVFunctions::POST_TYPE:
				$item = TVFunctions::get_post_array( null, $context );

				break;
			case 'page':
				$item = self::get_page_array( null );

				break;
		}

		return $item;
	}

	public static function get_posts_ids_by_query( $args ) {
		$available_args = [
			'tag',
			'category_name',
			'posts_per_page',
			'date_query',
			'offset',
			's'
		];
		if ( isset( $args['s'] ) ) {
			$available_post_types = [
				ArticleFunctions::POST_TYPE,
				TVFunctions::POST_TYPE,
				'page'
			];
		} else {
			$available_post_types = [
				ArticleFunctions::POST_TYPE,
				NoteFunctions::POST_TYPE,
				TVFunctions::POST_TYPE,
				//TipsFunctions::POST_TYPE
			];
		}

		$query_args = [];
		foreach ( $available_args as $available_arg ) {
			if ( isset( $args[ $available_arg ] ) ) {
				$query_args[ $available_arg ] = $args[ $available_arg ];
			}
		}

		if ( isset( $args['post_type'] ) ) {
			if ( $args['post_type'] ) {
				if ( is_string( $args['post_type'] ) && in_array( $args['post_type'], $available_post_types ) ) {
					$query_args['post_type'] = $args['post_type'];
				} elseif ( is_array( $args['post_type'] ) && ! array_diff( $args['post_type'], $available_post_types ) ) {
					$query_args['post_type'] = $args['post_type'];
				}
			} else {
				$args['post_type'] = ArticleFunctions::POST_TYPE;
			}
		}
		$items_query           = new \WP_Query( $query_args );
		$ids                   = [];
		$append_prepared_posts = Helpers::is_browser_request();
		if ( $items_query->have_posts() ) {
			while ( $items_query->have_posts() ) {
				$items_query->the_post();
				$id    = get_the_ID();
				$ids[] = $id;
				if ( $append_prepared_posts ) {
					Helpers::add_prepared_post( $id, self::get_post_array() );
				}

			}
		}
		wp_reset_postdata();

		return $ids;
	}

	public static function get_parent_page( $page_id ) {
		return get_post( $page_id )->post_parent;
	}


	public static function get_page_array( $page_id, $context = '' ) {
		if ( ! $page_id ) {
			$page_id = get_the_ID();
		}
		$res = [
			'type'       => 'page',
			'id'         => $page_id,
			'load_state' => $context == 'full' ? 'full' : 'part',
			'title'      => get_the_title( $page_id ),
			'link'       => get_the_permalink( $page_id ),
			'parent'     => get_post( $page_id )->post_parent,
			'template'   => 'default'

		];
		if ( $context == 'full' ) {
			if ( Helpers::is_page_template( $page_id, 'contact' ) ) {
				$res['template'] = 'contact';
				$map_data        = Helpers::get_rwmb_meta_value( 'page_contact_tmpl_map', [], $page_id );
				if ( $map_data ) {
					$res['map'] = $map_data;
				}
				$res['hide_map'] = Helpers::get_rwmb_meta_value( 'page_contact_tmpl_map_hide', [], $page_id );
			} elseif ( Helpers::is_page_template( $page_id, 'tips-oss' ) ) {
				$res['template'] = 'tips-oss';
				$map_data        = Helpers::get_rwmb_meta_value( 'page_contact_tmpl_map', [], $page_id );
				if ( $map_data ) {
					$res['map'] = $map_data;
				}
				$res['hide_map'] = intval( Helpers::get_rwmb_meta_value( 'page_contact_tmpl_map_hide', [], $page_id ) );
			} elseif ( Helpers::is_page_template( $page_id, 'eblad' ) ) {
				$res['template'] = 'eblad';
			}
			$res['content'] = apply_filters( 'the_content', get_post_field( 'post_content', $page_id ) );
		}

		return $res;

	}

	public static function get_page_children_ids( $parent_id ) {
		$children = get_pages( [
			'sort_order'  => 'asc',
			'sort_column' => 'menu_order',
			'child_of'    => $parent_id,

		] );
		$ids      = [];
		if ( $children ) {
			$append_prepared_posts = Helpers::is_browser_request();
			foreach ( $children as $child ) {
				$id    = $child->ID;
				$ids[] = $id;
				if ( $append_prepared_posts ) {
					Helpers::add_prepared_post( $id, self::get_page_array( $id ) );
				}
			}
		}

		return $ids;
	}

	public static function get_search_items( $params ) {
		$query_args = [];
		$date_query = [];
		if ( isset( $params['post_type'] ) && $params['post_type'] && $params['post_type'] == TVFunctions::POST_TYPE ) {
			$query_args['post_type'] = [ $params['post_type'] ];
		} else {
			$query_args['post_type'] = [ ArticleFunctions::POST_TYPE, TVFunctions::POST_TYPE ];
		}
		if ( isset( $params['offset'] ) && absint( $params['offset'] ) ) {
			$query_args['offset'] = absint( $params['offset'] );
		}
		if ( isset( $params['posts_per_page'] ) && absint( $params['posts_per_page'] ) ) {
			$query_args['posts_per_page'] = absint( $params['posts_per_page'] );
		} else {
			$query_args['posts_per_page'] = 8;
		}
		if ( isset( $params['s'] ) ) {
			$query_args['s'] = $params['s'];
		}
		if ( isset( $params['cat_name'] ) && $params['cat_name'] ) {
			$query_args['category_name'] = $params['cat_name'];
		}
		if ( isset( $params['after'] ) && isset( $params['before'] ) && $params['before'] == $params['after'] ) {
			$date_query[] = [
				'year'  => date( 'Y', strtotime( $params['before'] ) ),
				'month' => date( 'm', strtotime( $params['before'] ) ),
				'day'   => date( 'd', strtotime( $params['before'] ) )
			];
		} else {
			if ( isset( $params['after'] ) && $params['after'] ) {
				$date_query[] = [
					'after'     => date( 'Y-m-d H:i:s', strtotime( $params['after'] ) ),
					'inclusive' => true
				];
			}
			if ( isset( $params['before'] ) && $params['before'] ) {
				$date_query[] = [
					'before'    => date( 'Y-m-d H:i:s', strtotime( $params['before'] ) ),
					'inclusive' => true
				];
			}
		}

		if ( $date_query ) {
			$query_args['date_query'] = $date_query;
		}

		return self::get_posts_ids_by_query( $query_args );
	}

	public static function get_instagram_feed() {
		$token   = SettingsFunctions::get_instagram_token();
		$user_id = SettingsFunctions::get_instagram_user_id();
		$inst    = new Instagram( $token, $user_id );

		return $inst->get_feed();
	}

	public static function is_subscription_page() {
		return ! is_null( get_query_var( Functions::SUBSCRIBE_SLUG, null ) );
	}

	public static function get_subscription_plans() {
		$subscriptions = SettingsFunctions::get_subscriptions();
		if ( $subscriptions ) {
			foreach ( $subscriptions as $key => $subscription ) {
				$subscriptions[ $key ]['unique_slug'] = sanitize_title( sprintf( '%s', crc32( serialize( $subscription ) ) ) );
			}

			return $subscriptions;
		}

		return [];
	}
	public static function get_available_cid_prod_ids() {
		$ids           = [];
		$subscriptions = SettingsFunctions::get_subscriptions();
		if ( $subscriptions ) {
			foreach ( $subscriptions as $subscription ) {
				if ( isset( $subscription['enable_day_options'] ) && $subscription['enable_day_options'] ) {
					if ( isset( $subscription['product_id_options'] ) && $subscription['product_id_options'] ) {
						foreach ( $subscription['product_id_options'] as $product_id_option ) {
							if ( isset( $product_id_option['product_option_id'] ) && $product_id_option['product_option_id'] ) {
								$ids[] = $product_id_option['product_option_id'];
							}

						}
					}
				} else {
					if ( isset( $subscription['product_id'] ) && $subscription['product_id'] ) {
						$ids[] = $subscription['product_id'];
					}
				}
			}
		}

		return $ids;

	}

	public static function get_tips_data() {
		$cache_key = "tips_external_data";
		$tips_url  = SettingsFunctions::get_tips_src_url();
		$data      = [];
		if ( $tips_url ) {
			if ( false === ( $data = get_transient( $cache_key ) ) ) {

				$resp = wp_remote_get( $tips_url );
				$data = json_decode( wp_remote_retrieve_body( $resp ) );
				if ( wp_remote_retrieve_response_code( $resp ) && $data ) {
					set_transient( $cache_key, $data, time() + MINUTE_IN_SECONDS * 5 );

					return $data;
				}
			}
		}

		return $data;

	}

}
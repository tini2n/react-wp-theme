<?php

namespace modules\ads;

use modules\theme\Helpers;
use WPKit\Module\AbstractFunctions;

use modules\settings\Functions as SettingsFunctions;

use modules\article\Functions as ArticleFunctions;


/**
 * Class Functions
 *
 * @package modules\ads
 */
class Functions extends AbstractFunctions {
	/**
	 * Post type slug
	 */
	const POST_TYPE = 'ads';

	const ADS_BUYER = 'ads_buyer';
	const ADS_PLACES = [
		'home'     => [ 'count' => 3, 'title' => 'Home' ],
		'notes'    => [ 'count' => 2, 'title' => 'Notes archive' ],
		'category' => [ 'count' => 3, 'title' => 'Category Default' ],
		'tag'      => [ 'count' => 3, 'title' => 'Tag Default' ]
	];

	/**
	 * @param $args
	 *
	 * @return \WP_Query
	 */

	public static function get_posts( $args ) {
		return new \WP_Query( wp_parse_args( $args, [
			'post_type' => static::POST_TYPE,
		] ) );
	}

	public static function get_available_ids() {
		return self::get_posts( [ 'posts_per_page' => - 1, 'fields' => 'ids' ] )->get_posts();
	}


	public static function get_post_array( $post_id = null ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}
		$main_cat = Helpers::get_primary_tax_term( $post_id );

		$data = [
			'type'             => self::POST_TYPE,
			'id'               => $post_id,
			'title'            => get_the_title( $post_id ),
			'link'             => get_the_permalink( $post_id ),
			'excerpt'          => get_post_field( 'post_excerpt', $post_id ),
			'main_category_id' => $main_cat ? $main_cat->term_id : '',
			'publish_date'     => get_the_date( 'U', $post_id ),
		];

		return $data;

	}

	public static function get_banner( $template, $number, $current_object_id = null, $is_mobile = false ) {
		$ads_places            = self::ADS_PLACES;
		$ads_places['article'] = [ 'count' => 2 ];
		$ads_places['tv'] = [ 'count' => 2 ];
		$postfix               = $is_mobile ? '_mob' : '';
		$final_banner          = [];
		$banner_id             = 0;
		$size                  = $is_mobile ? 'wide-ad-mob' : 'wide-ad';
		if ( isset( $ads_places[ $template ] ) ) {
			if ( ! is_null( $number ) && absint( $number ) && ( $ads_places[ $template ]['count'] >= absint( $number ) ) ) {
				switch ( $template ) {
					case 'content':
						{
							break;
						}
					case 'article':
						{
							$size = 'tall-ad';
							if ( $current_object_id ) {
								$main_cat = Helpers::get_primary_tax_term( $current_object_id );
								if ( $main_cat ) {
									$banner_id = Helpers::get_rwmb_meta( 'tax_article_object_ads_banners_' . $number, ['object_type' => 'term'], $main_cat->term_id );
								}
							}
							if ( ! $banner_id ) {
								$banner_id = SettingsFunctions::get_rwmb_ads_option( 'article_ads_banners_' . $number );
							}
							break;
						}
					case 'tv':
						{
							$size = 'tall-ad';
							if ( $current_object_id ) {
								$banner_id = Helpers::get_rwmb_meta( 'tv_object_ads_banners_' . $number, [], $current_object_id );

							}
							break;
						}
					case 'tag':
					case 'category':
						{
							if ( $current_object_id ) {
								$banner_id = Helpers::get_rwmb_meta( 'tax_object_ads_banners_' . $number, ['object_type' => 'term'], $current_object_id );
							}
							if ( ! $banner_id ) {
								$banner_id = SettingsFunctions::get_rwmb_ads_option( $template . '_ads_banners_' . $number . $postfix );
							}
							break;
						}
					case 'home':
					case 'notes':
						{
							$banner_id = SettingsFunctions::get_rwmb_ads_option( $template . '_ads_banners_' . $number . $postfix );
							break;
						}
				}

			}
		}
		if ( $banner_id && get_post_status( $banner_id ) ) {
			$final_banner = self::get_banner_array( $banner_id, $size );
		}

		return $final_banner;

	}

	public static function get_url( $id ) {
		return Helpers::get_rwmb_meta( self::POST_TYPE . '_general_url', [], $id );
	}

	public static function get_banner_array( $id, $size = 'wide-ad' ) {
		$img_id = get_post_thumbnail_id( $id );

		return [
			'id'    => $id,
			'url'   => self::get_url( $id ),
			'image' => $img_id ? Helpers::prepare_thumbnail( $img_id, [ $size => $size ] ) : ''
		];
	}

	public static function get_ads_set_by_template( $template, $object_id = null ) {
		$res                   = [];
		$ads_places            = self::ADS_PLACES;
		$ads_places['article'] = [ 'count' => 2 ];
		$ads_places['tv']      = [ 'count' => 2 ];
		if ( isset( $ads_places[ $template ] ) ) {
			for ( $i = 1; $i <= $ads_places[ $template ]['count']; $i ++ ) {
				$res[] = [
					'mob'  => self::get_banner( $template, $i, $object_id, true ),
					'desk' => self::get_banner( $template, $i, $object_id, false )
				];
			}
		}

		if ( $template == 'article' || $template == 'tv' ) {
			$content_ads = Helpers::get_content_ad_objects_array();
			if ( $content_ads ) {
				$res['content'] = $content_ads;
			}
		}

		return $res;
	}

	public static function set_views( $post_id, $value ) {
		update_post_meta( $post_id, self::POST_TYPE . '_month_views', absint( $value ) );
	}

	public static function get_views( $post_id ) {
		$number = Helpers::get_rwmb_meta( self::POST_TYPE . '_month_views', [], $post_id );
		if ( ! $number ) {
			$number = 0;
		}

		return absint( $number );
	}

	public static function set_clicks( $post_id, $value ) {
		update_post_meta( $post_id, self::POST_TYPE . '_month_clicks', absint( $value ) );
	}

	public static function get_clicks( $post_id ) {
		$number = Helpers::get_rwmb_meta( self::POST_TYPE . '_month_clicks', [], $post_id );
		if ( ! $number ) {
			$number = 0;
		}

		return absint( $number );
	}

	public static function update_conversion( $post_id ) {
		$clicks     = self::get_clicks( $post_id );
		$views      = self::get_views( $post_id );
		$conversion = 0;
		if ( $clicks * $views !== 0 ) {
			$conversion = number_format( ( $clicks / $views ) * 100, 2 );
		}
		update_post_meta( $post_id, self::POST_TYPE . '_month_conversion', absint( $conversion ) );

	}

	public static function get_conversion( $post_id ) {
		return Helpers::get_rwmb_meta( self::POST_TYPE . '_month_conversion', [], $post_id );
	}

	public static function update_statistics() {
		$ga_report           = new GAReport();
		$analytics           = $ga_report->initializeAnalytics();
		$res                 = $ga_report->getResults( $ga_report->getReport( $analytics ) );
		$available_posts_ids = self::get_available_ids();

		if ( $available_posts_ids && $res ) {
			if ( count( $available_posts_ids ) >= count( $res ) ) {
				foreach ( $available_posts_ids as $post_id ) {
					if ( isset( $res[ $post_id ] ) && isset( $res[ $post_id ]['clicks'] ) && isset( $res[ $post_id ]['views'] ) ) {
						self::set_clicks( $post_id, absint( $res[ $post_id ]['clicks'] ) );
						self::set_views( $post_id, absint( $res[ $post_id ]['views'] ) );
						self::update_conversion( $post_id );
						update_post_meta( $post_id, self::POST_TYPE . '_last_statistics_update', date( 'Y-m-d H:i:s' ) );
						//var_dump( $res[ $post_id ] );
					}
				}
			} else {
				foreach ( $res as $post_id => $data ) {
					if ( in_array( $post_id, $available_posts_ids ) && isset( $data['clicks'] ) && isset( $data['views'] ) ) {
						self::set_clicks( $post_id, absint( $data['clicks'] ) );
						self::set_views( $post_id, absint( $data['views'] ) );
						self::update_conversion( $post_id );
						update_post_meta( $post_id, self::POST_TYPE . '_last_statistics_update', date( 'Y-m-d H:i:s' ) );
						//var_dump( $data );
					}
				}
			}
		}
	}

}
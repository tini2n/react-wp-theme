<?php

namespace modules\tv;

use modules\theme\Helpers;
use WPKit\Module\AbstractFunctions;


/**
 * Class Functions
 *
 * @package modules\fact
 */
class Functions extends AbstractFunctions {
	/**
	 * Post type slug
	 */
	const POST_TYPE = 'tv';
	/**
	 * Category slug
	 */

	public static $general_meta_fields = [
		'subtitle'         => [ 'type' => 'text' ],
		'vimeo_video_link' => [
			'type'     => 'url',
			'pattern'  => "https://vimeo.com/[0-9]+",
			'desc'     => 'Format: https://vimeo.com/[0-9]+',
			'required' => true
		]

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


	public static function is_paid_post( $post_id ) {
		return ! ! Helpers::get_rwmb_meta( Functions::POST_TYPE . '_general_is_paid_content', [], $post_id );
	}

	public static function has_video( $post_id ) {
		return ! ! Helpers::get_rwmb_meta( Functions::POST_TYPE . '_general_has_video', [], $post_id );
	}

	public static function get_post_array( $post_id = null, $context = '' ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}
		$main_cat     = Helpers::get_primary_tax_term( $post_id );
		$thumbnail_id = get_post_thumbnail_id( $post_id );
		$meta_fields  = [];
		foreach ( self::$general_meta_fields as $meta_key => $f_type ) {
			$meta_fields[ $meta_key ] = Helpers::get_rwmb_meta( Functions::POST_TYPE . '_general_' . $meta_key, [], $post_id );
		}
		if ( $meta_fields['vimeo_video_link'] ) {
			$meta_fields['vimeo_video_id'] = trim( str_replace( 'https://vimeo.com/', '', $meta_fields['vimeo_video_link'] ), '/' );
		}
		$data = [
			'type'         => self::POST_TYPE,
			'id'           => $post_id,
			'load_state'   => $context == 'full' ? 'full' : 'part',
			'title'        => get_the_title( $post_id ),
			'link'         => get_the_permalink( $post_id ),
			'publish_date' => get_the_date( 'U', $post_id ),
			'excerpt'      => get_post_field( 'post_excerpt', $post_id ),
			'thumbnails'   => $thumbnail_id ? Helpers::prepare_thumbnail( $thumbnail_id, [
				'grid-small-tv' => 'grid-small-tv',
				'tiny'          => 'tiny',
			], true ) : '',
			'meta'         => $meta_fields

		];
		if ( $context == 'full' ) {
			$data['shortlink'] = wp_get_shortlink( $post_id );
			$data['content']   = apply_filters( 'the_content', get_post_field( 'post_content', $post_id ) );
		}

		return $data;

	}

	public static function get_last_items_ids( $count = 9 ) {
		$items_query           = self::get_posts( [ 'posts_per_page' => absint( $count ) ] );
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


}
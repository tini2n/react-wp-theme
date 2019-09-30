<?php

namespace modules\note;

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
	const POST_TYPE = 'note';
	/**
	 * Category slug
	 */
	const CATEGORY = 'category';

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


	/**
	 * @param array $args
	 *
	 * @return array|int|null
	 */
	public static function get_categories( $args = [] ) {
		$res = get_terms( wp_parse_args( $args, [
			'taxonomy' => static::CATEGORY,
		] ) );
		if ( $res && ! is_wp_error( $res ) ) {
			return $res;
		}

		return null;
	}

	public static function get_categories_array() {
		$items = [];
		$terms = self::get_categories( [ 'fields' => 'ids' ] );
		if ( $terms ) {
			foreach ( $terms as $term_id => $term_name ) {
				$items[ $term_id ] = [
					'title' => $term_name,
					'url'   => get_term_link( $term_id, self::CATEGORY ),
				];
			}
		}

		return $items;
	}

	public static function get_main_category_html_link( $post_id ) {
		$term = Helpers::get_primary_tax_term( $post_id );
		if ( $term ) {
			/**
			 * @var $term \WP_Term
			 */
			$attrs = [
				'class' => '',
				'href'  => get_term_link( $term, self::CATEGORY ),
				'text'  => $term->name,
			];

			return Helpers::build_html_link( $attrs );

		}

		return '';
	}

	public static function get_post_array( $post_id = null ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}
		$main_cat     = Helpers::get_primary_tax_term( $post_id );

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






}
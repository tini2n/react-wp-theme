<?php

namespace modules\article;

use modules\theme\ConnectId;
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
	const POST_TYPE = 'article';
	/**
	 * Category slug
	 */
	const CATEGORY = 'category';

	const TAG = 'post_tag';

	public static $general_meta_fields = [
		'show_excerpt_on_archives' => [ 'type' => 'switch' ],
		'hide_thumbnail_on_single' => [ 'type' => 'switch' ],
		'is_paid_content'          => [ 'type' => 'switch' ],
		'has_video'                => [ 'type' => 'switch' ],
		'single_style'             => [
			'type'    => 'select',
			'options' => [ '' => 'Default', 'special' => 'Special', 'vertical' => 'Vertical' ]
		],
		'single'                   => [
			'type'    => 'select',
			'options' => [ '' => 'Default', 'red' => 'Red', 'black' => 'Black', 'gray' => 'Gray' ]
		],
		'photo_by'                 => [ 'type' => 'text' ],
		'text_by'                  => [ 'type' => 'text' ],
		'text_and_photo_by'        => [ 'type' => 'text' ],

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

	/**
	 * @param array $args
	 *
	 * @return array|int|null
	 */
	public static function get_tags( $args = [] ) {
		$res = get_terms( wp_parse_args( $args, [
			'taxonomy' => static::TAG,
		] ) );
		if ( $res && ! is_wp_error( $res ) ) {
			return $res;
		}

		return null;
	}

	public static function get_post_categories_ids( $post_id ) {
		$terms = get_the_terms( $post_id, static::CATEGORY );
		$res   = [];
		if ( $terms && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $item ) {
				$res[] = $item->term_id;
			}
		}

		return $res;
	}

	public static function get_post_tags_ids( $post_id ) {
		$terms = get_the_terms( $post_id, static::TAG );
		$res   = [];
		if ( $terms && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $item ) {
				$res[] = $item->term_id;
			}
		}

		return $res;
	}

	public static function get_categories_array() {
		$items = [];
		$terms = self::get_categories();
		if ( $terms ) {
			foreach ( $terms as $term ) {
				/**
				 * @var $term \WP_Term
				 */
				$items[ $term->term_id ] = [
					'title' => $term->name,
					'slug'  => $term->slug,
					'url'   => get_term_link( $term->term_id, self::CATEGORY ),
				];
			}
		}

		return $items;
	}

	public static function get_tags_array() {
		$items = [];
		$terms = self::get_tags();
		if ( $terms ) {
			foreach ( $terms as $term ) {
				/**
				 * @var $term \WP_Term
				 */
				$items[ $term->term_id ] = [
					'title' => $term->name,
					'slug'  => $term->slug,
					'url'   => get_term_link( $term->term_id, self::TAG ),
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
			if ( $f_type['type'] == 'switch' ) {
				$meta_fields[ $meta_key ] = ! ! Helpers::get_rwmb_meta( Functions::POST_TYPE . '_general_' . $meta_key, [], $post_id );
			} else {
				$meta_fields[ $meta_key ] = Helpers::get_rwmb_meta( Functions::POST_TYPE . '_general_' . $meta_key, [], $post_id );
			}
		}
		$meta_fields['subtitle'] = Helpers::get_rwmb_meta( Functions::POST_TYPE . '_general_top_subtitle', [], $post_id );
		$data                    = [
			'type'             => self::POST_TYPE,
			'id'               => $post_id,
			'load_state'       => $context == 'full' ? 'full' : 'part',
			'title'            => get_the_title( $post_id ),
			'link'             => get_the_permalink( $post_id ),
			'excerpt'          => get_post_field( 'post_excerpt', $post_id ),
			'main_category_id' => $main_cat ? $main_cat->term_id : '',
			'publish_date'     => get_the_date( 'U', $post_id ),
			'update_date'      => get_post_modified_time( 'U', false, $post_id ),
			'thumbnails'       => $thumbnail_id ? Helpers::prepare_thumbnail( $thumbnail_id, [
				'content-article' => 'content-article',
				'full-width'      => 'full-width',
				'content-wrap'    => 'content-wrap',
				'single-small'    => 'single-small',
				'grid-big'        => 'grid-big',
				'grid-small'      => 'grid-small',
				'grid-half'       => 'grid-half',
				'tiny-square'     => 'tiny',
				'vertical'        => 'vertical',
			], true ) : '',
			'meta'             => $meta_fields

		];
		if ( $context == 'full' ) {
			$data['additional_images'] = self::get_additional_images( $post_id );
			$data['shortlink']         = wp_get_shortlink( $post_id );
			$data['tags']              = self::get_post_tags_ids( $post_id );
			$is_paid_content           = isset( $meta_fields['is_paid_content'] ) ? ! ! $meta_fields['is_paid_content'] : false;
			$data['paywall']           = $is_paid_content && ! ConnectId::is_subscribed();

			if ( ! $data['paywall'] ) {
				$data['content']         = apply_filters( 'the_content', get_post_field( 'post_content', $post_id ) );
				$data['gallery_objects'] = Helpers::get_gallery_objects_array();

			} else {
				$data['content']         = '';
				$data['gallery_objects'] = [];
			}
			$data['related_ids'] = self::get_related_ids( $data['tags'], $post_id );
		}

		return $data;

	}

	public static function get_related_ids( $tags_ids, $current_id ) {
		$query_args = [ 'posts_per_page' => 3, 'post__not_in' => [ $current_id ], 'post_type' => self::POST_TYPE ];
		if ( $tags_ids ) {
			$query_args['tag__in'] = $tags_ids;
		}
		$items_query = new \WP_Query( $query_args );
		if ( $tags_ids && ! $items_query->have_posts() ) {
			unset( $query_args['tag__in'] );
			$items_query = new \WP_Query( $query_args );
		}
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

		return $ids;
	}


	public static function get_nearest_post_ids( $current_post_id, $category_id, $offset, $before = false, $after = false ) {
		$before_ids = [];
		$after_ids  = [];
		if ( ! ( $after && $before ) ) {
			$after = $before = true;
		}
		if ( $before || $after ) {
			$current_post_date = get_the_date( 'Y-m-d H:i:s', absint( $current_post_id ) );
			$args              = [ 'posts_per_page' => 10, ];
			if ( $current_post_id ) {
				$args['post__not_in'] = [ $current_post_id ];
			}
			if ( $category_id ) {
				$args['cat'] = absint( $category_id );
			}
			if ( $offset ) {
				$args['offset'] = absint( $offset );
			}
			$append_prepared_posts = Helpers::is_browser_request();
			if ( $before ) {
				$before_args               = $args;
				$before_args['date_query'] = [ [ 'before' => $current_post_date, 'inclusive' => false ] ];
				$articles                  = self::get_posts( $before_args );
				$before_ids                = [];
				if ( $articles->have_posts() ) {
					while ( $articles->have_posts() ) {
						$articles->the_post();
						$id           = get_the_ID();
						$before_ids[] = $id;
						if ( $append_prepared_posts ) {
							Helpers::add_prepared_post( $id, self::get_post_array() );
						}
					}
				}
			}
			if ( $after ) {
				$after_args               = $args;
				$after_args['date_query'] = [ [ 'after' => $current_post_date, 'inclusive' => false ] ];
				$articles                 = self::get_posts( $after_args );
				$after_ids                = [];
				if ( $articles->have_posts() ) {
					while ( $articles->have_posts() ) {
						$articles->the_post();
						$id          = get_the_ID();
						$after_ids[] = $id;
						if ( $append_prepared_posts ) {
							Helpers::add_prepared_post( $id, self::get_post_array() );
						}
					}
				}
			}
		}


		return [ 'after' => $after_ids, 'before' => $before_ids ];
	}

	public static function get_additional_images( $article_id ) {
		$res    = [];
		$images = Helpers::get_rwmb_meta( 'additional_images', array( 'size' => 'thumbnail' ), $article_id );
		if ( $images ) {
			foreach ( array_keys( $images ) as $image_id ) {
				$res[] = Helpers::prepare_thumbnail( $image_id, [ 'content-wrap' => 'content-wrap' ], true );
			}
		}

		return $res;
	}


}
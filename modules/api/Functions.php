<?php

namespace modules\api;

use modules\theme\Fotoware;
use WPKit\Module\AbstractFunctions;

use modules\article\Functions as ArticleFunctions;
use modules\theme\Functions as ThemeFunctions;
use modules\settings\Functions as SettingsFunctions;

use modules\formrequest\Functions as FormrequestFunctions;

use modules\order\Functions as OrderFunctions;

/**
 * Class Functions
 *
 * @package modules\api
 */
class Functions extends AbstractFunctions {
	const API = 'api/v1';


	/**
	 * @return array
	 */
	public static function get_parameter_mappings() {
		return [
			'page'           => [
				'name' => 'page',
				'type' => 'int',
			],
			'category_name'  => [
				'name' => 'category_name',
				'type' => 'string',
			],
			'filter'         => [
				'name' => 'filter',
				'type' => 'string',
			],
			'offset'         => [
				'name' => 'offset',
				'type' => 'int',
			],
			'posts_per_page' => [
				'name' => 'posts_per_page',
				'type' => 'int',
			],
			'post_id'        => [
				'name' => 'post_id',
				'type' => 'int'
			],
			'post_type'      => [
				'name' => 'post_type',
				'type' => 'string'
			],
			's'              => [
				'name' => 's',
				'type' => 'string'
			],
			'post__in'       => [
				'name' => 'post__in',
				'type' => 'array'
			],
			'ids'            => [
				'name' => 'ids',
				'type' => 'array'
			],
			'before'         => [
				'name' => 'before',
				'type' => 'date'
			],
			'after'          => [
				'name' => 'before',
				'type' => 'date'
			]
		];
	}

	/**
	 * @param \WP_REST_Request $request
	 * @param \WP_REST_Response $response
	 *
	 * @return array
	 */

	public static function get_posts_by_ids( \WP_REST_Request $request, \WP_REST_Response $response ) {
		$ids = $request->get_param( 'ids' );
		$res = [];
		if ( is_array( $ids ) && $ids ) {
			$res = ThemeFunctions::get_posts_by_ids( $ids );
		}
//		$response->header( 'X-Total', $posts['total'] );
//		$response->header( 'X-PerPage', $posts['per_page'] );
//		$response->header( 'X-DocumentTitle', rawurlencode( $posts['document_title'] ) );

//		return isset( $posts['items'] ) && $posts['items'] ? $posts['items'] : [ ];
		if ( is_wp_error( $res ) ) {
			$response->set_status( 403 );
		}

		return $res;
	}

	public static function get_posts_ids_by_query( \WP_REST_Request $request, \WP_REST_Response $response ) {
		$args = $request->get_params();
		$res  = [];

		$res = ThemeFunctions::get_posts_ids_by_query( $args );

//		$response->header( 'X-Total', $posts['total'] );
//		$response->header( 'X-PerPage', $posts['per_page'] );
//		$response->header( 'X-DocumentTitle', rawurlencode( $posts['document_title'] ) );

//		return isset( $posts['items'] ) && $posts['items'] ? $posts['items'] : [ ];
		if ( is_wp_error( $res ) ) {
			$response->set_status( 403 );
		}

		return $res;
	}

	public static function get_search_posts( \WP_REST_Request $request, \WP_REST_Response $response ) {
		$args = $request->get_params();
		$res  = ThemeFunctions::get_search_items( $args );
		if ( is_wp_error( $res ) ) {
			$response->set_status( 403 );
		}

		return $res;
	}

	public static function get_home_posts( \WP_REST_Request $request, \WP_REST_Response $response ) {
		$offset = absint( $request->get_param( 'offset' ) );

		$res = [];
		if ( $offset ) {
			$res = SettingsFunctions::get_front_articles_ids( $offset );
		}
		if ( is_wp_error( $res ) ) {
			$response->set_status( 403 );
		}


		return $res;
	}

	public static function form_send( \WP_REST_Request $request, \WP_REST_Response $response ) {

		$res = FormrequestFunctions::handle_form_request( $request->get_params() );
		if ( $res !== true ) {
			$response->set_status( 403 );
		}


		return $res;
	}

	public static function subscribe_connect_id( \WP_REST_Request $request, \WP_REST_Response $response ) {
		list( $res, $error ) = OrderFunctions::handle_form_request( $request->get_params() );
		if ( $error ) {
			$response->set_status( 403 );

			return $error;
		}
		if ( ! $res ) {
			$response->set_status( 403 );
		}


		return $res;
	}

	public static function fotoware_api_layer( \WP_REST_Request $request, \WP_REST_Response $response ) {

		$res = Fotoware::handle_admin_request( $request->get_params() );
		if ( ! $res || is_wp_error( $res ) ) {
			$response->set_status( 403 );
		}


		return $res;
	}

	public static function get_nearest( $id, \WP_REST_Request $request, \WP_REST_Response $response ) {
		$offset = absint( $request->get_param( 'offset' ) );
		$before = ! ! $request->get_param( 'before' );
		$after  = ! ! $request->get_param( 'after' );

		$category_id = absint( $request->get_param( 'category_id' ) );


		$res = ArticleFunctions::get_nearest_post_ids( $id, $category_id, $offset, $before, $after );

		if ( is_wp_error( $res ) ) {
			$response->set_status( 403 );
		}

		return $res;
	}


	/**
	 * @param array $params
	 *
	 * @return array
	 */
	public static function get_query_args( array $params ) {
		$args = [];

		foreach ( static::get_parameter_mappings() as $arg => $param ) {
			$name = $param['name'];

			if ( isset( $params[ $name ] ) ) {
				switch ( $param['type'] ) {
					case 'string':
						$args[ $arg ] = wp_unslash( $params[ $name ] );

						break;
					case 'array':
						$args[ $arg ] = ! is_array( $params[ $name ] ) ? explode( ',', $params[ $name ] ) : $params[ $name ];

						break;

					case 'int':
						$args[ $arg ] = intval( $params[ $name ] );

						break;
					case 'date':
						$args[ $arg ] = $params[ $name ] ? date( 'Y-m-d H:i:s', strtotime( $params[ $name ] ) ) : '';
				}
			}
		}

		return $args;
	}

	/**
	 * @param array $query
	 *
	 * @return array
	 */
	public static function get_request_params( array $query ) {
		$params             = [];
		$parameter_mappings = static::get_parameter_mappings();

		foreach ( $query as $arg => $value ) {
			if ( isset( $parameter_mappings[ $arg ] ) ) {
				$params[ $parameter_mappings[ $arg ]['name'] ] = $value;
			} else {
				$params[ $arg ] = $value;
			}
		}

		return $params;
	}


}
<?php

namespace modules\api;

use Simple_REST_API\Router;
use WPKit\Module\AbstractInitialization;

/**
 * Class Initialization
 *
 * @package modules\api
 */
class Initialization extends AbstractInitialization {
	/**
	 * @var Router
	 */
	private $_router = null;

	public function register_router() {
		$this->_router = new Router( Functions::API, [ 'etag' => true ] );
		$this->_add_routes();
	}


	protected function _add_routes() {
		$this->_add_general_routes();


	}


	protected function _add_general_routes() {

		$this->_router->get( '/get_posts_by_ids/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::get_posts_by_ids( $request, $response );
		} );
		$this->_router->get( '/get_posts/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::get_posts_ids_by_query( $request, $response );
		} );
		$this->_router->get( '/get_search_posts/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::get_search_posts( $request, $response );
		} );

		$this->_router->get( '/home_posts/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::get_home_posts( $request, $response );
		} );
		$this->_router->get( '/nearest_feed/{id}', function ( $id, \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::get_nearest( $id, $request, $response );
		} )->assert( 'id', '\d+' )->convert( 'id', function ( $id ) {
			return absint( $id );
		} );
		$this->_router->post( '/form_request_send/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::form_send( $request, $response );
		} );
		$this->_router->post( '/subscribe_connect_id/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::subscribe_connect_id( $request, $response );
		} );
		$this->_router->get( '/fotoware-api-layer/', function ( \WP_REST_Request $request, \WP_REST_Response $response ) {
			return Functions::fotoware_api_layer( $request, $response );
		} );


	}


}
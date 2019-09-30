<?php

/**
 * Class Instagram.php
 * Class Description
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */

namespace modules\theme;

use modules\settings\Functions as SettingsFunctions;


class Instagram {

	const API_URL = 'https://api.instagram.com/v1/users/';
	protected $_token;
	protected $_user_id;


	public function __construct( $token, $user_id ) {
		if ( $token ) {
			$this->_set_token( $token );
		}
		if ( $user_id ) {
			$this->_set_user_id( $user_id );
		}
	}

	protected function _set_token( $token ) {
		$this->_token = $token;
	}

	protected function _set_user_id( $user_id ) {
		$this->_user_id = $user_id;

	}

	protected function _get_token() {
		return $this->_token;
	}

	protected function _get_user_id() {
		return $this->_user_id;

	}

	public function get_feed() {
		$data = [];
		if ( $this->_get_token() && $this->_get_user_id() ) {
			$cache_key = $this->get_transient_key();
			if ( ! $data = get_transient( $cache_key ) ) {

				$request_url = self::API_URL . $this->_get_user_id() . '/media/recent';
				$request_url = add_query_arg( [
					'access_token' => $this->_get_token(),
					'count'        => 15
				], $request_url );
				$resp        = wp_remote_get( $request_url );
				if ( wp_remote_retrieve_response_code( $resp ) == 200 ) {
					$body = wp_remote_retrieve_body( $resp );
					if ( $body ) {
						$body_decoded = json_decode( $body, true );
						if ( $body_decoded && isset( $body_decoded['data'] ) ) {
							$data = $body_decoded['data'];
							set_transient( $cache_key, $data, 3600 );
						}
					}
				}
			}
		}

		return $data;
	}

	protected function get_transient_key() {
		return 'instagram_feed_' . $this->_get_user_id();
	}
}
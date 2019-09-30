<?php

/**
 * Class Fotoware.php
 * Class Description
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */

namespace modules\theme;

use modules\settings\Functions as SettingsFunctions;


class Fotoware {

	const REDIRECT_ENDPOINT = 'fotoware-endpoint';
	const SERVER_URL = 'http://fotoweb.tgn.no';
	const TOKEN_FIELD = 'fotoware_token';

	protected static $_token = null;


	/*public static function get_client_id() {
		return '3f86d357-b74e-41d8-b0a4-dac89f18dd63';
	}

	public static function get_client_secret() {
		return 'KGn6mpJ0IIWEg8nVyT8_FDzX2sr_9XQaYwhjr3Qpv3c';
	}*/

	public static function get_api_key() {
		return SettingsFunctions::get_fotoware_api_key();//'fotoweb2013';
	}

	public static function get_app_name() {
		return SettingsFunctions::get_fotoware_app_name();//'InnocodeAPIstage';
	}

	/*
		public static function get_redirect_uri() {
			return 'http://tgn.wp.stage.redink.digital/fotoware-endpoint/';
		}
	*/
	public static function get_state() {
		return strtolower( md5( 'fotoware_state' . time() ) );
	}

	public static function init() {
		add_rewrite_endpoint( self::REDIRECT_ENDPOINT, EP_ROOT );
		self::_template_include();
	}

	public static function handle_admin_request( $data ) {
		$res = null;
		if ( /*is_user_logged_in() && current_user_can( 'edit_posts' )*/
		true ) {
			$token    = self::get_token();
			$endpoint = isset( $data['endpoint'] ) && $data['endpoint'] ? urldecode( $data['endpoint'] ) : '';
			$accept   = isset( $data['accept'] ) && $data['accept'] ? $data['accept'] : '';

			if ( $endpoint && $accept && $token ) {
				$response = wp_remote_get( self::SERVER_URL . $endpoint, [
					'headers' => [
						'Accept'     => $accept,
						'FWAPIToken' => $token
					]
				] );

				$res = json_decode( wp_remote_retrieve_body( $response ) );

			}
		} else {
			$res = null;
		}

		return $res;
	}


	protected static function _template_include() {
		add_action( 'template_include', function ( $template ) {
			$endpoint_var = get_query_var( self::REDIRECT_ENDPOINT, null );
			/*if ( $endpoint_var == 'login' ) {
				$url = add_query_arg( [
					'response_type' => 'code',
					'redirect_uri'  => ( self::get_redirect_uri() ),
					'client_id'     => self::get_client_id(),
					'state'         => self::get_state()
				], self::SERVER_URL . '/fotoweb/oauth2/authorize' );
				wp_redirect( $url );
			} elseif ( ! is_null( $endpoint_var ) && isset( $_GET['code'] ) && $_GET['code'] ) {
				$code = $_GET['code'];
				$resp = wp_remote_post( self::SERVER_URL . '/fotoweb/oauth2/token', [
					'headers' => array(
						'Content-Type' => 'application/x-www-form-urlencoded',
						'Accept'       => 'application/json'
					),
					'body'    => array(
						'grant_type'    => 'authorization_code',
						'client_id'     => self::get_client_id(),
						'client_secret' => self::get_client_secret(),
						'code'          => $code,
						'redirect_uri'  => ( self::get_redirect_uri() )
					),
				] );
				//var_dump( $resp );
				if ( wp_remote_retrieve_response_code( $resp ) == 200 ) {
					$resp_body = json_decode( wp_remote_retrieve_body( $resp ), true );

					if ( isset( $resp_body['access_token'] ) ) {
						$token = $resp_body['access_token'];
						global $temp_iframe_url;
						$temp_iframe_url = add_query_arg( [ 'access_token' => $token ], self::SERVER_URL . '/fotoweb/widgets/selection' );
						$temp_iframe_url = self::SERVER_URL . '/fotoweb/widgets/selection#access_token=' . $token;
						update_option( self::TOKEN_FIELD, $token );
						$template = get_template_directory() . '/templates/fotoware-iframe.php';
					}
				}
			} else*/
			if ( $endpoint_var == 'long-token-regenerate' ) {
				if ( is_user_logged_in() ) {
					self::generate_token();
				}
			}

			return $template;
		} );
	}

	public static function get_token() {
		$token   = null;
		$expires = get_option( self::TOKEN_FIELD . '_expires' );
		$token   = get_option( self::TOKEN_FIELD );
		if ( ! $expires || ( ( intval( $expires )-time() ) <= DAY_IN_SECONDS ) ) {
			$token = self::generate_token();
		}

		return $token;
	}

	public static function generate_token() {
		$token    = null;
		$api_key  = self::get_api_key();
		$app_name = self::get_app_name();
		if ( $api_key && $app_name ) {
			/*$s_1 = wp_remote_get( self::SERVER_URL . '/fotoweb/me/', [
				'headers' => array(
					'FWAPIToken' => 'fotoweb2013',
					'Accept'     => 'application/vnd.fotoware.full-api-descriptor+json'
				)
			] );
			if ( wp_remote_retrieve_response_code( $s_1 ) == 200 ) {
				$s_1_body = json_decode( wp_remote_retrieve_body( $s_1 ), true );
				if ( isset( $s_1_body['tokens'] ) ) {
					//var_dump( $s_1_body);
					$s_2 = wp_remote_post( self::SERVER_URL . '/fotoweb/me/tokens/', [
						'headers' => array(
							'Content-Type' => 'application/vnd.fotoware.api-token-request+json',
							'FWAPIToken'   => 'fotoweb2013',
							'Accept'       => 'application/vnd.fotoware.api-token-info+json',
						),
						'body'    => [
							"un"       => 'Administrator',
							"app"      => 'InfoPress',
							"duration" => 'PT60S'
						]
					] );
					if ( wp_remote_retrieve_response_code( $s_2 ) == 200 ) {
						var_dump( json_decode( wp_remote_retrieve_body( $s_2 ), true ) );
					}
				}
			}
	*/

			$ch = curl_init( self::SERVER_URL . '/fotoweb/me/tokens/' );
			curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, "POST" );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
			curl_setopt( $ch, CURLOPT_TIMEOUT, 3 );
			$header = [

				'FWAPIToken: ' . $api_key,

				'Accept: application/vnd.fotoware.api-token-info+json',

				'Content-Type: application/vnd.fotoware.api-token-request+json',

			];

			curl_setopt( $ch, CURLOPT_HTTPHEADER, $header );

			$post = '{"un":"Administrator", "app":"' . $app_name . '", "duration":"P5D"}';

//		$object = json_decode( $post );

			curl_setopt( $ch, CURLOPT_POSTFIELDS, $post );

			$output = curl_exec( $ch );

			$result = json_decode( $output, true );
			if ( isset( $result['token'] ) && isset( $result['expires'] ) ) {
				$token = $result['token'];
				update_option( self::TOKEN_FIELD, $token, false );
				update_option( self::TOKEN_FIELD . '_expires', date( 'U', strtotime( $result['expires'] ) ), false );
				/*$s_3 = wp_remote_get( self::SERVER_URL . '/fotoweb/archives/fotoweb/?q=a', [
					'headers' => array(
						'FWAPIToken' => $result['token'],
						'Accept'     => 'application/vnd.fotoware.assetlist+json',
					),
				] );
				if ( wp_remote_retrieve_response_code( $s_3 ) == 200 ) {
					$s_3_body = json_decode( wp_remote_retrieve_body( $s_3 ), true );
					var_dump( $s_3_body );
				}*/
				//$ch = curl_init(self::SERVER_URL.'/fotoweb/archives/?q=ab');

				/*$ch = curl_init(self::SERVER_URL.'/fotoweb/me/archives/');

				curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

				curl_setopt($ch, CURLOPT_HTTPHEADER, array(

						'FWAPIToken: ' . $result['token'] ,

						//	'Accept: application/vnd.fotoware.assetslist+json'
						'Accept: application/vnd.fotoware.collectionlist+json'
					)

				);

				curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);

				$result = json_decode(curl_exec($ch), true);
				var_dump($result);*/
				//var_dump($result['data'][0]);
			}
		}

		return $token;


	}


}
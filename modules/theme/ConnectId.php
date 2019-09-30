<?php

/**
 * Class ConnectId.php
 * Class Description
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */

namespace modules\theme;

use modules\settings\Functions as SettingsFunctions;


class ConnectId {

	const REDIRECT_ENDPOINT = 'connectidendpoint';
	const COOKIE_TOKEN = 'cid_tk';
	const COOKIE_REF_TOKEN = 'cid_tkr';

	protected static $_token = null;
	protected static $_subscriptions = null;
	protected static $_profile = null;

	public static function get_auth_url() {

		if ( self::is_logged_in() ) {
			$url = self::_get_logout_url();
		} else {
			$url = self::get_login_url();
		}

		return $url;

	}

	public static function get_login_url( $is_order = false, $src = '' ) {
		return add_query_arg( [
			'client_id'     => 'no.tgn',
			'redirect_uri'  => urlencode( home_url( sprintf( '%s/code/?%ssrc_url=%s', self::REDIRECT_ENDPOINT, $is_order ? 'order&' : '', $src ? $src : '##' ) ) ),
			'response_type' => 'code',
			'scope'         => '',
			'state'         => time()
		], 'https://connectid.no/user/oauth/authorize' );
	}

	public static function get_registration_url() {
		return add_query_arg( [
			'clientId'  => 'no.tgn',
			'returnUrl' => urlencode( home_url( sprintf( '%s/login/?s_id=##', self::REDIRECT_ENDPOINT ) ) ),
			'errorUrl'  => home_url()
		], 'https://connectid.no/user/createUser' );
	}

	protected static function _get_logout_url() {
		return add_query_arg( [
			'clientId'  => 'no.tgn',
			'errorUrl'  => urlencode( home_url( self::REDIRECT_ENDPOINT . '/code/?src_url=' . get_home_url() ) ),
			'returnUrl' => urlencode( home_url( self::REDIRECT_ENDPOINT . '/logout/?src_url=' . get_home_url() ) ),
			//@todo add error url
			//], 'https://connectid.no/user/logout' );
		], 'https://connectid.no/user/logout' );

	}

	public static function init() {
		add_rewrite_endpoint( self::REDIRECT_ENDPOINT, EP_ROOT );
		add_filter( 'template_include', function ( $template ) {

			$auth = get_query_var( self::REDIRECT_ENDPOINT, null );
			if ( ! is_null( $auth ) ) {
				if ( $auth == 'code' && isset( $_GET['code'] ) ) {
					self::_generate_token();
					$template = get_template_directory() . '/templates/connect-id-auth.php';
				} elseif ( $auth == 'error' ) {
					$template = get_template_directory() . '/templates/connect-id-auth-error.php';
				} elseif ( $auth == 'oauth' ) {
					wp_redirect( self::get_login_url( true ) );
					exit;
				} elseif ( $auth == 'logout' ) {
					self::_logout();
					$template = get_template_directory() . '/templates/connect-id-auth.php';
				} elseif ( $auth == 'login' ) {
					$template = get_template_directory() . '/templates/connect-id-auth-login.php';
				} else {
					$template = get_template_directory() . '/templates/connect-id-auth.php';

				}
			}

			return $template;
		} );
	}

	protected
	static function _logout() {
		unset( $_COOKIE[ self::COOKIE_TOKEN ] );
		unset( $_COOKIE[ self::COOKIE_REF_TOKEN ] );
		setcookie( self::COOKIE_TOKEN, '', time() - 3600, COOKIEPATH, COOKIE_DOMAIN );
		setcookie( self::COOKIE_REF_TOKEN, '', time() - 3600, COOKIEPATH, COOKIE_DOMAIN );

	}

	public static function make_order( $data ) {
		$redirect_url  = '';
		$order_id      = isset( $data['order_id'] ) && $data['order_id'] ? $data['order_id'] : '';
		$product_id    = isset( $data['product_id'] ) && $data['product_id'] ? $data['product_id'] : '';
		$product_code  = isset( $data['product_code'] ) && $data['product_code'] ? $data['product_code'] : '';
		$f_name        = isset( $data['name'] ) && $data['name'] ? $data['name'] : '';
		$l_name        = isset( $data['surname'] ) && $data['surname'] ? $data['surname'] : '';
		$birthday      = isset( $data['birthday'] ) && $data['birthday'] ? $data['birthday'] : '';
		$price         = isset( $data['price'] ) && $data['price'] ? $data['price'] : '';
		$email         = isset( $data['email'] ) && $data['email'] ? $data['email'] : '';
		$phone         = isset( $data['phone'] ) && $data['phone'] ? $data['phone'] : '';
		$street        = isset( $data['street'] ) && $data['street'] ? $data['street'] : '';
		$postal_place  = isset( $data['postal_place'] ) && $data['postal_place'] ? $data['postal_place'] : '';
		$postal_code   = isset( $data['postal_code'] ) && $data['postal_code'] ? $data['postal_code'] : '';
		//$street_number = isset( $data['street_number'] ) && $data['street_number'] ? $data['street_number'] : '';
		$country_code  = isset( $data['country_code'] ) && $data['country_code'] ? $data['country_code'] : '';
		$unique_slug   = isset( $data['unique_slug'] ) && $data['unique_slug'] ? $data['unique_slug'] : '';


		if ( $order_id && $product_id && $f_name && $l_name && $price && $email ) {
			$body = array(
				'externalOrderId' => '',
				'orderDate'       => date( 'c' ),
				'paymentMethod'   => 'creditcard',
				'orderAmount'     => absint( $price ),
				'currency'        => 'NOK',
				'payer'           =>
					array(
						'firstName'    => $f_name,
						'street'       => $street,
						'postalPlace'  => $postal_place,
						'postalCode'   => $postal_code,
						'streetNumber' => $street_number,
						'lastName'     => $l_name,
						'countryCode'  => $country_code,
						'birthDate'    => $birthday ? date( 'c', strtotime( $birthday ) ) : '',
						'emails'       =>
							array(
								0 => $email,
							),
						'phoneNumbers' => array( 0 => $phone )
					),
				'orderLines'      =>
					array(
						0 =>
							array(
								'productSpecType'    => 'coupon',
								'productSpecCode'    => $product_id,
								'productSpecNo'      => $product_code,
								'allowAccessSeconds' => DAY_IN_SECONDS,
								'allowAccessProduct' => $product_id,
								'unitPrice'          => absint( $price ),
								'quantity'           => 1,
								'startInfo'          =>
									array(
										'startDate' => date( 'c' ),
									),
							),
					),
			);


			$xml_data = new \SimpleXMLElement( '<?xml version="1.0"?><data></data>' );
			self::array_to_xml( $body, $xml_data );

			$token = self::_get_token();
			$z     = wp_remote_post( 'https://api.mediaconnect.no/capi/v1/order', [
				'headers' => [
					'content-type'  => 'application/xml;charset=UTF-8',
					'Authorization' => 'Bearer ' . $token

				],
				'body'    => $xml_data->asXML()
			] );
			if ( wp_remote_retrieve_response_code( $z ) == 200 ) {
				$resp = simplexml_load_string( wp_remote_retrieve_body( $z ) );
				if ( $resp && isset( $resp->orderId ) ) {
					$redirect_url = $link4 = 'https://connectid.no/user/fulfillment?orderId=' . $resp->orderId . '&returnUrl=' . home_url( Functions::SUBSCRIBE_SLUG . '/' . $unique_slug );
				}
			}
		}

		return $redirect_url;
	}

	protected
	static function _generate_token() {
		if ( ! self::is_logged_in() && ! self::$_token ) {
			$code      = isset( $_GET['code'] ) && $_GET['code'] ? $_GET['code'] : '';
			$auth_pair = self::_get_basic_pair();
			if ( $code && $auth_pair ) {
				$redirect_url = home_url( self::REDIRECT_ENDPOINT . '/code/' );
				if ( isset( $_GET['src_url'] ) && esc_url( $_GET['src_url'] ) ) {
					$is_order     = isset( $_GET['order'] );
					$redirect_url .= sprintf( '?%ssrc_url=%s', $is_order ? 'order&' : '', esc_url( $_GET['src_url'] ) );
				}

				$resp = wp_remote_post( 'https://connectid.no/user/oauth/token', [
					'body'        => [
						'grant_type'   => 'authorization_code',
						'code'         => $code,
						'redirect_uri' => $redirect_url
					],
					'httpversion' => '1.0',
					'sslverify'   => false,
					'headers'     => [
						'Authorization' => 'Basic ' . base64_encode( $auth_pair ),
						'Content-Type'  => 'application/x-www-form-urlencoded'
					],
				] );
				if ( wp_remote_retrieve_response_code( $resp ) == 200 ) {
					$token_resp = json_decode( wp_remote_retrieve_body( $resp ), true );
					if ( isset( $token_resp['access_token'] ) && isset( $token_resp['refresh_token'] ) && isset( $token_resp['expires_in'] ) ) {
						self::$_token = $token_resp['access_token'];
						setcookie( self::COOKIE_TOKEN, $token_resp['access_token'], time() + abs( $token_resp['expires_in'] ), COOKIEPATH, COOKIE_DOMAIN );
						setcookie( self::COOKIE_REF_TOKEN, $token_resp['refresh_token'], 0, COOKIEPATH, COOKIE_DOMAIN );
					}
				}
			}
		}
	}

	public static function array_to_xml( $data, &$xml_data ) {
		foreach ( $data as $key => $value ) {
			if ( is_numeric( $key ) ) {
				$key = 'item' . $key; //dealing with <0/>..<n/> issues
			}
			if ( is_array( $value ) ) {
				$subnode = $xml_data->addChild( $key );
				self::array_to_xml( $value, $subnode );
			} else {
				$xml_data->addChild( "$key", htmlspecialchars( "$value" ) );
			}
		}
	}

	public
	static function template_redirect() {


	}

	public
	static function is_logged_in() {
		return isset( $_COOKIE[ self::COOKIE_TOKEN ] ) && $_COOKIE[ self::COOKIE_TOKEN ];
	}

	protected
	static function _get_token() {
		if ( ! self::$_token ) {
			$token         = isset( $_COOKIE[ self::COOKIE_TOKEN ] ) && $_COOKIE[ self::COOKIE_TOKEN ] ? $_COOKIE[ self::COOKIE_TOKEN ] : '';
			$refresh_token = isset( $_COOKIE[ self::COOKIE_REF_TOKEN ] ) && $_COOKIE[ self::COOKIE_REF_TOKEN ] ? $_COOKIE[ self::COOKIE_REF_TOKEN ] : '';
			if ( $token ) {
				self::$_token = $token;

			} elseif ( $refresh_token ) {
				self::_regenerate_token( $refresh_token );
			}
		}

		return self::$_token;
	}

	protected
	static function _regenerate_token(
		$token
	) {

		$auth_pair = self::_get_basic_pair();
		if ( $auth_pair ) {
			$resp = wp_remote_post( 'https://connectid.no/user/oauth/token', [
				'body'        => [
					'grant_type'    => 'refresh_token',
					'refresh_token' => $token,
				],
				'httpversion' => '1.0',
				'sslverify'   => false,
				'headers'     => [
					'Authorization' => 'Basic ' . base64_encode( $auth_pair ),
					'Content-Type'  => 'application/x-www-form-urlencoded'
				],
			] );
			if ( wp_remote_retrieve_response_code( $resp ) == 200 ) {
				$token_resp = json_decode( wp_remote_retrieve_body( $resp ), true );
				if ( isset( $token_resp['access_token'] ) && isset( $token_resp['refresh_token'] ) && isset( $token_resp['expires_in'] ) ) {
					self::$_token = $token_resp['access_token'];
					setcookie( self::COOKIE_TOKEN, $token_resp['access_token'], time() + abs( $token_resp['expires_in'] ), COOKIEPATH, COOKIE_DOMAIN );
					setcookie( self::COOKIE_REF_TOKEN, $token_resp['refresh_token'], 0, COOKIEPATH, COOKIE_DOMAIN );

				}
			}
		}
	}

	public
	static function is_subscribed() {

		$subscriptions = self::_get_subscriptions();
		$res           = false;
		if ( $subscriptions && isset( $subscriptions->products ) && is_array( $subscriptions->products ) ) {
			$available_ids = Functions::get_available_cid_prod_ids();
			if ( $available_ids ) {
				foreach ( $subscriptions->products as $subscription ) {

					if ( isset( $subscription->accessType ) && $subscription->accessType && isset( $subscription->productId ) && $subscription->productId && in_array( $subscription->productId, $available_ids ) ) {
						$res = true;
						break;
					}
				}
			}
		}

		/*if ( $subscriptions && isset( $subscriptions->subscriptions ) && is_array( $subscriptions->subscriptions ) ) {
			foreach ( $subscriptions->subscriptions as $subscription ) {

				if ( isset( $subscription->paid ) && $subscription->paid && isset( $subscription->stopped ) && ! $subscription->stopped ) {
					$res = true;
					break;
				}
			}
		}*/

		return $res;
	}

	public static function get_subscriptions() {
		return self::_get_subscriptions();
	}

	protected
	static function _get_personal_data() {
		if ( ! self::$_profile ) {
			$token = self::_get_token();
			if ( $token ) {
				$personal_data = wp_remote_get( 'https://api.mediaconnect.no/capi/v1/customer/profile', [
					'headers' => [
						'Authorization' => 'Bearer ' . $token,
						'Accept'        => 'application/json'
					]
				] );
				if ( wp_remote_retrieve_response_code( $personal_data ) == 200 ) {
					$profile = json_decode( wp_remote_retrieve_body( $personal_data ) );
					if ( $profile ) {
						self::$_profile = $profile;
					}
				}
			}

		}

		return self::$_profile;
	}

	protected
	static function _get_subscriptions() {
		if ( ! self::$_subscriptions ) {
			$token = self::_get_token();
			if ( $token ) {
				/*$products = wp_remote_get( 'https://api.mediaconnect.no/capi/v1/subscription', [
					'headers' => [
						'Authorization' => 'Bearer ' . $token,
						'Accept'        => 'application/json'
					]
				] );*/
				$products = wp_remote_get( 'https://api.mediaconnect.no/capi/v1/customer/product', [
					'headers' => [
						'Authorization' => 'Bearer ' . $token,
						'Accept'        => 'application/json'
					]
				] );
				if ( wp_remote_retrieve_response_code( $products ) == 200 ) {
					$subscriptions = json_decode( wp_remote_retrieve_body( $products ) );
					if ( $subscriptions ) {
						self::$_subscriptions = $subscriptions;
					}
				}
			}

		}

		return self::$_subscriptions;
	}

	public
	static function _get_basic_pair() {
		$client_id     = SettingsFunctions::get_connect_id_client_id();
		$client_secret = SettingsFunctions::get_connect_id_client_secret();
		if ( $client_id && $client_secret ) {
			return $client_id . ':' . $client_secret;
		}

		return '';

	}

	public
	static function _get_create_user_url() {
		return add_query_arg( [
			'clientId'  => 'no.tgn',
			'returnUrl' => urlencode( home_url( self::REDIRECT_ENDPOINT . '/oauth/' ) ),
			'errorUrl'  => get_home_url()
		], 'https://login.mediaconnect.no/createUser' );
	}


}
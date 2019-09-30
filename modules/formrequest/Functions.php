<?php

namespace modules\formrequest;

use modules\theme\Helpers;
use WPKit\Module\AbstractFunctions;
use modules\settings\Functions as SettingsFunctions;


/**
 * Class Functions
 *
 * @package modules\fact
 */
class Functions extends AbstractFunctions {
	/**
	 * Post type slug
	 */
	const POST_TYPE = 'formrequest';
	public static $form_types = [ 'tips_oss', 'default' ];

	/**
	 * Category slug
	 */


	public static function get_posts( $args ) {
		return new \WP_Query( wp_parse_args( $args, [
			'post_type' => static::POST_TYPE,
		] ) );
	}

	public static function get_form_fields() {
		return [
			'f_name'    => [ 'required' => true, ],
			'l_name'    => [ 'required' => true, ],
			'email'     => [ 'required' => true, ],
			'tel'       => [ 'required' => false, ],
			'message'   => [ 'required' => false,],
			'form_type' => [ 'required' => true, ],
		];
	}

	public static function handle_form_request( $data ) {
		$res = false;
		if ( $data && is_array( $data ) ) {
			$data_to_insert = [];
			$error          = [];
			$fields         = self::get_form_fields();
			if ( isset( $data['g-recaptcha-response'] ) && $data['g-recaptcha-response'] ) {
				if ( ! self::check_recaptcha( $data['g-recaptcha-response'] ) ) {
					$error[] = 'recaptcha';
				}
			} else {
				$error[] = 'recaptcha';
			}
			foreach ( $fields as $key => $field ) {
				if ( $field['required'] && ! ( isset( $data[ $key ] ) && $data[ $key ] ) ) {
					$error[] = $key;
				} elseif ( isset( $data[ $key ] ) && $data[ $key ] ) {
					if ( $key == 'email' ) {
						if ( ! is_email( $data[ $key ] ) ) {
							$error[] = $key;
							continue;
						} else {
							$data_to_insert[ $key ] = is_email( $data[ $key ] );
						}
					} elseif ( $key == 'form_type' ) {
						if ( ! in_array( $data[ $key ], self::$form_types ) ) {
							$error[] = $key;
							continue;
						} else {
							$data_to_insert[ $key ] = $data[ $key ];
						}
					} else {
						$data_to_insert[ $key ] = sanitize_text_field( $data[ $key ] );
					}
				}
			}
			if ( $error ) {
				return $error;
			}
			$send_to         = self::get_email_by_form_type( $data['form_type'] );
			$form_type_title = ucfirst( str_replace( '_', ' ', $data['form_type'] ) );

			$subject    = __( 'New [' . $form_type_title . '] form request ', TEXT_DOMAIN );
			$message    = '';
			$meta_array = [];

			foreach ( $data_to_insert as $key => $item ) {
				$meta_array[ 'formrequest_form_fields_' . $key ] = $item;
				if ( $key == 'form_type' ) {
					$f_type = $item;
					continue;
				}
				$item_title = ucfirst( str_replace( '_', ' ', $key ) );

				$message .= sprintf( '<p><b>%s</b>: %s</p>', $item_title, $item );

			}
			wp_mail( $send_to, $subject, $message, [ 'Content-Type: text/html; charset=UTF-8' ] );
			$post_id = wp_insert_post( [
				'post_type'   => self::POST_TYPE,
				'post_title'  => $f_type . ' request from  ' . $data['email'],
				'post_status' => 'private',
				'meta_input'  => $meta_array
			] );
			if ( is_wp_error( $post_id ) ) {
				$res = false;
			} else {
				$res = true;
			}

		}


		return $res;
	}

	public static function check_recaptcha( $resp_code ) {
		$res    = false;
		$secret = SettingsFunctions::get_recaptchan_secret();
		if ( $resp_code && $secret ) {
			$resp = wp_remote_post( 'https://www.google.com/recaptcha/api/siteverify', [
				'body' => [
					'secret'   => $secret,
					'response' => $resp_code
				]
			] );
			if ( wp_remote_retrieve_response_code( $resp ) == 200 ) {
				$resp_body = json_decode( wp_remote_retrieve_body( $resp ), true );
				if ( isset( $resp_body['success'] ) && $resp_body['success'] ) {
					$res = true;
				}
			}
		}

		return $res;
	}

	public static function get_email_by_form_type( $form_type ) {
		$email = '';
		if ( $form_type && in_array( $form_type, self::$form_types ) ) {
			$email = SettingsFunctions::get_rwmb_formrequest_email( $form_type );
		}
		if ( ! $email ) {
			$email = get_option( 'admin_email' );
		}

		return $email;
	}


}
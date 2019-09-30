<?php

namespace modules\order;

use modules\theme\ConnectId;
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
	const POST_TYPE = 'orders';
	public static $order_types = [ 'month-sub', 'year-sub' ];


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
			'name'          => [ 'required' => true ],
			'surname'       => [ 'required' => true ],
			'email'         => [ 'required' => true ],
			'phone'         => [ 'required' => false ],
			'birthday'      => [ 'required' => false ],
			'product_id'    => [ 'required' => true ],
			'product_code'  => [ 'required' => true ],
			'price'         => [ 'required' => true ],
			'type'          => [ 'required' => true ],
			'street'        => [ 'required' => true ],
			'postal_place'  => [ 'required' => true ],
			'postal_code'   => [ 'required' => true ],
			//'street_number' => [ 'required' => true ],
			'country_code'  => [ 'required' => true ],
			'unique_slug'   => [ 'required' => true ]
			//	'postal_code'=>['required' => true ]
		];
	}

	public static function handle_form_request( $data ) {
		$res = false;

		if ( $data && is_array( $data ) ) {
			$data_to_insert = [];
			$error          = [];

			$fields = self::get_form_fields();
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
					} elseif ( $key == 'type' ) {
						if ( ! in_array( $data[ $key ], self::$order_types ) ) {
							$error[] = $key;
							continue;
						} else {
							$data_to_insert[ $key ] = is_email( $data[ $key ] );
						}
					} else {
						$data_to_insert[ $key ] = sanitize_text_field( $data[ $key ] );
					}
				}
			}

			/*	$send_to         = self::get_email_by_form_type( $data['type'].'_order' );
				$form_type_title = ucfirst( str_replace( '_', ' ', $data['form_type'] ) );

				$subject = __( 'New [' . $form_type_title . '] form request ', TEXT_DOMAIN );
				$message = '';
				foreach ( $data_to_insert as $key => $item ) {
					if ( $key == 'form_type' ) {
						$f_type = $item;
						continue;
					}
					$item_title = ucfirst( str_replace( '_', ' ', $key ) );

					$message .= sprintf( '<p><b>%s</b>: %s</p>', $item_title, $item );

				}
				wp_mail( $send_to, $subject, $message, [ 'Content-Type: text/html; charset=UTF-8' ] );*/
			if ( ! $error ) {
				$meta     = [];
				$meta_key = self::POST_TYPE . '_form_fields_';
				foreach ( $data_to_insert as $key => $item ) {
					$meta[ $meta_key . $key ] = $item;
				}
				$post_id = wp_insert_post( [
					'post_type'   => self::POST_TYPE,
					'post_title'  => $data_to_insert['type'] . ' order from  ' . $data['email'],
					'post_status' => 'private',
					'meta_input'  => $meta
				] );
				if ( is_wp_error( $post_id ) ) {
					$insert_post_res = false;
					$error           = [ 'insert_post_error' ];
				} else {
					$insert_post_res = true;
				}
				if ( $insert_post_res ) {
					$order_data = $data_to_insert;
					unset( $order_data['type'] );
					$order_data['order_id'] = $post_id;
					$res                    = ConnectId::make_order( $order_data );
				}
			}

		}


		return [ $res, $error ];
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

	/*public static function get_email_by_form_type( $form_type ) {
		$email = '';
		if ( $form_type && in_array( $form_type, self::$form_types ) ) {
			$email = SettingsFunctions::get_rwmb_formrequest_email( $form_type );
		}
		if ( ! $email ) {
			$email = get_option( 'admin_email' );
		}

		return $email;
	}*/


}
<?php

namespace modules\shortcode;

use modules\theme\Helpers;
use WPKit\Module\AbstractFunctions;

/**
 * Class Functions
 *
 * @package modules\shortcode
 */
class Functions extends AbstractFunctions {

	public static function gallery_output( $attr ) {

		$post = get_post();
		if ( ! empty( $attr['ids'] ) ) {
			if ( empty( $attr['orderby'] ) ) {
				$attr['orderby'] = 'post__in';
			}
			$attr['include'] = $attr['ids'];
		}
		$output = '';
		$atts   = shortcode_atts( array(
			'order'   => 'ASC',
			'orderby' => 'menu_order ID',
			'id'      => $post ? (string)$post->ID : 0,
			'include' => '',
			'exclude' => '',
			'link'    => ''
		), $attr, 'gallery' );
		$unique_id = 'gallery-' . md5( serialize( $atts ) . $post->ID);

		$id = intval( $atts['id'] );

		if ( ! empty( $atts['include'] ) ) {
			$_attachments = get_posts( array(
				'include'        => $atts['include'],
				'post_status'    => 'inherit',
				'post_type'      => 'attachment',
				'post_mime_type' => 'image',
				'order'          => $atts['order'],
				'orderby'        => $atts['orderby']
			) );

			$attachments = array();
			foreach ( $_attachments as $key => $val ) {
				$attachments[ $val->ID ] = $_attachments[ $key ];
			}
		} elseif ( ! empty( $atts['exclude'] ) ) {
			$attachments = get_children( array(
				'post_parent'    => $id,
				'exclude'        => $atts['exclude'],
				'post_status'    => 'inherit',
				'post_type'      => 'attachment',
				'post_mime_type' => 'image',
				'order'          => $atts['order'],
				'orderby'        => $atts['orderby']
			) );
		} else {
			$attachments = get_children( array(
				'post_parent'    => $id,
				'post_status'    => 'inherit',
				'post_type'      => 'attachment',
				'post_mime_type' => 'image',
				'order'          => $atts['order'],
				'orderby'        => $atts['orderby']
			) );
		}

		if ( empty( $attachments ) ) {
			return '';
		}

		$output          .= sprintf( '<div data-js-object="%s" class="gallery-class"></div>', $unique_id );
		$attachments_arr = [];
		foreach ( $attachments as $attach_id => $attachment ) {
			$attachments_arr[] = Helpers::prepare_thumbnail( $attach_id, [ 'content-wrap' => 'content-wrap' ], true );
		}
		if ( ! is_admin() ) {
			if ( $attachments_arr ) {
				Helpers::add_gallery_object( $unique_id, $attachments_arr );
			}
		}


		return $output;

	}

}
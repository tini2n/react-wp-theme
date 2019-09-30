<?php

namespace modules\shortcode\shortcodes;

use modules\shortcode\AbstractShortcode;

use modules\ads\Functions as AdsFunctions;
use modules\article\Functions as ArticleFunctions;
use modules\theme\Helpers;


/**
 * Class Ad
 *
 * @package modules\shortcode\shortcodes
 */
class Ad extends AbstractShortcode {
	/**
	 * @var string
	 */
	protected static $_name = 'ad';
	/**
	 * @var string
	 */
	protected static $_icon = 'dashicons-exerpt-view';
	/**
	 * @var array
	 */
	protected static $_post_types = [ ArticleFunctions::POST_TYPE ];

	/**
	 * @return string
	 */
	protected function _get_label() {
		return __( 'Ad banner', TEXT_DOMAIN );
	}

	protected function _add_fields() {
		$this->_add_field( 'banner_id', __( 'Ad', TEXT_DOMAIN ), 'post_select', [
			'query' => [ 'post_type' => AdsFunctions::POST_TYPE ]
		] );
		$this->_add_field( 'align', __( 'Align', TEXT_DOMAIN ), 'select', [
			'options' => [
				[ 'label' => __( 'Center', TEXT_DOMAIN ), 'value' => '' ],
				[ 'label' => __( 'Left', TEXT_DOMAIN ), 'value' => 'left' ],
				[ 'label' => __( 'Right', TEXT_DOMAIN ), 'value' => 'right' ],
			]
		] );

	}

	protected function _render( array $data ) {
		$banner_id = isset( $data['banner_id'] ) ? absint( $data['banner_id'] ) : '';
		$align     = ( isset( $data['align'] ) && in_array( $data['align'], [
				'right',
				'left'
			] ) ) ? $data['align'] : 'center';

		if ( $banner_id && get_post_status( $banner_id ) == 'publish' ) {
			$banner_obj = AdsFunctions::get_banner_array( $banner_id, 'half-ad' );

			$unique_id = 'content-ad-' . md5( serialize( $data ) );
			if ( $banner_obj ) {
				if ( is_admin() ) { ?>
                    <div class="bnr-post-element align<?= $align ?>">
                        <div class="post-element-banner">
                            <a href="#">
                                <img src="<?=$banner_obj['image']['sizes']['half-ad']['url']?>" />
                            </a>
                        </div>
                    </div>
					<?php
				} else {
					Helpers::add_content_ad_object( $unique_id, $banner_obj );
					?>
                <div class="bnr-post-element align-<?= $align ?>" data-js-object=<?= $unique_id ?>></div><?php
				}
			}

		}
	}
}
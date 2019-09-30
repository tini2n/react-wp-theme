<?php

namespace modules\shortcode\shortcodes;

use modules\shortcode\AbstractShortcode;

use modules\article\Functions as Article;

/**
 * Class Quote
 *
 * @package modules\shortcode\shortcodes
 */
class Factbox extends AbstractShortcode {
	/**
	 * @var string
	 */
	protected static $_name = 'factbox';
	/**
	 * @var string
	 */
	protected static $_icon = 'dashicons-slides';
	/**
	 * @var array
	 */
	protected static $_post_types = [ Article::POST_TYPE ];

	/**
	 * @return string
	 */
	protected function _get_label() {
		return __( 'Factbox', TEXT_DOMAIN );
	}

	protected function _add_fields() {
		$this->_add_field( 'title', __( 'Title', TEXT_DOMAIN ), 'text' );
		$this->_add_field( 'text', __( 'Text', TEXT_DOMAIN ), 'textarea', [
			'meta' => [
				'class' => 'shortcake-richtext',
			]
		] );
		$this->_add_field( 'align', __( 'Align', TEXT_DOMAIN ), 'select', [
			'options' => [
				[ 'label' => __( 'Left', TEXT_DOMAIN ), 'value' => '' ],
				[ 'label' => __( 'Right', TEXT_DOMAIN ), 'value' => 'right' ],
				[ 'label' => __( 'Center', TEXT_DOMAIN ), 'value' => 'center' ]
			]
		] );

	}

	protected function _render( array $data ) {
		$text  = isset( $data['text'] ) ? wpautop( $data['text'] ) : '';
		$title = isset( $data['title'] ) ? $data['title'] : '';
		$align = ( isset( $data['align'] ) && in_array( $data['align'], [
				'right',
				'center'
			] ) ) ? $data['align'] : 'left';
		if ( $text || $title ) {
			?>

			<div class="post-element-factbox align<?= $align ?>"><?php
				if ( $title ) {
					?>
					<h5>
						<?= $title ?>
					</h5>
					<?php
				}
				?>
                <?php
				echo  $text ? apply_filters( 'the_content', $text ) : '' ?>
			</div>
			<?php
		}
	}
}
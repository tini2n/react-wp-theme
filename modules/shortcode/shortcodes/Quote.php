<?php

namespace modules\shortcode\shortcodes;

use modules\shortcode\AbstractShortcode;

use modules\article\Functions as Article;

/**
 * Class Quote
 *
 * @package modules\shortcode\shortcodes
 */
class Quote extends AbstractShortcode {
	/**
	 * @var string
	 */
	protected static $_name = 'quote';
	/**
	 * @var string
	 */
	protected static $_icon = 'dashicons-format-status';
	/**
	 * @var array
	 */
	protected static $_post_types = [ Article::POST_TYPE ];

	/**
	 * @return string
	 */
	protected function _get_label() {
		return __( 'Quote', TEXT_DOMAIN );
	}

	protected function _add_fields() {
		$this->_add_field( 'text', __( 'Text', TEXT_DOMAIN ), 'textarea' );
		$this->_add_field( 'author', __( 'Author', TEXT_DOMAIN ), 'text' );

	}

	protected function _render( array $data ) {
		$text   = isset( $data['text'] ) ? apply_filters( 'the_content', $data['text'] ) : '';
		$author = isset( $data['author'] ) ? $data['author'] : '';

		if ( $text || $author ) {
			?>
			<blockquote>
				<?php if ( $text ) { ?>
					<p>
						<?= $text; ?>
					</p>
				<?php }
				if ( $author ) { ?>
					<small>
						<?= $author ?>
					</small>
				<?php } ?>
			</blockquote>
		<?php }
	}
}
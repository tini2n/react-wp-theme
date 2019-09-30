<?php

namespace modules\shortcode\shortcodes;

use modules\shortcode\AbstractShortcode;

use modules\article\Functions as ArticleFunctions;
use modules\theme\Helpers;


/**
 * Class Article
 *
 * @package modules\shortcode\shortcodes
 */
class Article extends AbstractShortcode {
	/**
	 * @var string
	 */
	protected static $_name = 'article';
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
		return __( 'Article', TEXT_DOMAIN );
	}

	protected function _add_fields() {
		$this->_add_field( 'article_id', __( 'Article', TEXT_DOMAIN ), 'post_select', [
			'query' => [ 'post_type' => ArticleFunctions::POST_TYPE ]
		] );
		/*$this->_add_field( 'align', __( 'Align', TEXT_DOMAIN ), 'select', [
			'options' => [
				[ 'label' => __( 'Left', TEXT_DOMAIN ), 'value' => '' ],
				[ 'label' => __( 'Right', TEXT_DOMAIN ), 'value' => 'right' ],
			]
		] );*/

	}

	protected function _render( array $data ) {
		$article_id = isset( $data['article_id'] ) ? absint( $data['article_id'] ) : '';
		if ( $article_id && get_post_status( $article_id ) == 'publish' ) {
			$main_category = Helpers::get_primary_tax_term( $article_id );
			$subtitle      = Helpers::get_rwmb_meta( ArticleFunctions::POST_TYPE . '_general_top_subtitle', [], $article_id );
			?>
            <div class="post-element-related">
				<?php if ( has_post_thumbnail( $article_id ) ) { ?>
                    <div class="thumbnail-container">
						<?= get_the_post_thumbnail( $article_id, 'content-article' ) ?>
                    </div>
				<?php } ?>
                <div class="text-container">
					<?php if ( $main_category ) { ?>
                        <h5 class="category-label"><a
                                    href="<?= get_term_link( $main_category ) ?>"><?= $main_category->name ?></a></h5>
					<?php }
					if ( $subtitle ) { ?>
                        <h4 class="subtitle"><?= $subtitle ?></h4>
					<?php } ?>
                    <h3 class="title"><?= get_the_title( $article_id ) ?></h3>
                    <a href="<?= get_the_permalink( $article_id ) ?>" class="read-more">les mer</a>
                </div>
            </div>
			<?php
		}
	}
}
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
class Articles extends AbstractShortcode {
	/**
	 * @var string
	 */
	protected static $_name = 'articles';
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
		return __( 'Articles', TEXT_DOMAIN );
	}

	protected function _add_fields() {
		$this->_add_field( 'title', __( 'Title', TEXT_DOMAIN ) );
		$this->_add_field( 'article_ids', __( 'Articles', TEXT_DOMAIN ), 'post_select', [
			'multiple' => true,
			'query'    => [ 'post_type' => ArticleFunctions::POST_TYPE ],
		] );
		$this->_add_field( 'align', __( 'Align', TEXT_DOMAIN ), 'select', [
			'options' => [
				[ 'label' => __( 'Left', TEXT_DOMAIN ), 'value' => '' ],
				[ 'label' => __( 'Right', TEXT_DOMAIN ), 'value' => 'right' ],
			]
		] );

	}

	protected function _render( array $data ) {
		$title       = isset( $data['title'] ) ? wpautop( $data['title'] ) : '';
		$article_ids = isset( $data['article_ids'] ) ? explode( ',', $data['article_ids'] ) : [];
		$align       = ( isset( $data['align'] ) && in_array( $data['align'], [
				'right'
			] ) ) ? $data['align'] : 'left';
		if ( $title || $article_ids ) {
			?>
            <div class="post-element-articles align<?= $align ?>">
				<?php if ( $title ) { ?>
                    <h5><?= $title ?></h5>
				<?php }
				if ( $article_ids && is_array( $article_ids ) ) {
					?>
                    <ul>
					<?php
					foreach ( $article_ids as $article_id ) {
						$article_id = absint( $article_id );
						if ( get_post_status( $article_id ) == 'publish' ) {
							$subtitle = Helpers::get_rwmb_meta( ArticleFunctions::POST_TYPE . '_general_top_subtitle', [], $article_id );

							?>
                            <li>
                                <a href="<?= get_the_permalink( $article_id ) ?>" class="container">
                                    <div class="thumbnail-container">
                                        <?php if ( has_post_thumbnail( $article_id ) ) { ?>
											<?= get_the_post_thumbnail( $article_id, 'content-article' ) ?>
                                        <?php } ?>
                                    </div>
                                    <div class="text-container">
										<?php if ( $subtitle ) { ?>
                                            <h4 class="subtitle"><?= $subtitle ?></h4>
										<?php } ?>
                                        <h3 class="title"><?= get_the_title( $article_id ) ?></h3>
                                    </div>
                                </a>
                            </li>
							<?php
						}
					}
					?></ul><?php
				}
				?>
            </div>
			<?php
		}
	}
}
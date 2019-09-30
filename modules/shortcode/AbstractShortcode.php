<?php

namespace modules\shortcode;


/**
 * Class AbstractShortcode
 *
 * @package modules\shortcode
 */
abstract class AbstractShortcode
{
    /**
     * @var string|null
     */
    protected static $_name = null;
    /**
     * @var string
     */
    protected static $_icon = '';
    /**
     * @var array
     */
    protected $_fields = [];
    /**
     * @var array
     */
    protected $_pairs = [];
    /**
     * @var array
     */
    protected static $_post_types = [ 'post'];

    public function __construct()
    {
        if ( static::$_name !== null ) {
            add_action( 'init', function () {
                $this->_add_fields();
            }, 20 );

            if ( function_exists( 'shortcode_ui_register_for_shortcode' ) ) {
                add_action( 'admin_init', function () {
                    $this->_ui();
                }, 20 );
            }

            add_shortcode( static::$_name, function ( $attrs = [] ) {
                return $this->_add( (array) $attrs );
            } );
        }
    }

    /**
     * @param string $key
     * @param string $label
     * @param string $type
     * @param array  $args
     */
    protected function _add_field( $key, $label, $type = 'text', array $args = [] )
    {
        $this->_fields[] = wp_parse_args( [
            'label'  => $label,
            'attr'   => $key,
            'type'   => $type,
            'encode' => in_array( $type, [ 'text', 'textarea', 'email', 'url', 'number' ] ),
        ], $args );
        $this->_pairs[ $key ] = isset( $args['default'] ) ? $args['default'] : '';
    }

    protected function _ui()
    {
        shortcode_ui_register_for_shortcode( static::$_name, [
            'label'         => $this->_get_label(),
            'listItemImage' => static::$_icon,
            'attrs'         => $this->_fields,
            'post_type'     => static::$_post_types,
        ] );
    }

    /**
     * @param array $attrs
     *
     * @return string
     */
    protected function _add( array $attrs )
    {
        ob_start();
        $this->_render( shortcode_atts( $this->_pairs, static::_decode_attrs( $attrs ) ) );

        return ob_get_clean();
    }

    /**
     * @param array $attrs
     *
     * @return array
     */
    protected static function _decode_attrs( array $attrs )
    {
        $decoded = [];

        foreach ( $attrs as $key => $attr ) {
            $decoded[ $key ] = urldecode( $attr );
        }

        return $decoded;
    }

    /**
     * @return string
     */
    abstract protected function _get_label();

    abstract protected function _add_fields();

    abstract protected function _render( array $attrs );

    /**
     * @return bool
     */
    public static function is_preview()
    {
        return defined( 'SHORTCODE_UI_DOING_PREVIEW' ) && SHORTCODE_UI_DOING_PREVIEW;
    }
}
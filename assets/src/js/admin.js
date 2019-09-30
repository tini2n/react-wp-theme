import FW from './modules/FwRender'

jQuery( function ( $ ) {
    var body=$( 'body' );
    if ( body.hasClass( 'post-type-note' ) || body.hasClass( 'post-type-article' ) &&
        (body.hasClass( 'post-php' ) || body.hasClass( 'post-new-php' )) ) {
        $( '[name="post_title"]' ).attr( 'required', 'required' );
        $( '[name="excerpt"]' ).attr( 'required', 'required' );
    }
    if ( (body.hasClass( 'post-php' ) || body.hasClass( 'post-new-php' )) ) {
        if ( body.hasClass( 'post-type-tv' ) ) {
            $( '[name="post_title"]' ).attr( 'required', 'required' );
        }
    }
} );

FW.init();
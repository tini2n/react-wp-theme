<?php
/**
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */
wp_send_json( [
	'head' => Theme::get_head_array(),
	'main' => Theme::get_main_query_array(),
] );

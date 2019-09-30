<?php

/**
 * Class GAReport.php
 * Class Description
 *
 * @copyright Copyright (c) 2015, Redink AS
 * @author Maksim Viter <maksim@pingbull.no>
 */

namespace modules\ads;


class GAReport {
	function initializeAnalytics() {

		// Use the developers console and download your service account
		// credentials in JSON format. Place them in this directory or
		// change the key file location if necessary.
		$KEY_FILE_LOCATION = ABSPATH . 'tgn-ga/tgnstage-e3b0a58e9319.json';

		// Create and configure a new client object.
		$client = new \Google_Client();
		$client->setApplicationName( "Hello Analytics Reporting" );
		$client->setAuthConfig( $KEY_FILE_LOCATION );
		$client->setScopes( [ 'https://www.googleapis.com/auth/analytics.readonly' ] );
		$analytics = new \Google_Service_AnalyticsReporting( $client );

		return $analytics;
	}

	/**
	 * Queries the Analytics Reporting API V4.
	 *
	 * @param \Google_Service_AnalyticsReporting.
	 *
	 * @return \Google_Service_AnalyticsReporting_GetReportsResponse
	 */
	function getReport( $analytics ) {

		// Replace with your view ID, for example XXXX.
		$VIEW_ID = "190209840";

		// Create the DateRange object.
		$dateRange = new \Google_Service_AnalyticsReporting_DateRange();
		$dateRange->setStartDate( "30daysAgo" );
		$dateRange->setEndDate( "today" );

		// Create the Metrics object.
		/*$sessions = new \Google_Service_AnalyticsReporting_Metric();
		$sessions->setExpression( "ga:sessions" );
		$sessions->setAlias( "sessions" );*/
		$metrics = new \Google_Service_AnalyticsReporting_Metric();
		$metrics->setExpression( "ga:totalEvents" );


		//Create the Dimensions object.
		$dimension = new \Google_Service_AnalyticsReporting_Dimension();
		$dimension->setName( "ga:eventCategory" );

		$action = new \Google_Service_AnalyticsReporting_Dimension();
		$action->setName( "ga:eventAction" );

		$label = new \Google_Service_AnalyticsReporting_Dimension();
		$label->setName( "ga:eventLabel" );
// Create the segment dimension.
		$segmentDimensions = new \Google_Service_AnalyticsReporting_Dimension();
		$segmentDimensions->setName( "ga:segment" );

		// Create Dimension Filter.
		$dimensionFilter = new \Google_Service_AnalyticsReporting_SegmentDimensionFilter();
		$dimensionFilter->setDimensionName( "ga:eventCategory" );
		$dimensionFilter->setOperator( "EXACT" );
		$dimensionFilter->setExpressions( array( "Ads" ) );

		$dimensionFilterClause = new \Google_Service_AnalyticsReporting_DimensionFilterClause();
		$dimensionFilterClause->setFilters( [ $dimensionFilter ] );
		/*// Create Segment Filter Clause.
		$segmentFilterClause = new \Google_Service_AnalyticsReporting_SegmentFilterClause();
		$segmentFilterClause->setDimensionFilter($dimensionFilter);

		// Create the Or Filters for Segment.
		$orFiltersForSegment = new \Google_Service_AnalyticsReporting_OrFiltersForSegment();
		$orFiltersForSegment->setSegmentFilterClauses(array($segmentFilterClause));

		// Create the Simple Segment.
		$simpleSegment = new \Google_Service_AnalyticsReporting_SimpleSegment();
		$simpleSegment->setOrFiltersForSegment(array($orFiltersForSegment));

		// Create the Segment Filters.
		$segmentFilter = new \Google_Service_AnalyticsReporting_SegmentFilter();
		$segmentFilter->setSimpleSegment($simpleSegment);

		// Create the Segment Definition.
		$segmentDefinition = new \Google_Service_AnalyticsReporting_SegmentDefinition();
		$segmentDefinition->setSegmentFilters(array($segmentFilter));

		// Create the Dynamic Segment.
		$dynamicSegment = new \Google_Service_AnalyticsReporting_DynamicSegment();
		$dynamicSegment->setSessionSegment($segmentDefinition);
		$dynamicSegment->setName("Ads events");

		// Create the Segments object.
		$segment = new\ Google_Service_AnalyticsReporting_Segment();
		$segment->setDynamicSegment($dynamicSegment);



*/

		// Create the ReportRequest object.
		$request = new \Google_Service_AnalyticsReporting_ReportRequest();
		$request->setViewId( $VIEW_ID );
		$request->setDateRanges( $dateRange );
		$request->setDimensions( [ $action, $label ] );
		$request->setDimensionFilterClauses( [ $dimensionFilterClause ] );
		//$request->setSegments([$segment]);
		$request->setMetrics( array( $metrics ) );

		$body = new \Google_Service_AnalyticsReporting_GetReportsRequest();
		$body->setReportRequests( array( $request ) );

		return $analytics->reports->batchGet( $body );
	}

	/**
	 * Parses and prints the Analytics Reporting API V4 response.
	 *
	 * @param \Google_Service_AnalyticsReporting_GetReportsResponse
	 */
	function printResults( $reports ) {
		for ( $reportIndex = 0; $reportIndex < count( $reports ); $reportIndex ++ ) {
			/**
			 * @var $report \Google_Service_AnalyticsReporting_Report
			 */
			$report           = $reports[ $reportIndex ];
			$header           = $report->getColumnHeader();
			$dimensionHeaders = $header->getDimensions();
			$metricHeaders    = $header->getMetricHeader()->getMetricHeaderEntries();
			$rows             = $report->getData()->getRows();

			for ( $rowIndex = 0; $rowIndex < count( $rows ); $rowIndex ++ ) {
				$row = $rows[ $rowIndex ];
				/**
				 * @var $row \Google_Service_AnalyticsReporting_ReportRow
				 */
				$dimensions = $row->getDimensions();
				$metrics    = $row->getMetrics();
				$type       = '';
				$post_id    = 0;
				if ( $dimensionHeaders ) {
					for ( $i = 0; $i < count( $dimensionHeaders ) && $i < count( $dimensions ); $i ++ ) {
						print( $dimensionHeaders[ $i ] . ": " . $dimensions[ $i ] . "<br>" );
						if ( $dimensionHeaders[ $i ] == 'ga:eventAction' ) {

						}

					}
				}
				/**
				 * @var $metrics \Google_Service_AnalyticsReporting_DateRangeValues
				 */
				for ( $j = 0; $j < count( $metrics ); $j ++ ) {
					$values = $metrics[ $j ]->getValues();
					for ( $k = 0; $k < count( $values ); $k ++ ) {
						$entry = $metricHeaders[ $k ];
						print( $entry->getName() . ": " . $values[ $k ] . "<br>" );
					}
				}
			}
		}
	}

	function getResults( $reports ) {
		for ( $reportIndex = 0; $reportIndex < count( $reports ); $reportIndex ++ ) {
			/**
			 * @var $report \Google_Service_AnalyticsReporting_Report
			 */
			$report           = $reports[ $reportIndex ];
			$header           = $report->getColumnHeader();
			$dimensionHeaders = $header->getDimensions();
			//$metricHeaders    = $header->getMetricHeader()->getMetricHeaderEntries();
			$rows = $report->getData()->getRows();
			//$exist_posts_ids = Functions::get_available_ids();
			$res = [];

			for ( $rowIndex = 0; $rowIndex < count( $rows ); $rowIndex ++ ) {
				$row = $rows[ $rowIndex ];
				/**
				 * @var $row \Google_Service_AnalyticsReporting_ReportRow
				 */
				$dimensions = $row->getDimensions();
				$metrics    = $row->getMetrics();
				$type       = '';
				$post_id    = 0;
				$data_value = null;
				if ( $dimensionHeaders ) {
					for ( $i = 0; $i < count( $dimensionHeaders ) && $i < count( $dimensions ); $i ++ ) {
						//print( $dimensionHeaders[ $i ] . ": " . $dimensions[ $i ] . "<br>" );
						if ( $dimensionHeaders[ $i ] == 'ga:eventAction' ) {
							$type = $dimensions[ $i ] == 'AdClick' ? 'clicks' : 'views';
						} elseif ( $dimensionHeaders[ $i ] == 'ga:eventLabel' ) {
							$post_id = absint( $dimensions[ $i ] ? str_replace( 'site_banner_', '', $dimensions[ $i ] ) : 0 );
						}
					}
				}
				if ( isset( $metrics[0]->getValues()[0] ) ) {
					$data_value = $metrics[0]->getValues()[0];
				}
				if ( $type && $post_id && ! is_null( $data_value ) ) {
					echo $type . ':' . $post_id . ':' . $data_value . '<br>';
					$res[ $post_id ][ $type ] = $data_value;
					/*if ( $type == 'clicks' ) {
						echo $type . ':' . $post_id . ':' . $data_value . '<br>';
						Functions::set_clicks( $post_id, $data_value );
					} else {
						echo $type . ':' . $post_id . ':' . $data_value . '<br>';
						Functions::set_views( $post_id, $data_value );
					}*/
				}
			}
		}

		return $res;
	}

}

/*$analytics = initializeAnalytics();
$response  = getReport( $analytics );
printResults( $response );*/
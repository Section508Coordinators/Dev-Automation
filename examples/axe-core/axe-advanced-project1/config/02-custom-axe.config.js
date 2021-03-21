//
//DATE: 03/21/2021
//FILE: 02-custom-axe.config.js
//AUTHOR: DHS OAST/ALAN KING
//
//------------------------------------------------------------------
//********************** DESCRIPTION *******************************
//------------------------------------------------------------------
//[1]-Rules: Runs against preferred axe rules as identified below
//
//[2]-URL Source: Runs against internal embedded pages 
//==================================================================

const config = {
	urls: [

		// Ten (10) Hard-code URLs for testing here
		"https://www.hhs.gov/az/a/index.html",
		"https://www.hhs.gov/about/index.html",
		"https://www.hhs.gov/programs/index.html",
		"https://www.hhs.gov/regulations/index.html",
		"https://www.hhs.gov/about/news/coronavirus/index.html",
		"https://www.hhs.gov/opioids/",
		"https://www.hhs.gov/surgeongeneral/reports-and-publications/tobacco/index.html",
		"https://www.hhs.gov/healthcare/index.html",
		"https://www.hhs.gov/grants/index.html",
		"https://www.hhs.gov/health.gov/our-work/physical-activity"
	
 		],
/* you can use timeout: 0 to disabled timeout errors if you're loading a heavy page.
		timeout: 0,
*/
	concurrency:10,
	navigationOptions:{
		timeout: 20000,
	},
	axeConfig: {

		 rules: [

		 	//******************************************************
		 	//*** START OF TTv5-Friendly and verified (axe 3.5) ****
		 	//******************************************************
			
			{id: 'aria-allowed-role', enabled: true},
			{id: 'aria-valid-attr-value', enabled: true},
			{id: 'aria-hidden-focus', enabled: true},
			{id: 'aria-input-field-name', enabled: true},
			{id: 'aria-toggle-field-name', enabled: true},
			{id: 'button-name', enabled: true},
			{id: 'color-contrast', enabled: true},
			{id: 'document-title', enabled: true},
			{id: 'duplicate-id', enabled: true},
			{id: 'empty-heading', enabled: true},
			{id: 'form-field-multiple-labels', enabled: true},
			{id: 'frame-title', enabled: true},
			{id: 'frame-title-unique', enabled: true},
			{id: 'html-has-lang', enabled: true},
		 	{id: 'html-lang-valid', enabled: true},
		 	{id: 'image-alt', enabled: true},
		 	{id: 'input-button-name', enabled: true},
		 	{id: 'input-image-alt', enabled: true},
		 	{id: 'label', enabled: true},
		 	{id: 'link-name', enabled: true},
		 	{id: 'list', enabled: true},
		 	{id: 'listitem', enabled: true},
		 	{id: 'role-img-alt', enabled: true},
		 	{id: 'scope-attr-valid', enabled: true},
		 	{id: 'scrollable-region-focusable', enabled: true},
		 	{id: 'td-headers-attr', enabled: true},
		 	{id: 'valid-lang', enabled: true},

		 	//**********************************************
		 	//*** START OF Rules to Turn Off for Testing ***
		 	//**********************************************

		 	{id: 'accesskeys', enabled: false},
		 	{id: 'aria-valid-attr-value', enabled: false},
		 	{id: 'aria-valid-attr', enabled: false},
		 	{id: 'audio-caption', enabled: false},
		 	{id: 'autocomplete-valid', enabled: false},
		 	{id: 'avoid-inline-spacing', enabled: false},
		 	{id: 'blink', enabled: false},
		 	{id: 'bypass', enabled: false},
		 	{id: 'checkboxgroup', enabled: false},
		 	{id: 'duplicate-id-active', enabled: false},
		 	{id: 'duplicate-id-aria', enabled: false},
			{id: 'landmark-one-main', enabled: false},
			{id: 'region', enabled: false},		 	
		 	{id: 'area-alt', enabled: false},
		 	{id: 'aria-allowed-attr', enabled: false},		 	
		 	{id: 'aria-dpub-role-fallback', enabled: false},
		 	{id: 'aria-hidden-body', enabled: false},
		 	{id: 'aria-required-attr', enabled: false},
		 	{id: 'aria-required-children', enabled: false},
		 	{id: 'aria-required-parent', enabled: false},
		 	{id: 'aria-roledescription', enabled: false},
			{id: 'aria-roles', enabled: false},
		 	{id: 'css-orientation-lock', enabled: false},
		 	{id: 'definition-list', enabled: false},
		 	{id: 'dlitem', enabled: false},
		 	{id: 'focus-order-semantics', enabled: false},		 	
		 	{id: 'frame-tested', enabled: false},
		 	{id: 'heading-order', enabled: false},
		 	{id: 'hidden-content', enabled: false},
		 	{id: 'html-xml-lang-mismatch', enabled: false},		 	
		 	{id: 'img-redundant-alt', enabled: false},
		 	{id: 'label-content-name-mismatch', enabled: false},
		 	{id: 'label-title-only', enabled: false},		 	
		 	{id: 'landmark-banner-is-top-level', enabled: false},
		 	{id: 'landmark-complementary-is-top-level', enabled: false},
		 	{id: 'landmark-contentinfo-is-top-level', enabled: false},
		 	{id: 'landmark-main-is-top-level', enabled: false},
		 	{id: 'landmark-no-duplicate-banner', enabled: false},
		 	{id: 'landmark-no-duplicate-contentinfo', enabled: false},
		 	{id: 'landmark-no-duplicate-main', enabled: false},
		 	{id: 'landmark-one-main', enabled: false},
		 	{id: 'landmark-unique', enabled: false},
		 	{id: 'layout-table', enabled: false},
			{id: 'link-in-text-block', enabled: false},
		 	{id: 'marquee', enabled: false},
		 	{id: 'meta-refresh', enabled: false},
		 	{id: 'meta-viewport-large', enabled: false},
		 	{id: 'meta-viewport', enabled: false},
		 	{id: 'object-alt', enabled: false},
		 	{id: 'p-as-heading', enabled: false},
		 	{id: 'page-has-heading-one', enabled: false},
		 	{id: 'radiogroup', enabled: false},
		 	{id: 'region', enabled: false},		 	
		 	{id: 'server-side-image-map', enabled: false},
		 	{id: 'skip-link', enabled: false},
		 	{id: 'tabindex', enabled: false},
		 	{id: 'table-duplicate-name', enabled: false},
		 	{id: 'table-fake-caption', enabled: false},
		 	{id: 'td-has-header', enabled: false},		 	
		 	{id: 'th-has-data-cells', enabled: false},
		 	{id: 'video-caption', enabled: false},
		 	{id: 'video-description', enabled: false},
		 	{id: 'svg-img-alt', enabled: false},
		 	{id: 'identical-links-same-purpose', enabled: false},
		 	{id: 'image-redundant-alt', enabled: false}
		 ],
		// locale?: Locale;
		// axeVersion: ''
	}
};

module.exports = config;

$(function() {

	var universalChanges = function() {

		// Add FREE shipping callout
		var pdpShippingMsg = "";
		
		$('head').append('<style>.free-shipping-pdp {background-color: #ebebeb; border-bottom: 1px solid #dadbdb; color: #444; font-family: GalaxieCondensedMedium,Arial,sans-serif; font-size: 15px; margin: -26px -30px 20px; padding: 20px; text-align: center; } .free-shipping-pdp .sale-banner__link.free-shipping_icon {padding-left: 42px; } .free-shipping-pdp .sale-banner__link.free-shipping_icon:before {left: 0; } .free-shipping-pdp .sale-banner__link {margin-right: 0; } .free-shipping-pdp a {color: #e72020; text-decoration: none; text-transform: uppercase; } .free-shipping-pdp a:hover {text-decoration: underline; } @media (min-width: 600px) {.mfp-content {max-width: 60% !important; } }</style>');

		pdpShippingMsg += '<div class="free-shipping-pdp">';
		pdpShippingMsg += '<a class="free-shipping sale-banner__link free-shipping_icon shipping-modal-trigger" href="#">Free Shipping*</a> on all orders';
		pdpShippingMsg += '</div>';

		$('.product-detail__options').prepend(pdpShippingMsg);

		$('.shipping-modal-trigger').on('click', function(event) {
			event.preventDefault();
			$('.sale-banner__link.free-shipping_icon').not('.free-shipping').trigger('click');
		});

		// Move shipping details
		$(".product-detail__options").css("padding-bottom", "0");
		$(".product-detail__description-shipping").css("display", "none");
		$(".product-detail__options").append('<div style="margin: 0 -30px;padding:10px 0;background-color:#ebebeb;"><p style="padding: 0 30px;margin:0;font-size:11px;color:#444;"><strong>Shipping Note:</strong> Leaves the warehouse in as little as 1 business day. See <a href="/help-desk/shipping-page/shipping-and-delivery.html">Shipping Info</a> and <a href="/help-desk/returns-and-warranties/online-return-policy.html">Online Return Policy</a> for details.</p></div>');

	}

	var manipulateDOM = function() {

		var $brandLogo = $('.product-detail__description-blurb-logo > a > img');
		var brandLogoUrl = "";

		$('body').addClass('DTMenhancedPDP');

		// create new header container
		$('.page-breadcrumb').after('<div id="temp-header"><div id="temp-ctas"></div></div>');

		// move product H1 into it
		$('.global-page-header__title').prependTo('#temp-header');

		// add logo if available
		if ($brandLogo.length) {
			brandLogoUrl = "https:" + $brandLogo.attr('src') + "?wid=120&resMode=sharp2";
			$('#temp-header')
				.css({
					"background-image" : "url(" + brandLogoUrl + ")",
					"padding-left" : "150px"
				});
		}

		// relocate Ratings
		$('.product-detail__user-reviews .rating.rating_small')
			.css({
				"margin-top" : "12px",
				"width" : "140px"
			})
			.appendTo('#temp-ctas');

		// relocate Wish List trigger
		$('div[data-module-type=AddToWishList]')
			.css({"display" : "inline-block"})
			.appendTo('#temp-ctas');
		$('div[data-module-type=AddToWishList] .product-detail__button')
			.css({"font-family" : "GalaxieCondensedMedium,arial,sans-serif"});

		// relocate View Description anchor
		$('button[data-module-type=FindInStore]').after('<div class="desc-link-wrapper"></div>');

		$('.product-detail__user-reviews .product-detail-description-link')
			.appendTo('.desc-link-wrapper');

		$('.product-detail__user-reviews').remove();

	}

	var PDPstyleInjection = function() {

		$('head').append('<style>.DTMenhancedPDP .product-detail__button {width: 100%; } .DTMenhancedPDP .locator {background-color: transparent; color: #0c93b3; padding: 17px 15px 13px; width: auto; } .DTMenhancedPDP .locator span {font-family: GalaxieCondensedMedium, arial, sans-serif; padding-left: 32px; padding-top: 4px; } .DTMenhancedPDP .locator span:before {background-image: url(https://www.sportchek.ca/content/dam/sportchek/dtm-support/locator-logo.png); background-position: 0 0; height: 25px; width:20px; margin-top: -10px; } .DTMenhancedPDP .locator:hover{background-color: transparent; } .DTMenhancedPDP .product-stores__carat-wrapper {padding-right: 160px; } .DTMenhancedPDP .product-stores-wrapper .product-stores {margin-top: -80px; text-align:left; } .DTMenhancedPDP .product-detail-description-link {display: inline; font-family: GalaxieCondensedMedium, arial, sans-serif; } .DTMenhancedPDP .desc-link-wrapper {display: inline-block; padding: 13px 15px; margin-bottom: 10px; } .DTMenhancedPDP .product-stores-wrapper {text-align: center; } #temp-header {background-repeat: no-repeat; min-height: 100px; margin-left: 10px; margin-top: 20px; } @media (min-width: 1024px) {.DTMenhancedPDP .product-detail__button {float: none; } } @media (min-width: 1254px) {.DTMenhancedPDP .product-stores__carat-wrapper {padding-right: 230px; } .DTMenhancedPDP .product-stores-wrapper .product-stores {margin-top: -20px; } }</style>');

	}

	var PLPstyleInjection = function() {
		$('head').append('<style>.product-quickview-btn {display: none; }</style>');
	}
  
	var allPagesStyleInjection = function() {
    	$('head').append('<style>.footer-section__trigger { display: none; } .footer-section__menu-content { max-height: 1000px; transition: all 0s ease 0s;}</style>');
  	}

	var isOldHockeyStickPDP = function() {
		var returnVal = false;
		var hockeySticks = '-hockey-stick';
		var juniorSticks = '-junior-stick';
		var mediumSticks = '-intermediate-stick';
		var seniorSticks = '-senior-stick';
		var goalieSticks = '-goalie-stick';
		var streetHockeySticks = '/street-hockey/sticks/';
		var URL = window.location.href;
		var canonical = $('link[rel=canonical]').attr('href');

		if (URL.indexOf('/product/') > -1) {
			if (canonical != undefined) {
				URL = canonical;
			}
			
			returnVal = URL.indexOf(streetHockeySticks) > -1
				|| URL.indexOf(hockeySticks) > -1
				|| URL.indexOf(juniorSticks) > -1
				|| URL.indexOf(seniorSticks) > -1
				|| URL.indexOf(mediumSticks) > -1
				|| URL.indexOf(goalieSticks) > -1;

		}

		var oldStickSizeDropdown = $('.product-detail__size .dropdown-wrap').attr('data-print-options') == 'N/S';

		returnVal = returnVal && oldStickSizeDropdown;

		return returnVal;
	}

	var stickFix = function() {
		$('head').append('<style>.product-detail__custom .dropdown-title.product-detail__options-title::before, .product-detail__size .dropdown-title.product-detail__options-title::before {white-space: pre; } .dropdown-title.product-detail__options-title {height: 25px; overflow: hidden; } .product-detail__custom .dropdown-title.product-detail__options-title::before {content: "hand:\\A\\A\\A"; } .product-detail__size .dropdown-title.product-detail__options-title::before {content: "size:\\A\\A\\A"; }</style>');
	}

	var cartStyleInjection = function() {
		$('head').append('<style>.cart-callout .sale-banner__link.free-shipping_icon {padding-left: 42px; } .cart-callout .sale-banner__link.free-shipping_icon {font-family: GalaxieCondensedMedium, arial, sans-serif; text-transform: uppercase; margin-top: 0; line-height: 1.3; } .cart-callout .sale-banner__link.free-shipping_icon:before {top: 10px; left: 0; } .cart-callout .sale-banner__link {margin-right: 0; } .cart-callout {border: 1px solid red; margin-top: 20px; padding: 20px; } .cart-callout p {color: #666; font-family: GalaxieCondensedMedium, arial, sans-serif; font-size: 14px; margin-bottom: 0; } .sc-product__information.drawer-ui { display: none;}</style>');
	}

	var addShippingCalculator = function() {
		var cartCallout = "";

		cartCallout += '<div class="cart-callout">';
		cartCallout += '<div class="sale-banner__link free-shipping_icon">CONGRATULATIONS, YOU QUALIFY FOR FREE SHIPPING*!</div>';
		cartCallout += '<p>Complete your order to have your products delivered to your door for free*!  ( <a href="#" class="shipping-modal-trigger">Details</a> )</p>';
		cartCallout += "</div>";

		$('body').addClass('cartPageCallout');
		$('.co-sidebar__action').before(cartCallout);

		$('.shipping-modal-trigger').on('click', function(event) {
			event.preventDefault();
			$('.sale-banner__link.free-shipping_icon').trigger('click');
		});
    
	}
  
  var hideOldPromo = function() {
    
    var timeCheck = 0;
    var stopChecking = 10;
    
    var checkForPromo = setInterval(function() {

    		var $oldPromo = $('div[data-module-type=OrderPromotion]').find('.co-promote-message__wrap:contains("Shipping")');
    		if ($oldPromo.length) {
          	clearInterval(checkForPromo);
     				$oldPromo.parent().parent().css('display', 'none'); 
        } else if (++timeCheck > stopChecking) {
         	clearInterval(checkForPromo); 
        }
    }, 500);
  }
  
	if (window.location.href.indexOf('defaultexp=true') == -1) {

		// PDP changes
		if (window.location.href.indexOf('/product/') > -1) {
	  
	  		universalChanges();

	  		if ($(document).width() > 768) {
				PDPstyleInjection();
				manipulateDOM();
	  		}

	  		if (isOldHockeyStickPDP()) {
	  			stickFix();
	  		}

	  		$('body').addClass('DTMenhancedPDPcomplete');
		} else if (window.location.href.indexOf('shopping-cart.html') > -1) {
			cartStyleInjection();
			addShippingCalculator();
      			hideOldPromo();
		}

	// PLP changes
	// hide quickview elements
	PLPstyleInjection();
   	allPagesStyleInjection();
    
    	if (window.location.href.indexOf('332074441') > -1) {
    		$('.product-detail__add-cart').remove(); 
    	}
	}

});

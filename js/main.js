;(function () {
	
	'use strict';

	//Array of images which you want to show: Use path you want.
	// var images=new Array('images/bg_image_blur_1.jpg','images/bg_image_blur_2.jpg','images/bg_image_blur_3.jpg','images/bg_image_blur_4.jpg');
	// var nextimage=0;

	var myLogics = function() {
        $('#community-link').click(function() {
			window.open('http://community.synergeworkspace.com/', '_blank');
		});
	}

	var doSlideshow = function() {
        $('.fullBackground').fullClip({
            images: ['images/bg_image_blur_1.jpg', 'images/bg_image_blur_2.jpg', 'images/bg_image_blur_3.jpg', 'images/bg_image_blur_4.jpg'],
            transitionTime: 2000,
            wait: 5000
        });

		// if(nextimage>=images.length){nextimage=0;}
		// $('.bg-image-slider')
		// .css('background-image','url("'+images[nextimage++]+'")')
		// .fadeIn(500, function(){
		// 	setTimeout(doSlideshow, 3000);
		// });
	}

	var shareButton = function() {
		console.log('Navigator.share', navigator.share);
		if (navigator.share) {
			$("#share-btn").click(function() {
				navigator.share({
					title: 'Synerge WorkSpace',
					text: 'SYNERGE I WorkSpace: \n#1573 | 39th Cross Rd | 4th T block | Jayanagar | Bengaluru | Karnataka 560041 \n\nSYNERGE II WorkSpace: \n#362/7 | Second floor | 16th main | 4th T block | Jayanagar | Bengaluru | Karnataka 560041 \n\nPhone - 080-26655399 | 080-26650107 \nMobile - +91 90360 09600 | +91 95813 18971 \nEmail us - synergeworkspace@gmail.com \n\n',
					url: 'https://www.synergeworkspace.com/'
				}).then(() => {
					console.log('Thanks for sharing!');
				})
				.catch(err => {
					console.log(`Couldn't share because of`, err.message);
				});
			});
		} else {			
			$("#share-btn").click(function() {
				var dummy = document.createElement("textarea");
				document.body.appendChild(dummy);
				dummy.value = 'SYNERGE I WorkSpace: \n#1573 | 39th Cross Rd | 4th T block | Jayanagar | Bengaluru | Karnataka 560041 \n\nSYNERGE II WorkSpace: \n#362/7 | Second floor | 16th main | 4th T block | Jayanagar | Bengaluru | Karnataka 560041 \n\nPhone - 080-26655399 | 080-26650107 \nMobile - +91 90360 09600 | +91 95813 18971 \nEmail us - synergeworkspace@gmail.com \n\nWebsite - https://www.synergeworkspace.com';
				dummy.select();
				document.execCommand("copy");
				document.body.removeChild(dummy);
				alert("Text copied.");
			});
		}
	}

	var watchVideo = function() {
    var url = $("#synergeWatchVideo").attr('src');
    
    $("#watchVideoModal").on('hide.bs.modal', function() {
			$("#synergeWatchVideo").attr('src', '');
    });
    
    $("#watchVideoModal").on('show.bs.modal', function() {
			$("#synergeWatchVideo").attr('src', url);
    });		
	}

	var addVideo = function() {
		var mainVideo = $('#videoBG');

		if ($(window).width() < 467) {
			mainVideo.append("<source type='video/mp4' src='images/background_video_mobile.mp4' />");
		} else {
			mainVideo.append("<source type='video/mp4' src='images/background_video.mp4' />");
		}
		mainVideo.append("<source type='video/webm' src='images/background_video.webm' />");

		// Wait until sources are appended to call MediaElements.js
		// mainVideo.mediaelementplayer();
	}

	var backToTop = function() {
		$(window).scroll(function() {
			var height = $(window).scrollTop();
			if (height > 100) {
				$('#back2Top').fadeIn();
			} else {
				$('#back2Top').fadeOut();
			}
		});
		$(document).ready(function() {
			$("#back2Top").click(function(event) {
				event.preventDefault();
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
			});
		
		});
	}

	var sendMessageForm = function() {
		$('#send-message-form').submit(function (e) {
			e.preventDefault();
			var $form = $("#send-message-form");
			var data = getFormData($form);			
			$.ajax({
				type: "POST",
				url: "https://api.synergeworkspace.com/send-message",
				// url: "http://localhost:3000/send-message",
				data: data,
			   }).done(function(response) {
					alert('Your message was sent.');
			   }).fail(function(error) {
				   alert(error.responseJSON ? error.responseJSON.message : error);
			   });

			// let key = 'mrVBW8Wq1Of7A5aWVkOGXQ';
			// var toMail = 'ksb994@gmail.com';
			// $.ajax({
			// 	type: "POST",
			// 	url: "https://mandrillapp.com/api/1.0/messages/send.json",
			// 	data: {
			// 	  key: key,
			// 	  message: {
			// 		from_email: toMail,
			// 		to: [
			// 			{
			// 			  email: toMail,
			// 			  name: data.name,
			// 			  type: 'to'
			// 			},
			// 		  ],
			// 		autotext: true,
			// 		subject: 'Message from SYNERGE Website',
			// 		html: data.message
			// 	  }
			// 	}
			//    }).done(function(response) {
			// 		alert('Your message was sent.');
			//    }).fail(function(error) {
			// 	   alert(error.responseJSON ? error.responseJSON.message : error);
			//    });

			   
			// let key = '9dd3688f924cca81fb52bfaf0664a735-9b1bf5d3-e8a8c3ee';
			// var toMail = 'ksb994@gmail.com';
			// $.ajax({
			// 	type: "POST",
			// 	url: "https://api.mailgun.net/v3/sandboxb5b758453a9140e9922ca3e20f55ee44.mailgun.org/messages",    
			// 	beforeSend: function(xhr) { 
			// 		xhr.setRequestHeader("Authorization", "Basic " + btoa(`api:${key}`)); 
			// 	},
			// 	data: {
			// 		from: 'SYNERGE WORKSPACE <mailgun@sandboxb5b758453a9140e9922ca3e20f55ee44.mailgun.org>',
			// 		to: toMail,
			// 		subject: 'Message from SYNERGE WORKSPACE Website',
			// 		text: `From:- \nName: ${data.name}, \nPhone: ${data.phone}, \nEmail: ${data.email}, \nMessage: ${data.message}`
			// 	}
			//    }).done(function(response) {
			// 		alert('Your message was sent.');
			//    }).fail(function(error) {
			// 	   alert(error.responseJSON ? error.responseJSON.message : error);
			//    });
		});
	}

	function getFormData($form){
		var unindexed_array = $form.serializeArray();
		var indexed_array = {};
	
		$.map(unindexed_array, function(n, i){
			indexed_array[n['name']] = n['value'];
		});
	
		return indexed_array;
	}

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};



	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			event.preventDefault();

			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');	
			}

			
			
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	// Page Nav
	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-fh5co-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	


	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#fh5co-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top fh5co-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top fh5co-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top fh5co-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};



	// Animations
	// Home

	var homeAnimate = function() {
		if ( $('#fh5co-home').length > 0 ) {	

			$('#fh5co-home').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-home .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInLeft animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};


	var introAnimate = function() {
		if ( $('#fh5co-intro').length > 0 ) {	

			$('#fh5co-intro').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-intro .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInRight animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 100);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var weofferAnimate = function() {
		if ( $('#fh5co-weoffer').length > 0 ) {	

			$('#fh5co-weoffer').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-weoffer .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};


	var whatyougetAnimate = function() {
		var whatyouget = $('#fh5co-whatyouget');
		if ( whatyouget.length > 0 ) {	

			whatyouget.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					var sec = whatyouget.find('.to-animate').length,
						sec = parseInt((sec * 200) - 400);

					setTimeout(function() {
						whatyouget.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						whatyouget.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInDown animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, sec);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var servicesAnimate = function() {
		var services = $('#fh5co-services');
		if ( services.length > 0 ) {	

			services.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					var sec = services.find('.to-animate').length,
						sec = parseInt((sec * 200) + 400);

					setTimeout(function() {
						services.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						services.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 1000);


					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var aboutAnimate = function() {
		var about = $('#fh5co-about');
		if ( about.length > 0 ) {	

			about.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						about.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var countersAnimate = function() {
		var counters = $('#fh5co-counters');
		if ( counters.length > 0 ) {	

			counters.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					var sec = counters.find('.to-animate').length,
						sec = parseInt((sec * 200) + 400);

					setTimeout(function() {
						counters.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						counters.find('.js-counter').countTo({
						 	formatter: function (value, options) {
				      		return value.toFixed(options.decimals);
				   		},
						});
					}, 400);

					setTimeout(function() {
						counters.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, sec);

					

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};


	var contactAnimate = function() {
		var contact = $('#fh5co-contact');
		if ( contact.length > 0 ) {	

			contact.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {

					setTimeout(function() {
						contact.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};


	
	


	
	

	// Document on load.
	$(function(){

		// uncomment below to start slide with jQuery
		doSlideshow();

		shareButton();

		watchVideo();

		addVideo();

		backToTop();

		sendMessageForm();

		parallax();

		burgerMenu();

		clickMenu();

		windowScroll();

		navigationSection();

		goToTop();

		myLogics();


		// Animations
		homeAnimate();
		introAnimate();
		weofferAnimate();
		whatyougetAnimate();
		servicesAnimate();
		aboutAnimate();
		countersAnimate();
		contactAnimate();
		

	});


}());
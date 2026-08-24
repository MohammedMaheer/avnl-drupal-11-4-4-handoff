/*---------------------------------------------------------------------*/
; (function ($) {

	// Register before the legacy menu code. Chrome and Edge can otherwise let
	// older hover handlers consume Enter before the anchor's normal action.
	function activatePrimaryNavigationLink(event) {
		if (event.key !== 'Enter' && event.keyCode !== 13) {
			return;
		}

		var focusedElement = document.activeElement;
		var eventElement = event.target && event.target.nodeType === 1 ? event.target : null;
		var link = eventElement && eventElement.closest ? eventElement.closest('a[href]') : null;

		if (!link && focusedElement && focusedElement.closest) {
			link = focusedElement.closest('a[href]');
		}

		if (!link || !link.closest('#block-avnl-main-menu, #nav, .headermenu .menuPart')) {
			return;
		}

		var href = (link.getAttribute('href') || '').trim();
		var normalizedHref = href.toLowerCase();
		var isPlaceholder = normalizedHref === '' || normalizedHref === '#' || normalizedHref === '#no-link' || normalizedHref === '#nolink' || normalizedHref === 'javascript:void(0)';

		if (isPlaceholder) {
			// Let second-level-navigation.js activate parent menu controls.
			return;
		}

		event.preventDefault();
		event.stopImmediatePropagation();

		var destination = link.href;
		if ((link.getAttribute('target') || '').toLowerCase() === '_blank') {
			var newWindow = window.open(destination, '_blank', 'noopener');
			if (newWindow) {
				newWindow.opener = null;
			}
			return;
		}

		window.location.assign(destination);
	}

	document.addEventListener('keydown', activatePrimaryNavigationLink, true);

	/*================= Global Variable Start =================*/
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var IEbellow9 = !$.support.leadingWhitespace;
	var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
	var isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
	function isIEver() {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	//if (isIEver () == 8) {}

	var jsFolder = "js/";
	var cssFolder = "css/";
	var ww = document.body.clientWidth, wh = document.body.clientHeight;
	var mobilePort = 1199, ipadView = 1280, wideScreen = 1600;

	/*================= Global Variable End =================*/

	//css3 style calling 
	//document.write('<link rel="stylesheet" type="text/css" href="' + cssFolder +'animate.css">');	
	/*================= On Document Load Start =================*/
	$(document).ready(function () {

		// News & Events Slider
		if ($(".newsEvents").length) {
			var NewsEventSlider = new Swiper('.newsEvents .swiper-container', {
				loop: false,
				speed: 800,
				slidesPerView: 3,
				spaceBetween: 30,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.eventNext',
					prevEl: '.eventPrev',
				},
				breakpoints: {
					579: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
					767: {
						slidesPerView: 2
					}
				},
			});
			$('.newsEvents .swiper-button-pause').attr('title', "pause");
			$('.lang-hi .newsEvents .swiper-button-pause').attr('title', "रोकें");
			$(".newsEvents .swiper-button-pause").toggle(function () {
				$(this).addClass('play');
				$(this).attr('title', "play");
				$('.lang-hi .newsEvents .swiper-button-pause').attr('title', "चलाएँ");
				NewsEventSlider.autoplay.stop();
			}, function () {
				$(this).removeClass('play');
				$(this).attr('title', "pause");
				$('.lang-hi .newsEvents .swiper-button-pause').attr('title', "रोकें");
				NewsEventSlider.autoplay.start();
				return false;
			});
		}
		var photoGalleryTest1, photoGalleryTest2;
		function initializePhotoGalleries() {
			// tabPhotoGallery
			tabPhotoGallery1 = new Swiper('#tabPhotoGallery .swiper-container', {
				loop: false,
				speed: 800,
				slidesPerView: 2,

				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.mediaNext',
					prevEl: '.mediaPrev',
				},
				breakpoints: {
					579: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				},
			});
			$('#tabPhotoGallery .swiper-button-pause').attr('title', "pause");
			$('.lang-hi #tabPhotoGallery .swiper-button-pause').attr('title', "रोकें");
			$("#tabPhotoGallery .swiper-button-pause").toggle(function () {
				$(this).addClass('play');
				$(this).attr('title', "Play")
				$('.lang-hi #tabPhotoGallery .swiper-button-pause').attr('title', "चलाएँ");
				tabPhotoGallery1.autoplay.stop();
			}, function () {
				$(this).removeClass('play');
				$(this).attr('title', "pause")
				$('.lang-hi #tabPhotoGallery .swiper-button-pause').attr('title', "रोकें");
				tabPhotoGallery1.autoplay.start();
				return false;
			});

			// tabVideoGallery
			tabVideoGallery1 = new Swiper('#tabVideoGallery .swiper-container', {
				loop: false,
				speed: 800,
				slidesPerView: 2,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.ptNext',
					prevEl: '.ptPrev',
				},
				breakpoints: {
					579: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				},
			});
			$('#tabVideoGallery .swiper-button-pause').attr('title', "pause");
			$('.lang-hi #tabVideoGallery .swiper-button-pause').attr('title', "रोकें");
			$("#tabVideoGallery .swiper-button-pause").toggle(function () {
				$(this).addClass('play');
				$(this).attr('title', "Play")
				$('.lang-hi #tabVideoGallery .swiper-button-pause').attr('title', "चलाएँ");
				tabVideoGallery1.autoplay.stop();
			}, function () {
				$(this).removeClass('play');
				$(this).attr('title', "pause")
				$('.lang-hi #tabVideoGallery .swiper-button-pause').attr('title', "रोकें");
				tabVideoGallery1.autoplay.start();
				return false;
			});
		}

		initializePhotoGalleries();

		$('.mediaGellary-wrap ul.tabNav li').on('click', function () {
			if (tabVideoGallery1 && tabVideoGallery1.destroy) {
				tabVideoGallery1.destroy();
			}
			if (tabVideoGallery1 && tabVideoGallery1.destroy) {
				tabVideoGallery1.destroy();
			}
			initializePhotoGalleries();
		});

		$(".side-menu .menu--level-1").clone().appendTo(".headermenu .menuPart ");




		$('.skipContent').on('click', function (e) {
			e.preventDefault();
			var target = $($(this).attr('href'));
			$('section[role="main"]').focus();
			var target = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 1000, 'swing', function () {
				window.location.hash = target;
			});
		});
		setTimeout(function () {
			$('#loading').fadeOut();
			$('.vCenter').each(function () { $(this).verticalAlign(); });
		}, 800);

		$('body').removeClass('noJS').addClass("hasJS");
		$(this).scrollTop(0);
		getWidth();

		if ($(".marqueeScrolling li").length > 1) {
			var $mq = $('.marquee').marquee({
				speed: 25000
				, duration: 25000
				, gap: 0
				, duplicated: true
				, startVisible: true
				, pauseOnHover: true
			});
			$('.marqueeScrolling .btnMPause').attr('title', "pause");
			$('.lang-hi .marqueeScrolling .btnMPause').attr('title', "रोकें");
			$(".btnMPause").toggle(function () {
				$(this).addClass('play');
				$(this).attr('title', 'play');
				$('.lang-hi .marqueeScrolling  .btnMPause').attr('title', "चलाएँ");
				$mq.marquee('pause');
			}, function () {
				$(this).removeClass('play');
				$mq.marquee('resume');
				$(this).attr('title', 'pause');
				$('.lang-hi .marqueeScrolling .btnMPause').attr('title', "रोकें");
				return false;
			});
			var $marqueePause = $('.marqueeScrolling .btnMPause');
			$marqueePause.attr('title', 'pause').attr('aria-label', 'Pause notifications').attr('role', 'button').attr('tabindex', '0');
			$marqueePause.off('click keydown.avnlMarquee').on('click.avnlMarquee keydown.avnlMarquee', function (event) {
				if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
					return;
				}
				event.preventDefault();

				if ($(this).hasClass('play')) {
					$(this).removeClass('play').attr('title', 'pause').attr('aria-label', 'Pause notifications');
					$mq.marquee('resume');
				} else {
					$(this).addClass('play').attr('title', 'play').attr('aria-label', 'Play notifications');
					$mq.marquee('pause');
				}
			});
		};
		/*$("#block-language .language-link").on('click', function (e) {
			var langname = $(this).attr('hreflang') === 'hi/' ? 'Hindi' : 'English';

			if (confirm("You will be taken to " + langname + " version of the website. Do you want to continue?")) {
			} else {
				e.preventDefault();
			}
		});*/


		// language popup
		$('html[lang="hi"] .language-link').click(function (e) {
			e.preventDefault();
			if ($(this).attr("target", "_blank")) {
				var url = $(this).attr("href");
				smoke.confirm("आप एक बाहरी वेबसाइट पर जाने वाले हैं। आगे बढ़ने के लिए हाँ क्लिक करें.", function (e) {
					if (e) {
						window.open(url, "_self");
					} else {
						return false;
					}
				}, {
					ok: "हाँ",
					cancel: "नहीं",
					classname: "custom-class",
					reverseButtons: true
				});
			}
		});


		// language popup
		$('html[lang="en"] .language-link').click(function (e) {
			e.preventDefault();
			if ($(this).attr("target", "_blank")) {
				var url = $(this).attr("href");
				smoke.confirm("You are about to proceed to translating language. Click YES to proceed.", function (e) {
					if (e) {
						window.open(url, "_self");
					} else {
						return false;
					}
				}, {
					ok: "Yes",
					cancel: "No",
					classname: "custom-class",
					reverseButtons: true
				});
			}
		});

		$('html[lang="en"] .language-link').click(function (e) {
			setTimeout(function () {
				$(".custom-class").wrap("<section role='main' tabindex='-1' />");
				$('section[role="main"]').focus();
			}, 1000);
		});
		$('html[lang="hi"] .language-link').click(function (e) {
			setTimeout(function () {
				$(".custom-class").wrap("<section role='main' tabindex='-1' />");
				$('section[role="main"]').focus();
			}, 1000);
		});

		$('.g20logos, .social-icons, .leftLink').click(function (e) {
			setTimeout(function () {
				$(".custom-class").wrap("<section role='main' tabindex='-1' />");
				$('section[role="main"]').focus();
			}, 1000);
		});

		//Scroll Nav
		$(window).scroll(function () {
			if ($(window).scrollTop() > 100) {
				$('.headermenu').addClass('floatMenu');
				$('header').addClass('stickyHeader');
			} else {
				$('.headermenu').removeClass('floatMenu');
				$('header').removeClass('stickyHeader');
			}
		});

		//Home Slider
		if ($(".homeBanner").length) {
			var homeSlider = new Swiper('.homeBanner .swiper-container', {
				spaceBetween: 0,
				speed: 2000,
				loop: true,
				keyboard: true,
				// effect: 'fade',		
				//parallax:true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				pagination: false,
				navigation: {
					nextEl: '.homeBanner .slider__button-next',
					prevEl: '.homeBanner .slider__button-prev',
				},
			});
			$('.homeBanner .swiper-button-pause').attr('title', "pause");
			$('.lang-hi .homeBanner .swiper-button-pause').attr('title', "रोकें");
			$('.homeBanner .swiper-button-pause').attr('title', "Play").attr('aria-label', "play");
			$(".homeBanner .swiper-button-pause").toggle(function () {
				$(this).addClass('play');
				$(this).attr('title', "Play").attr('aria-label', "Play");
				$('.lang-hi .homeBanner .swiper-button-pause').attr('title', "चलाएँ");
				homeSlider.autoplay.stop();
			}, function () {
				$(this).removeClass('play');
				$(this).attr('title', "pause").attr('aria-label', "pause");
				$('.lang-hi .homeBanner .swiper-button-pause').attr('title', "रोकें");
				homeSlider.autoplay.start();
				return false;
			});
		}

		if ($(".homeBanner").length) {
			$(".homeBannerImgWrap").each(function () {
				var imagePath = $(this).find("img").attr("src");
				$(this).css("background-image", "url( " + imagePath + " )");
			});
		}
		if ($('.quickLeftmenu').length) {
			$('.mobileQuickLinks').on('click', function (e) {
				e.preventDefault();
				$('.rightMenuLink').stop().slideToggle();
			});
		}


		// Responsive Tabing Script
		if ($(".resTab").length) {
			$('.resTab').responsiveTabs({
				rotate: false
				, startCollapsed: 'tab' //accordion
				, collapsible: 'accordion' //accordion
				, scrollToAccordion: true
				, scrollToAccordionOnLoad: false
			});

			/* Tab Accessibility: Toggle ARIA attributes on click */
			$(document).on('click', '.tabNav [role="tab"]', function (e) {
				const $tab = $(this);
				const $tablist = $tab.closest('[role="tablist"]');
				const $panel = $('#' + $tab.attr('aria-controls'));

				// Update tabs
				$tablist.find('[role="tab"]').attr('aria-selected', 'false');
				$tab.attr('aria-selected', 'true');

				// Update panels
				$tablist.closest('.resTab').find('.tabContainer [role="tabpanel"]').attr('hidden', true);
				$panel.removeAttr('hidden');
			});
		};

		if ($(".searchBtn").length) {
			$(".searchBtn").click(function () {
				event.stopPropagation();
				$(".searchBox").slideToggle();
				//$(".searchBtn").toggleClass(active);

				var isExpanded = $(this).attr("aria-expanded") === "true";
				$(this).attr("aria-expanded", !isExpanded);
			});
		}

		$(document).mouseup(function (e) {
			var container = $(" .searchContainer");

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$(".searchBox").hide();
			}
		});

		//Set Element to vertical center using padding
		$.fn.verticalAlign = function () { return this.css("padding-top", ($(this).parent().height() - $(this).height()) / 2 + 'px'); };

		setTimeout(function () {
			$('.vCenter').each(function () { $(this).verticalAlign(); });
		}, 800);


		// Responsive Table
		if ($(".tableScroll").length) {
			$(".tableScroll").each(function () {
				$(this).wrap('<div class="tableOut"></div>');
			});
		};

		// Back to Top function
		if ($("#backtotop").length) {
			$(window).scroll(function () {
				if ($(window).scrollTop() > 120) {
					$('#backtotop').fadeIn('250').css('display', 'block');
				}
				else {
					$('#backtotop').fadeOut('250');
				}
			});
			$('#backtotop').click(function () {
				$('html, body').animate({ scrollTop: 0 }, '200');
				return false;
			});
		};

		// Get Focus Inputbox
		if ($(".getFocus").length) {
			$(".getFocus").each(function () {
				$(this).on("focus", function () {
					if ($(this).val() == $(this)[0].defaultValue) { $(this).val(""); };
				}).on("blur", function () {
					if ($(this).val() == "") { $(this).val($(this)[0].defaultValue); };
				});
			});
		};
		/*================= On Document Load and Resize Start =================*/
		$(window).on('resize', function () {

			ww = document.body.clientWidth;
			wh = document.body.clientHeight;

			$('.vCenter').each(function () { $(this).verticalAlign(); });

			if ($("body").hasClass("mobilePort")) {
				$("body").removeClass("wob");
			}

			//$('.container').resize(function(){});

		}).trigger('resize');
		/*================= On Document Load and Resize End =================*/
		/*Navigation */
		$(document).ready(function () {
			if ($("#nav").length) {

				if ($(".menuPart .menu li").hasClass("ul")) {

				}
				if ($(window).width() <= 1199) {
					var navigation = $('#block-avnl-main-menu').clone();
					$(navigation).appendTo("#block-popup");

				}


				if ($(".toggleMenu").length == 0) {
					$("#mainNav").prepend('<a href="#" class="toggleMenu"><span class="mobileMenu">Menu</span><span class="iconBar"></span></a>');
				}
				$(".toggleMenu").click(function () {
					$(this).toggleClass("active");
					$("#nav").slideToggle();
					return false;
				});
				$("#nav li a").each(function () {
					if ($(this).next().length) {
						$(this).parent().addClass("parent");
					};
				})
				$("#nav li.parent").each(function () {
					if ($(this).has(".menuIcon").length <= 0) $(this).append('<i class="menuIcon">&nbsp;</i>')
				});
				// Parent items without a URL are menu controls, not navigation links.
				$("#nav > li > a").each(function () {
					var $link = $(this);
					var href = ($link.attr('href') || '').toLowerCase();
					var $item = $link.parent('li');
					var $submenu = $item.children('ul');
					var isPlaceholder = href === '' || href === '#' || href === '#no-link' || href === '#nolink' || href === 'javascript:void(0)';

					if (!isPlaceholder || !$submenu.length) {
						return;
					}

					$link.attr({
						'role': 'button',
						'aria-haspopup': 'true',
						'aria-expanded': 'false'
					}).off('click.avnlPlaceholderMenu').on('click.avnlPlaceholderMenu', function (event) {
						event.preventDefault();
						var isOpen = !$item.hasClass('avnl-menu-open');
						$item.toggleClass('avnl-menu-open', isOpen).toggleClass('hover', isOpen);
						$link.attr('aria-expanded', isOpen ? 'true' : 'false');
						$submenu.stop(true, true)[isOpen ? 'slideDown' : 'slideUp'](150);
					});
				});
				dropdown('nav', 'hover', 1);
				$('#nav').on('focusin.avnlSubmenu', 'ul a', function () {
					$(this).parent('li').siblings().removeClass('focus');
				});
				adjustMenu();
			}
			$(document).keyup(function (e) {
				if (e.keyCode === 27) { // ESC
					var $focused = $(document.activeElement);
					var $parentLi = $focused.closest('li.focus, li.hover');

					if ($parentLi.length) {
						// Close the submenu
						$parentLi
							.removeClass("focus")
							.removeClass("hover")
							.removeClass("avnl-keyboard-open");
						$parentLi.find('> ul a').attr('tabindex', '-1');
						$parentLi.find('> a').attr('aria-expanded', 'false');
						window.avnlSuppressNextSubmenuOpen = true;
						// Return focus to the trigger link
						$parentLi.find('> a').focus();
					}
				}
			});
		})

		//$(document).ready(function() {
		// var currentPath = window.location.pathname;

		//$(".primary-nav__menu-link").each(function() {
		//var linkPath = $(this).attr("href");

		// Compare current path with link path
		// if (linkPath === currentPath) {
		//   $(this).attr("aria-current", "page");
		//  } else {
		//$(this).removeAttr("aria-current");
		//  .attr("aria-current", "No current page");
		//  }
		// });
		//});	

		if ($('.datepicker').length) {
			$.datepicker.setDefaults({
				showOn: "both"
				, dateFormat: "dd/mm/yy"
				, changeMonth: true
				, changeYear: true
				//,buttonImage: "images/calendar.png"
				//,buttonImageOnly: true
				, shortYearCutoff: 50
				, buttonText: "<span class='sprite calIcon'></span>"
				, beforeShow: function (textbox, instance) {
					instance.dpDiv.css({
						marginTop: /*(textbox.offsetHeight)*/ 0 + 'px'
						, marginLeft: 0 + 'px'
					});
				}
			});

			$(".datepicker").datepicker({
				dateFormat: "dd/mm/yy"
				, showOn: "both"
				, buttonText: "<span class='sprite calIcon'></span>"
				, shortYearCutoff: 50
				//,buttonImage: "images/calendar.png"
				//,buttonImageOnly: true
				, beforeShow: function (textbox, instance) {
					instance.dpDiv.css({
						marginTop: /*(textbox.offsetHeight)*/ 0 + 'px'
						, marginLeft: 0 + 'px'
					});
				}
			});
		}

		if ($(".datetimepicker").length) {
			$(".datetimepicker").datetimepicker({
				dateFormat: "dd-mm-yy",
				showOn: "both",
				buttonText: "<span class='sprite calIcon'></span>",
				//buttonImage: "images/calendar.png"
				//buttonImageOnly: true,
				beforeShow: function (textbox, instance) {
					instance.dpDiv.css({
						marginTop: /*(textbox.offsetHeight)*/ 15 + 'px',
						marginLeft: -13 + 'px'
					});
				}
			});
		}
		$(function () {
			var zoomLevel = 1; // Initial zoom level

			function zoom(zoomType) {
				if (zoomType === 'zoom-in') {
					zoomLevel = Math.min(1.5);
				} else if (zoomType === 'zoom-out') {
					zoomLevel = Math.max(0.8, zoomLevel - 0.1);
				} else if (zoomType === 'reset') {
					zoomLevel = 1;
				}
				$('body').css('zoom', zoomLevel);
			}

			/* $('#font_normal').click(function () { zoom('zoom-out'); });
			 $('#font_large').click(function () { zoom('reset'); });
			 $('#font_larger').click(function () { zoom('zoom-in'); });*/
		});
		if ($("form#node-feedback-form").length) {
			$.validator.addMethod("valueNotEquals", function (value, element, arg) {
				return arg !== value;
			}, "Please select any one.");
			$.validator.addMethod("mobilenocorrect", function (value, element) {
				return this.optional(element) || /^[6-9][0-9]{9}/i.test(value);
			}, "Please enter valid Mobile No.");
			$.validator.addMethod("description", function (value, element) {
				return this.optional(element) || /[^@#$%^*+=`~;\/{}]+$/.test(value);
			}, "Please enter only letters and digits.");
			$.validator.addMethod("onlytext", function (value, element) {
				return this.optional(element) || /^[a-zA-Z ]+$/i.test(value);
			}, "Please enter only letters.");

			$("#node-feedback-form").validate({
				rules: {
					'title[0][value]': { required: true, onlytext: true },
					'field_feedback_email_id[0][value]': { email: true, required: true },
					'field_contact_number[0][value]': { mobilenocorrect: true, number: true, rangelength: [10, 10] },
					//'field_feedback_query_type': { valueNotEquals: "_none" },
					'body[0][value]': { description: true },
				},
				ignore: ".form-file",
				messages: {
					'mail': {
						email: 'Please enter valid Email address'
					},
					'field_contact_number[0][value]': {
						//number: 'Please enter valid Mobile No.'
						rangelength: 'Please enter valid Mobile No.'
					},
				},
				errorPlacement: function (error, element) {
					error.attr('role', 'alert'); // Add role="alert" to the error message
					error.insertAfter(element);
				},
				submitHandler: function (form) {
					form.submit()
				}
			});
		}




		if ($("form#node-online-enquiry-form").length) {
			$.validator.addMethod("valueNotEquals", function (value, element, arg) {
				return arg !== value;
			}, "Please select any one.");
			$.validator.addMethod("mobilenocorrect", function (value, element) {
				return this.optional(element) || /^[6-9][0-9]{9}/i.test(value);
			}, "Please enter valid Mobile No.");
			$.validator.addMethod("description", function (value, element) {
				return this.optional(element) || /[^@#$%^*+=`~;\/{}]+$/.test(value);
			}, "Please enter only letters and digits.");
			$.validator.addMethod("onlytext", function (value, element) {
				return this.optional(element) || /^[a-zA-Z ]+$/i.test(value);
			}, "Please enter only letters.");

			$("#node-online-enquiry-form").validate({
				rules: {
					'title[0][value]': { required: true, onlytext: true },
					'field_online_enquiry_email_id[0][value][0][value]': { email: true, required: true },
					'field_online_contact_number[0][value]': { mobilenocorrect: true, number: true, rangelength: [10, 10] },
					'body[0][value]': { description: true },
				},
				ignore: ".form-file",
				messages: {
					'mail': {
						email: 'Please enter valid Email address'
					},
					'field_online_contact_number[0][value]': {
						//number: 'Please enter valid Mobile No.'
						rangelength: 'Please enter valid Mobile No.'
					},


				},
				errorPlacement: function (error, element) {
					error.attr('role', 'alert'); // Add role="alert" to the error message
					error.insertAfter(element);
				},
				submitHandler: function (form) {
					form.submit()
				}
			});
		}


		// Message on Cookie Disabled
		/* $.cookie('cookieWorked', 'yes', { path: '/', httpOnly: true, samesite: 'Lax',  secure: true  });
		if ($.cookie('cookieWorked') == 'yes') {
		}
		else{
			if( $("div.jsRequired").length == 0){
				$("body").prepend(
					'<div class="jsRequired">Cookies are not enabled on your browser. Need to adjust this in your browser security preferences. Please enable cookies for better user experience.</div>'
					);	
			}
		} */

	});
	/*================= On Document Load End =================*/
	// To open External link Dialogbox for External links
	$('html[lang="en"] a').not(".litebox, .colorbox-load, .w3cLogos a, .videoPopupLink").filter(function () {
		return this.hostname && this.hostname !== location.hostname;
	}).click(function (e) {
		e.preventDefault();
		var url = $(this).attr("href");
		smoke.confirm("You are about to proceed to an external website. Click YES to proceed.", function (e) {
			if (e) {
				window.open(url, "_blank");
			} else {
				return false;
			}
		}, {
			ok: "Yes",
			cancel: "No",
			classname: "custom-class",
			reverseButtons: true
		});
	});



	// To open External link Dialogbox for External links
	$('html[lang="hi"] a').not(".litebox, .colorbox-load, .w3cLogos a, .videoPopupLink").filter(function () {
		return this.hostname && this.hostname !== location.hostname;
	}).click(function (e) {
		e.preventDefault();
		var url = $(this).attr("href");
		smoke.confirm("आप एक बाहरी वेबसाइट पर जाने वाले हैं। आगे बढ़ने के लिए हाँ क्लिक करें.", function (e) {
			if (e) {
				window.open(url, "_blank");
			} else {
				return false;
			}
		}, {
			ok: "हाँ",
			cancel: "नहीं",
			classname: "custom-class",
			reverseButtons: true
		});
	});




	// To open Internal link Dialogbox for target_blank 

	$('a[target="_blank"]').addClass("taggetBlankLink");

	$('ul.rightLinks li a.taggetBlankLink, .ministerHome .whatsNew a.taggetBlankLink').click(function (e) {
		e.preventDefault();
		if ($(this).attr("target", "_blank")) {
			var url = $(this).attr("href");
			smoke.confirm("NHAI Old Website Link will be opened in new tab of browser. Click OK to proceed.", function (e) {
				if (e) {
					window.open(url, "_blank");
				} else {
					return false;
				}
			});
		}
	});
	/*================= On Window Resize Start =================*/
	$(window).bind('resize orientationchange', function () {
		getWidth();
		adjustMenu();
		$('.vCenter').each(function () { $(this).verticalAlign(); });
	});

	/*================= On Window Resize End =================*/

	/*================= On Window Load Start =================*/
	$(window).load(function () {

	});
	/*================= On Document Load End =================*/


	function getWidth() {
		ww = document.body.clientWidth;
		if (ww > wideScreen) { $('body').removeClass('device').addClass('desktop widerDesktop'); }
		if (ww > mobilePort && ww <= wideScreen) { $('body').removeClass('device widerDesktop').addClass('desktop'); }
		if (ww <= mobilePort) { $('body').removeClass('desktop widerDesktop').addClass('device'); }
		if (ww > 767 && ww < 1025) { $('body').addClass('ipad'); }
		else { $('body').removeClass('ipad'); }
	}

})(jQuery);

function validate() {
	return false;
};

if ($(".backgroundBg").length) {
	$('.backgroundBg img').each(function () {
		var bgImage = $(this).attr('src');
		$(this).parent().parent().css('background-image', ' url(' + bgImage + ') ');
	});
}



// avnLogo Logos Slider
if ($(".avnLogo").length && typeof Swiper !== 'undefined') {
	var $avnLogo = $(".avnLogo");
	var $footerLogoList = $avnLogo.find('.view-footer-logo .item-list > ul').first();

	// The Drupal view provides a list, while Swiper needs one wrapper and slide items.
	if ($footerLogoList.length) {
		if (!$footerLogoList.parent().hasClass('swiper-container')) {
			$footerLogoList.wrap('<div class="swiper-container"></div>');
		}
		// Drupal renders one extra list level for each logo. Flatten it so Swiper
		// has exactly one wrapper list with direct logo slide list items.
		$footerLogoList.children('li').each(function () {
			var $outerItem = $(this);
			var $nestedItems = $outerItem.children('ul').children('li');

			if ($nestedItems.length) {
				$outerItem.replaceWith($nestedItems);
			}
		});

		$footerLogoList.addClass('swiper-wrapper');
		$footerLogoList.children('li').removeClass('swiper-wrapper').addClass('swiper-slide');
	}

	var avnLogo = new Swiper('.avnLogo .swiper-container', {
		loop: false,
		speed: 800,
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.avnLogo .aCNext',
			prevEl: '.avnLogo .aCPrev',
		},
		breakpoints: {
			1199: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 16
			},
			425: {
				slidesPerView: 1,
				spaceBetween: 16
			}
		},
	});

	function updateTabindex() {
		$avnLogo.find('.aCPrev, .aCNext').each(function () {
			if ($(this).hasClass("swiper-button-disabled")) {
				$(this).removeAttr("tabindex");
			} else {
				$(this).attr("tabindex", "0");
			}
		});
	}
	updateTabindex();
	avnLogo.on('slideChange transitionEnd resize', updateTabindex);

	$('.avnLogo .swiper-button-pause').attr('title', "pause");
	$('.lang-hi .avnLogo .swiper-button-pause').attr('title', "रोकें");
	$('.aclogos .swiper-button-pause').attr('title', "Play").attr('aria-label', "play");
	$(".aclogos .swiper-button-pause").toggle(function () {
		$(this).addClass('play');
		$(this).attr('title', "Play").attr('aria-label', "Play");
		$('.lang-hi .avnLogo .swiper-button-pause').attr('title', "चलाएँ");
		avnLogo.autoplay.stop();

	}, function () {
		$(this).removeClass('play');
		$(this).attr('title', "pause").attr('aria-label', "pause");
		$('.lang-hi .avnLogo .swiper-button-pause').attr('title', "रोकें");
		avnLogo.autoplay.start();
		return false;
	});
 
	$avnLogo.find('.aCPrev, .aCNext').off('keydown.avnlFooter').on('keydown.avnlFooter', function (event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			$(this).trigger('click');
		}
	});

	var $footerPause = $avnLogo.find('.swiper-button-pause');
	$footerPause.attr('title', "pause").attr('aria-label', "pause").attr('role', 'button').attr('tabindex', '0');
	$footerPause.off('click keydown.avnlFooter').on('click.avnlFooter keydown.avnlFooter', function (event) {
		if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
			return;
		}
		event.preventDefault();

		if ($(this).hasClass('play')) {
			$(this).removeClass('play').attr('title', "pause").attr('aria-label', "pause");
			avnLogo.autoplay.start();
		} else {
			$(this).addClass('play').attr('title', "Play").attr('aria-label', "play");
			avnLogo.autoplay.stop();
		}
	});
}
$('.logosName').click(function (e) {
	setTimeout(function () {
		$(".custom-class").wrap("<section role='main' tabindex='-1' />");
		$('section[role="main"]').focus();
	}, 1000);
});

// Keep tender partner links in one horizontal, responsive group.
$(function () {
	$('.view-tenders .defencemart li').filter(function () {
		return !$(this).find('a, img').length && !$(this).text().replace(/\u00a0/g, '').trim();
	}).hide();
});

// lettest news event Slider
if ($(".ltenSlider").length) {
	var ltenSlider = new Swiper('.ltenSlider .swiper-container', {
		loop: false,
		speed: 800,
		slidesPerView: 1,

		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.ltevNext',
			prevEl: '.ltevPrev',
		},
		breakpoints: {
			579: {
				slidesPerView: 1,
				spaceBetween: 0
			}
		},
	});
	$('.letestevent .swiper-button-pause').attr('title', "pause");
	$('.lang-hi .letestevent .swiper-button-pause').attr('title', "रोकें");
	$(".letestevent .swiper-button-pause").toggle(function () {
		$(this).addClass('play');
		$(this).attr('title', "Play")
		$('.lang-hi .letestevent .swiper-button-pause').attr('title', "चलाएँ");
		ltenSlider.autoplay.stop();
	}, function () {
		$(this).removeClass('play');
		$(this).attr('title', "pause")
		$('.lang-hi .letestevent .swiper-button-pause').attr('title', "रोकें");
		ltenSlider.autoplay.start();
		return false;
	});
}

// Media Gallery Slider
var sliderGallery11, circularsGallery, customGalleryWrap;
function gallerySliderFunc() {
	if ($(".sliderGallery11").length) {
		sliderGallery11 = new Swiper('.sliderGallery11 .swiper-container', {
			loop: false,
			slidesPerView: 4,
			spaceBetween: 0,
			direction: "vertical",
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.schemesNext',
				prevEl: '.schemesPrev',
			},
			breakpoints: {
				579: {
					slidesPerView: 1,
					spaceBetween: 0
				}
			},
		});
		// To stop autoplay when Swiper created an autoplay controller.
		if (sliderGallery11.autoplay && sliderGallery11.autoplay.stop) {
			sliderGallery11.autoplay.stop();
		}
		$('.sliderGallery11 .swiper-button-pause').attr('title', "pause");
		$('.lang-hi .sliderGallery11 .swiper-button-pause').attr('title', "रोकें");
		$(".sliderArrowWrap .swiper-button-pause").toggle(function () {
			$(this).addClass('play');
			$(this).attr('title', "Play")
			$('.lang-hi .sliderGallery11 .swiper-button-pause').attr('title', "चलाएँ");
			if (sliderGallery11.autoplay && sliderGallery11.autoplay.stop) {
				sliderGallery11.autoplay.stop();
			}
		}, function () {
			$(this).removeClass('play');
			$(this).attr('title', "pause")
			$('.lang-hi .sliderGallery11 .swiper-button-pause').attr('title', "रोकें");
			if (sliderGallery11.autoplay && sliderGallery11.autoplay.start) {
				sliderGallery11.autoplay.start();
			}
			return false;
		});

	}

	// Media Gallery Slider
	if ($(".circularsGallery").length) {
		circularsGallery = new Swiper('.circularsGallery .swiper-container', {
			loop: false,
			slidesPerView: 4,
			spaceBetween: 0,
			direction: "vertical",
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.circularsNext',
				prevEl: '.circularsPrev',
			},
			breakpoints: {
				579: {
					slidesPerView: 1,
					spaceBetween: 0
				}
			},
		});
		// To stop autoplay when Swiper created an autoplay controller.
		if (circularsGallery.autoplay && circularsGallery.autoplay.stop) {
			circularsGallery.autoplay.stop();
		}
		$('.circularsGallery .swiper-button-pause').attr('title', "pause");
		$('.lang-hi .circularsGallery .swiper-button-pause').attr('title', "रोकें");
		$(".circularsArrow .swiper-button-pause").toggle(function () {
			$(this).addClass('play');
			$(this).attr('title', "Play")
			$('.lang-hi .circularsGallery .swiper-button-pause').attr('title', "चलाएँ");
			if (circularsGallery.autoplay && circularsGallery.autoplay.stop) {
				circularsGallery.autoplay.stop();
			}
		}, function () {
			$(this).removeClass('play');
			$(this).attr('title', "pause")
			$('.lang-hi .circularsGallery .swiper-button-pause').attr('title', "रोकें");
			if (circularsGallery.autoplay && circularsGallery.autoplay.start) {
				circularsGallery.autoplay.start();
			}
			return false;
		});
	}
}
setTimeout(function () {
	gallerySliderFunc();
}, 500)
$('mediaPublic ul.tabNav li').on('click', function () {
	sliderGallery11.destroy();
	circularsGallery.destroy();
	gallerySliderFunc();
});

// litebox

$('.litebox').magnificPopup({
	disableOn: 700,
	type: 'iframe',
	mainClass: 'mfp-fade',
	removalDelay: 160,
	preloader: false,
	fixedContentPos: true,
	callbacks: {
		close: function () {
			// Return focus to the element that opened the popup
			if (this.st.el) {
				this.st.el.focus();
			}
		}
	}
});
$('.popup-gallery').magnificPopup({
	delegate: 'a',
	type: 'image',
	tLoading: 'Loading image #%curr%...',
	mainClass: 'mfp-img-mobile',
	gallery: {
		enabled: true,
		navigateByImgClick: true,
		preload: [0, 1]
	},
	fixedContentPos: true,
	image: {
		tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		titleSrc: function (item) {
			return item.el.attr('title') + '<small>by AVNL</small>';
		}
	},
	callbacks: {
		close: function () {
			// Return focus to the element that opened the popup
			if (this.st.el) {
				this.st.el.focus();
			}
		}
	}
});

//chetbox

var ischatopen = false;
var ele = document.getElementById("chatbar");

function openChatBox() {
	if (ischatopen == false) {
		ele.classList.add("toggle");
		ischatopen = true;
		document.getElementById("chatOpen").classList.remove("fa-comments");
		document.getElementById("chatOpen").classList.add("fa-times");

	}
	else {
		ele.classList.remove("toggle");
		ischatopen = false;
		document.getElementById("chatOpen").classList.add("fa-comments");
		document.getElementById("chatOpen").classList.remove("fa-times");
	}
}



function send() {
	console.log("Here");
	var chatBody = document.getElementById("chatBody");
	var Clientmsg = document.getElementById("MsgInput").value;
	document.getElementById('MsgInput').value = '';
	var divClient = document.createElement("div");
	divClient.classList.add("chat_box_body_self");

	divClient.innerHTML = Clientmsg;

	chatBody.append(divClient);


	var divBot = document.createElement("div");
	divBot.classList.add("chat_box_body_other");

	divBot.innerHTML = Clientmsg;
	setTimeout(function () {
		$('divBot').show();
	}, 5000);
	chatBody.append(divBot);
	chatBody.scrollTop = chatBody.scrollHeight;
}


document.addEventListener('DOMContentLoaded', function () {
	const focusableSelector = [
		'a[href]:not([tabindex="-1"])',
		'button:not([disabled]):not([tabindex="-1"])',
		'input:not([disabled]):not([tabindex="-1"])',
		'select:not([disabled]):not([tabindex="-1"])',
		'textarea:not([disabled]):not([tabindex="-1"])',
		'[tabindex]:not([tabindex="-1"])',
	].join(',');

	function setupAriaToggle(selector) {
		const buttons = document.querySelectorAll(selector);

		buttons.forEach((btn) => {
			btn.addEventListener('click', () => {
				buttons.forEach((item) => item.setAttribute('aria-current', 'false'));
				btn.setAttribute('aria-current', 'true');
			});
		});
	}

	function isActivationKey(event) {
		return (
			event.key === 'Enter' ||
			event.key === ' ' ||
			event.key === 'Spacebar' ||
			(event.key && event.key.toLowerCase() === 'enter') ||
			event.code === 'Space' ||
			event.keyCode === 13 ||
			event.keyCode === 32
		);
	}

	function isEscapeKey(event) {
		return (
			event.key === 'Escape' ||
			event.key === 'Esc' ||
			(event.key && event.key.toLowerCase() === 'escape') ||
			event.keyCode === 27
		);
	}

	function isVisibleFocusableItem(item) {
		const style = window.getComputedStyle(item);
		return (
			style.display !== 'none' &&
			style.visibility !== 'hidden' &&
			style.opacity !== '0' &&
			item.getClientRects().length > 0 &&
			!item.closest('[aria-hidden="true"]')
		);
	}

	function getPageFocusableItems(excludeContainer) {
		return Array.from(document.querySelectorAll(focusableSelector)).filter((item) => {
			if (excludeContainer && excludeContainer.contains(item)) {
				return false;
			}

			return isVisibleFocusableItem(item);
		});
	}

	function focusAdjacentToElement(element, reverse, excludeContainer) {
		const pageItems = getPageFocusableItems(excludeContainer);
		const currentIndex = pageItems.indexOf(element);
		const nextItem = pageItems[currentIndex + (reverse ? -1 : 1)];

		if (nextItem) {
			nextItem.focus();
			return true;
		}

		return false;
	}

	function focusNextAfterControl(control, excludeContainer) {
		const pageItems = getPageFocusableItems(excludeContainer);
		const currentIndex = pageItems.findIndex((item) => item === control || control.contains(item));
		const nextItem = pageItems.slice(currentIndex + 1).find((item) => item !== control && !control.contains(item));

		if (nextItem) {
			nextItem.focus();
			return true;
		}

		return false;
	}

	function focusPrimaryNavigationStart() {
		const firstNavLink = Array.from(document.querySelectorAll([
			'#block-avnl-main-menu > ul.menu > li > a[href]',
			'#nav > li > a[href]',
			'.headermenu .menuPart > ul > li > a[href]',
			'.headermenu .menuPart a[href]',
		].join(','))).find(isVisibleFocusableItem);

		if (firstNavLink) {
			firstNavLink.focus();
			return true;
		}

		return false;
	}

	function bindAccessibleButton(id, callback, options) {
		const btn = document.getElementById(id);

		if (!btn) {
			return;
		}

		const isCommand = options && options.command;
		btn.setAttribute('role', btn.getAttribute('role') || 'button');
		btn.setAttribute('tabindex', btn.getAttribute('tabindex') || '0');

		if (!isCommand) {
			btn.setAttribute('aria-pressed', 'false');
		}

		const run = (event) => {
			event.preventDefault();
			callback(btn);
		};

		btn.addEventListener('click', run);
		btn.addEventListener('keydown', (event) => {
			if (isActivationKey(event)) {
				run(event);
			}
		});
	}

	function bindCommandButton(id) {
		const btn = document.getElementById(id);

		if (!btn) {
			return;
		}

		btn.setAttribute('role', btn.getAttribute('role') || 'button');
		btn.setAttribute('tabindex', btn.getAttribute('tabindex') || '0');

		btn.addEventListener('keydown', (event) => {
			if (isActivationKey(event)) {
				event.preventDefault();
				btn.click();
			}
		});
	}

	function toggleBodyClass(btn, className) {
		const isActive = document.body.classList.toggle(className);
		btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
	}

	function toggleHtmlClass(btn, className) {
		const isActive = document.documentElement.classList.toggle(className);
		btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
	}

	function togglePageClass(btn, className) {
		const isActive = document.body.classList.toggle(className);
		document.documentElement.classList.toggle(className, isActive);
		btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
	}

	function setupResponsivePrimaryMenu() {
		const primaryMenu = document.getElementById('block-avnl-main-menu');
		const drawerMenu = document.querySelector('#offcanvasWithBothOptions .side-menu');

		if (!primaryMenu || !drawerMenu) {
			return;
		}

		const originalParent = primaryMenu.parentNode;
		const originalNextSibling = primaryMenu.nextSibling;
		const mobileQuery = window.matchMedia('(max-width: 1199px)');

		const addMobileSubmenuControls = () => {
			const menuItems = primaryMenu.querySelectorAll('#nav li');

			menuItems.forEach((menuItem, index) => {
				const submenu = menuItem.querySelector(':scope > ul');
				if (!submenu || menuItem.querySelector(':scope > .mobile-submenu-toggle')) {
					return;
				}

				if (!submenu.id) {
					submenu.id = `mobile-primary-submenu-${index + 1}`;
				}

				const toggle = document.createElement('button');
				toggle.type = 'button';
				toggle.className = 'mobile-submenu-toggle';
				toggle.setAttribute('aria-controls', submenu.id);
				toggle.setAttribute('aria-expanded', 'false');
				toggle.setAttribute('aria-label', `${(menuItem.querySelector(':scope > a')?.textContent || 'Submenu').trim()} submenu`);

				toggle.addEventListener('click', (event) => {
					event.preventDefault();
					event.stopPropagation();

					const isOpen = !menuItem.classList.contains('mobile-submenu-open');
					menuItem.classList.toggle('mobile-submenu-open', isOpen);
					toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
				});

				menuItem.appendChild(toggle);
			});
		};

		const restoreDesktopMenu = () => {
			primaryMenu.classList.remove('mobile-primary-navigation');
			primaryMenu.querySelectorAll('.mobile-submenu-toggle').forEach((toggle) => toggle.remove());
			primaryMenu.querySelectorAll('.mobile-submenu-open').forEach((item) => item.classList.remove('mobile-submenu-open'));

			if (primaryMenu.parentNode !== originalParent) {
				originalParent.insertBefore(primaryMenu, originalNextSibling);
			}
		};

		const placeMenuForViewport = () => {
			if (!mobileQuery.matches) {
				restoreDesktopMenu();
				return;
			}

			if (primaryMenu.parentNode !== drawerMenu) {
				drawerMenu.appendChild(primaryMenu);
			}

			primaryMenu.classList.add('mobile-primary-navigation');
			addMobileSubmenuControls();
		};

		placeMenuForViewport();
		mobileQuery.addEventListener('change', placeMenuForViewport);
	}

	function setupOffcanvasFocusTrap() {
		const menuButton = document.getElementById('menuButton');
		const offcanvas = document.getElementById('offcanvasWithBothOptions');

		if (!menuButton || !offcanvas) {
			return;
		}

		if (menuButton.dataset.offcanvasKeyboardReady === 'true') {
			return;
		}

		let lastFocusedElement = null;
		let isOpen = false;
		let skipNextTabOpen = false;
		let suppressFocusOpen = false;
		let pointerFocus = false;
		const managedFocusableSelector = [
			'a[href]',
			'button:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'[role="button"]',
			'[tabindex]',
		].join(',');

		const setManagedTabOrder = (enabled) => {
			Array.from(offcanvas.querySelectorAll(managedFocusableSelector)).forEach((item) => {
				if (!Object.prototype.hasOwnProperty.call(item.dataset, 'offcanvasOriginalTabindex')) {
					item.dataset.offcanvasOriginalTabindex = item.hasAttribute('tabindex')
						? item.getAttribute('tabindex')
						: '__none__';
				}

				if (enabled) {
					if (item.dataset.offcanvasOriginalTabindex === '__none__') {
						item.removeAttribute('tabindex');
					} else {
						item.setAttribute('tabindex', item.dataset.offcanvasOriginalTabindex);
					}
					return;
				}

				item.setAttribute('tabindex', '-1');
			});
		};

		const isVisibleItem = (item) => {
			const style = window.getComputedStyle(item);
			return (
				style.display !== 'none' &&
				style.visibility !== 'hidden' &&
				style.opacity !== '0' &&
				item.getClientRects().length > 0 &&
				!item.closest('[aria-hidden="true"]')
			);
		};

		const getFocusableItems = () =>
			Array.from(offcanvas.querySelectorAll(focusableSelector))
				.filter((item) => item !== offcanvas && isVisibleItem(item));

		const getPageFocusableItems = () =>
			Array.from(document.querySelectorAll(focusableSelector)).filter((item) => {
				if (offcanvas.contains(item)) {
					return false;
				}

				return isVisibleItem(item);
			});

		const focusAdjacentControl = (reverse) => {
			if (!reverse && focusPrimaryNavigationStart()) {
				return;
			}

			const pageItems = getPageFocusableItems();
			const menuButtonIndex = pageItems.indexOf(menuButton);
			const nextItem = pageItems[menuButtonIndex + (reverse ? -1 : 1)];

			if (nextItem) {
				nextItem.focus();
			}
		};

		const focusFirstItem = () => {
			const focusableItems = getFocusableItems();
			const closeButton = Array.from(
				offcanvas.querySelectorAll('[data-bs-dismiss="offcanvas"], .close-btn'),
			).find(isVisibleItem);
			const firstMenuLink = Array.from(
				offcanvas.querySelectorAll('.side-menu a[href]:not([tabindex="-1"])'),
			).find(isVisibleItem);
			const firstItem = closeButton || firstMenuLink || focusableItems[0];

			if (firstItem) {
				firstItem.focus();
				return document.activeElement === firstItem || firstItem.contains(document.activeElement);
			}

			return false;
		};

		const focusLastItem = () => {
			const focusableItems = getFocusableItems();
			const lastItem = focusableItems[focusableItems.length - 1];

			if (lastItem) {
				lastItem.focus();
				return document.activeElement === lastItem || lastItem.contains(document.activeElement);
			}

			return false;
		};

		const focusMenuItemWhenReady = (reverse) => {
			const focusMenuItem = () => (reverse ? focusLastItem() : focusFirstItem());

			if (focusMenuItem()) {
				return;
			}

			window.requestAnimationFrame(() => {
				if (focusMenuItem()) {
					return;
				}

				window.setTimeout(focusMenuItem, 80);
			});
		};

		const showOffcanvas = () => {
			const legacyMobileNav = document.getElementById('nav');
			if (legacyMobileNav && window.innerWidth <= 1199) {
				legacyMobileNav.style.setProperty('display', 'none', 'important');
			}
			offcanvas.classList.add('show');
			offcanvas.style.setProperty('visibility', 'visible', 'important');
			offcanvas.style.setProperty('transform', 'none', 'important');
			document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop').forEach((backdrop) => {
				backdrop.remove();
			});
		};

		const hideOffcanvas = () => {
			offcanvas.classList.remove('show', 'showing', 'hiding');
			offcanvas.style.removeProperty('visibility');
			offcanvas.style.removeProperty('transform');
			document.body.classList.remove('modal-open');
			document.body.style.removeProperty('overflow');
			document.body.style.removeProperty('padding-right');
			document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop').forEach((backdrop) => {
				backdrop.remove();
			});
		};

		const openTrap = (options) => {
			const settings = Object.assign({ focus: true, reverse: false }, options || {});

			if (isOpen) {
				if (settings.focus) {
					if (settings.reverse) {
						focusMenuItemWhenReady(true);
					} else {
						focusMenuItemWhenReady(false);
					}
				}
				return;
			}

			lastFocusedElement = document.activeElement;
			isOpen = true;
			setManagedTabOrder(true);
			document.body.classList.add('offcanvas-menu-open');
			offcanvas.setAttribute('role', offcanvas.getAttribute('role') || 'navigation');
			offcanvas.setAttribute('aria-hidden', 'false');
			offcanvas.setAttribute('tabindex', '-1');
			menuButton.setAttribute('aria-controls', offcanvas.id);
			menuButton.setAttribute('aria-expanded', 'true');

			if (settings.focus) {
				if (settings.reverse) {
					focusMenuItemWhenReady(true);
				} else {
					focusMenuItemWhenReady(false);
				}
			}
		};

		const closeTrap = (options) => {
			const settings = Object.assign(
				{ restoreFocus: true, removeOpenClass: false, focusAfterClose: null },
				options || {},
			);

			isOpen = false;
			setManagedTabOrder(false);
			document.body.classList.remove('offcanvas-menu-open');
			offcanvas.setAttribute('aria-hidden', 'true');
			offcanvas.removeAttribute('tabindex');
			menuButton.setAttribute('aria-expanded', 'false');

			if (settings.removeOpenClass) {
				hideOffcanvas();
			}

			if (settings.focusAfterClose) {
				settings.focusAfterClose();
			} else if (settings.restoreFocus && lastFocusedElement && document.contains(lastFocusedElement)) {
				if (lastFocusedElement === menuButton || menuButton.contains(lastFocusedElement)) {
					suppressFocusOpen = true;
				}
				lastFocusedElement.focus();
			} else if (settings.restoreFocus) {
				suppressFocusOpen = true;
				menuButton.focus();
			}
		};

		const openAndFocusMenu = (reverse) => {
			showOffcanvas();
			openTrap({ focus: true, reverse: !!reverse });
		};

		offcanvas.addEventListener('shown.bs.offcanvas', () => {
			openTrap({ focus: false });
		});
		offcanvas.addEventListener('hidden.bs.offcanvas', () => {
			closeTrap({ restoreFocus: false });
		});

		menuButton.setAttribute('aria-controls', offcanvas.id);
		menuButton.setAttribute('aria-expanded', 'false');
		menuButton.setAttribute('tabindex', menuButton.getAttribute('tabindex') || '0');
		menuButton.removeAttribute('data-bs-toggle');
		menuButton.removeAttribute('data-bs-target');
		offcanvas.setAttribute('aria-hidden', 'true');
		setManagedTabOrder(false);

		menuButton.addEventListener('pointerdown', () => {
			pointerFocus = true;
		});

		menuButton.addEventListener('focus', () => {
			if (suppressFocusOpen) {
				suppressFocusOpen = false;
				return;
			}

			if (pointerFocus) {
				pointerFocus = false;
				return;
			}

			if (!isOpen && !offcanvas.classList.contains('show')) {
				openAndFocusMenu(false);
			}
		});

		menuButton.addEventListener('keydown', (event) => {
			if (event.key === 'Tab' && skipNextTabOpen) {
				event.preventDefault();
				skipNextTabOpen = false;
				isOpen = false;
				setManagedTabOrder(false);
				document.body.classList.remove('offcanvas-menu-open');
				offcanvas.setAttribute('aria-hidden', 'true');
				offcanvas.removeAttribute('tabindex');
				menuButton.setAttribute('aria-expanded', 'false');
				hideOffcanvas();
				focusAdjacentControl(event.shiftKey);
				return;
			}

			if (event.key === 'Tab' && !event.shiftKey && (isOpen || offcanvas.classList.contains('show'))) {
				event.preventDefault();
				focusMenuItemWhenReady(false);
				return;
			}

			if (event.key === 'Tab' && !event.shiftKey && !isOpen && !offcanvas.classList.contains('show')) {
				event.preventDefault();
				openAndFocusMenu(false);
				return;
			}

			if (isActivationKey(event)) {
				event.preventDefault();
				if (isOpen || offcanvas.classList.contains('show')) {
					closeTrap({ restoreFocus: true, removeOpenClass: true });
				} else {
					openAndFocusMenu(false);
				}
			}
		});

		menuButton.addEventListener('click', (event) => {
			pointerFocus = false;
			event.preventDefault();
			event.stopPropagation();

			if (isOpen || offcanvas.classList.contains('show')) {
				closeTrap({ restoreFocus: true, removeOpenClass: true });
			} else {
				openAndFocusMenu(false);
			}
		});

		// Run before legacy menu listeners so the drawer cannot be replaced by #nav.
		menuButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopImmediatePropagation();

			if (isOpen || offcanvas.classList.contains('show')) {
				closeTrap({ restoreFocus: true, removeOpenClass: true });
			} else {
				openAndFocusMenu(false);
			}
		}, true);

		menuButton.dataset.offcanvasKeyboardReady = 'true';

		offcanvas.querySelectorAll('[data-bs-dismiss="offcanvas"], .close-btn').forEach((closeButton) => {
			closeButton.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopPropagation();
				closeTrap({
					restoreFocus: true,
					removeOpenClass: true,
				});
			});
		});

		offcanvas.addEventListener('keydown', (event) => {
			if (!isOpen) {
				return;
			}

			if (isEscapeKey(event)) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				skipNextTabOpen = true;
				closeTrap({ restoreFocus: true, removeOpenClass: true });
				return;
			}

			if (event.key !== 'Tab') {
				return;
			}

			const focusableItems = getFocusableItems();

			if (!focusableItems.length) {
				event.preventDefault();
				offcanvas.focus();
				return;
			}

			const firstItem = focusableItems[0];
			const lastItem = focusableItems[focusableItems.length - 1];

			if (event.shiftKey && document.activeElement === firstItem) {
				event.preventDefault();
				closeTrap({
					restoreFocus: false,
					removeOpenClass: true,
					focusAfterClose: () => focusAdjacentControl(true),
				});
			} else if (!event.shiftKey && document.activeElement === lastItem) {
				event.preventDefault();
				closeTrap({
					restoreFocus: false,
					removeOpenClass: true,
					focusAfterClose: () => focusAdjacentControl(false),
				});
			}
		});

		document.addEventListener('focusin', (event) => {
			if (isOpen && event.target !== menuButton && !offcanvas.contains(event.target)) {
				closeTrap({ restoreFocus: false, removeOpenClass: true });
			}
		});

		document.addEventListener('mousedown', (event) => {
			if (
				isOpen &&
				!offcanvas.contains(event.target) &&
				!menuButton.contains(event.target)
			) {
				closeTrap({
					restoreFocus: true,
					removeOpenClass: true,
				});
			}
		});

		document.addEventListener('keydown', (event) => {
			if (isOpen && isEscapeKey(event)) {
				event.preventDefault();
				skipNextTabOpen = true;
				closeTrap({ restoreFocus: true, removeOpenClass: true });
			}
		});
	}

	function makeHeaderIconControlsKeyboardReady() {
		const controls = document.querySelectorAll([
			'.headerRowRight a',
			'.headerRowRight button',
			'.headerRowRight [role="button"]',
			'.bhashini-plugin-container button',
			'.bhashini-plugin-container [role="button"]',
			'.bhashini-dropdown-btn',
			'.language-option',
			'.topStrip a',
			'.topStrip button',
			'.topStrip [role="button"]',
			'#accessControl a',
			'#accessControl button',
			'#accessControl input',
			'#accessControl [role="button"]',
			'#accessControl [tabindex]',
			'.menuItem',
			'.option-card',
			'.language select',
			'.sideBarBtn .burgerMenu',
		].join(','));

		controls.forEach((control) => {
			if (control.dataset.headerKeyboardReady === 'true') {
				return;
			}

			const tagName = control.tagName.toLowerCase();
			const isNaturallyFocusable =
				tagName === 'button' ||
				tagName === 'input' ||
				tagName === 'select' ||
				(tagName === 'a' && control.hasAttribute('href'));

			if (!isNaturallyFocusable) {
				control.setAttribute('role', control.getAttribute('role') || 'button');
				control.setAttribute('tabindex', control.getAttribute('tabindex') || '0');
			}

			if (tagName === 'a' && !control.hasAttribute('href')) {
				control.setAttribute('tabindex', control.getAttribute('tabindex') || '0');
			}

			control.addEventListener('keydown', (event) => {
				if (isActivationKey(event)) {
					if (tagName !== 'select' && tagName !== 'input') {
						event.preventDefault();
						control.click();
					}
				}
			});

			control.dataset.headerKeyboardReady = 'true';
		});
	}

	function setupAccessControlKeyboardTraversal() {
		const accessControl = document.getElementById('accessControl');

		if (!accessControl) {
			return;
		}

		const accessControlSelector = [
			'a[href]',
			'button:not([disabled])',
			'input:not([disabled]):not([type="hidden"])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'[role="button"]',
			'[tabindex]',
			'.fontScaler',
			'.contrastChanger',
			'.menuItem',
			'.option-card',
		].join(',');

		const getAccessControlItems = () =>
			Array.from(new Set(Array.from(accessControl.querySelectorAll(accessControlSelector)))).filter((item) =>
				isVisibleFocusableItem(item) &&
				item.getAttribute('tabindex') !== '-1' &&
				!item.matches('[disabled], input[type="hidden"], [aria-disabled="true"]')
			);

		const prepareAccessControlItems = () => {
			getAccessControlItems().forEach((item) => {
				if (item.dataset.accessControlKeyboardReady === 'true') {
					return;
				}

				const tagName = item.tagName.toLowerCase();
				const isNativeControl =
					tagName === 'button' ||
					tagName === 'input' ||
					tagName === 'select' ||
					tagName === 'textarea' ||
					(tagName === 'a' && item.hasAttribute('href'));

				if (!isNativeControl) {
					item.setAttribute('role', item.getAttribute('role') || 'button');
					item.setAttribute('tabindex', item.getAttribute('tabindex') || '0');
				}

				item.addEventListener('keydown', (event) => {
					if (event.key === 'Tab') {
						const items = getAccessControlItems();
						const activeIndex = items.findIndex((candidate) =>
							candidate === document.activeElement || candidate.contains(document.activeElement),
						);
						const nextItem = items[activeIndex + (event.shiftKey ? -1 : 1)];

						if (nextItem) {
							event.preventDefault();
							event.stopPropagation();
							nextItem.focus();
						}

						return;
					}

					if (isActivationKey(event) && !['input', 'select', 'textarea'].includes(tagName)) {
						event.preventDefault();
						item.click();
					}
				});

				item.dataset.accessControlKeyboardReady = 'true';
			});
		};

		prepareAccessControlItems();

		if (window.MutationObserver && accessControl.dataset.accessControlTraversalReady !== 'true') {
			const observer = new MutationObserver(prepareAccessControlItems);
			observer.observe(accessControl, { childList: true, subtree: true, attributes: true });
			accessControl.dataset.accessControlTraversalReady = 'true';
		}
	}

	function setupLanguageSwitcherKeyboardReady() {
		const prepareLanguageSwitcher = () => {
			const trigger = document.querySelector(
				'.bhashini-dropdown-btn, [aria-controls="bhashiniLanguageDropdown"]',
			);
			const dropdownId = trigger && trigger.getAttribute('aria-controls');
			const dropdown =
				(dropdownId && document.getElementById(dropdownId)) ||
				document.getElementById('bhashiniLanguageDropdown');

			if (!trigger || !dropdown || trigger.dataset.languageKeyboardReady === 'true') {
				return false;
			}

			const getOptions = () =>
				Array.from(dropdown.querySelectorAll('.language-option, li, [role="option"]')).filter((item) => {
					const text = (item.textContent || '').trim();
					return text && isVisibleFocusableItem(item);
				});
			let pointerFocus = false;
			let suppressFocusOpen = false;
			let skipNextTabOpen = false;

			const setOptionsTabOrder = (enabled) => {
				Array.from(dropdown.querySelectorAll('.language-option, li, [role="option"]')).forEach((item) => {
					if (!Object.prototype.hasOwnProperty.call(item.dataset, 'languageOriginalTabindex')) {
						item.dataset.languageOriginalTabindex = item.hasAttribute('tabindex')
							? item.getAttribute('tabindex')
							: '__none__';
					}

					if (enabled) {
						item.setAttribute('role', item.getAttribute('role') || 'button');
						item.setAttribute('tabindex', '0');
					} else {
						item.setAttribute('tabindex', '-1');
					}
				});
			};

			const isOpen = () => {
				const style = window.getComputedStyle(dropdown);
				return (
					trigger.getAttribute('aria-expanded') === 'true' ||
					(style.display !== 'none' && style.visibility !== 'hidden')
				);
			};

			const openLanguage = (reverse) => {
				if (!isOpen()) {
					trigger.click();
				}

				setTimeout(() => {
					setOptionsTabOrder(true);
					const options = getOptions();
					const target = reverse ? options[options.length - 1] : options[0];

					if (target) {
						target.focus();
					}
				}, 50);
			};

			const closeLanguage = (options) => {
				const settings = Object.assign(
					{ restoreFocus: false, reverse: false, skipNextTabOpen: false },
					options || {},
				);

				if (isOpen()) {
					trigger.click();
				}

				setOptionsTabOrder(false);

				if (settings.restoreFocus) {
					suppressFocusOpen = true;
					if (settings.skipNextTabOpen) {
						skipNextTabOpen = true;
					}

					setTimeout(() => {
						trigger.focus();
						trigger.setAttribute('aria-expanded', 'false');
					}, 0);
				} else {
					focusAdjacentToElement(trigger, settings.reverse, dropdown);
				}
			};

			trigger.setAttribute('tabindex', trigger.getAttribute('tabindex') || '0');
			trigger.setAttribute('aria-expanded', trigger.getAttribute('aria-expanded') || 'false');
			setOptionsTabOrder(false);

			trigger.addEventListener('pointerdown', () => {
				pointerFocus = true;
			});

			trigger.addEventListener('focus', () => {
				if (suppressFocusOpen) {
					suppressFocusOpen = false;
					return;
				}

				if (pointerFocus) {
					pointerFocus = false;
					return;
				}

				openLanguage(false);
			});

			trigger.addEventListener('keydown', (event) => {
				if (event.key === 'Tab' && !event.shiftKey) {
					if (skipNextTabOpen) {
						skipNextTabOpen = false;
						return;
					}

					event.preventDefault();
					openLanguage(false);
					return;
				}

				if (isActivationKey(event)) {
					event.preventDefault();
					openLanguage(false);
				}
			});

			dropdown.addEventListener('keydown', (event) => {
				if (isEscapeKey(event)) {
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					closeLanguage({ restoreFocus: true, skipNextTabOpen: true });
					return;
				}

				if (event.key !== 'Tab') {
					if (isActivationKey(event) && event.target.matches('.language-option, li, [role="option"]')) {
						event.preventDefault();
						event.target.click();
					}
					return;
				}

				const options = getOptions();
				const firstItem = options[0];
				const lastItem = options[options.length - 1];

				if (event.shiftKey && event.target === firstItem) {
					event.preventDefault();
					closeLanguage({ reverse: true });
				} else if (!event.shiftKey && event.target === lastItem) {
					event.preventDefault();
					closeLanguage({ reverse: false });
				}
			});

			document.addEventListener('mousedown', (event) => {
				if (isOpen() && !dropdown.contains(event.target) && !trigger.contains(event.target)) {
					setOptionsTabOrder(false);
				}
			});

			document.addEventListener(
				'keydown',
				(event) => {
					if (isEscapeKey(event) && isOpen() && dropdown.contains(event.target)) {
						event.preventDefault();
						event.stopPropagation();
						event.stopImmediatePropagation();
						closeLanguage({ restoreFocus: true, skipNextTabOpen: true });
					}
				},
				true,
			);

			trigger.dataset.languageKeyboardReady = 'true';
			return true;
		};

		let attempts = 0;
		const tryPrepare = () => {
			attempts += 1;
			makeHeaderIconControlsKeyboardReady();
			setupAccessControlKeyboardTraversal();

			if (!prepareLanguageSwitcher() && attempts < 30) {
				setTimeout(tryPrepare, 500);
			}
		};

		tryPrepare();

		if (window.MutationObserver) {
			const observer = new MutationObserver(() => {
				makeHeaderIconControlsKeyboardReady();
				setupAccessControlKeyboardTraversal();
				prepareLanguageSwitcher();
			});

			observer.observe(document.body, { childList: true, subtree: true });
		}
	}

	function setupPopupMenuAccessibility() {
		const popupMenus = document.querySelectorAll('#popupMenu, .popupMenu');

		popupMenus.forEach((popup, index) => {
			if (popup.dataset.popupMenuAccessibilityReady === 'true') {
				return;
			}

			const popupId = popup.id || `popupMenu-${index + 1}`;
			popup.id = popupId;

			let lastFocusedElement = null;
			let isOpen = false;
			let skipNextTabOpen = false;
			let suppressFocusOpen = false;
			let pointerFocus = false;

			const popupFocusableSelector = [
				'a[href]',
				'button:not([disabled])',
				'input:not([disabled]):not([type="hidden"])',
				'select:not([disabled])',
				'textarea:not([disabled])',
				'[role="button"]',
				'.menuItem',
				'.option-card',
				'#accessControl input:not([disabled]):not([type="hidden"])',
				'#accessControl button:not([disabled])',
				'#accessControl [role="button"]',
				'#accessControl [tabindex]',
				'[tabindex]',
			].join(',');

			const explicitTriggers = document.querySelectorAll([
				`[aria-controls="${popupId}"]`,
				`[href="#${popupId}"]`,
				`[data-target="#${popupId}"]`,
				`[data-bs-target="#${popupId}"]`,
			].join(','));

			const fallbackTriggers = document.querySelectorAll([
				'#popupMenuBtn',
				'#accessibilityMenuBtn',
				'#accessibilityBtn',
				'.popupMenuBtn',
				'.accessibility-menu-btn',
				'.accessibility-toggle',
				'.accessibility-icon',
				'.accessibilityIcon',
				'.headerRowRight .hamburger',
				'.headerRowRight .hamburgerMenu',
				'.headerRowRight [class*="hamburger"]',
				'.headerRowRight [class*="accessibility"]',
				'.topStrip [class*="accessibility"]',
			].join(','));

			const triggerCandidates = Array.from(new Set([
				...Array.from(explicitTriggers),
				...Array.from(fallbackTriggers),
			]))
				.map((trigger) =>
					trigger.closest('button, a[href], [role="button"], [tabindex]') || trigger,
				)
				.filter((trigger) =>
					trigger &&
					trigger.id !== 'menuButton' &&
					!popup.contains(trigger) &&
					isVisibleFocusableItem(trigger),
				);

			const triggers = triggerCandidates.filter((trigger, _, candidates) =>
				!candidates.some((other) => other !== trigger && other.contains(trigger)),
			);

			const makePopupItemsKeyboardReady = () => {
				popup.querySelectorAll('.menuItem, .option-card').forEach((item) => {
					if (item.dataset.popupMenuKeyboardReady === 'true') {
						return;
					}

					const tagName = item.tagName.toLowerCase();
					const hasFocusableChild = item.querySelector('a[href], button, input, select, textarea, [tabindex]');

					if (!Object.prototype.hasOwnProperty.call(item.dataset, 'popupMenuOriginalTabindex')) {
						item.dataset.popupMenuOriginalTabindex = item.hasAttribute('tabindex')
							? item.getAttribute('tabindex')
							: '__none__';
					}

					if (!hasFocusableChild && tagName !== 'a' && tagName !== 'button' && tagName !== 'input') {
						item.setAttribute('role', item.getAttribute('role') || 'button');
						item.setAttribute('tabindex', item.getAttribute('tabindex') || '0');
					}

					item.addEventListener('keydown', (event) => {
						if (isActivationKey(event)) {
							event.preventDefault();
							item.click();
						}
					});

					item.dataset.popupMenuKeyboardReady = 'true';
				});
			};

			const isKeyboardFocusable = (item) => {
				const tagName = item.tagName.toLowerCase();
				const hasValidHref = tagName === 'a' && item.hasAttribute('href');
				const isNativeControl = ['button', 'input', 'select', 'textarea'].includes(tagName);

				return (
					hasValidHref ||
					isNativeControl ||
					item.hasAttribute('tabindex') ||
					item.getAttribute('role') === 'button'
				);
			};

			const getFocusableItems = () =>
				Array.from(new Set(Array.from(popup.querySelectorAll(popupFocusableSelector)))).filter((item) => {
					const style = window.getComputedStyle(item);
					return (
						item.getAttribute('tabindex') !== '-1' &&
						!item.matches('[disabled], input[type="hidden"], [aria-disabled="true"]') &&
						isKeyboardFocusable(item) &&
						style.display !== 'none' &&
						style.visibility !== 'hidden' &&
						style.opacity !== '0' &&
						item.getClientRects().length > 0 &&
						!item.closest('[aria-hidden="true"]')
					);
				});

			const setPopupItemsTabOrder = (enabled) => {
				Array.from(popup.querySelectorAll(popupFocusableSelector)).forEach((item) => {
					if (!Object.prototype.hasOwnProperty.call(item.dataset, 'popupMenuOriginalTabindex')) {
						item.dataset.popupMenuOriginalTabindex = item.hasAttribute('tabindex')
							? item.getAttribute('tabindex')
							: '__none__';
					}

					if (enabled) {
						if (item.dataset.popupMenuOriginalTabindex === '__none__') {
							item.removeAttribute('tabindex');
						} else {
							item.setAttribute('tabindex', item.dataset.popupMenuOriginalTabindex);
						}

						if (item.matches('[role="button"]:not(button):not(a[href])') && !item.hasAttribute('tabindex')) {
							item.setAttribute('tabindex', '0');
						}
						return;
					}

					item.setAttribute('tabindex', '-1');
				});
			};

			const openPopup = (trigger) => {
				if (isOpen) {
					return;
				}

				lastFocusedElement = trigger || document.activeElement;
				isOpen = true;
				makePopupItemsKeyboardReady();
				setPopupItemsTabOrder(true);
				popup.classList.add('is-open');
				popup.classList.remove('hidden');
				popup.removeAttribute('hidden');
				popup.setAttribute('aria-hidden', 'false');
				popup.setAttribute('role', popup.getAttribute('role') || 'dialog');
				popup.setAttribute('tabindex', '-1');
				popup.style.display = 'block';

				triggers.forEach((item) => {
					item.setAttribute('aria-expanded', 'true');
				});

				const firstItem = getFocusableItems()[0] || popup;
				firstItem.focus();
			};

			const closePopup = (options) => {
				const settings = Object.assign(
					{ restoreFocus: false, reverse: false, moveFocus: false, skipNextTabOpen: false },
					options || {},
				);

				if (!isOpen) {
					return;
				}

				isOpen = false;
				popup.classList.remove('is-open');
				popup.setAttribute('aria-hidden', 'true');
				popup.removeAttribute('tabindex');
				popup.style.display = '';
				setPopupItemsTabOrder(false);

				triggers.forEach((item) => {
					item.setAttribute('aria-expanded', 'false');
				});

				if (settings.restoreFocus && lastFocusedElement && document.contains(lastFocusedElement)) {
					if (settings.skipNextTabOpen) {
						skipNextTabOpen = true;
					}

					suppressFocusOpen = true;
					lastFocusedElement.focus();
				} else if (settings.moveFocus && lastFocusedElement && document.contains(lastFocusedElement)) {
					focusAdjacentToElement(lastFocusedElement, settings.reverse, popup);
				}
			};

			makePopupItemsKeyboardReady();
			popup.setAttribute('aria-hidden', 'true');
			setPopupItemsTabOrder(false);

			triggers.forEach((trigger) => {
				trigger.setAttribute('role', trigger.getAttribute('role') || 'button');
				trigger.setAttribute('tabindex', trigger.getAttribute('tabindex') || '0');
				trigger.setAttribute('aria-controls', popupId);
				trigger.setAttribute('aria-expanded', 'false');

				trigger.addEventListener('click', (event) => {
					pointerFocus = false;
					event.preventDefault();
					if (isOpen) {
						closePopup({ restoreFocus: true });
					} else {
						openPopup(trigger);
					}
				});

				trigger.addEventListener('pointerdown', () => {
					pointerFocus = true;
				});

				trigger.addEventListener('focus', () => {
					makePopupItemsKeyboardReady();

					if (suppressFocusOpen) {
						suppressFocusOpen = false;
						return;
					}

					if (pointerFocus) {
						pointerFocus = false;
						return;
					}

					if (!isOpen) {
						openPopup(trigger);
					}
				});

				trigger.addEventListener('keydown', (event) => {
					if (event.key === 'Tab' && !event.shiftKey && !isOpen) {
						if (skipNextTabOpen) {
							skipNextTabOpen = false;
							return;
						}

						event.preventDefault();
						openPopup(trigger);
						return;
					}

					if (isActivationKey(event)) {
						event.preventDefault();
						trigger.click();
					}
				});
			});

			popup.addEventListener('keydown', (event) => {
				if (!isOpen) {
					return;
				}

				if (isEscapeKey(event)) {
					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();
					closePopup({ restoreFocus: true, skipNextTabOpen: true });
					return;
				}

				if (event.key !== 'Tab') {
					return;
				}

				const focusableItems = getFocusableItems();

				if (!focusableItems.length) {
					event.preventDefault();
					popup.focus();
					return;
				}

				const firstItem = focusableItems[0];
				const lastItem = focusableItems[focusableItems.length - 1];
				const activeIndex = focusableItems.findIndex((item) =>
					item === document.activeElement || item.contains(document.activeElement),
				);

				if (event.shiftKey && (document.activeElement === firstItem || activeIndex <= 0)) {
					event.preventDefault();
					closePopup({ reverse: true, moveFocus: true });
				} else if (!event.shiftKey && (document.activeElement === lastItem || activeIndex === focusableItems.length - 1)) {
					event.preventDefault();
					closePopup({ reverse: false, moveFocus: true });
				} else {
					event.preventDefault();
					focusableItems[activeIndex + (event.shiftKey ? -1 : 1)].focus();
				}
			});

			document.addEventListener('mousedown', (event) => {
				if (isOpen && !popup.contains(event.target) && !triggers.some((trigger) => trigger.contains(event.target))) {
					closePopup();
				}
			});

			document.addEventListener('keydown', (event) => {
				if (isOpen && isEscapeKey(event)) {
					event.preventDefault();
					event.stopPropagation();
					closePopup({ restoreFocus: true, skipNextTabOpen: true });
				}
			});

			popup.dataset.popupMenuAccessibilityReady = 'true';
		});
	}

	function setupCookieConsentRecovery() {
		const consentSelectors = '.klaro, .cookie-notice, .cookie-modal';

		const hasVisibleNotice = () =>
			Array.from(document.querySelectorAll(consentSelectors)).some((item) => {
				const style = window.getComputedStyle(item);
				return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
			});

		const hideConsentNotices = () => {
			document.querySelectorAll(consentSelectors).forEach((item) => {
				item.setAttribute('aria-hidden', 'true');
				item.style.display = 'none';
			});
		};

		const hasStoredConsent = () => {
			const cookieHasConsent = /(?:^|;\s*)klaro=/.test(document.cookie);

			try {
				return cookieHasConsent || !!window.localStorage.getItem('klaro');
			} catch (error) {
				return cookieHasConsent;
			}
		};

		document.addEventListener('click', (event) => {
			const clickedConsentAction = event.target.closest(
				`${consentSelectors} button`,
			);

			if (clickedConsentAction) {
				const actionText = (clickedConsentAction.textContent || '').trim().toLowerCase();
				const isFinalAction = [
					'ok',
					'accept',
					'accept all',
					'accept selected',
					'decline',
					'reject',
					'reject all',
					'save',
					'close',
				].indexOf(actionText) !== -1;

				if (isFinalAction) {
					setTimeout(hideConsentNotices, 150);
					setTimeout(hideConsentNotices, 600);
				}
			}
		}, true);

		const respectStoredConsent = () => {
			if (hasStoredConsent() && hasVisibleNotice()) {
				hideConsentNotices();
			}
		};

		setTimeout(respectStoredConsent, 250);
		setTimeout(respectStoredConsent, 1000);
	}

	bindAccessibleButton('darkContrastBtn', function (btn) {
		togglePageClass(btn, 'dark-contrast');
	});

	bindAccessibleButton('invertBtn', function (btn) {
		togglePageClass(btn, 'invert-colors');
	});

	bindAccessibleButton('saturationBtn', function (btn) {
		togglePageClass(btn, 'high-saturation');
	});

	bindAccessibleButton('highlightLinksBtn', function (btn) {
		togglePageClass(btn, 'highlight-links');
	});

	bindAccessibleButton('hideImagesBtn', function (btn) {
		togglePageClass(btn, 'hide-images');
	});

	bindAccessibleButton('defaultCursorBtn', function (btn) {
		togglePageClass(btn, 'cursor-size');
	});

	bindCommandButton('font_larger');
	bindCommandButton('font_small');

	setupAriaToggle('.fontScaler');
	setupAriaToggle('.contrastChanger');
	makeHeaderIconControlsKeyboardReady();
	setupAccessControlKeyboardTraversal();
	setupLanguageSwitcherKeyboardReady();
	setupPopupMenuAccessibility();
	setupResponsivePrimaryMenu();
	setupOffcanvasFocusTrap();
	setupCookieConsentRecovery();
});

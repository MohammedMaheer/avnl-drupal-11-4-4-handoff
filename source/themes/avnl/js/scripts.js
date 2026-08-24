// $(document).ready( function(){
// 		//Home Slider
// 		if($(".homeBanner").length){
// 			var homeSlider = new Swiper('.homeBanner .swiper-container', {
// 				spaceBetween: 0,
// 				speed: 2000,
// 				loop: true,
// 				keyboard: true,
// 				autoplay: {
// 					delay: 1000,
// 					disableOnInteraction: false,
// 				},
// 				pagination: false,
// 				navigation: {
// 					nextEl: '.homeBanner .slider__button-next',
// 					prevEl: '.homeBanner .slider__button-prev',
// 				},
// 			});
// 			$(".swiper-button-pause").toggle(function() {
// 				$(this).addClass('play');
// 				homeSlider.autoplay.stop();
// 			}, function() {
// 				$(this).removeClass('play');
// 				homeSlider.autoplay.start();
// 				return false;
// 			});
// 			$(".homeBannerImgWrap").each(function(){
// 				var imagePath = $(this).find("img").attr("src");
// 				$(this).css("background-image","url( "+ imagePath +" )");
// 			});
// 		}

// 		// Notification
// 		if( $(".marqueeScrolling li").length > 1){
// 			var $mq = $('.marquee').marquee({
// 				speed: 25000
// 				,gap: 0
// 				,duplicated: true
// 				,pauseOnHover: true
// 			});
// 			$(".btnMPause").toggle(function(){
// 				$(this).addClass('play');
// 				$(this).attr('title','play');				
// 				$mq.marquee('pause');
// 			},function(){
// 				$(this).removeClass('play');
// 				$mq.marquee('resume');
// 				$(this).attr('title','pause');
// 				return false;
// 			});
// 		};

// 		// News & Events Slider
// 		if ($(".eventsslider").length) {
// 			var eventsslider = new Swiper('.eventsslider .swiper-container', {
// 				loop: false,
// 				speed:800,
// 				slidesPerView:3,
// 				spaceBetween: 30,
// 				autoplay: {
// 					delay: 5000,
// 					disableOnInteraction: false,
// 				},
// 				pagination: {
// 					el: '.swiper-pagination',
// 					clickable: true,
// 				},
// 				navigation: {
// 					nextEl: '.eventNext',
// 					prevEl: '.eventPrev',
// 				},
// 				breakpoints: {
// 					579: {
// 						slidesPerView: 1,
// 						spaceBetween: 0
// 					},
// 					767: {
// 						slidesPerView: 2
// 					}
// 				},
// 			});

// 			$(".eventArrow .swiper-button-pause").toggle(function() {
// 				$(this).addClass('play');
// 				eventsslider.autoplay.stop();
// 			}, function() {
// 				$(this).removeClass('play');
// 				eventsslider.autoplay.start();
// 				return false;
// 			});
// 		}
// 	});


    var inputCaptcha = document.querySelector('#input-captcha_voice_response');
        var voiceList = document.querySelector('#voiceList');
        var btnSpeak = document.querySelector('#btnSpeak');
        var synth = window.speechSynthesis;
        var voices = [];


        if (btnSpeak) {
            btnSpeak.addEventListener('click', (e) => {
                e.preventDefault();
                var toSpeak = new SpeechSynthesisUtterance(inputCaptcha.value);
                var selectedVoiceName = "Microsoft David - English (United States)";
                voices.forEach((voice) => {
                    if (voice.name === selectedVoiceName) {
                        toSpeak.voice = voice;
                    }
                });
                toSpeak.pitch = 1;
                toSpeak.rate = 0.1;
                synth.speak(toSpeak);
            });
        }
      
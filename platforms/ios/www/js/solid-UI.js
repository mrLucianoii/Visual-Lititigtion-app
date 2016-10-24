/* #SOLID Designs 
	Author: Luciano S. Aldana II
	url: http://brandedsolid.com
*/


jQuery(document).ready(function ($) {
 
    
    function insertVideoMov() {
        
        var $vidInsert = $("#vid-insert"),
            $vidTag = $("<video id='graphVid'></video>"),
            $source = $("<source src='img/EXTENDED.mp4' type='video/mp4'>");
        
            
            $vidTag.append($source);
            $vidInsert.append($vidTag);
            
            console.log("insert Video Mov Success");        
    }

    
    $("#go-hidden").click(function ( e ){
        e.preventDefault();
        $("#go-hidden").css("display", "none");
        $("#go-live").css("display", "block");
    });
    
    
    $("#go-live").click(function ( e ){
        e.preventDefault();
        $("#go-live").css("display", "none");     
        $("#go-hidden").css("display", "block");

    });
    
     $(".glyphicon-play").click(function ( e ){
        e.preventDefault();
        $(".glyphicon-play").css("display", "none");             
         $(".glyphicon-pause").css("display", "inline-block");

       $('#graphVid')[0].play();
    });
    
    
    $(".glyphicon-pause").click(function ( e ){
        e.preventDefault();
        $(".glyphicon-play").css("display", "inline-block");             
        $(".glyphicon-pause").css("display", "none");       
    
        $('#graphVid')[0].pause();
    });
    $(".glyphicon-repeat").click(function ( e ){
        e.preventDefault();
        $("#graphVid").get(0).currentTime = 0;
        
    });
    
     $("#graphOn").click(function ( e ){
        e.preventDefault();                     
        $('#graphVid').css('display', 'none');

        $("#graphOn").css("display", "none");
        $("#graphOff").css("display", "block");
      
    });
    
    $("#graphOff").click(function ( e ){
        e.preventDefault();
        $('#graphVid').css('display', 'block');

        
        $("#graphOff").css("display", "none");     
        $("#graphOn").css("display", "block");
    });
    
    $("button a#cate1").on('click', function (e) {
        e.preventDefault();
        $(".cat1").toggleClass('cateOn');
    });
    
    
    $("button a#cate2").click( function (e) {
        e.preventDefault();
        $(".cat2").toggleClass('cateOn');
        
    
    });
    $("button a#cate3").click( function (e) {
        e.preventDefault();
        $(".cat3").toggleClass('cateOn');
        
    
    }); 
    $("button a#cate4").click( function (e) {
        e.preventDefault();
        $(".cat4").toggleClass('cateOn');
        
    
    });
    $("button a#cate5").click( function (e) {
        e.preventDefault();
        $(".cat5").toggleClass('cateOn');
        
    
    });
    $("button a#cate6").click( function (e) {
        e.preventDefault();
        $(".cat6").toggleClass('cateOn');
        
    
    }); 
    $("button a#cate7").click( function (e) {
        e.preventDefault();
        $(".cat7").toggleClass('cateOn');
        
    
    }); 
   
    $("a#cateShow").click( function (e) {
        e.preventDefault();        
        for (var i = 0; i < 8; i++) {
            
            var classElm = $(".cat"+i+"");

            if (!classElm.hasClass('cateOn')){
                 classElm.toggleClass('cateOn');   
            }
        }
        $("button a#cateHide").css("display", "block");
        $("button a#cateShow").css("display", "none");
        
    });    

    
    
    $("a#cateHide").click( function (e) {
        e.preventDefault();     
        console.log("in before loop");
        for (var i = 0; i < 8; i++) {
                    console.log("in before loop1");

            var classElm = $(".cat"+i+"");

            if (classElm.hasClass('cateOn')){
                        console.log("in before loop2");

                 classElm.toggleClass('cateOn');   
            }
        }
        $("button a#cateShow").css("display", "block");
        $("button a#cateHide").css("display", "none");
    });    
    
 
    
    var tg1 = {};
	

	
                
		
		// jQuery widget implementation
		// with some basic options
		
		tg1 = $("#placement").timeline({
			 eventClick: function($ev, ev) {
                 var idMe = $ev[0].id;
                 var idMeNum = idMe.split('').reverse(),
                     doubleNum = idMeNum[1]+''+idMeNum[0];
                 
                //$('.modal-solid'+idMeNum[0]+' a#help').trigger('click'); 
                  if (idMeNum[1] == 1 ) {
                    
                      for (var i=0; i < 17; i++){
                         var modalSolid = $('.modal-solid'+''+i+'');
                          if ( modalSolid.hasClass('on') && i != doubleNum ) {
                                
                                modalSolid.removeClass('on');
                          }
                      }
                      $('.modal-solid'+idMeNum[1]+''+idMeNum[0]+'').toggleClass('on');   

                  }else {
                       for (var i=0; i < 17; i++){
                         var modalSolid = $('.modal-solid'+''+i+'');
                          if ( modalSolid.hasClass('on') && i != idMeNum[0] ) {
                                
                                modalSolid.removeClass('on');
                          }
                      }
                      $('.modal-solid'+idMeNum[0]+'').toggleClass('on');   
                  }
                 
                 //USE Rick00 id to color button on click
                 
                 
                 return false;
					},
				"min_zoom":1, 
				"max_zoom":47.4, 
				"image_lane_height":50,
				"icon_folder":"solid-icons/",
				"data_source":"json/rickard.json",
				"constrain_to_data": true,
                "mousewheel": "none",
                "minimum_timeline_bottom": 1 
		});
		
		tg_actor = tg1.data("timeline");
        
        var tg_instance = tg1.data("timeline");

    
        // You'll use tg_actor as the key to access 
		// public API methods like "goTo", etc.


      $("span.glyphicon-plus-sign").click(function() {

         var seenArr = [];

        for (var i = 0; i < 8; i++) {
          var classElm = $(".cat"+i+""),
              classStr = ".cat"+i+"";
                
            if (classElm.hasClass('cateOn')){
                seenArr.push(classStr);
            }
        }    
        tg_instance.zoom(-2);
          
          for (var x=0; x < seenArr.length; x++) {
              $(""+seenArr[x]+"").toggleClass('cateOn');
          }
            $('#graphVid').css('display', 'none');
            $("#graphOn").css("display", "none");
            $("#graphOff").css("display", "none");

      });
        
     $("span.glyphicon-minus-sign").click(function() {
        var seenArr = [];

        for (var i = 0; i < 4; i++) {
          var classElm = $(".cat"+i+""),
              classStr = ".cat"+i+"";
                
            if (classElm.hasClass('cateOn')){
                seenArr.push(classStr);
            }
            $('#graphVid').css('display', 'none');
            $("#graphOn").css("display", "none");
            $("#graphOff").css("display", "none");

        }    
        tg_instance.zoom(2);
         
         
                var scope = tg_instance.getScope();
                console.log(scope);
                console.log(scope.spp);
         if (scope.spp != 2102400){
          for (var x=0; x < seenArr.length; x++) {
                console.log(seenArr[x]);
              $(""+seenArr[x]+"").toggleClass('cateOn');
          }    
         }
         
         
               
         });	
    
        $("#start").click(function() {
               var date = "1980-12-14";
               var zoom = 47;          
               var seenArr = [];

        for (var i = 0; i < 8; i++) {
          var classElm = $(".cat"+i+""),
              classStr = ".cat"+i+"";
                
            if (classElm.hasClass('cateOn')){
                seenArr.push(classStr);
            }
        }    
            tg_instance.goTo(date, zoom);
           var scope = tg_instance.getScope();
                console.log(scope);
         
          for (var x=0; x < seenArr.length; x++) {
            $(""+seenArr[x]+"").toggleClass('cateOn');
          }
        if ( $("#graphOff").css("display", "none") ) {
            $("#graphOff").css("display", "block");
            console.log("conditional graphy button true");
        }
        });

     $("#sp1").click(function() {
               var date = "1984-12-14";
               var zoom = 33;
            
               var seenArr = [];

            if (!$(".cat2").hasClass('cateOn')){
                $("a#cate2").trigger('click');
            }
         
        for (var i = 0; i < 8; i++) {
          var classElm = $(".cat"+i+""),
              classStr = ".cat"+i+"";
                
            if (classElm.hasClass('cateOn')){
                seenArr.push(classStr);
            }
        }    
               tg_instance.goTo(date,zoom);
          
          for (var x=0; x < seenArr.length; x++) {
              $(""+seenArr[x]+"").toggleClass('cateOn');
          }
            
        });
    
     $("#sp2").click(function() {
               var date = "2010-07-01";
               var zoom = 47;
            
               var seenArr = [];

            if (!$(".cat5").hasClass('cateOn')){
                $("a#cate5").trigger('click');
            }

         for (var i = 0; i < 8; i++) {
          var classElm = $(".cat"+i+""),
              classStr = ".cat"+i+"";
                
            if (classElm.hasClass('cateOn')){
                seenArr.push(classStr);
            }
        }    
               tg_instance.goTo(date,zoom);
          
          for (var x=0; x < seenArr.length; x++) {
              $(""+seenArr[x]+"").toggleClass('cateOn');
          }
            
        });
    
    
    //   $('#jshist-www1').modal('show'); */

	var $expander = $(".mag-glass"),
		$navWrap = $("#sidebar-wrapper"),
		$contWrap = $("#content-wrapper"),
		$navCl = $("#close"),
		$contWrap = $("#content-wrapper"),
	    $mainSec = $("main section");
		
   
    $navCl.click(function(e) {
       
        e.preventDefault();
        $navWrap.css("margin-right", "-250px");
		
    });
		
    $expander.click(function(e) {
		
				
 		e.preventDefault();
        $navWrap.css("margin-right", "250px");
		
     });
	
    
    $expander.click(function(e) {
        e.preventDefault();
        $contWrap.css('margin-right', '250px');
    });
    
    insertVideoMov();
    
});
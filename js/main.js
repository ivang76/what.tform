//
// What.digital typeform style js project
//

var scrollspeed=400;
var disable_opacity=0.2;
var num_elements_to_scroll=0;
var position=0;
var idOfnextBtn="nextBtn";
var idOfprevBTn="prevBtn";
var itemsClassName="jumbotron";
var mandataryClassName="mandatory";

$( document ).ready(function() {

    $( "#formexample" ).click(function(event) {
        event.preventDefault();
        if ($('#inputAnswer').val()!="") {
            $('.'+itemsClassName).eq( position ).removeClass(mandataryClassName);
            $('.'+itemsClassName).show();
            checkRequired();
        }

    });    
    
    whatform_plugin("jumbotron","mandatory","nextBtn", "prevBtn");
    
});


//***********************************************************************************************
//-----------------------------------------------------------------------------------------------
function whatform_plugin(items_class_identifier, mandatary_class, nextbtn_id, previousbtn_id) {
    itemsClassName=items_class_identifier;
    mandataryClassName=mandatary_class;
    
    num_elements_to_scroll=$('.'+itemsClassName).size();
    
    $('#'+nextbtn_id).click(scroll);
    $('#'+previousbtn_id).click(scroll);    
    
    setDefaultState();
    checkRequired();    
}


//-------------------------------------------------------------------------------------
function setDefaultState() {
    $('.'+itemsClassName+':not(:first)').css("opacity",disable_opacity);    
}

//-------------------------------------------------------------------------------------
//if a step/element/question is mandatory/required all the following are hidden until some
//control or events won't be verified
function checkRequired() {
    var blockElements=false;
    $('.'+itemsClassName).each(function( index ) {  
        if ( $(this).hasClass(mandataryClassName) ) blockElements=true;
        else if (blockElements) $(this).hide();
    });
}

//-------------------------------------------------------------------------------------
//event handled during the scroll of the page (and then the target elements as well)
//caught both for manual scrolling (mousewheel, touchpad, scrollbar) that for click on next/prev btns
$(window).scroll(function() {

    var scrollTop = $(window).scrollTop();
    var cc=0;
    
    if (scrollTop<=100) {  //first element area
        $('.'+itemsClassName+':first').css("opacity","1");   
        $('.'+itemsClassName+':not(:first)').css("opacity",disable_opacity);   
        position=0;
    }
    else {  //all the other cases, let's loop on them
        $('.'+itemsClassName).each(function( index ) {
            divOffset = $(this).offset().top;
            posy_top = (divOffset - scrollTop);
            posy_bottom = posy_top+$(this).height();        

            if ( posy_top<=$(window).height() / 2 && posy_bottom>=$(window).height() / 2 ) {
                position=cc;
                $('.'+itemsClassName).css("opacity",disable_opacity);
                $(this).css("opacity","1");
            }
            cc++;
        });
    }

});

  
//-------------------------------------------------------------------------------------
//function called by the next/prev btn to jump beetween steps/questions
function scroll(event) {
    if (this.id==idOfnextBtn) {
        if (position==num_elements_to_scroll-1 || !$('.'+itemsClassName).eq( position+1 ).is(":visible")  ) return;
        else position++;
    }
    
    if (this.id==idOfprevBTn) {
        if (position==0) return;
        else position--;
    }
    
    var offset=0;
    var div_height=0;
    var doc_height=$(window).height();
    
    var cc=0;
    
    $('.'+itemsClassName).each(function( index ) {
        div_height=$(this).height();
        
        if (div_height>doc_height) {offset=200; } 
        else offset=(doc_height-div_height)/2;
        console.log(div_height+"  "+doc_height+"   "+offset);        
        
        if (cc==position) {
            $('html, body').animate({
                scrollTop: ($(this).offset().top)-offset+50  //50 is the header of the fixed bottom menu...
            }, scrollspeed);
        }
        cc++;
    });
    
}
    

    
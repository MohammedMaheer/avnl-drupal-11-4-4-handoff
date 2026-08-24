jQuery(function($){
    $.fn.burstCache = function()
    {
        //var basePath = $('#basepath').val();
        if (!navigator.onLine) 
        {
             document.body.innerHTML = 'Loading...';
            //window.location = basePath+'/member';
        }
    };
    
    $(this).burstCache();
});


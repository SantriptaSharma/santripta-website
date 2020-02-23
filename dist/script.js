$(document).ready(function(){
    $('a').on('click', function(event){
        
        if(this.hash != "")
        {
            event.preventDefault();

            var hash = this.hash;

            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $(hash).offset().top
                }, 400, function(){
                    window.location.hash = hash;
                });
        }
    });
});
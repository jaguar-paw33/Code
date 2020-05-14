$('.toggle_friend').each(function(){
    $(this).click(function(e){
        e.preventDefault();
        let self = this;
        $.ajax({
            type:'get',
            url:$(self).prop('href'),
            success: function(data){
                $('button', self).text(data.data.text);
                return;
            },error:function(err){
                console.log('Error', err);
                return;
            }
        })
        
    })
})

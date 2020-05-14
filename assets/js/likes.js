class toggleLike{
    constructor(likeButton){
        this.likeButton = likeButton;

        this.toggleLike();
    }

    toggleLike(){
        this.likeButton.click(function(e){
            e.preventDefault();
            let self =this;
            $.ajax({
                type:'get',
                url:$(this).prop('href'),
                success:function(data){                 
                    let count=parseInt($(self).attr('data-likes'));        
                    if(data.data.deleted)
                    {
                        count--;
                    }else{
                        count++;
                    }
                    $(self).attr('data-likes',count);
                    $(self).text(count);
                    return;
                },error:function(err){
                    console.log('Error in Like', err);
                    return;
                }
            })

        })
    }
}
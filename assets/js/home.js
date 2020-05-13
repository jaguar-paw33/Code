{
    function createPost(){
        let new_post_form = $('#new-post-form');
        
        
        new_post_form.submit(function(e){
            e.preventDefault();

            let newPost = function(post){
                return $(`
                        <li id='post-${post._id}'>
                        
                        <p>
                        
                            <a class='delete-post-button' href="/posts/destroy/${post._id}">X</a>
                               <small> ${post.content} </small>
                        </p>
                        <p>${post.user.name}</p>
                    
                        <p><a data-likes ='0' href="/likes/toggle?id=${post._id}&type=Post">0</a></p>
                    
                        <div>
                    
                            <form action="/comments/create" method="POST">
                                <input type="text" name='content' placeholder="Type Here to Comment" required>
                                <input type="hidden" name='post_id' value='${post._id}'>
                                <input type="submit" value='Comment'>
                            </form>
                            
                    
                            <h4><em> Comments - </em></h4>
                                <ul>
                                
                                </ul>
                        </div>
                    </li>
                `)
            }

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:new_post_form.serialize(),
                success:function(data){
                    
                    let posts_list = $('#posts-list');
                    post = newPost(data.data.post)
                    posts_list.prepend(post);
                    let delete_button = $('.delete-post-button', post);
                    deletePost(delete_button);
                    return;
                },error:function(err){
                    console.log('Error', err);
                    return ;
                }
            })




            
        })
    }
   
    function deletePost(delete_button){
        
        delete_button.click(function(e){
            let self=this;
            e.preventDefault();
            let deleteLink = $(this).prop('href');
             $.ajax({
                 type:'get',
                 url:deleteLink,
                 success:function(data){
                    let post = $(`#post-${data.data.post_id}`);
                    post.remove();
                    return;
                 },error: function(err){
                    console.log('Error', err);
                    return;
                 }
             })
            
           
        })
        return;
    }

    function convertToAjax(){
        $('#posts-list li').each(function(){
            let deleteButton = $('.delete-post-button', $(this));
            deletePost(deleteButton);
            return;
            
        })
    }
    convertToAjax();
    createPost();

}
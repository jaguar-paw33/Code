const queue = require('../config/kue');
const newCommentMailer = require('../mailers/comments_mailer');

queue.process('emails',(job, done)=>{
    newCommentMailer.newComment(job.data);
    done();
})

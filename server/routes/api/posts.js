const Posts = require('../../models/forums/Post');
const User = require('../../models/User');


module.exports = (app) => {
    // API to add a Post to the database
    // author title and description are required to be sent in request body
    // response returns id of the post, which can be added to the frontend as an id to the posts div or something similar
    // post_id needs to be sent back when we need to add a comment to the post
    app.post('/api/posts/add', function (req, res) {
        // check if valid author is being sent
        // make sure author is not blank
        var author = req.body.author;
        if (!author) {
            console.log('Error Author cannot be blank.')
            return res.status(400).send({
                success: false,
                message: 'Error Author cannot be blank.'
            });
        }
        // make sure author(user) exists
        User.find({
            usn: author
        }, (err, previousUsers) => {
            if (err) {
                console.log('Error Server find error')
                return res.status(500).send({
                    success: false,
                    message: 'Error Server find error'
                });
            } else if (previousUsers.length == 0) {
                console.log('Error Account does not exist.')
                return res.status(409).send({
                    success: false,
                    message: 'Error Account does not exist.'
                });
            }
            // make sure title is not blank
            var title = req.body.title;
            if (!title) {
                console.log('Error Title cannot be blank.')
                return res.status(400).send({
                    success: false,
                    message: 'Error Title cannot be blank.'
                });
            }
            // make sure description is not blank
            var description = req.body.description;
            if (!description) {
                console.log('Error Description cannot be blank.')
                return res.status(400).send({
                    success: false,
                    message: 'Error Description cannot be blank.'
                });
            }
            // since all the data in the body is valid we add it to the database
            var newPost = new Posts();
            newPost.author = previousUsers[0];
            newPost.title = title;
            newPost.description = description;
            newPost.save((err, post) => {
                if (err) {
                    console.log('Error Server error. Post not added.')
                    return res.status(500).send({
                        success: false,
                        message: 'Error Server error. Post not added.',
                        error: err
                    });
                }
                console.log(newPost._id + " Post Added")
                return res.status(200).send({
                    success: true,
                    message: 'Data Posted',
                    post_id: newPost._id
                });
            });
        });
    });

    // API to add a Comment to a post in the database
    // Post ID, comment, author of comment are to be sent in request body
    app.post('/api/posts/add/comment', function (req, res) {
        // get post ID of post being commented on, from body
        post_id = req.body.post_id;
        if(!post_id) {
            console.log('Error Post ID cannot be blank.')
            return res.status(400).send({
                success: false,
                message: 'Error Post ID cannot be blank.'
            });
        }
        // get comment to be added, from body
        comment = req.body.comment;
        if(!comment) {
            console.log('Error Comment cannot be blank.')
            return res.status(400).send({
                success: false,
                message: 'Error Comment cannot be blank.'
            });
        }
        // get author of comment
        author = req.body.author;
        if(!author) {
            console.log('Error Author cannot be blank.')
            return res.status(400).send({
                success: false,
                message: 'Error Author cannot be blank.'
            });
        }
        // check if author exists/is a valid user
        User.find({
            usn: author
        }, (err, previousUsers) => {
            if (err) {
                console.log('Error Server find error')
                return res.status(500).send({
                    success: false,
                    message: 'Error Server find error'
                });
            } else if (previousUsers.length == 0) {
                console.log('Error Account does not exist.')
                return res.status(409).send({
                    success: false,
                    message: 'Error Account does not exist.'
                });
            }
            else {
                author = previousUsers[0];
                // check if Post exists and is not deleted, then update post
                commentObj = {author:author,comment:comment};
                Posts.findOneAndUpdate({
                    _id : post_id,
                    isDeleted : false
                },{$push : {comments : commentObj}}, function (err,prevPosts) {
                    if (err) {
                        console.log('Error Server find error')
                        return res.status(500).send({
                            success: false,
                            message: 'Error Server find error',
                            error: err 
                        });
                    } else if (prevPosts.length == 0) {
                        console.log('Error Post not found OR Post Deleted')
                        return res.status(404).send({
                            success: false,
                            message: 'Error Post not found OR Post Deleted'
                        });
                    } else {
                        console.log('Comment successfully added')
                        return res.status(200).send({
                            success: true,
                            message: 'Comment successfully added' 
                        });
                    }
                });
            }
        });
    });
}
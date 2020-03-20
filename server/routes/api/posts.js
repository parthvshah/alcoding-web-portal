const Posts = require('../../models/forums/Post');


module.exports = (app) => {

    // API to add a Post to the database
    // author title and description are required to be sent in request body  
    app.post('/api/posts/add', function (req, res) {
        // check if valid author is being sent
        // make sure author is not blank
        var author = req.body.author;
        if (!author) {
            return res.status(400).send({
                success: false,
                message: 'Error: Author cannot be blank.'
            });
        }
        // make sure author(user) exists
        User.find({
            usn: author
        }, (err, previousUsers) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error: Server find error'
                });
            } else if (previousUsers.length == 0) {
                return res.status(409).send({
                    success: false,
                    message: 'Error: Account does not exist.'
                });
            }
            // make sure title is not blank
            var title = req.body.title;
            if (!title) {
                return res.status(400).send({
                    success: false,
                    message: 'Error: Title cannot be blank.'
                });
            }
            // make sure description is not blank
            var description = req.body.description;
            if (!description) {
                return res.status(400).send({
                    success: false,
                    message: 'Error: Description cannot be blank.'
                });
            }
            // since all the data in the body is valid we add it to the database
            var newPost = new Posts();
            newPost.author = author;
            newPost.title = title;
            newPost.description = description;
            newPost.save((err, post) => {
                if (err) {
                    return res.status(500).send({
                        success: false,
                        message: 'Error: Server error. Post not added.'
                    });
                }
                console.log(newPost._id + "Post Added")
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
    app.post('/api/posts/add', function (req, res) {
        // get post ID of post being commented on
        post_id = req.body.post_id;
        if(!post_id) {
            return res.status(400).send({
                success: false,
                message: 'Error: Post ID cannot be blank.'
            });
        }
        // check if Post exists and is not deleted
        Posts.find({
            _id : post_id,
            isDeleted : false
        }, (err,prevPosts) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error: Server find error'
                });
            } else if (prevPosts.length == 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Error: Post not found OR Post Deleted'
                });
            }
        // otherwise add the comment to list of comments for this post
        // TO DO
        });
    });
}
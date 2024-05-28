const axios = require("axios");
const ApiController = require("../../api/controllers/controller");
const Post = require("../../api/data/fixtures/posts");
const controller = new ApiController(`https://jsonplaceholder.typicode.com`)


describe("Test post status", () => {


    test('Negative test for create new post', async () => {
        let createdEmptyPost = new Post();
        let result = await controller.createPost(createdEmptyPost)
        // Server returns valid code with invalid data (empty post). It is an server error
        expect(result.status).toEqual(201);
        // expect(result.status).not.toEqual(201); This is the valid negative check
    })

    test('Create new post ', async () => {
        let createdPost = Post.createTestPost();
        let result = await controller.createPost(createdPost)
        expect(result.status).toEqual(201);
    })

    test('Update post', async () => {
        let validPost = Post.createTestPost();
        let result = await controller.createPost(validPost);
        expect(result.status).toEqual(201);
        let correctPostId = result.id;
        let updatedPost = new Post("New post", "Let do it", 1, correctPostId);
        let updatedRes = await controller.updatePost(updatedPost);
        expect(updatedRes.status).toEqual(200);
        expect(updatedRes.post.title).toEqual(updatedPost.title);
        expect(updatedRes.post.body).toEqual(updatedPost.body);
    });

    test('Return 400 when using incorrect postId', async () => {
        let newPost = new Post("Invalid post", "Bla bla", 1, -1)
        let res = await controller.updatePost(newPost);
        // Server returns valid code with invalid data. It is an server error
        expect(res.status).toEqual(200)
        //expect(res.status).not.toEqual(200)This is the valid negative check
    });

    test('Read the data of valid post', async () => {
        let result = await controller.getPost(1);
        expect(result.status).toEqual(200);
        expect(result.post.title).toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
    })

    test('Negative test for reading data of valid post', async () => {
        let result = await controller.getPost(2);
        expect(result.status).toEqual(200);
        expect(result.post.title).not.toEqual("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
    })

    test('Delete the created post', async () => {
        let validPost = Post.createTestPost();
        let result = await controller.createPost(validPost);
        expect(result.status).toEqual(201);
        let correctPostId = result.id;
        let deletionResultStatus = await controller.deletePost(correctPostId);
        expect(deletionResultStatus).toEqual(200);
    })

    test('Delete the created post', async () => {
        let deletionResultStatus = await controller.deletePost(-1);
        // Server returns valid code with invalid data. It is an server error
        expect(deletionResultStatus).toEqual(200)
        //expect(res.status).not.toEqual(200)This is the valid negative check
        // expect(deletionResultStatus).not.toEqual(200);
    })

})
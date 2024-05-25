const axios = require("axios");
const ApiController = require("../../api/controllers/controller");
const envTest = require("../../envTest.json");
const Post = require("../../api/data/fixtures/posts");
const controller = new ApiController(`https://jsonplaceholder.typicode.com`)


describe("Test post status", () => {


    test('Negative test for create new post', async () => {
        let createdEmptyPost = new Post();
        let id = await controller.createPost(createdEmptyPost)
        expect(id != undefined).toBe(true);
    })

    test('create new post ', async () => {
        let createdPost = new Post();
        let id = await controller.createPost(createdPost)
        expect(id == undefined).toBe(true);
    })
})
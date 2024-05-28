const axios = require('axios');
const Post = require('../data/fixtures/posts.js');
const { contentHeader } = require('../data/headers/headers');

module.exports = class ApiController {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async createPost(post) {

        let postData = {}

        try {
            if (post.title != undefined) {
                postData["title"] = post.title;
            }

            if (post.body != undefined) {
                postData["body"] = post.body;
            }
        } catch {

        }

        const response = await axios.post(`${this.baseUrl}/posts`, postData, JSON.stringify(contentHeader),);
        const id = response.data.id;
        return {
            status: response.status,
            data: response.data,
            id: id
        };


    }

    async updatePost(post) {
        const url = `${this.baseUrl}/posts/${post.id}`;
        const response = await axios.patch(url, post, contentHeader, { validateStatus: false })
        const data = response.data;
        const newPost = new Post(data.title, data.body, data.userId, data.id);
        return {
            status: response.status,
            data: response.data,
            post: newPost
        };

    }

    async deletePost(postId) {
        const url = `${this.baseUrl}/posts/${postId}`;
        const response = await axios.delete(url, contentHeader, { validateStatus: false });
        return response.status;
    }

    async getPost(postId) {
        const url = `${this.baseUrl}/posts/${postId}`;
        const response = await axios.get(url, { validateStatus: false });
        const data = response.data;
        const newPost = new Post(data.title, data.body, data.userId, data.id);
        return {
            status: response.status,
            data: response.data,
            post: newPost
        };
    }
}


const ApiController = require("./controller.js");

let controller = new ApiController("https://jsonplaceholder.typicode.com");

let c = controller.createPost().then((id) => {
    //     let newPost = new Post("hello", "JS", 1, id);
    //     let r = controller.updatePost(newPost).then((post) => {

    //         let x = controller.getPost(post.id).then((readPost) => {
    //             console.log(readPost);
    //             controller.deletePost(post.id).then((statusCode) => {
    //                 console.log(statusCode)
    //             })
    //         })
    //     })
})


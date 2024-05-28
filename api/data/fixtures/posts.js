
module.exports = class Post {
    constructor(title, body, userId, id) {
        this.id = id
        this.title = title;
        this.body = body;
        this.userId = userId;
    }

    static createTestPost() {
        const post = new Post("Test post", "Vasia", 1);
        return post;

    }
}


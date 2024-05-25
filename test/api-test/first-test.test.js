const axios = require("axios")

test("Get all books", async () => {
    const response = await axios.get("https://demoqa.com/bookstore/v1/books", {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    expect(response.status).toEqual(200);
})

// test("User can login successfully", async () => {
//     var response = await axios.post(`https://dmonye.roadtocareer.net/user/login`,
//         body,
//         {
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         })
//     console.log(response.data)
//     token = response.data.token;
//     expect(response.data.message).toContain("Login successfully")
// })
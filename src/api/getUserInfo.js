import axios from "axios";

function getUserinfo(debuger = false) {
    if (debuger) {
        const result = {
            'friendLst': [
                {
                    'name': "Alice",
                    'avatar': "https://space.floxcat.work/images/pic.webp",
                    'userId': 1

                },
                {
                    'name': "Bob",
                    'avatar': "https://space.floxcat.work/images/pic.webp",
                    'userId': 2

                },
                {
                    'name': "玛嗯纳",

                    'userId': 3

                },
                {
                    'name': "TestUser",

                    'userId': 4

                }
            ],
            'userId': 0,
            'avatar': 'https://space.floxcat.work/images/pic.webp',
            'name': "usagi"

        }
        return result
    } else{
        //to do 
    }
}


export default getUserinfo
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
                    'name': "吉伊",

                    'userId': 2

                },
                {
                    'name': "哈奇",

                    'userId': 3

                },
                {
                    'name': "Team",

                    'userId': 4

                }
            ],
            'userId': 0,
            'avatar': 'https://space.floxcat.work/images/pic.webp',
            'name': "usagi"

        }
        return result
    } else {
        //to do 
    }
}


export default getUserinfo
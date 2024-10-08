import axios from "axios";

export function getMsglist(userID, debuger = false) {
    if (debuger) {
        switch (userID) {
            case 1:
                return [
                    {
                        type: 'text',
                        message: 'This is a history text info',
                        time: '07:21 AM',
                        isSelf: false,
                        userId: '1'

                    }

                ];
            case 2:
                return [
                    {
                        type: 'text',
                        message: 'This is a history text info',
                        time: '07:22 AM',
                        isSelf: false,
                        userId: '2'

                    },
                    {
                        type: 'image',
                        message: 'https://space.floxcat.work/2022/08/25/%E6%9C%88%E4%BA%AE%E8%BF%98%E4%BC%9A%E5%86%8D%E6%9D%A5%E5%90%97/bg.webp',
                        time: '07:21 AM',
                        isSelf: false,
                        userId: '2'

                    }
                ]

            case 3:
                return [
                    {
                        type: 'text',
                        message: 'This is a history text info',
                        time: '07:23 AM',
                        isSelf: false,
                        userId: '3'
                    }
                ]
            case 4:
                return [
                    {
                        type: 'text',
                        message: 'This is a group',
                        time: '07:23 AM',
                        isSelf: false,
                        userId: '3'
                    },
                    {
                        type: 'text',
                        message: 'This is a group',
                        time: '07:23 AM',
                        isSelf: false,
                        userId: '2'
                    }
                ]
        }
    } else {
        //to do 
    }
}

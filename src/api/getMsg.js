import axios from "axios";

export function getMsglist(userID,debuger = false) {
    if (debuger) {
        switch (userID){
            case 1:
                return [
                    {
                        type:'text',
                        message: 'This is a history text info',
                        time: '07:21 AM',
                        isSelf: false,
                        
                    }

                ];
            case 2:
                return [
                    {
                    type:'text',
                    message: 'This is a history text info',
                    time: '07:22 AM',
                    isSelf: false,
                    
                    }
                ]

            case 3:
                return [
                    {
                    type:'text',
                    message: 'This is a history text info',
                    time: '07:23 AM',
                    isSelf: false,
                    
                    }
                ]
                case 4:
                    return [
                        {
                        type:'text',
                        message: 'This is a history text info',
                        time: '07:23 AM',
                        isSelf: false,
                        
                        }
                    ]
        }
    } else{
        //to do 
    }
}

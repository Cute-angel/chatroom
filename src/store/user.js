import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    friendSelected: localStorage.getItem('friendSelected') || null,
    msgsDict: JSON.parse(localStorage.getItem('msgDict')) || null
  }),
  actions: {
    setToken(token) {
      localStorage.setItem("token", token);
      this.token = token;
      return this.t
    },

    getToken() {
      return this.token; // string
    },

    removeToken() {
      localStorage.removeItem("token");
      this.token = "";
    },

    setUserInfo(userInfo) {  // userInfo should a dict
      /*
      userinfo: dict = {
        'friendLst' : [
          {
            'name':"alice",
            'avatar':"./path/to/pic",
            'userId':1
        
          },
          {
            'name':"alice",
            'avatar':"./path/to/pic",
            'userId':1
        
          }
        ],
        'userId':10,
        'avatar':"./path/to/pic",
        'name':"usagi"
      }
      */
      const stringUserInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", stringUserInfo);
      this.userInfo = userInfo;
      return this.userInfo; //is a dict
    },

    getUserInfo() {
      return this.userInfo;

    },

    clearUserInfo() {
      localStorage.removeItem('userInfo');
      this.userInfo = null;
    },

    setFriendSelected(userId) {
      this.friendSelected = userId
      return this.friendSelected
    },

    getFriendSelected() {
      return this.friendSelected
    },

    setMsgDict(msgsDict) {  // userInfo should a dict
      /*

      The '1' '2' refer userId
      msgDict: dict = {
        '1':[
                {
            type:'text',
            message: text,
            time: getCurrentTime(),
            isSelf: true,
            avatar: selfAvatarPath,
          },
                {
          type:'text',
          message: text,
          time: getCurrentTime(),
          isSelf: true,
          avatar: selfAvatarPath,
          }
        
        ],
        '2':[{msg1},{msg2}]
      */
      const stringMsgDict = JSON.stringify(msgsDict);
      localStorage.setItem("msgDict", stringMsgDict);
      this.msgsDict = msgsDict;
      return this.msgsDict; //is a dict
    },
    getMsgsDict() {
      return this.msgsDict
    },

    removeMsgsDict() {
      this.msgsDict = null
      localStorage.removeItem('msgDict')
    },

    clearAll() {
      this.removeToken();
      this.clearUserInfo();
      this.removeMsgsDict();
      this.friendSelected = null

    }
  }
});

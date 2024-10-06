import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    userInfo : JSON.parse(localStorage.getItem("userInfo"))||null,
    friendSelected:localStorage.getItem('friendSelected')||null
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
      localStorage.setItem("userInfo",stringUserInfo);
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
    
    getFriendSelected(){
      return this.friendSelected
    },
    


    clearAll() {
        this.removeToken();
        this.clearUserInfo();
        this.friendSelected = null

    }  
  }
});

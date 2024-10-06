import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    userInfo : JSON.parse(localStorage.getItem("userInfo"))||null
  }),
  actions: {
    setToken(token) {
      localStorage.setItem("token", token);
      this.token = token;
    },
    
    getToken() {
      return this.token; // string
    },

    removeToken() {
      localStorage.removeItem("token");
      this.token = "";
    },
    
    setUserInfo(userInfo) {
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
      this.userInfo = null;
    },
    clearAll() {
        this.removeToken();
        this.clearUserInfo();
    }  
  }
});

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
        messageList : localStorage.getItem("msgLst") || [] 
  }),
  actions: {
    addMsg(msg) {
      let msglst = localStorage.getItem("msgLst");
      msglst.push
    },
    

    setToken(token) {
      localStorage.setItem("token", token);
      this.token = token;
    },
    setUserInfo(userInfo) {
      localStorage.setItem("userInfo",userInfo)
      this.userInfo = userInfo;
    },
    removeToken() {
      localStorage.removeItem("token");
      this.token = "";
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

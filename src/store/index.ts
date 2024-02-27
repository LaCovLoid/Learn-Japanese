import { defineStore } from 'pinia';

export const piniaStore = defineStore('storeId', {
  state: () => {
    return {
      count: 0,
      accessToken: "6e16498ee863cec9b09d0f7b673efb3150c59241c25b43838218b70a6b6a5e7cf42d409e6ef11fd490ae30922386848bfde5811754770739cf8db6fa93c450c7",
    }
  },
  actions: {
    setCount(value: number){
      this.count = value;
    },
    setAccessToken(value: string){
      this.accessToken = value;
    }
  },
  getters: {
    getCount(state){
      return state.count;
    },
    getAccessToken(state){
      return state.accessToken;
    }
  }
});
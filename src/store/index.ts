import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      accessToken: null,
    }
  },
  actions: {
    setCount(value: number){
      this.count = value;
    },
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
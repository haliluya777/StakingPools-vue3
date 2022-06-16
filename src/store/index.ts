import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

interface TransactionOptions {
  gasLimit: number,
  gasPrice: number,
  value?:string
}

export interface State {
  count: number,
  balanceOf:number,
  network:string,
  user_address:string,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      count: 0,
      balanceOf:0,
      network:'',
      user_address:'',
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
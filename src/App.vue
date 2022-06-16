<template>
  <router-view style="height: 100%" />
</template>

<script lang="ts" setup>
// import "./common/font.css";
import { defineComponent, onMounted, onUnmounted,ref } from "vue";
import { spliceAddressString, conncetWallet } from "./common";
import { ethers } from "ethers";
import { useStore } from "./store";
const store = useStore();
const { ethereum } = window as any;

const cancel = () => {
  localStorage.removeItem("wallet");
  localStorage.removeItem("user_address");
}

const isConnceted = async () => {

//  (window as any).call_provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');

  let web3Provider: any = undefined;
  if (localStorage.user_address) {
    if (localStorage.wallet == "metamask") {
      web3Provider = new ethers.providers.Web3Provider(ethereum);
      (window as any).call_provider = web3Provider;
      const accounts = await web3Provider.listAccounts();
      localStorage.user_address = accounts[0] || localStorage.user_address;
      store.state.user_address = spliceAddressString(localStorage.user_address);
      //安装了metamask 且已经断开
      if (accounts.length <= 0) cancel();
    } else {
      localStorage.removeItem("wallet");
      localStorage.removeItem("user_address");
    }

    (window as any).signer = web3Provider.getSigner();
    const ETH_balance = (await web3Provider.getBalance(localStorage.user_address)).toString();

    store.state.balanceOf = Number(ETH_balance) / 10 ** 18;

    store.state.balanceOf = Number(store.state.balanceOf.toFixed(4));

    const {name} = await web3Provider.getNetwork() 
    store.state.network = name;
    console.log(store.state.network );
    

  }
  if (!localStorage.walletconnect && localStorage.wallet == 'wallcetconncet') cancel();
};

onMounted(async () => {
  // localStorage.user_address = '0xaa8De4b0103b38e536Cac709BCFB1e1580B5B282'
  // localStorage.wallet = "metamask";
  isConnceted();
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
body{
  margin: 0;
  background-color: #f0e8ea;
}
</style>

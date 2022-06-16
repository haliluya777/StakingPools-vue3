<template>
<div>
    <!-- <el-menu :default-active="activeIndex"  class="el-menu-demo"  mode="horizontal" @select="handleSelect">
      <el-menu-item index="/AFICLP/pool">Pool</el-menu-item>
      <el-menu-item index="/AFICLP/user">User</el-menu-item>
      <el-menu-item index="/AFICLP/owner">Owner</el-menu-item>
   </el-menu> -->
     <div >
    <div class="center flex header">
      <p @click="router.push('/home')">
        <img src="../assets/new_small.png" width="42" height="42" alt="" >
      </p>
      <p class="last flex" >
        <span style="width: 86px; height: 36px;padding: 0 15px;" @click="" v-if="showOwner">Owner</span>
        <span style="width: 156px; height: 36px;padding: 0 15px;" v-if="store.state.balanceOf>0">{{ store.state.balanceOf }} &nbsp{{store.state.user_address}}</span>
        <span style="width: 86px; height: 36px;padding: 0 15px;" @click="conncetWallet('metamask')" v-else>Conncet</span>
      </p>
    </div>
    <div style="height: 72px;"></div>

    <div class="center" style="text-align: center;padding-bottom: 10px;">
      <img src="../assets/new_logo.png" width="130" height="133" alt="" style="margin: 20px 0;">
    </div>

  </div>

</div>

</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted,ref } from "vue";
import {useRouter,useRoute} from 'vue-router'
import { useStore } from "../store";
import { spliceAddressString, conncetWallet } from "../common";
const router = useRouter();
const route = useRoute();
const store = useStore();


const user_address = ref<string>('')
const show_menu = ref<boolean>(false);
const showOwner = ref<boolean>(false);
const height = ref<boolean>(false);


const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) =>router.push(key);
onMounted(async () => {
  activeIndex.value = route.path;
  route.path.indexOf('user')!==-1 ?showOwner.value=true:showOwner.value=false;
});

</script>
<style>
p {
    margin: 0;
  }
  .header{
    position: fixed;
    margin: 0 auto;
    top: 0;
    right: 0;
    left: 0;
    background: #f0e8ea;
    z-index: 99;
    padding: 0 5%;
  }

  .center {
    width: 90%;
    height: 72px;
    margin: 0 auto;
  }


  li,
  ul {
    list-style: none;
  }

  i {
    font-style: normal
  }

  .center ul {
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
  }

  .center ul li {
    text-align: center;
    padding-left: 16px;
    padding-right: 16px;

  }

  .center ul li a {
    color: #aa8592;
    font-weight: 700;
    text-decoration: none;
    display: block;
    font-size: 16px;
    line-height: 16px;
  }

  .center p:first-child {
    color: #5b2639;
    font-size: 18px;
    font-weight: 700;
    height: 32px;
    line-height: 32px;
    padding-left: 2%;
    display: flex;
    align-items: center;
  }

  .center p:first-child span {
    margin-left: 12px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .last span {
    align-items: center;
    background-color: #f0e7ea;
    box-shadow: 4px 4px 8px #e2cfd5, -8px -8px 16px #f7f2f4;
    color: #d1004b;
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    font-weight: 700;
    height: 36px;
    -ms-flex-pack: center;
    justify-content: center;

    width: 100%;
    border-radius: 12px;
    outline: none;
    margin-left: 15px;
  }

  .appHeaderMenu {
    position: fixed;
    margin: 0 auto;
    top: 8.5%;
    right: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    transform: translateX(0);
    background-color: #f0e7ea;
    box-shadow: 4px 4px 8px #e2cfd5, -8px -8px 16px #f7f2f4;
    height: 40px;
    line-height: 40px;
    padding-right: 15px;
  }

  .appHeaderMenu span {
    padding: 0 10px;
    color: #aa8592;
    font-weight: 700;
    font-size: 16px;
  }

  .cur {
    color: #d1004b !important;
  }

  .main {
    box-shadow: inset 1px 1px 0 #f7f2f4;
    background: #f0e7ea;
    border: 1px solid #e2cfd5;
    border-radius: 12px;
    padding: 24px;
    width: 80%;
    height: 360px;
    margin: 0 auto;
    margin-top: 40px;
    box-sizing: border-box;
    position: relative;

  }

  .main p {
    margin: 0;
  }

  .main .title {
    display: block;
    color: #5b2639;
    font-size: 24px;
    font-weight: 700;
    padding: 10px 0;
    line-height: 24px;
    text-align: center;
  }

  .qianbao {
    box-shadow: inset 1px 1px 0 #f7f2f4;
    background: #f0e7ea;
    border: 1px solid #e2cfd5;
    border-radius: 12px;
    padding: 0 24px 24px 24px;
    width: 90%;
    height: 350px;
    margin: 0 auto;
    margin-top: 40px;
    box-sizing: border-box;
    z-index: 100;
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translateX(-50%) translateY(-50%);
  }

  .qianbao p {
    margin: 0;
  }

  .qianbao .title {
    display: block;
    color: #5b2639;
    font-size: 36px;
    font-weight: 700;
    padding: 14px 0;
    line-height: 24px;
    text-align: center;
  }

  .button {
    width: 270;
    height: 56px;
    align-items: center;
    background-color: #f0e7ea;
    box-shadow: 4px 4px 8px #e2cfd5, -8px -8px 16px #f7f2f4;
    color: #d1004b;
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    justify-content: center;
    border-radius: 12px;
    outline: none;
    margin: 0 auto !important;
    margin-top: 20px;
  }

  .thumb {
    background-color: #f0e7ea;
    font-size: 36px;
    height: 80px;
    width: 80px;
    -ms-flex-align: center;
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    box-shadow: inset 4px 4px 8px #e2cfd5, inset -6px -6px 12px #f7f2f4;
    border-radius: 40px;
    margin: 0 auto;
    margin-bottom: 16px;
    font-style: normal;
  }

</style>

<template>
  <main>
      <Header/>
    <div class="flex">
      <el-button @click="conncetWallet('metamask')" v-if="user_address.length < 20">Conncet</el-button>
      <el-button v-else>{{ store.state.balanceOf }} tBNB ✅</el-button>
      <h1></h1>
      <el-button @click="conncetWallet('metamask')" >Conncet</el-button>
    </div>

     <h2>===Allowance===</h2>
      <div  class="flex" style="margin-top:50px;margin: 0 auto; width: 30%;">
        <span>当前授权数量: {{allowance}} </span>
        <el-button @click="approve" :disabled="allowance">approve</el-button>
      </div>

    <h2>===User Staking Info===</h2>
    <div class="pool list">
      <p>
        <span>当前订单总量： {{ order.list.length }}</span>
      </p>
      <p>
        <span>累计质押： {{ userToralInfo.stakedAmount }} LP</span>
      </p>
      <p>
        <span>待领取奖励： {{ userToralInfo.rewardAmount }}</span>
        <el-button style="width: 100px;" type="success" size="large" @click="claimAll">ClaimAll</el-button>
      </p>
      <p>
        <span>累计领取奖励： {{ userToralInfo.hadRewardAmount }}</span>
        <span></span>
      </p>
    </div>
    <h2>===User Add Stake Order===</h2>
    <div class="pool list">
      <el-form :inline="true" :model="stakeInfo" class="demo-form-inline">
        <el-form-item label="质押数量 (LP)">
          <el-input v-model="stakeInfo.amount" placeholder="stake amount" />
        </el-form-item>
        <el-form-item label="质押时长 (LP)" >
          <el-select v-model="stakeInfo.days" placeholder="stake days">
            <el-option :label="`${item} hour`" :value="item"  v-for="item in days" :key="item"/>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" @click="stake">Stake</el-button>
        </el-form-item>
      </el-form>

    </div>
    <h2>===User Orders===</h2>
    <h2 class="list" style="width: 60%;margin:0 auto;" v-if="order.list.length == 0">------ null ------</h2>
    <div v-else class="pool list" v-for="item in order.list" :key="item">
      <p>订单ID： {{ item.orderId }}</p>
      <p>质押天数： {{ item.stakedDays }}</p>
      <p>年化收益： {{ item.apy }}%</p>
      <p>开始时间： {{ item.startingTime}}</p>
      <p>结束时间： {{ item.endTime  }}</p>
      <p>上次领取时间： {{ item.lastTime}}</p>
      <p>质押数量： {{ item.stakedAmount }}</p>
      <p>可领取奖励： {{ item.rewardAmount }}</p>
      <p>已领取奖励： {{ item.hadRewardAmount }}</p>
      <p>结束前每秒收益： {{ (item.rewardPerSecondToken) }}</p>
      <p>结束后每秒收益： {{ (item.rewardPerSecondTokenAfter) }}</p>
      <p class="btns">
        <el-button style="width: 100px;" type="danger" size="large" @click="withdraw(item.orderId )">unstake</el-button>
        <el-button style="width: 100px;" type="success" size="large" @click="claim(item.orderId )">claim</el-button>
      </p>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ethers, providers } from 'ethers';
import { StakingRewards ,STKLPToken} from '../contract';
import { stakingRewards_data} from '../contract-data';
import { spliceAddressString, conncetWallet ,transferToNumber} from '../common';
import  Header  from "../components/Header.vue";
import { useStore } from "../store";
const store = useStore();

const stakeInfo = reactive({
  amount: '',
  days: '',
})

const onSubmit = () => {
  console.log(stakeInfo.amount,stakeInfo.days);
   
}

const total = ref<number>(1000000);
const allowance = ref<boolean>(false);
const mintedRewards = ref<number>(0);
const remainingReward = ref<number>(0);
const balanceOfLP = ref<number>(0);
const balanceOfUser = ref<number>(0);

const counter = ref<number>(0);

let _StakingRewards:any;


const user_address: string = ref(localStorage.user_address || 'conncet');
const currentAddress = ref<string>(spliceAddressString(localStorage.user_address||'0x00000') );
const userToralInfo = reactive<any>({});

const days = reactive([30,60,90,120,150])

let order = reactive<any>({
  list:[]
});


const getUserTotalInfo = async () => {
  //userToTotalInfo getUserStakingTotalInfo  userToStakingList
  const { hadRewardAmount, rewardAmount, stakedAmount }  = await _StakingRewards.getUserStakingTotalInfo();
  
  userToralInfo.stakedAmount = stakedAmount / 10 ** 18;
  userToralInfo.rewardAmount = rewardAmount / 10 ** 8;
  userToralInfo.hadRewardAmount = hadRewardAmount / 10 ** 8;
}

const getOrderList = async () => {
  let orderList  =await _StakingRewards.getUserCurrentAllStakingOrder();

  orderList = orderList.map((item:any)=>({...item}));

  for(let item of orderList){
    // item.startingTime = await _StakingRewards.UserToBeginningStartTime(item.orderId)*1;
    // item.endTime  = item.startingTime + item.stakedDays*60;
    item.stakedAmount = item.stakedAmount/10**18;
    item.hadRewardAmount = item.hadRewardAmount/10**8;
    item.rewardAmount = item.rewardAmount/10**8;
    item.rewardPerSecondToken = item.rewardPerSecondToken/10**18;
    console.log(item.rewardPerSecondToken *1,999);
    
    item.rewardPerSecondTokenAfter = item.rewardPerSecondTokenAfter/10**18;
  }

  order.list = orderList.reverse();
}

const getItemOrder = async()=>{
  //getUserCurrentStakingItemInfo 传入id 1 .无法获取
   const res =await _StakingRewards.getUserCurrentStakingItemInfo(7);
  // const res = await StakingRewards.userToStakingList('0x1271ad9B9274A4a4258e5E58Fc1c18F390728c64',0)
  console.log(res,222);
}

const getAllowance = async()=>{
  const res = await STKLPToken().allowance(localStorage.user_address,stakingRewards_data.address);
  res*1>0? allowance.value=true:allowance.value = false;
  console.log(res*1,'当前授权数量')
}

const approve = async()=>{
  const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  const tx = await STKLPToken().approve(stakingRewards_data.address,amount)
  console.log(tx.hash);
}


const stake = async () => {
  const amount:any = Number(stakeInfo.amount)*10**8+'';
  const tx =await _StakingRewards.stake(stakeInfo.days,amount);
}


const withdraw = async(id:number)=>{
  const tx =await _StakingRewards.withdraw(id);
  console.log(tx.hash,8888);
}
const claim = async(id:number)=>{
  const tx =await _StakingRewards.claim(id);
  console.log(tx.hash,8888);
}

const claimAll = async()=>{
  const tx =await _StakingRewards.claimAll();
  console.log(tx.hash);
  
}

const getApyList = async()=>{
  const res = await _StakingRewards.getApyList();
  console.log(res);
}


onMounted(async() => {
  getAllowance();
  getOrderList();
  getUserTotalInfo();

  remainingReward.value =await _StakingRewards.getRemainingReward()/10**8;
  console.log(remainingReward.value,'kkkkkkk');
  
  // getItemOrder()
  
});


</script>
<style>
.list {
  padding: 2%;
  border: 1px solid skyblue;
  border-radius: 20px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1,
h2 {
  text-align: center;
}

.ppp {
  width: 100%;
  text-align: left;
}

.pool {
  margin: 0 auto;
  width: 60%;
}

.pool p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}
.btns{
  margin: 0 auto;
  width: 48%;
}
</style>
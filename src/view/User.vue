<template>
  <main>
    <Header />
    <p style="margin-top:80px;"></p>
    <div style="margin-top:80px;margin: 0 auto; width: 80%;">
    </div>

    <h2>===User Staking Info===</h2>
    <div class="statisticsInfoBalance">
      <p class="flex">授权数量 : {{ allowance }} {{ token }}<el-button @click="approve" :disabled="allowance">approve
        </el-button>
      </p>
      <p>
        <span>钱包余额 : {{ balanceOf }} {{ token }} </span>
      </p>
      <p>
        <span>订单总量 : {{ order.list.length }} </span>
      </p>
      <p>
        <span>累计质押 : {{ userToralInfo.stakedAmount }} {{ token }}</span>
      </p>
      <p class="flex">
        <span>待领取奖励 : {{ userToralInfo.rewardAmount }} AFIC</span>
        <el-button style="width: 70px;height: 35px;" type="success" size="large" @click="claimAll">ClaimAll</el-button>
      </p>
      <p>
        <span>累计领取 : {{ userToralInfo.hadRewardAmount }} AFIC</span>
      </p>
      <p>剩余矿量 : {{ poolRemainingReward }} AFIC</p>
    </div>
    <h2>===User Add Stake Order===</h2>
    <div class="statisticsInfoBalance">
      <el-form :inline="true" :model="stakeInfo" class="demo-form-inline">

        <el-form-item label=" 质押数量 (AFIC-LP) " v-if="token == 'AFICLP'">
          <el-input v-model="stakeInfo.amount" placeholder="stake amount" />
        </el-form-item>

        <el-form-item label=" 质押数量 (AFIC)" v-else>
          <el-input v-model="stakeInfo.amount" placeholder="stake amount" />
        </el-form-item>

        <el-form-item label="质押时长 (Hour)">
          <el-select v-model="stakeInfo.days" placeholder="stake hours">
            <el-option :label="`${item} 分钟`" :value="item" v-for="item in days" :key="item" />
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" @click="stake">Stake</el-button>
        </el-form-item>
      </el-form>

    </div>
    <h2>===User Orders===</h2>
    <h2 class="list" style="width: 60%;margin:0 auto;" v-if="order.list.length == 0">------ null ------</h2>
    <div v-else class="statisticsInfoBalance" v-for="item in order.list" :key="item">
      <p>订单ID： {{ item.orderId }}</p>
      <p class="flex">质押数量： {{ item.stakedAmount }} <el-button style="width: 70px;height: 35px;" type="danger"
          size="large" @click="withdraw(item.orderId)" :disabled="time<=item.endTime">unstake</el-button>
      </p>
      <p>质押时长： {{ item.stakedDays }} Hour</p>
      <p>年化收益： {{ item.apy }}%</p>
      <p>开始时间： {{ item.startingTime }}</p>
      <p>结束时间： {{ item.endTime > 0 ? item.endTime : 0 }}</p>
      <p>上次领取时间： {{ item.lastTime }}</p>
      <p class="flex">可领取奖励： {{ item.rewardAmount }} <el-button style="width: 70px;height: 35px;" type="success"
          size="large" @click="claim(item.orderId)">claim</el-button>
      </p>
      <p>已领取奖励： {{ item.hadRewardAmount }}</p>
      <p>结束前每秒收益： {{ (item.rewardPerSecondToken) }}</p>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ethers, providers } from 'ethers';
import { AFICLPStakingPool, AFICToken, AFICLPToken, AFICStakingPool } from '../contract';
import { spliceAddressString } from "../common";
import Header from "../components/Header.vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";
const store = useStore();
const route = useRoute();

const stakeInfo = reactive({
  amount: '',
  days: '',
})

const allowance = ref<boolean>(false);
const balanceOf = ref<number>(0)
const poolRemainingReward = ref<number>(0);

const userToralInfo = reactive<any>({});

// const days = reactive([1, 3, 6, 12])
const days = reactive([10, 20, 30, 40])



const time = ref<number>(0);

const token = ref<string>('AFIC');

let order = reactive<any>({
  list: []
});


const getUserTotalInfo = async () => {
  //userToTotalInfo getUserStakingTotalInfo  userToStakingList
  if (route.params.type == 'AFICLP') {
    balanceOf.value = await AFICLPToken().balanceOf(localStorage.user_address) / 10 ** 18;

    poolRemainingReward.value = await AFICLPStakingPool().getRemainingReward() / 10 ** 8;    

    const { hadRewardAmount, rewardAmount, stakedAmount } = await AFICLPStakingPool().getUserStakingTotalInfo();
    userToralInfo.stakedAmount = stakedAmount / 10 ** 18;
    userToralInfo.rewardAmount = rewardAmount / 10 ** 8;
    userToralInfo.hadRewardAmount = hadRewardAmount / 10 ** 8;

  } else {
    balanceOf.value = await AFICToken().balanceOf(localStorage.user_address) / 10 ** 8;

     poolRemainingReward.value = await AFICStakingPool().getRemainingReward() / 10 ** 8;  

    const { hadRewardAmount, rewardAmount, stakedAmount } = await AFICStakingPool().getUserStakingTotalInfo();
    userToralInfo.stakedAmount = stakedAmount / 10 ** 8;
    userToralInfo.rewardAmount = rewardAmount / 10 ** 8;
    userToralInfo.hadRewardAmount = hadRewardAmount / 10 ** 8;
  }

}

const getOrderList = async () => {
  let orderList: any;
  let decimals:number = 18;
  if (route.params.type == 'AFICLP') {
    decimals = 18;
    orderList = await AFICLPStakingPool().getUserCurrentAllStakingOrder();

    console.log('AFICLP');
    
  } else {
    decimals = 8;
    orderList = await AFICStakingPool().getUserCurrentAllStakingOrder();
    console.log(orderList);

    console.log('AFIC');
  }

  orderList = orderList.map((item: any) => ({ ...item }));

  for (let item of orderList) {
    item.endTime  = item.endTime*1;
    item.stakedAmount = item.stakedAmount / 10 ** decimals;
    item.hadRewardAmount = item.hadRewardAmount / 10 ** 8;
    item.rewardAmount = item.rewardAmount / 10 ** 8;
    item.rewardPerSecondToken = item.rewardPerSecondToken / 10 **decimals;
  }

  

  order.list = orderList.reverse();
}


const getAllowance = async () => {
  if (route.params.type == 'AFICLP') {
    const res = await AFICLPToken().allowance(localStorage.user_address, import.meta.env.VITE_AFICLP_POOL);
    res * 1 > 0 ? allowance.value = true : allowance.value = false;

  } else {
    const res = await AFICToken().allowance(localStorage.user_address, import.meta.env.VITE_AFIC_POOL);
    console.log(res,'✨ 授权书里');
    
    res * 1 > 0 ? allowance.value = true : allowance.value = false;
  }
}

const approve = async () => {
  if (route.params.type == 'AFICLP') {
    const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const tx = await AFICLPToken().approve(import.meta.env.VITE_AFICLP_POOL, amount)
    console.log(tx.hash);
  } else {
    const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const tx = await AFICToken().approve(import.meta.env.VITE_AFIC_POOL, amount)
    console.log(tx.hash);
  }
}


const stake = async () => {
  if (route.params.type == 'AFICLP') {
    const amount = ethers.utils.parseEther(stakeInfo.amount);

    console.log(amount,8888);
    
    const tx = await AFICLPStakingPool().stake(stakeInfo.days, amount);
    console.log(tx.hash, 888);
  } else {
    const amount: any = Number(stakeInfo.amount) * 10 ** 8 + '';
    const tx = await AFICStakingPool().stake(stakeInfo.days, amount);
    console.log(tx.hash, 888);
  }
}


const withdraw = async (id: number) => {
  // getItemOrder(id);
  if (route.params.type == 'AFICLP') {
    const tx = await AFICLPStakingPool().withdraw(id);
    console.log(tx.hash, 8888);
  } else {
    const tx = await AFICStakingPool().withdraw(id);
    console.log(tx.hash, 8888);
  }

}
const claim = async (id: number) => {
  if (route.params.type == 'AFICLP') {
    const tx = await AFICLPStakingPool().claim(id);
    console.log(tx.hash, 8888);
  } else {
    const tx = await AFICStakingPool().claim(id);
    console.log(tx.hash, 8888);
  }

}

const claimAll = async () => {
  if (route.params.type == 'AFICLP') {
    const tx = await AFICLPStakingPool().claimAll();
    console.log(tx.hash);
  } else {
    const tx = await AFICStakingPool().claimAll();
    console.log(tx.hash);
  }
}

const getItemOrder = async (id:number) => {
  if (route.params.type == 'AFICLP') {
    const res = await AFICLPStakingPool().getItemOrder(id);
    const res2 = await AFICLPStakingPool().getItemOrderRewards(id);
    console.log(res);
    console.log('🌍：',res2)
  } else {
    const res = await AFICStakingPool().getApyList();
    console.log(res,'');
  }
}


onMounted(async () => {
  const myDate:any = new Date();
  time.value = Date.parse(myDate)/1000;
  token.value = route.params.type + '';
  console.log(route.params.type == 'AFICLP');
  
  getAllowance();
  getOrderList();
  getUserTotalInfo();

  console.log(time.value,8888)

  // getItemOrder()

});


</script>
<style>
main {
  padding-bottom: 30px;
}

.list {
  padding: 2%;
  border: 1px solid skyblue;
  border-radius: 20px;
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

.btns {
  margin: 0 auto;
  width: 48%;
}


.statisticsInfoBalance {
  box-shadow: inset 1px 1px 0 #f7f2f4;
  background: #f0e7ea;
  border: 1px solid #e2cfd5;
  border-radius: 12px;
  padding: 24px;
  min-width: 300px;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  color: #606266;
  font-weight: bold;
}

.statisticsInfoBalance .flex {
  display: flex;
  align-items: center;
}
</style>
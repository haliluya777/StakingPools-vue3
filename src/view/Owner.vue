<template>
  <main>
      <Header/>
    <div class="flex">
         <el-button @click="conncetWallet('metamask')" v-if="user_address.length < 20">Conncet</el-button>
      <el-button v-else>{{ store.state.balanceOf }} tBNB ✅</el-button>
      <!-- <el-button @click="conncetWallet('metamask')" >Conncet</el-button> -->
    </div>
      <h3>Owner👮 : {{owner}}</h3>

      <!-- <el-button @click="setSwitch" >setSwitch</el-button> -->

    <h2>===Action Setting===</h2>
    <div class="pool list">
      <el-form :inline="true" :model="stakeInfo" class="demo-form-inline">

        <el-form-item label="转移 Owner">
            <el-input v-model="stakeInfo.owner" placeholder="address new owner" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="setOwner">SetOwner</el-button>
        </el-form-item>

         <el-form-item label="取出剩余AUC">
            <el-input v-model="stakeInfo.amount" placeholder="address new owner" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" @click="withdraw">Withdraw</el-button>
        </el-form-item>
        
        

        <el-form-item label="收 益 系 数">
          <el-input v-model="stakeInfo.amount" placeholder="stake amount" />
        </el-form-item>

        <el-form-item label="结束 收益率" >
          <el-select v-model="stakeInfo.days" placeholder="stake days">
            <el-option :label="`${item} 天`" :value="item"  v-for="item in days" :key="item"/>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" @click="">Stake</el-button>
        </el-form-item>

         <el-form-item label="停 止 挖 矿">
          <el-input v-model="stakeInfo.amount" placeholder="stake amount" />
        </el-form-item>

      </el-form>

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
  owner:'',
})

const allowance = ref<boolean>(false);
const remainingReward = ref<number>(0);
const balanceOfLP = ref<number>(0);

let _StakingRewards:any;


const user_address = ref<string>(localStorage.user_address || 'conncet');
const owner = ref<string>('null');
const userToralInfo = reactive<any>({});

const days = reactive([30,60,90,120,150])
type List ={ 
  stakedAmount?: number,
  hadRewardAmount?:number,
 }
let order = reactive<any>({
  list:[]
});


const setSwitch =async()=>{
   const tx =await _StakingRewards.setStakingSwitch(true);
  console.log(tx.hash,8888);
}

const setApy = async()=>{
  const tx = _StakingRewards.setApys([1500,2500,3500,4500,5500]);
  console.log(await tx.hash,888);
}

const getApyList = async()=>{
  const res = await _StakingRewards.getApyList();
  console.log(res);
}

const getOwner = async()=>owner.value = await _StakingRewards.owner();

const setOwner = async()=>{
    const tx= await _StakingRewards.transferOwner(stakeInfo.owner);
    console.log(tx.hash,888);
}

const withdraw = async()=>{
    const tx= await _StakingRewards.adminRewardWithdraw(stakeInfo.amount);
    console.log(tx.hash,888);
}



onMounted(async() => {
  if(localStorage.user_address){
     _StakingRewards = await StakingRewards();
  }else{
     _StakingRewards = await StakingRewards();
  }
  user_address.value = spliceAddressString(localStorage.user_address);
//   getApyList()
getOwner();
  
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
.pool  .el-form-item__content{
    flex-wrap: unset;
}
</style>
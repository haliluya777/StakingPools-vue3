<template>
  <main>
    <Header/>
    <div class="flex">
      <span></span>
      <h1>Pool {{ store.state.network }}</h1>
      <span></span>
    </div>

    <div class="pool list">
      <p>当前余额：{{balanceSTKR}} STKR</p>
      <p>预计出矿： {{ total }} STKR</p>
      <!-- <p>已经出矿： {{ mintedRewards }} STKR</p> -->
      <p>当前剩余矿量： {{ remainingReward }} STKR</p>
      <p>当前质押总量： {{ balanceOfLP }} LP</p>
      <!-- <p>当前订单数量： {{counter}}</p> -->
    </div>

  </main>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ethers, providers } from 'ethers';
import { StakingRewards ,STKRToken} from '../contract';
import { stakingRewards_data} from '../contract-data';
import { transferToNumber} from '../common';
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
const balanceSTKR = ref<number>(0);
const remainingReward = ref<number>(0);
const balanceOfLP = ref<number>(0);

const balanceOfUser = ref<number>(0);

const counter = ref<number>(0);
type List ={ 
  stakedAmount?: number,
  hadRewardAmount?:number,
 }
let order = reactive<any>({
  list:[]
});


// console.log(tx);
const getStakingRewardsData = async () => {
  balanceOfLP.value =await StakingRewards().getStakedLPBlanceOf() / 10 ** 18;
  console.log(balanceOfLP.value);
  
  // mintedRewards.value = await StakingRewards((window as any).signer).getRemainingReward() / 10 ** 18;
  // counter.value =await _StakingRewards.counter;
  remainingReward.value =await StakingRewards().getRemainingReward();
  remainingReward.value = remainingReward.value/10**8;
};

const getLPBlance = async()=>{
  balanceSTKR.value =await STKRToken().balanceOf(stakingRewards_data.address)/10**8;
  console.log(balanceSTKR.value,' <==== 当前STKR balance ');
}


const getOrderList = async()=>{
  order.list = await StakingRewards().getPoolAllList();
}


onMounted(async() => {

  // getStakingRewardsData();
  // getOrderList();
  getLPBlance();
  
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
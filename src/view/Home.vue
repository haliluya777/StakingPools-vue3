<template>
    <main>
        <Header />
        <div class="flex">
            <span></span>
            <h1>Pool {{ store.state.network }}</h1>
            <span></span>
        </div>

        <!-- AFIC-LP -->
        <div class="statisticsInfoBalance">
            <p style=" color: #5b2639;font-size: 22px;font-weight: 700;"><img width="25" height="25"
                    src="../assets/PEARL.png" alt="">&nbsp;AFLC-LP
                统计资料
            </p>
            <p style="margin-top: 20px;">当前余额：{{ AFICLP_balanceOf_pool }} AFIC</p>
            <p>当前剩余矿量： {{ AFICLPRemainingReward }} AFIC</p>
            <p style="margin-bottom: 20px;">当前质押总量： {{ AFICLPTotalStaked }} LP</p>
            <p class="button" @click="goView('AFICLP')"> Stake AFIC-LP</p>
        </div>


        <!-- AFIC -->
        <div class="statisticsInfoBalance">
            <p style=" color: #5b2639;font-size: 22px;font-weight: 700;"><img width="25" height="25"
                    src="../assets/MOON.png" alt="">&nbsp;AFLC
                统计资料
            </p>
            <p style="margin-top: 20px;">当前余额：{{ AFIC_balanceOf_pool }} AFIC</p>
            <p>当前剩余矿量： {{ AFICRemainingReward }} AFIC</p>
            <p style="margin-bottom: 20px;">当前质押总量： {{ AFICTotalStaked }} AFIC</p>
            <p class="button" @click="goView('AFIC')"> Stake AFIC</p>
        </div>


        <div class="statisticsInfoBalance">
            <p style=" color: #5b2639;font-size: 22px;font-weight: 700;"><img width="25" height="25"
                    src="../assets/PEARL.png" alt="">&nbsp;AUC-LP
                统计资料
            </p>
            <p style="margin-top: 20px;">当前余额：{{ AUC_balanceOf_pool }} AFIC</p>
            <p>当前剩余矿量： {{ AUCRemainingReward }} AFIC</p>
            <p style="margin-bottom: 20px;">当前质押总量： {{ AUCTotalStaked }} LP</p>
            <p class="button" @click="goView('AUC-LP')"> Stake AUC-LP</p>
        </div>

    </main>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { StakingRewards, AFICStakingPool, AFICLPStakingPool, AFICToken,AUCToken } from '../contract';
import Header from "../components/Header.vue";
import { useStore } from "../store";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();

const AFICLP_balanceOf_pool = ref<number>(1000000);
const AFICLPRemainingReward = ref<number | string>(0);
const AFICLPTotalStaked = ref<number | string>(0);

const AFIC_balanceOf_pool = ref<number>(1000000);
const AFICRemainingReward = ref<number | string>(0);
const AFICTotalStaked = ref<number | string>(0);

const AUC_balanceOf_pool = ref<number|string>('----');
const AUCRemainingReward = ref<number | string>('----');
const AUCTotalStaked = ref<number | string>('----');

const goView = (type: string) => {
    router.push({
        path: `/user/${type}`
    });
}


const getAFICLPData = async () => {
    AFICLP_balanceOf_pool.value = await AFICToken().balanceOf(import.meta.env.VITE_AFICLP_POOL) / 10 ** 8;
    AFICLPRemainingReward.value = await AFICLPStakingPool().getRemainingReward() / 10 ** 8;     
    AFICLPTotalStaked.value = await AFICLPStakingPool().getPoolStakedTokenBlanceOf() / 10 ** 18;
};

const getAFICData = async () => {
    AFIC_balanceOf_pool.value = await AFICToken().balanceOf(import.meta.env.VITE_AFIC_POOL) / 10 ** 8;
    AFICRemainingReward.value = await AFICStakingPool().getRemainingReward() / 10 ** 8;    
    AFICTotalStaked.value = await AFICStakingPool().getPoolStakedTokenBlanceOf() / 10 ** 8;
};

const getAUCData = async () => {
    AUC_balanceOf_pool.value = await AUCToken().balanceOf('0xaf30C96CBbdcf1F1fb457F0e7E8D7cA5F726B384') / 10 ** 8;
    AUCRemainingReward.value = await StakingRewards().getRemainingReward() / 10 ** 8;     
    AUCTotalStaked.value = await StakingRewards().getStakedLPBlanceOf() / 10 ** 8;
};


const getAFICLPList = async () => {
    const res = await AFICLPStakingPool().getPoolAllList();
    console.log(res);
}

const getAFICList = async () => {
    const res = await AFICStakingPool().getPoolAllList();
    console.log(res);
}


onMounted(() => {
    getAFICData();
    getAFICLPData();
    getAUCData();
    // getAFICList();
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

    font-weight: bold;
}

.statisticsInfoBalance .flex {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.main {
    box-shadow: inset 1px 1px 0 #f7f2f4;
    background: #f0e7ea;
    border: 1px solid #e2cfd5;
    border-radius: 12px;
    padding: 24px;
    width: 80%;
    height: 270px;
    margin: 0 auto;
    margin-top: 40px;
}

.main p:first-child {
    display: flex;
    align-items: center;
}

.myStake {
    color: #5b2639;
    font-size: 32px;
    font-weight: 700;
    padding-top: 15px;
    line-height: 32px;
}

.desc {
    color: #aa8592;
    font-size: 14px;
    font-weight: 500;
}

.anquan {
    width: 150px;
    height: 48px;
    background: url(../../../static/link.png) 0 0 no-repeat;
    background-size: contain;
    display: block;
}

.button {
    width: 270px;
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
    margin: 0 auto;
    margin-top: 30px;

}
</style>
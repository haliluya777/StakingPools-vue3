import {Contract, ethers, Signer} from 'ethers';
import {Provider} from "@ethersproject/abstract-provider";

import {
   stakingRewards_data,
   STKLP_token_data,
   STKR_token_data,
   pool_AFICLP_data,
   AFIC_token_data,
   AFICLP_token_data,
   AUC_token_data,
   pool_AFIC_data,
} from '../contract-data';

function initProviderOrSigner (){
   if(localStorage.user_address){
      const {ethereum} = window as any;
      const web3Provider = new ethers.providers.Web3Provider(ethereum);
      const web3Signer = web3Provider.getSigner();
      // console.log('Signer');
      return web3Signer;
   }else{
      console.log('provider');
      const provider = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_KOVAN_RPC);
      return provider;
      // for signer
      // const signer = await provider.getSigner("0xaa8De4b0103b38e536Cac709BCFB1e1580B5B282");
      // console.log("signer",signer);
   }
}
// init();
const StakingRewards = ():Contract=>{
   const provider:Provider|Signer = initProviderOrSigner();
   const Contract:Contract = new ethers.Contract(stakingRewards_data.address, stakingRewards_data.abi,provider);
   return Contract;
};


const AFICLPStakingPool = ():Contract=>{
   const provider:Provider|Signer = initProviderOrSigner();
   const Contract:Contract = new ethers.Contract(pool_AFICLP_data.address, pool_AFICLP_data.abi,provider);
   return Contract;
};

const AFICStakingPool = ():Contract=>{
   const provider:Provider|Signer = initProviderOrSigner();
   const Contract:Contract = new ethers.Contract(pool_AFIC_data.address, pool_AFIC_data.abi,provider);
   return Contract;
};

const STKLPToken = ():Contract=>{
    const provider:Provider|Signer = initProviderOrSigner();
    const Contract:Contract = new ethers.Contract(STKLP_token_data.address, STKLP_token_data.abi,provider );
    return Contract;
 };

 const STKRToken = ():Contract=>{
    const provider:Provider|Signer = initProviderOrSigner();
    const Contract:Contract = new ethers.Contract(STKR_token_data.address, STKR_token_data.abi,provider);
    return Contract;
 };

 const AUCToken = ():Contract=>{
   const provider:Provider|Signer = initProviderOrSigner();
   const Contract:Contract = new ethers.Contract(AUC_token_data.address, AUC_token_data.abi,provider );
   return Contract;
};

const AFICToken = ():Contract=>{
   const provider:Provider|Signer = initProviderOrSigner();
   const Contract:Contract = new ethers.Contract(AFIC_token_data.address, AFIC_token_data.abi,provider );
   return Contract;
};

const AFICLPToken = ():Contract=>{
   const provider:Provider|Signer = initProviderOrSigner();
   const Contract:Contract = new ethers.Contract(AFICLP_token_data.address, AFICLP_token_data.abi,provider );
   return Contract;
};


 

export{
    StakingRewards,
    STKLPToken,
    AFICLPToken,
    AFICToken,
    AUCToken,
    STKRToken,
    AFICLPStakingPool,
    AFICStakingPool
}


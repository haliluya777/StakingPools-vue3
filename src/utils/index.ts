
import {ethers, Signer} from "ethers";
import {Provider} from "@ethersproject/abstract-provider";

export interface TransactionOptions {
    gasLimit: number,
    gasPrice: number,
    value?:string
}

let provider: Provider;
let signer:Signer;

switch (import.meta.env.VITE_MODE) {
    case 'dev':
    case 'test':
    default:
        // contract_provider_getter = new ethers.providers.AlchemyProvider("kovan", process.env.ALCHEMY_KEY);
        // contract_provider_getter = new ethers.providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_KEY);
        // contract_provider_getter = new ethers.providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_KEY_RINKEBY);
        // contract_provider_getter = new ethers.providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_KEY_ROPSTEN);
        provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_KEY);
        // contract_provider_getter = new ethers.providers.InfuraProvider(process.env.NETWORK, process.env.INFURA_KEY);
        break;
    case 'production':
        provider = new ethers.providers.JsonRpcProvider(process.env.MAINNET_RPC);
        break;
}
// provider = new ethers.providers.InfuraProvider("kovan", "b0ad1354b637443a871c602ec795fc71");

export default provider;



(async()=>{

})()

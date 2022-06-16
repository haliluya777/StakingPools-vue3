import {providers} from 'ethers';
//链接钱包
const conncetWallet = async (wallet: string) => {
    let web3Provider: any = undefined;
    localStorage.wallet = wallet;
    if (wallet == 'metamask') {
      if ((window as any).ethereum) {
        web3Provider = new providers.Web3Provider((window as any).ethereum);
        await web3Provider.send("eth_requestAccounts", []);
      } else {
        window.open('https://metamask.io/download');
      }
    }
    (window as any).signer = web3Provider.getSigner(0);
    localStorage.user_address = await (window as any).signer.getAddress();
    const ETH_balance_of = (await web3Provider.getBalance(localStorage.user_address)).toString();
  }
//获取ERC20 资产的余额；

const getTokenBalance = async(TOKEN:any,address:string):Promise<number>=>{
  let balance = (await TOKEN((window as any).call_provider).balanceOf(address)).toString();
  balance = balance.substring(0,balance.length-8);
  balance =balance/10**10;
  console.log(balance);
  return balance;
}

//时间的转换
const changeTime = (_date: number, status: number):any => {
  //时间戳转换方法    date:时间戳数字
  var date = new Date(_date);
  var YY = date.getFullYear() + '/';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  if (status == 0) return MM + DD;
  if (status == 1) return YY + MM + DD;
  if (status == 2) return hh + mm + ss;
  if (status == 3) return YY + MM + DD + " " + hh + mm + ss;
}
//修改地址长度 0x23kjshkd02323kkk23s => 0x23kj...k23s
const spliceAddressString = (val: string): string => {
    if (val.length > 10) {
      let str1 = val.slice(0, 6);
      let str2 = val.slice(-4);
      let str3 = `${str1}...${str2}`;
      return str3;
    } else {
      return "---";
    }
}
//输入框正则
const inputFilter = (event:any):number=>{
  return event.currentTarget.value.replace(/^\D*([0-9]\d*\.?\d{0,15})?.*$/,'$1').replace(/^0+$/g,"0");
}

function transferToNumber(inputNumber:any) {
  if (isNaN(inputNumber)) {
    return inputNumber
  }
  inputNumber = '' + inputNumber
  inputNumber = parseFloat(inputNumber)
  let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
  let tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/) // 分离出小数值和指数值
  let number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]))
  return number
}
// 金额太大 或者 太小 的显示转换 1000000 =》 100万  0.00000123456 = 0.000001234
const numberFormat = (num:number|string):string => {
  let symbol = '';
  if (Number(num)<0){
     symbol = '-';
  }
  num = Math.abs(Number(num));
  let res:string =transferToNumber(num.toString());
  const index = res.indexOf(".");

  const strArr = res.split(".");
  if(Number(num)>=100000){
    res = Number(num)/10000+'';
    index!==-1?res = res.substring(0,res.indexOf(".")+3)+'万' : res = res+'万';
  }else{
    if(Number(num)>=1&&num.toString().length>6){

      res = strArr[0]+'.'+strArr[1].substring(0,6-index);

    }else if(Number(num)<1&&num.toString().length>6){

      let _index = 0;//记录有几个0; 切割 +4的位置
      for(let i =0;i<strArr[1].toString().length;i++){
        if(strArr[1][i]!=='0'){
          _index = i;
          break;
        }
      }
      res = strArr[0]+'.'+strArr[1].substring(0,5+_index);
    }
  }
  
  return symbol+res;
};

export {
  inputFilter,
  changeTime,
  spliceAddressString,
  numberFormat,
  getTokenBalance,
  conncetWallet,
  transferToNumber
}

import React,{useState} from 'react'
import Tisperse from '../images/Tisperse3.png'
import Polygon from '../images/Mumbai.png'
import Fuji from '../images/Fuji.png'
import BSC from '../images/BSC.png'
import { ethers } from 'ethers';
import { Modal, Button } from 'react-bootstrap'
import {Routes, Route, useNavigate} from 'react-router-dom';




import './Home.css'
import { ErrorFragment } from 'ethers/lib/utils'


const provider = new ethers.providers.Web3Provider(window.ethereum);
function ModalDialog() {
    const [isShow, invokeModal] = React.useState(false)
    const initModal = () => {
      return invokeModal(!false)
    }
}
  

function Login() {
    const [account,setAccount]=useState('Connect Wallet')
    const [uploadName,setUploadName]=useState('')
    const [uploadLink,setUploadLink]=useState('')
    const [approvalAddress,setApprovalAddress]=useState('')
    const [approvalName,setApprovalName]=useState('')
    const [viewName,setViewName]=useState('')
    const [viewAddress,setViewAddress]=useState('')
    const [inputAdd,setInputAdd]=useState()
    const [finalAdd,setFinalAdd]=useState([])
    const [amount,setAmount]=useState(0)
    const [value,setValue]=useState([{}])
    const [count,setCount]=useState(0)
    const [chain,SetChain]=useState('')
    const [value1,setValue1]=useState([])
    const [visible,setVisible]=useState('hidden')
    const [transactionId, setTransactionId] = useState('');
    const [accountShow,setAccountShow]=useState('')
    const [selectChain,setSelectChain]=useState('Select Chain')
    const [balance,setBalance]=useState(0)
    const [erc20,setErc20]=useState('')
    const [selectMode, setSelectMode]=useState('Select Token')
    const [ERC20Balance,setERC20Balance]=useState(0)
    const [tokenAddress,setTokenAddress]=useState('')
    const [erc20text,seterc20Text]=useState('Import Token')
    const [erc20Class,seterc20Class]=useState('button-31')
    
    const chainObj={

      "0x2370052a62F20aBb250eD8031b77108fee61e882":{
        img:Polygon,
        name:"Polygon Mumbai",
        url:"https://mumbai.polygonscan.com/tx/"
    },

    "0x96f0D615EAf63875b094E7591f0735B2315711c3":{
      img:BSC,
      name:"BSC Testnet",
      url:"https://testnet.bscscan.com/tx/"
    },

    "0x9e6ED12F3531d80671be36e319d5Bc53B106C2bF":{
      img:Fuji,
      name:"Avalanche Fuji",
      url:"https://testnet.snowtrace.io/tx/"
      
    }
    }
    const sendMaticToken = async () => {
        try {
          if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            
            const polygonMainnetRPC = 'https://rpc.ankr.com/polygon_mumbai';
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
    
            const toAddress = await signer.getAddress(); 
            const value = ethers.utils.parseEther('0'); 
    
            const transaction = {
              to: toAddress,
              value: value,
            };
    
            const transactionResponse = await signer.sendTransaction(transaction);
    
            setTransactionId(transactionResponse.hash);
          } else {
            alert('Please install MetaMask.');
          }
        } catch (error) {
          console.error('An error occurred:', error.message);
          alert(`An error occurred: ${error.message}`);
        }
      };
    const connectwalletHandler = () => {
        if (window.Ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            })
        } 
    }
    const accountChangedHandler = async (newAccount) => {
        const accounts = await newAccount.getAddress();
        setAccount(accounts)
       
    }
    async function qq(){

  }

  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0].substring(0,4)+"...."+accounts[0].substring(38,42));
        setAccountShow(accounts[0])

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balanc=await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balanc))

      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }


  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balanc=provider.getBalance(accountShow);
      setBalance(ethers.utils.formatEther(balanc))
    }
  }
 
  async function switchMumbai(){

    await SetChain('0x2370052a62F20aBb250eD8031b77108fee61e882')
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x13881",
            rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
            chainName: "Mumbai",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }]
    });
    connectWallet()
   
    
  }


  async function switchBSC(){
    
    await SetChain('0x96f0D615EAf63875b094E7591f0735B2315711c3')
    try{
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x61",
            rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
            chainName: "BSC testnet",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.bscscan.com"]
        }]
    });
    connectWallet()
  }
  catch(err){
    // alert(err)
  }
    
  }

  async function switchFuji(){

    await SetChain('0x9e6ED12F3531d80671be36e319d5Bc53B106C2bF')
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0xA869",
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            chainName: "Avalanche Testnet",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io/"]
        }]
    });
    
  
    connectWallet()
    
  }

  return (

    <div >

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >

<img style={{'width':'10em'}} src={Tisperse}></img>
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav" >
      
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          {chain!=''?<img style={{'width':'12em','height':'3em'}} src={chainObj[chain].img}/>:`${selectChain}`}
        </a>
        <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
        <img class="dropdown-item" style={{'width':'12em','height':'3em'}}src={Polygon} onClick={
        switchMumbai
       
       
    }></img>
        <img class="dropdown-item" style={{'width':'12em','height':'3em'}} src={Fuji} onClick={
            switchFuji
        }></img>
        <img class="dropdown-item" style={{'width':'12em','height':'3em'}} src={BSC}    onClick={
        switchBSC
       
        
    }></img>
        </div>

      </li>
    </ul>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav" >
      
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          {selectMode}
        </a>
        <div class="dropdown-menu bg-lightp-" aria-labelledby="navbarDropdownMenuLink">
        <div class="dropdown-item" style={{'width':'12em','height':'3em'}}onClick={()=>{
           setSelectMode('Native')
        }
      
       
       
    }>Native</div>
        <div class="dropdown-item" style={{'width':'12em','height':'3em'}}  onClick={()=>{
          setSelectMode('Other')
        }
           
        }>Other</div>
        
        </div>

      </li>
    </ul>
    </div>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
    <button type="button" class="btn btn-secondary" onClick={
        

        connectWallet}>{account}</button>

  </div>

 
</nav>



<div class="content">

    

    <br></br>
    {selectMode=='Other'?<div>&nbsp;&nbsp;<textarea placeholder="Address" rows="2" cols="47" onChange={async (e)=>{setErc20(e.target.value)
  
  
  }}></textarea>
    <br></br>
    <br></br>
    <button class={erc20Class} role="button"   onClick={async ()=>{setTokenAddress(erc20)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    const signer = provider.getSigner();
const erc20contract=new ethers.Contract(erc20,[
{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Approval",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "Transfer",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    }
  ],
  "name": "allowance",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "burn",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "burnFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "decimals",
  "outputs": [
    {
      "internalType": "uint8",
      "name": "",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "subtractedValue",
      "type": "uint256"
    }
  ],
  "name": "decreaseAllowance",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "spender",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "addedValue",
      "type": "uint256"
    }
  ],
  "name": "increaseAllowance",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "mint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "name",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "owner",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "symbol",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "transfer",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "transferFrom",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
],signer);
const accounts = await window.ethereum.request({
method: "eth_requestAccounts",
});
const erc20bal=await erc20contract.balanceOf(accounts[0])
seterc20Text('Token Imported')
seterc20Class('button-32')
console.log(ethers.utils.formatEther(erc20bal));
setERC20Balance(ethers.utils.formatEther(erc20bal));
  
  
  }
    
    
    }>{erc20text}</button>
    <br></br>
    <br></br>
    </div>:<div></div>}
  
<textarea placeholder="Input in the following format:-&#10;0x.....99 43423&#10;0x.....23 23344&#10;<address> <amount>" rows="12" cols="47" onChange={(e)=>{
        setInputAdd(e.target.value)
        let str=""
        let c=0;
        let arr=[]
        let arr2=[]
        let arr3=[]
        let arrWithoutChange=[]
        let sum=0
        for(let i=0;i<e.target.value.length-1;i++)
        {
            if(e.target.value[i]=='0' && e.target.value[i+1]=='x')
            {
                arr.push(e.target.value.substring(i,i+42))
               str=str+`"${e.target.value.substring(i,i+42)}",`
               if(e.target.value[i+42]==',' || e.target.value[i+42]==' ')
               {
                let j=0;
                let str2="";
                for(j=0;j<e.target.value.length-1;j++)
                {
                    if(!((e.target.value[i+42+j+1]>='0' && e.target.value[i+42+j+1]<='9') || e.target.value[i+42+j+1]=='.'))
                    {
                        break;
                    }
                  
                    str2=str2+e.target.value[i+42+j+1]
                    
                   
                }
                sum=sum+parseFloat(str2)
                
      
     
                console.log(str2)
                setAmount(sum)
                arr2.push(ethers.utils.parseEther(str2))
                arr3.push(str2)
                
                
               }

         
              c=c+1
            }
        }
        console.log(sum)
   
        console.log(arr2)
        setValue(arr2)
        setFinalAdd(arr)
        setValue1(arr3)
       
        setCount(c)
      }}></textarea>
   
<br></br>


    
     
<button class="button-29" role="button" onClick={async()=>{
         const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        const signer = provider.getSigner();

       
        const contractAddress = chain;
        
        const contract = new ethers.Contract(
            contractAddress,
            [
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "recipients",
                            "type": "address[]"
                        },
                        {
                            "name": "values",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "disperseEther",
                    "outputs": [],
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "name": "recipients",
                            "type": "address[]"
                        },
                        {
                            "name": "values",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "disperseToken",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "token",
                            "type": "address"
                        },
                        {
                            "name": "recipients",
                            "type": "address[]"
                        },
                        {
                            "name": "values",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "disperseTokenSimple",
                    "outputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            signer
        );

        if(selectMode=='Native' || selectMode=='Select Token')
        {
          contract.disperseEther(finalAdd,value,{ value: ethers.utils.parseEther(amount.toString()) }).then((transaction)=>{
          
            setVisible('visible')
            setTransactionId(transaction.hash)
        }).catch(async(err)=>{
              // alert(err)
          
                        })
        }
        else if(selectMode=='Other')
        { 
          
          contract.disperseToken(erc20,finalAdd,value).then((transaction)=>{
          
            setVisible('visible')
            setTransactionId(transaction.hash)
        }).catch(async(err)=>{
              // alert(err)
          
                        })
        }
       

                            
        
       }}>Tisperse</button>
    <br></br>
   
       
    {account!='Connect Wallet' && finalAdd.length>=1  ? <div style={{'color':'white'}}>
    <br></br>
    <h3 style={{'font-family': 'Bilbo Swash Caps','font-size':'40px'}}>Confirm</h3>
    <table>
    
      <tr>
    <td style={{'font-family': 'Bilbo Swash Caps','font-size':'30px'}}>address</td>
    <th>&nbsp;</th>
    <td style={{'font-family': 'Bilbo Swash Caps','font-size':'30px'}}>amount</td>
    </tr>
    
    {
    
    finalAdd.map((x,y,z)=>{
      return(
        <tr>
          <td>
      {x}
      </td>
      <td>&nbsp;</td>
      <td>{value1[y]}</td>
      </tr>
      )
    })
    
    
    }
    <br></br>
    <tr>
    <td style={{'font-family': 'Bilbo Swash Caps','font-size':'30px'}}>total</td>
    <th>&nbsp;</th>
    <td>{amount}</td>

    </tr>
    <tr>
    <td style={{'font-family': 'Bilbo Swash Caps','font-size':'30px'}}>your balance</td>
    <th>&nbsp;</th>
    {selectMode=='Native' || selectMode=='Select Token'?<td>{balance}</td>:<td>{ERC20Balance}</td>}
    </tr>
    <tr>
    <td style={{'font-family': 'Bilbo Swash Caps','font-size':'30px'}}>remaining</td>
    <th>&nbsp;</th>
    {selectMode=='Native' || selectMode=='Select Token'?<td>{balance-amount}</td>:<td>{ERC20Balance-amount}</td>}
   

    </tr>
  
    </table> 
    <table>

    <tr style={{'background-color':'green','visibility':`${visible}`}}>
    {visible!='hidden' &&  <th >
     
     Transaction Id: <a href={`${chainObj[chain].url}${transactionId}`}>{transactionId}</a>
     </th> }
   
   
    
    </tr>
    </table>

    </div>:<div></div>}


</div>


       
    </div>
  )
}

export default Login
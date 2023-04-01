import React,{useState} from 'react'
import Tisperse from '../images/Tisperse.png'
import Polygon from '../images/Polygon.png'
import Fuji from '../images/Fuji.png'
import BSC from '../images/BSC.png'
import { ethers } from 'ethers';
import { Modal, Button } from 'react-bootstrap'



import './Login.css'
import { ErrorFragment } from 'ethers/lib/utils'

// 0xf078259544740e9CA50ed6d73763e02E9D809819
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
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // if(provider)
        // {
        //     const accounts = await provider.listAccounts();
        //     console.log(accounts);
        //     if(accounts[0]!=undefined)
        //     setAccount(accounts[0])
        //     else
          
        //     console.log(provider)
        // }
       
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
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
 
  async function switchMumbai(){

    SetChain('0x2370052a62F20aBb250eD8031b77108fee61e882')
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x13881",
            rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
            chainName: "Mumbai testnet by ANKR Protocol",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }]
    });
    
  }

  async function switchBSC(){
    SetChain('0x96f0D615EAf63875b094E7591f0735B2315711c3')
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x61",
            rpcUrls: ["https://rpc.ankr.com/bsc_testnet_chapel"],
            chainName: "BSC testnet by ANKR Protocol",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.bscscan.com"]
        }]
    });
   
  }

  async function switchFuji(){

    SetChain('0x9e6ED12F3531d80671be36e319d5Bc53B106C2bF')
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0xa869",
            rpcUrls: ["https://rpc.ankr.com/avalanche_fuji"],
            chainName: "Avalanche Fuji by ANKR Protocol",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io/"]
        }]
    });
    
  }

  return (

    <div >

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >

<img style={{'width':'10em'}} src={Tisperse}></img>
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav" >
      
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select Chain
        </a>
        <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
        <img class="dropdown-item" style={{'width':'12em','height':'3em'}}src={Polygon} onClick={
        switchMumbai
       
       
    }></img>
        <img class="dropdown-item" style={{'width':'12em'}} src={Fuji} onClick={
            switchFuji
        }></img>
        <img class="dropdown-item" style={{'width':'12em','height':'2.5em'}} src={BSC}    onClick={
        switchBSC
       
        
    }></img>
        </div>

      </li>
    </ul>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button type="button" class="btn btn-secondary" onClick={
        

        connectWallet}>{account}</button>
  </div>

 
</nav>


{/* <div class="alert alert-primary" style={{'visibility':`${visible}`}} role="alert">
  A simple primary alert—check it out!
</div> */}

{/* <Button variant="success" onClick={initModal}>
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={initModal}>
            Store
          </Button>
        </Modal.Footer>
      </Modal> */}

{/* <img style={{'width':'15em'}} src={Tisperse}></img>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

{/* <button onClick={switchMumbai}>mumbai</button> */}
{/* <img class="qw" style={{'width':'12em'}}src={Polygon} onClick={
        switchMumbai
       
       
    }></img>
        <img class="qw" style={{'width':'12em'}} src={Fuji} onClick={
            switchFuji
        }></img>
        <img class="qw" style={{'width':'12em'}} src={BSC}    onClick={
        switchBSC
       
        
    }></img> */}

{/* <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <img class="dropdown-item" style={{'width':'12em'}}src={Polygon} onClick={
        switchMumbai
       
       
    }></img>
        <img class="dropdown-item" style={{'width':'12em'}} src={Fuji} onClick={
            switchFuji
        }></img>
        <img class="dropdown-item" style={{'width':'12em'}} src={BSC}    onClick={
        switchBSC
       
        
    }></img>
    
  </div>
</div> */}
        

            
    


       
        {/* <button onClick={
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            //  const accounts = await provider.listAccounts();
            //  console.log(accounts);
            //  if(accounts[0]!=undefined)
            //  setAccount(accounts[0])
            //  else
           
            //  console.log(provider)

            connectWallet
        }>{account}</button> */}

       
    <br></br>
    {/* <button onClick={()=>{
        SetChain('0x9e6ED12F3531d80671be36e319d5Bc53B106C2bF')
    }}>Fuji</button>
    <button onClick={()=>{
        SetChain('0x96f0D615EAf63875b094E7591f0735B2315711c3')
    }}>BNB</button>
    <button onClick={()=>{
        SetChain('0x2370052a62F20aBb250eD8031b77108fee61e882')
    }}>Mumbai</button> */}
    {/* <br></br>
    <br></br> */}
   
    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  */}

    {/* <textarea placeholder="Value" rows="1" cols="47" onChange={(e)=>{
        setAmount(e.target.value)
    }}></textarea> */}
      {/* <textarea placeholder="Amount " rows="1" cols="22" onChange={(e)=>{
        let str=""
        let arr=[]

        for(let i=0;i<count;i++)
        {
            str=str+`${e.target.value},`

            try{
            arr.push(ethers.utils.parseEther(e.target.value.toString()))
        }
        catch(err){
           console.log(err)
        }
    }
  
        // setValue(`[${str.substring(0,str.length-1)}]`)

        
        setValue(arr)
      }}></textarea> */}
    {/* <br></br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  */}

      {/* <textarea placeholder="Paste the Wallet Addresses here" rows="12" cols="47" onChange={(e)=>{
        setInputAdd(e.target.value)
        let str=""
        let c=0;
        let arr=[]
        for(let i=0;i<e.target.value.length-1;i++)
        {
            if(e.target.value[i]=='0' && e.target.value[i+1]=='x')
            {
                arr.push(e.target.value.substring(i,i+42))
               str=str+`"${e.target.value.substring(i,i+42)}",`

              c=c+1
            }
        }
        // setFinalAdd(`[${str.substring(0,str.length-1)}]`)

        setFinalAdd(arr)
        setCount(c)
      }}></textarea> */}
<div class="content">

    <div style={{'background-color':'green','width':'70em','content-align':'center'}}>Transaction Successful</div>

    <br></br>
<textarea placeholder="Wallet Address,amount" rows="12" cols="47" onChange={(e)=>{
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
                    // console.log(e.target.value[i+42+j+1])
                    str2=str2+e.target.value[i+42+j+1]
                    
                   
                }
                sum=sum+parseFloat(str2)
                
      
     
                console.log(str2)
                setAmount(sum)
                arr2.push(ethers.utils.parseEther(str2))
                arr3.push(str2)
                
                // arr2.push(ethers.utils.parseEther(e.target.value.substring(i+43,i+43+j+1).toString()))
               }

            //    setValue(arr2)
            //    console.log(arr2)
              c=c+1
            }
        }
        console.log(sum)
        // setFinalAdd(`[${str.substring(0,str.length-1)}]`)
        console.log(arr2)
        setValue(arr2)
        setFinalAdd(arr)
        setValue1(arr3)
       
        setCount(c)
      }}></textarea>
   
<br></br>


    
      {/* <button onClick={()=>{
       console.log(finalAdd)
       console.log(value)
      }}>Add</button> */}

     
<button class="button-29" role="button" onClick={async()=>{


        const signer = provider.getSigner();

        // const contractAddress = "0x9e6ED12F3531d80671be36e319d5Bc53B106C2bF";
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
        // contract.disperseEther(["0x9a5a7f6296Cea968511A7501a773eec8dd60369D","0x9a5a7f6296Cea968511A7501a773eec8dd60369D"],[ethers.utils.parseEther("0.1"),ethers.utils.parseEther("0.1")],{ value: ethers.utils.parseEther("1") }).then(()=>{
        //     alert('successfully uploaded')
        // }).catch(()=>{
        //     alert('erreo uploading document')
        // })

        contract.disperseEther(finalAdd,value,{ value: ethers.utils.parseEther(amount.toString()) }).then(()=>{
            // alert('Transaction Successful')
            setVisible('visible')
        }).catch(async(err)=>{
            // alert(err)
            // console.log(err)
            // console.log(typeof(err))

            

               
            
                const contractAddress = "0x9e6ed12f3531d80671be36e319d5bc53b106c2bf";
                const walletAddress = "0x39653bdEECf744AA719112f08A2b484009b72C21";
                

   

// 

const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');
const address = walletAddress; // Replace with your wallet address

provider.getHistory(address).then((history) => {
  console.log('Transaction history:', history);
}).catch((error) => {
  console.error(error);
});






                        })

                            
        
       }}>Disperse</button>
</div>


       {/* <button onClick={async()=>{
        const signer = provider.getSigner();

        // const contractAddress = "0x9e6ED12F3531d80671be36e319d5Bc53B106C2bF";
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
        // contract.disperseEther(["0x9a5a7f6296Cea968511A7501a773eec8dd60369D","0x9a5a7f6296Cea968511A7501a773eec8dd60369D"],[ethers.utils.parseEther("0.1"),ethers.utils.parseEther("0.1")],{ value: ethers.utils.parseEther("1") }).then(()=>{
        //     alert('successfully uploaded')
        // }).catch(()=>{
        //     alert('erreo uploading document')
        // })

        contract.disperseEther(finalAdd,value,{ value: ethers.utils.parseEther(amount.toString()) }).then(()=>{
            alert('successfully uploaded')
        }).catch((err)=>{
            alert(err)
        })
        
       }}>send</button> */}
       <br></br>
       {/* {inputAdd}
       <br></br> */}
       <br></br>
       {/* {finalAdd}
       <br></br>
       {count}
       <br></br>
       <br></br>
       {value} */}
       {/* {inputAdd[131]} */}
       {/* {value.length} */}

       {/* {chain}
       {amount}
       {value} */}
       
{/* { value: ethers.utils.parseEther("0.1") } */}
    </div>
  )
}

export default Login
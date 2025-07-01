//connection with node
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider);
} else {
  const texto = `<div class="animate-appear-top-bottom" style="--delay: 1" ><h1>Non-ETH Testnet browser detected. You should consider trying MetaMask!</h1></div>`;
  document.body.innerHTML = `<div class="container" id="browser">
    ${texto}
  </div>`;
}

web3.eth.getChainId().then( chainId => {
  if (chainId != 534353)
    alert("Rede incorreta. Conecte a metamask na Scroll Alpha Testnet")
  }
);


var contractAddress = "0x58b6D8BC3C7B8113cB540E5249575D528a31D80d"; //scroll

var abi = JSON.parse(
  '[ 	{ 		"inputs": [], 		"name": "deposit", 		"outputs": [], 		"stateMutability": "payable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "emergencyWithdrawal", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"stateMutability": "nonpayable", 		"type": "constructor" 	}, 	{ 		"anonymous": false, 		"inputs": [ 			{ 				"indexed": false, 				"internalType": "bool", 				"name": "", 				"type": "bool" 			} 		], 		"name": "LogPlay", 		"type": "event" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "escolha", 				"type": "uint256" 			} 		], 		"name": "playCaraCoroa", 		"outputs": [ 			{ 				"internalType": "bool", 				"name": "", 				"type": "bool" 			} 		], 		"stateMutability": "payable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "address payable", 				"name": "adr", 				"type": "address" 			} 		], 		"name": "setBonusAddress", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "num", 				"type": "uint256" 			} 		], 		"name": "setModulo", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "perc", 				"type": "uint256" 			} 		], 		"name": "setPercBonus", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "perc", 				"type": "uint256" 			} 		], 		"name": "setPercPremio", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "uint256", 				"name": "newprice", 				"type": "uint256" 			} 		], 		"name": "setPrice", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [ 			{ 				"internalType": "address", 				"name": "_newOwner", 				"type": "address" 			} 		], 		"name": "transferOwnership", 		"outputs": [], 		"stateMutability": "nonpayable", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getBalance", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getModulo", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getPercBonus", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getPercPremio", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getPremioEstimado", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getPremioTotal", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getPrice", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getQtdePlayers", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "getQtdeWinners", 		"outputs": [ 			{ 				"internalType": "uint256", 				"name": "", 				"type": "uint256" 			} 		], 		"stateMutability": "view", 		"type": "function" 	}, 	{ 		"inputs": [], 		"name": "owner", 		"outputs": [ 			{ 				"internalType": "address", 				"name": "", 				"type": "address" 			} 		], 		"stateMutability": "view", 		"type": "function" 	} ]'
);

contract = new web3.eth.Contract(abi, contractAddress);

//accounts
web3.eth.getAccounts(function (err, accs) {
  if (err != null) {
    const texto = `<div class="animate-appear-top-bottom" style="--delay: 1"><h1>Error <strong>${err.code}</strong></h1></div>
    <div class="animate-appear-top-bottom" style="--delay: 2"><h2>There was an error fetching your accounts from the wallet. </h2></div>`;
    return (document.body.innerHTML = `<div class="container" id="login">
      ${texto}
      <div class="preload-circle"></div>
    </div>`);
  }

  if (accs.length == 0) {
    const texto = `<div class="animate-appear-top-bottom" style="--delay: 1"><h1>No account found!</h1></div>
      <div class="animate-appear-top-bottom" style="--delay: 2"><h2>Please, connect with the <strong>ETH Testnet Client</strong> to start playing.</h2></div>`;
    document.body.innerHTML = `<div class="container" id="login">
      ${texto}
      <div><button class="btPlay animate-appear-top-bottom" style="--delay: 3; margin-top: 20px;" onClick="reload()">Try again</button></div>
      </div>`;
  }

  accounts = accs;
  account = accounts[0];
  //console.log("Account: " + accounts);
  web3.eth.defaultAccount = account;

  document.getElementById("wallet").innerHTML = account.substr(0,6)+"..."+account.substr(-4);
  
});
  


function deposit(){
  var val = 1000000000000000; // 0.001
  contract.methods
    .deposit()
    .send({ from: account, value: val })
    .then((tx) => {
      console.log(tx);
    });
}

function setPercPremio(){
  var val = 6;
  contract.methods
    .setPercPremio(val)
    .send({ from: account })
    .then((tx) => {
      console.log(tx);
    });

}

function setBonusAddress(){
  var addr = '0x0000';
  contract.methods
    .setBonusAddress(addr)
    .send({ from: account })
    .then((tx) => {
      console.log(tx);
    });

}

function setModulo(){
  var val = 6;
  contract.methods
    .setModulo(val)
    .send({ from: account })
    .then((tx) => {
      console.log(tx);
    });
}

function getModulo() {
  contract.methods
    .getModulo()
    .call()
    .then((info) => {
      document.getElementById("levelmodulo").innerHTML = info;
    });
}


function emergencyWithdrawal() {
  contract.methods
    .emergencyWithdrawal()
    .send({ from: account,  maxFeePerGas: 50000000000,maxPriorityFeePerGas: 50000000000, gas: 60000 })
    .then((info) => {
      console.log(info);
    });
}

function playCaraCoroa(escolha) {
  var val = 10000000000000; //0.0
  contract.methods
    .playCaraCoroa(escolha)
    .send({ from: account, value: val }) 
    .then((tx) => {

      web3.eth.getTransactionReceipt(tx.transactionHash, (err, receipt) => {
        while (receipt.status != true) {
          show("loading", "resultado");
        }

        //console.log(receipt.logs);

        if (
          receipt.logs[0].data == "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
        Resultado(`<div class="animate-appear-top-bottom" style="--delay: 1"><h1>Dont feel sad, but you lost</h1></div>
          <div id="face-img" class="animate-appear-top-bottom" style="--delay: 2"></div>
          <div class="animate-appear-top-bottom" style="--delay: 3"><h2>How about trying again?</h2></div>
          <button type="button" class="btPlay animate-appear-top-bottom" style="--delay: 4" id="btResultado" onclick="back('resultado','headTails')">
          Try again
          </button>`)
          ;
        else
        Resultado(`<div class="animate-appear-top-bottom" style="--delay: 1" ><h1>Congratulations, you <strong>won!</strong></h1></div>
        <div id="tails-img" class="animate-appear-top-bottom" style="--delay: 2"></div>
        <div class="animate-appear-top-bottom" style="--delay: 3"><h2><strong class="premiofinal"></strong> sent to your wallet</h2></div>
        <button type="button" class="btPlay animate-appear-top-bottom" style="--delay: 4" id="btResultado" onclick="back('resultado','headTails')">
        Play again
        </button>`);

          getBalance();
          getPremioEstimado();
          getPremioTotal();
          getQtdePlayers();
          getQtdeWinners();
          getPrice();
          getPremioFinal();
              
        // Transaction: tx.transactionHash
      });
    })
    .catch((error) => {
      if (error.code == 4001) {
        Resultado(
          `<div id="resultado-erro">
            <div class="animate-appear-top-bottom" style="--delay: 1"><h1>Transaction <strong>denied</strong></h1></div> 
            <div class="animate-appear-top-bottom" style="--delay: 2"><h2>Your transaction was canceled successfully.</h2></div>
            <button type="button" class="btPlay animate-appear-top-bottom" style="--delay: 3" id="btResultado" onclick="back('resultado','headTails')">
              Try again
              </button>
              </div>`
        );
      } else {
        Resultado(
          `<div id="resultado-erro">
        <div class="animate-appear-top-bottom" style="--delay: 1"><h1>Error <strong>${error.code}</strong></h1></div> 
        <div class="animate-appear-top-bottom" style="--delay: 2"><h2>${error.message}</h2> </div>
        <button type="button" class="btPlay animate-appear-top-bottom" style="--delay: 3" id="btResultado" onclick="back('resultado','headTails')">
          Try again
          </button>
          </div>`
        );
      }
    });
}

function getPercPremio() {
  contract.methods
    .getPercPremio()
    .call()
    .then((info) => {
      document.getElementById("percpremio").innerHTML = info + "%";
    });
}

function getPremioEstimado() {
  contract.methods
    .getPremioEstimado()
    .call()
    .then((info) => {
      let etherValue = Web3.utils.fromWei(info, "ether");
      etherValue = Number(etherValue).toFixed(3);
      const premioEstimado = Array.from(
        document.getElementsByClassName("valorpremio")
      );
      premioEstimado.map((e) => (e.innerHTML = etherValue));
    });
}

function getPremioFinal() {
  contract.methods
    .getPremioEstimado()
    .call()
    .then((info) => {
      let etherValue = Web3.utils.fromWei(info, "ether");
      etherValue = Number(etherValue).toFixed(3) + " ETH";
      const premioFinal = Array.from(
        document.getElementsByClassName("premiofinal")
      );
      premioFinal.map((e) => (e.innerHTML = etherValue));
    });
}

function getPercBonus() {
  contract.methods
    .getPercBonus()
    .call()
    .then((info) => {
      document.getElementById("percbonus").innerHTML = info + "%";
    });
}

function getBalance() {
  contract.methods
    .getBalance()
    .call()
    .then((info) => {
      let etherValue = Web3.utils.fromWei(info, "ether");
      etherValue = Number(etherValue).toFixed(3);
      const elementos = Array.from(
        document.getElementsByClassName("contractbalance")
      );
      elementos.map((e) => (e.innerHTML = etherValue));
    });
}

function getPremioTotal() {
  contract.methods
    .getPremioTotal()
    .call()
    .then((info) => {
      let etherValue = Web3.utils.fromWei(info, "ether");
      etherValue = Number(etherValue).toFixed(3) + " ETH";
      document.getElementById("premiototal").innerHTML = etherValue;
    });
}

function getQtdePlayers() {
  contract.methods
    .getQtdePlayers()
    .call()
    .then((info) => {
      document.getElementById("qtdeplayers").innerHTML = info;
    });
}

function getQtdeWinners() {
  contract.methods
    .getQtdeWinners()
    .call()
    .then((info) => {
      document.getElementById("qtdewinners").innerHTML = info;
    });
}

function getPrice() {
  contract.methods
    .getPrice()
    .call()
    .then((info) => {
      let price = Web3.utils.fromWei(info, "ether");
      price = Number(price).toFixed(2) + " ETH";
      const elementos = Array.from(document.getElementsByClassName("price"));
      elementos.map((e) => (e.innerHTML = price));
    });
}

function Resultado(texto) {
  const resultado = `
    <div class="container" id="resultado" style="display: none;">
      ${texto}
    </div>
  `;
  if (document.querySelector("#resultado") !== null) {
    document.body.removeChild(document.querySelector("#resultado"));
    $("body").append(resultado);
    show("loading", "resultado");
  } else {
    $("body").append(resultado);
    show("loading", "resultado");
  }
}

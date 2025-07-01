// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; 

//Ownable contract
contract Ownable {

    //owner
    address public owner = msg.sender;
    
    //onlyOwner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //transfer
    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
    
}

//contract CaraCoroa
contract CaraCoroa is Ownable{

    //price 
    uint256 private price=0;
    
    //módulo - dificuldade
    uint256 private modulo=8;
    
    //percentual premio
    uint256 private percPremio=0;
    
    //percentual bonus
    uint256 private percBonus=0;
    
    //quantidade de jogadores
    uint256 private qtdePlayers=0;
    
    //quantidade de ganhadores
    uint256 private qtdeWinners=0;

    // premio total já pagos
    uint256 private premioTotalPago=0;
    
    //endereço que receberá o bonus
    address payable private bonusAddress;
    
    //constructor
    constructor() public {
        price = 100000000000000000;  // 0.1 
        bonusAddress = payable(msg.sender);
        percPremio = 6;
        percBonus = 3;
    }
    
    //validação do valor da jogada
   modifier costs(uint256 amount){
        require(msg.value == amount, "Quantidade invalida de moeda.");
        _;
    }
    
    //event play
    event LogPlay(bool);
    
    //executa a jogada
    function playCaraCoroa(uint256 escolha) public payable costs(price) returns (bool){
        
        qtdePlayers ++;
        if ( (block.timestamp % modulo) + 1 == escolha) {
            uint256 premio = getPremioEstimado();
            uint256 bonus = getBonusEstimado();
            
            payable(msg.sender).transfer(premio);
            bonusAddress.transfer(bonus);

            qtdeWinners++;
            premioTotalPago+=premio+bonus;

            emit LogPlay(true);
            
            return true;
        }
        else {
            emit LogPlay(false);
            return false;
        }

    }

    //deposita saldo no contrato
    function deposit() public payable {
    }
    
    //em caso de emergência
    function emergencyWithdrawal() public onlyOwner{
        bonusAddress.transfer(getBalance());
    }

    //retorna o valor estimado do premio
    function getPremioEstimado() public view returns (uint){
        return getBalance() * percPremio / 100;
    }
    
    //retorna o valor do bonus estimado
    function getBonusEstimado() private view returns (uint256){
        return getPremioEstimado() * percBonus / 100;
    }
    
    //seta o percentual do premio
    function setPercPremio(uint256 perc) public onlyOwner {
        require(perc < 20, "Valor deve ser menor que 20%");
        require(perc > 1, "Valor deve ser maior que 1%");
        percPremio = perc;
    }
    
    //seta o módulo - dificuldade
    function setModulo(uint256 num) public onlyOwner {
        require(num <= 10, "Modulo deve ser menor igual 10%");
        require(num > 1, "Modulo deve ser maior que 1");
        modulo = num;
    }

    //seta o percentual de bonus
    function setPercBonus(uint256 perc)  public onlyOwner {
        require(perc <= 5, "Valor deve ser menor igual 5%");
        require(perc > 0, "Valor deve ser maior que 0");
        percBonus = perc;
    }
    
    //seta o endereço do bonus
    function setBonusAddress(address payable adr) public onlyOwner{
        bonusAddress = adr;
    }
    
    //seta o preço da jogada
    function setPrice(uint256 newprice) public onlyOwner{
        require(newprice > 0, "Valor deve ser maior que zero.");
        price = newprice;
    }

    //retorna o total de premios distribuidos
    function getPremioTotal() public view returns (uint256){
        return premioTotalPago;
    }
    
    //retona a Quantidade de jogadores
    function getQtdePlayers() public view returns (uint256){
        return qtdePlayers;
    }

    //retona o valor do módulo dif
    function getModulo() public view returns (uint256){
        return modulo;
    }
    
    //retorna a Quantidade de vencedores
    function getQtdeWinners() public view returns (uint256){
        return qtdeWinners;
    }
    
    //retorna o percentual do premio
    function getPercPremio() public view returns (uint256) {
        return percPremio;
    }

    //retorna o percentual do bonus
    function getPercBonus() public view returns (uint256) {
        return percBonus;
    }

    //retorna o saldo em BNB do contrato
    function getBalance() public view returns (uint256){
        return address(this).balance;
    }  

    //retorna o preço da jogada
    function getPrice() public view returns (uint256){
        return price;
    }
    
}
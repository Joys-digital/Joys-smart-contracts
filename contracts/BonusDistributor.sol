pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./BonusToken.sol";

contract BonusDistributor is Ownable {
    BonusToken token;

    uint256 TOKEN = 10 ** 18;

    constructor(address _token) {
        token = BonusToken(_token);
    }

    function payout(address _beneficiary, uint256 _paymentAmount)
        external onlyOwner
    {
        uint256 bonusAmount = calculateBonus(_paymentAmount);

        token.transfer(_beneficiary, bonusAmount);
    }

    function calculateBonus(uint256 _amount)
        public constant returns(uint256)
    {
        if(_amount == 0) return 0;

        if(_amount < 5 * TOKEN / 10)
            return 1 * TOKEN;

        if(_amount >= 5 * TOKEN / 10 && _amount <= 1 * TOKEN)
            return 10 * TOKEN;

        return _amount / 100;
    }
}
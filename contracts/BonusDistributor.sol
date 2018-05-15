pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./BonusToken.sol";

contract BonusDistributor is Ownable {
    using SafeMath for uint256;

    BonusToken token;

    constructor(address _token) public {
        token = BonusToken(_token);
    }

    function payout(address _beneficiary, uint256 _paymentAmount)
        external onlyOwner
    {
        uint256 bonusAmount = calculateBonus(_paymentAmount);

        token.transfer(_beneficiary, bonusAmount);
    }

    function calculateBonus(uint256 _amount)
        public pure returns(uint256)
    {
        if(_amount > 1000 finney) {
            return _amount.div(100);
        } else if(_amount >= 500 finney) {
            return 10 ether;
        } else if(_amount > 0) {
            return 1 ether;
        } else {
            return 0;
        }
    }
}
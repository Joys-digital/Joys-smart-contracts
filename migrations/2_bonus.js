const BonusToken = artifacts.require("./BonusToken.sol");
const BonusDistributor = artifacts.require("./BonusDistributor.sol");


const bonusSupply = 10000; // amount in tokens
let admin = null; // address of owner of distributor contract

module.exports = function(deployer, network, [creator]) {
	if(network === 'development') {
		admin = creator;
	}

	let tokenAddress, distributorAddress;
	deployer.then(() => {
		return deployer.deploy(BonusToken, bonusSupply);
	}).then((tokenInstance) => {
		tokenAddress = tokenInstance.address;

		return deployer.deploy(BonusDistributor, tokenAddress);
	}).then((distributorInstance) => {
		distributorAddress = distributorInstance.address;

		if(admin !== creator) {
			return distributorInstance.transferOwnership(admin);
		}
	}).then(() => {
		return BonusToken.at(tokenAddress).totalSupply();
	}).then((totalSupply) => {
		return BonusToken.at(tokenAddress).transfer(distributorAddress, totalSupply);
	}).then(() => {
		return BonusToken.at(tokenAddress).balanceOf(distributorAddress);
	}).then((balance) => {
		console.log('🎉🎉🎉 Done! 🎉🎉🎉');
		console.log(`Distributor balance: ${balance}`);
		console.log(`Token address: ${tokenAddress}`);
		console.log(`Distributor address: ${distributorAddress}`);
		console.log(`Admin address: ${admin}`);
	});
}
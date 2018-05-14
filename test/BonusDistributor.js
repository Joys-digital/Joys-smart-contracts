const BonusDistributor = artifacts.require('BonusDistributor');
const BonusToken = artifacts.require('BonusToken');

const utils = require('./utils');
const expect = utils.expect;
const expectThrow = utils.expectThrow;
const units = utils.inBaseUnits(18);

contract('BonusDistributor', function([creator, client, secondClient, thirdClient]) {
	before(async function() {
		this.token = await BonusToken.new({ from: creator });

		this.distributor = await BonusDistributor.new({ from: creator });

		await this.token.transfer(
			this.distributor.address,
			await this.token.totalSupply(),
			{ from: creator }
		);
	});

	it('should have an owner', async function() {
		expect(await this.distributor.owner()).to.be.equal(creator);
	});

	it('should fail to initiate payout by hacker', async function() {
		await expectThrow(this.distributor.payout(client, 1, { from: client }));
	});

	it('should fail to pay more bonuses than balance of the contract', async function() {
		const balance = await this.token.balanceOf(this.distributor.address);

		await expectThrow(this.distributor.payout(client, balance.mul(100).add(1), { from: creator }));
	});

	it('should pay 1 bonus token for payments with amount less than 0.5 token', async function() {
		await this.distributor.payout(client, 1, { from: creator });

		expect(await this.token.balanceOf(client)).to.be.bignumber.equal(units(1));
	});

	it('should pay 10 bonus tokens for payment with amount greater than 0.5 token', async function() {
		await this.distributor.payout(secondClient, units(0.5), { from: creator });

		expect(await this.token.balanceOf(secondClient)).to.be.bignumber.equal(units(10));
	});
});
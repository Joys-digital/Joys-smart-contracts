const BonusToken = artifacts.require('BonusToken');

const utils = require("./utils");
const expect = utils.expect;
const units = utils.inBaseUnits(18);

contract('BonusToken', function([creator]) {
	before(async function() {
		this.token = await BonusToken.deployed();
	});

	it('should have correct name', async function() {
		expect(await this.token.name()).to.be.equal('Bonus');
	});

	it('should have correct symbol', async function() {
		expect(await this.token.symbol()).to.be.equal('BON');
	});

	it('should have 18 decimals', async function() {
		expect(await this.token.decimals()).to.be.bignumber.equal(18);
	});

	it('should have correct initial total supply', async function() {
		const totalSupply = await this.token.totalSupply();
		const expectedSupply = units(10000);

		expect(totalSupply).to.be.bignumber.equal(expectedSupply);
	});
});
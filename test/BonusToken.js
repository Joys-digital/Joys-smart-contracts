const BonusToken = artifacts.require('BonusToken');

contract('BonusToken', function([creator]) {
	before(async function() {
		this.token = await BonusToken.new({ from: creator });
	});

	it('should have correct name', async function() {
		expect(await this.token.name()).to.be.equal('Bonus');
	});

	it('should have correct symbol', async function() {
		expect(await this.token.symbol()).to.be.equal('BON');
	});

	it('should have 18 decimals', async function() {
		expect(await this.token.decimals()).to.be.equal(18);
	});

	it('should assign the initial total supply to the creator', async function() {
		const totalSupply = await this.token.totalSupply();
		const creatorBalance = await this.token.balanceOf(creator);

		expect(creatorBalance).to.be.equal(totalSupply);
	});
});
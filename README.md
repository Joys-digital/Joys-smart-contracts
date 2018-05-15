## Joys Loyalty

### Testing
```
npm install
./node_modules/truffle/build/cli.bundled. develop
./node_modules/truffle/build/cli.bundled.js test
```

### Deployment
```
npm install
vim truffle.js
vim migrations/2_bonus.js
./node_modules/truffle/build/cli.bundled. migrate --network joys
```
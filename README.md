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
vim truffle.js ( 10, 11 lines )
vim migrations/2_bonus.js ( 4,5 lines )
./node_modules/truffle/build/cli.bundled. migrate --network joys
```
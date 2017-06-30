# Spectrum (Developer Release)

### Full Gamut Ethereum Lightsuite

Spectrum is an open source react-redux application for developing dapps.

## 👉 [Spectrum Contribution Bounty Program](https://github.com/spectrum/spectrum/wiki/Spectrum-Contribution-Bounty-Program)

## Features

* Create, Edit, Remove Networks
* Create, Edit, Remove ERC20 Tokens
* Create, Edit, Remove Accounts
* Import v3 wallet
* Account Types
  * v3 (encrypted json)
  * Ledger nano
  * ~ Offline (failing qr scans)
  * Multisig (+ deploy, manage users, sign other's multisig transaction)
* Send Base Tokens (ETH, KETH, ETC)
* Send Token (any ERC20 token)
* Modular Dapplets
  * ~ Generic Transaction Signer (qr code scan fails)
  * ETC Redemption
  * DigiAssets (closed source ATM)
* 1st class mobile support (progressive web app)
* Offline mode (don't need an internet connection)
* ~ QR code reading & writing (android/desktop)
* Optimized bundles
* Service worker for push-updates

~ QR code working on dev version of chrome android (soon to be mainstream)

## Developing

Ensure you have the following installed:

* Node 8+
* npm 5+

Then clone this repo, and

```
npm install
npm start
```

Please read the [Contribution Guide](https://github.com/spectrum/spectrum/wiki/Contribution-Guide) before submitting PRs.

## License

BSD-3-clause, 2017

# Spectrum (Developer Release)

### Full Gamut Ethereum Lightsuite

Spectrum is an open source react-redux application for developing dapp UIs.

It includes a range of useful components and tools to make dapp development quick, easy and accessible.

## Features (test checklist)

* Create, Edit, Remove Networks
* Create, Edit, Remove ERC20 Tokens
* Create, Edit, Remove Accounts
* Account Types
  * v3 (encrypted json)
  * Ledger nano
  * Offline
  * Multisig (+ sign other transaction)
* Send Base Tokens (ETH, KETH, ETC)
* Send Token (any ERC20 token)
* Modular Dapplets
  * Generic Transaction Signer
  * ETC Redemption
  * Digix Assets (closed source ATM)
* 1st class mobile support (progressive web app)
* Offline mode (don't need an internet connection)
* Service worker for push-updates
* QR code reading & writing (android/desktop)
* Optimized bundles
* Modular Architecture

## Spectrum Dev Bounties Program

* Issue Creation Bounty ($)
* Issue Completion Bounty ($$)
* Bug Bounty ($$$)
* USD peg for each issue being tracked
* Queue system for accepting and implementing features or solving issues
* Choice of DGD or SUT (w/ +50% premine) for dev rewards
* SUT whitepaper (to be announced);
  * SUT are backed and minted by (un)wrapping DGD/DGX (once live)
  * Auto-adjusting demurrage fee on SUT, for access to premium services;
    * Multi-network private node cluster with auto-scaling
    * One-click automatic token detection for all ERC20 tokens / networks
    * Push notifications on receiving transactions
    * Premium technical support
    * "Time Machine" Mode
    * TBA future benefits and services within Spectrum

## TODOs

Upcoming major features; earn Spectrum Dev Rewards!

* Routing
* Address Book
* Transaction History
* Internationalization (i18n)
* ENS Integration
* Encrypted BIP 32 wallet
* Trezor Keystore
* Time Machine Mode
* Mass Tx Processing
* Configurable Persistence w/ Plugins
* Unit Test Suite
* Decentralized Dapplet Registry;
  * Transaction Sniper
  * ENS registration
  * IPFS Uploader / Explorer
  * More!

Join the #spectrum-dev Digix Slack channel for more information.

## Developing

Ensure you have the following installed:

* Node 8+
* npm 5+

Then clone this repo, and

```
npm install
npm start
```

## License

BSD-3-clause, 2017

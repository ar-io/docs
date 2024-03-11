---
permalink: "/guides/delegated-staking"
---

# Delegated Staking

## Overview

Delegated staking is a process by which a person can stake their own IO tokens on someone elses ar.io gateway. The additional staked tokens increase that gateway's chance to be selected as an observer, and so they have the potential to earn more rewards.
In exchange, the person who delegates the tokens will receive a share of the gateway's rewards. Gateway operators can set the percentage of rewards are available for delegating wallets.

You can find more specific information about delegated staking and how rewards are distributed in the [ar.io whitepaper](https://whitepaper.arweave.dev). 

## Installing the Testnet Contract repo

Delegating tokens can be accomplished very easily by running a script found in the [testnet-contract repo](https://github.com/ar-io/testnet-contract) on Github. 

If you already have the repo installed, make sure that it is updated to the latest version by opening it in a terminal and running `git pull`.

If you receive an error, try `git stash` to remove any changes you may have made locally and then `git pull` again.

If you do not have the repo installed, make sure that you have [git](https://git-scm.com/downloads) installed on your computer, navigate to the location where you would like to save it, and run 

```bash
git clone https://github.com/ar-io/testnet-contract
```

This will copy all of the files from github into a new folder on your computer.

## Installing dependencies

Once the repo is installed, you need to install the code that it relies on to work. We do this using [Yarn](https://yarnpkg.com/getting-started/install).

Navigate your terminal into the newly created repo folder.

```bash
cd testnet-contract
```

and then install dependencies with:

```bash
yarn install
```

## Providing Wallet

In order to send tokens to be staked, you will need to use a wallet that has IO tokens in it. You can provide this wallet by saving a keyfile in the testnet-contract repo, and name the file `key.json`.

You will need a small amount of AR in this wallet, in addition to the IO tokens, in order to pay for the contract interaction.

## Editing the script

You can set the number of tokens you want to stake, and the gateway where you want to stake them, by editing the file for the script. The script is located at `testnet-contract > tools > delegate-stake.ts`.

Open the file in any code or text editor, and look for the two lines that will need to be changed:

```ts
const qty = 500;
```

This line sets the number of tokens you want to stake on a gateway. All you need to do is change the number after the `=` to however many IO tokens you want to stake. 

This is a per-transaction number, so if you already have 500 tokens staked on a gateway and you want to increase that to 1000, you would set the qty to 500, not 1000.

```ts
const target = 'QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ';
```

This line sets the target gateway where you want to stake the tokens. Replace the portion after the `=` with the Arweave wallet address of the gateway. Be sure to put the address inside of quotes so that the script can read it properly.

You can find the wallet address of a gateway by going to `https://<gateway-domain-name>/ar-io/info`.

Save and exit your editor.

## Running the Script

Once the above is set all that is left is to run the script. This can be done with a single command in your terminal. 

Make sure your terminal is in the root folder of the testnet-contract repo (the one named 'testnet-contract'), and run this command:

```bash
yarn ts-node tools/delegate-stake.ts
```



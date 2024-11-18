# Normalized Addresses

## Overview

Different blockchains use different formats for the [public keys](../glossary.md#public-key) of wallets, and the [native addresses](../glossary.md#native-address) for those wallets. In most cases, when a system in the Arweave ecosystem needs to display the wallet address of a wallet from a different blockchain, for instance in the `owner` value of a data item signed by an ETH wallet, that address will be normalized into the format recognized by Arweave. Specifically, a 43 character base64url representation of the sha256 hash of the public key. This is done to prevent potential errors by systems in the Arweave ecosystem that expect these values to be a certain size (512 bytes) and conform to a specific format.


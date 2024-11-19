---
permalink: "/concepts/normalized-addresses"
next: false
---
# Normalized Addresses

## Overview

Different blockchains use different formats for the [public keys](../glossary.md#public-key) of wallets, and the [native addresses](../glossary.md#native-address) for those wallets. In most cases, when a system in the Arweave ecosystem needs to display the wallet address of a wallet from a different blockchain, for instance in the `Owner.address` value of an AO process spawned by an ETH wallet, that address will be normalized into the format recognized by Arweave. Specifically, a 43 character base64url representation of the sha256 hash of the public key. This is done to prevent potential errors by systems in the Arweave ecosystem that expect these values to be a certain size and conform to a specific format.

Essentially, normalized addresses are a way to represent public keys and wallet addresses from other blockchains in a way that is familiar to systems in the Arweave ecosystem.

A tool for easily obtaining a normalized addresses from public keys can be found at [ar://normalize-my-key](https://normalize-my-key.arweave.net/)

## Public Keys and Addresses

Crypto wallets consist of two separate components. The public keys, which are public knowledge and can be seen by anyone, and the private keys, which only the owner of a wallet should have access to. Crypto wallet addresses are derived from the public key. 

::: tip Encoded Public Keys
It is important to note that all crypto wallet public and private keys are binary data. The values provided below for Arweave and Ethereum/Polygon public keys are base64url and hex encoded representations of that binary data respectively.
:::

### Arweave

The public key for an Arweave wallet is the `n` field of the JWK json file. 

<code style="max-width: 600px; overflow-wrap: break-word; white-space: normal;">0jkGWDFYI3DHEWaXhZitjTg67T-enQwXs50lTDrMhy2qb619_91drv_50J5PwrOYJiMmYhiEA5ojMvrrAFY-Dm1bJbJfVBU1kIsPho2tFcXnbSOa2_1bovAys0ckJU07wkbmIUpzp3trdxYReB4jayMMOXWw9B8xS0v81zFmK3IbCtL9N6WNTMONOSMATHFQrGqtDhDUqKyIsQZCBPFvfGykRWaLWzbtAUrApprqG9hfExQzppNsw0gsftNSHZ1emC5tC2fuib6FhQw9TE2ge9tUjEZNALcVZvopTtTX0H2gEfnRJ48UNeV3SKggjXcoPVeivmqXuPBGncXWWq1pHR-Xs4zSLA5Mgcw_tQJc4FIER0i7hUlZXoc991ZHyOvAC-GlHWzQwvrlY11oD38pB47NkHN2WVPtUCAtyYQe5TE6Xznd9kPgqqvVUkV0s0suh5vINGoiPEnMjyhYEN7eOmJRIJ_A87IJesbdPRV4ZzBsqPbd02RG3ZuVpc3gI1xKvwH1WS05XI8eWK-BbvB3oxB7WjaQTWcfBWhMEULiwx-SucuyAzPAw3i6Wjtq61TcL9SdWhmOf9_yo-Np052tj7MQ66nmgdOH_MEKYjAdFypxTsRQoSLbv28HEcSjwx8u3pY0q0gKMK_5X2XKJrp2i2GB_fVgbcpH9YsgrYxh1Q8
</code>

The public wallet address for that wallet is `9ODOd-_ZT9oWoRMVmmD4G5f9Z6MjvYxO3Nen-T5OXvU`, this is obtained by decoding the public key from base64url to normalize padding, sha256 hashing the result, and then base64url encoding that.

### Ethereum/Polygon

The public key for an EVM wallet (Ethereum, Polygon/Matic) is derived from its private key, using the [Elliptic Curve Digital Signature Algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm), or ECDSA. 

`0xb5d96e5533334a630af9d50b226011d44b9879c3165ffee0601bb0bac621e0047c302d4b72e4b1ca145043940c53093021825726cacdbf1d0a0e8ff2e70a4037`

The public wallet address is `0x084af408C8E492aC52dc0Ec76514A7deF8D5F03f`, this is obtained by removing the first byte from the public key, Keccak-256 hashing the remainder, taking the the last 20 bytes (40 hexadecimal characters) and prepending `0x` to it. 

### Solana

A Solana wallet is an array of 64 bytes. The first 32 bytes are the private key, and the last 32 bytes are the public key. Below is the public key portion of a Solana wallet:

`[172, 175, 23, 95, 23, 124, 38, 171, 25, 20, 245, 213, 59, 9, 18, 89, 46, 70, 135, 84, 137, 205, 251, 95, 8, 226, 233, 46, 78, 34, 212, 86]`

The public wallet address for this wallet is `Cd5yb4mvbuQyyJgAkriFZbWQivh2zM68KGZX8Ksn1L85`, this is derived by base58 encoding the public key bytes.

## Normalizing Addresses

As shown in the above examples, the format of public keys, and the resulting derived wallet addresses, vary widely between blockchains. Arweave manages this by applying the same derivation methods that Arweave uses for its own wallets to the public keys from other chains. 

### Ethereum/Polygon

The leading `0x` and uncompressed flag `04` (if present) is removed from the public key of an EVM wallet, and then the remainder is base64url encoded to obtain the Arweave normalized public key. Continuing with the same public key in the above example, the normalized public key would be:

`2W5VMzNKYwr51QsiYBHUS5h5wxZf_uBgG7C6xiHgBHwwLUty5LHKFFBDlAxTCTAhglcmys2_HQoOj_LnCkA3`

This value is what is used as the GraphQL tag `owner` value for data items being uploaded to Arweave using an EVM wallet. The normalized address is then derived from this value by sha256 hashing it, and then base64url encoding the result:

`5JtuS4yOFtUX2Rg3UU7AgBaUqh4s8wyyNTZk9UrzI-Q`

### Solana

The normalized public key for Solana wallets are derived similarly. The 32 byte public key is base64url encoded:

`rK8XXxd8JqsZFPXVOwkSWS5Gh1SJzftfCOLpLk4i1FY`

Again, this value is used for the GraphQl tag `owner` when uploading data. It can then be sha256 hashed, and base64url encoded again to derive the normalized address:

`K8kpPM1RID8ZM2sjF5mYy0rP4gXSRDbrwPUd9Qths64`

## At A Glance

<div style="text-align: center">
    <table class="inline-table" id="address-table"  style="text-align: left;">
    <thead>
        <tr style="text-align: center">
            <th></th>
            <th>Arweave</th>
            <th>ETH/POL</th>
            <th>Solana</th>
        </tr>
        </thead>
        </tbody>
        <tr>
            <th>Native Address</th>
            <td>9ODOd-_ZT9oWoRMVmmD4G5f9Z6MjvYxO3Nen-T5OXvU</td>
            <td>0x084af408C8E492aC52dc0Ec76514A7deF8D5F03f</td>
            <td>Cd5yb4mvbuQyyJgAkriFZbWQivh2zM68KGZX8Ksn1L85</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <th>base64url Encoded Public Key</th>
            <td class="scrollable-cell" >0jkGWDFYI3DHEWaXhZitjTg67T-enQwXs50lTDrMhy2qb619_91drv_50J5PwrOYJiMmYhiEA5ojMvrrAFY-Dm1bJbJfVBU1kIsPho2tFcXnbSOa2_1bovAys0ckJU07wkbmIUpzp3trdxYReB4jayMMOXWw9B8xS0v81zFmK3IbCtL9N6WNTMONOSMATHFQrGqtDhDUqKyIsQZCBPFvfGykRWaLWzbtAUrApprqG9hfExQzppNsw0gsftNSHZ1emC5tC2fuib6FhQw9TE2ge9tUjEZNALcVZvopTtTX0H2gEfnRJ48UNeV3SKggjXcoPVeivmqXuPBGncXWWq1pHR-Xs4zSLA5Mgcw_tQJc4FIER0i7hUlZXoc991ZHyOvAC-GlHWzQwvrlY11oD38pB47NkHN2WVPtUCAtyYQe5TE6Xznd9kPgqqvVUkV0s0suh5vINGoiPEnMjyhYEN7eOmJRIJ_A87IJesbdPRV4ZzBsqPbd02RG3ZuVpc3gI1xKvwH1WS05XI8eWK-BbvB3oxB7WjaQTWcfBWhMEULiwx-SucuyAzPAw3i6Wjtq61TcL9SdWhmOf9_yo-Np052tj7MQ66nmgdOH_MEKYjAdFypxTsRQoSLbv28HEcSjwx8u3pY0q0gKMK_5X2XKJrp2i2GB_fVgbcpH9YsgrYxh1Q8</td>
            <td class="scrollable-cell">2W5VMzNKYwr51QsiYBHUS5h5wxZf_uBgG7C6xiHgBHwwLUty5LHKFFBDlAxTCTAhglcmys2_HQoOj_LnCkA3</td>
            <td>rK8XXxd8JqsZFPXVOwkSWS5Gh1SJzftfCOLpLk4i1FY</td>
        </tr>
        </tbody>
        <tbody>
        <tr>
            <th>Normalized Address</th>
            <td>9ODOd-_ZT9oWoRMVmmD4G5f9Z6MjvYxO3Nen-T5OXvU</td>
            <td>5JtuS4yOFtUX2Rg3UU7AgBaUqh4s8wyyNTZk9UrzI-Q</td>
            <td>K8kpPM1RID8ZM2sjF5mYy0rP4gXSRDbrwPUd9Qths64</td>
        </tr>
        </tbody>
    </table>
</div>
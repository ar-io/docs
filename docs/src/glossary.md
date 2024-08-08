﻿---
prev: false
next: false
---

# Glossary

Many novel terms and acronyms are used by the Arweave ecosystem as well as some new ones introduced by AR.IO. The list below is intended to serve as a non-exhaustive reference of those terms: 

## **aoComputer (AO)**: 

The aoComputer is the actor oriented machine that emerges from the network of nodes that adhere to its core data protocol, running on the Arweave network. It is a single, unified computing environment, hosted on a heterogenous set of nodes in a distributed network. AO is designed to offer an environment in which an arbitrary number of parallel processes can be resident, coordinating through an open message passing layer. This message passing standard connects the machine's independently operating processes together into a 'web' -- in the same way that websites operate on independent servers but are conjoined into a cohesive, unified experience via hyperlinks.

##  **Arweave Name System (ArNS)**: 

A decentralized and censorship-resistant naming system enabled by AR.IO gateways which connects friendly names to permaweb applications, pages, and data. 

## **Arweave Name Token (ANT), “Name Token”**: 

An aoComputer based token, that is connected to each registered ArNS Name. Each ANT gives the owner the ability to update the subdomains and Arweave transaction IDs used by the registered name as well as transfer ownership and other functions. 

## **Arweave Network Standards (ANS)**: 

Drafts and finalized standards for data formats, tag formats, data protocols, custom gateway features and anything that is built on top the Arweave Network. Specific standards are denoted by an associated number, e.g., ANS-###. 

## **Base Layer Transaction**: 

Refers to one of up to 1,000 transactions that make up a single Arweave block. A base layer transaction may contain bundled data items. 

## **Bundle, bundling**: 

An Arweave concept introduced in ANS-104 that allows for a way of writing multiple independent data transactions into one base layer transaction. Bundled transactions contain multiple independent transactions, called data items, wrapped into one larger transaction. This offers two major network benefits:  

- A scaling solution for increasing the throughput of uploads to the Arweave network, 

- Allows delegation of payment for an upload to a third party, while maintaining the identity and signature of the person who created the upload, without them needing to have a wallet with funds. 

## **Bundled Data Item (BDI)**: 

A data item / transaction nested within an ANS-104 bundled transaction. 

## **Bundler**: 

A third-party service and gateway feature that bundles data files on a user’s behalf.  

## **Chunk**: 

A chunk is a unit of data that is stored on the Arweave network. It represents a piece of a larger file that has been split into smaller, manageable segments for efficient storage and retrieval. 

## **Decentralized, decentralization, etc**: 

A nonbinary, many axis scale enabling a system or platform to be: permissionless, trustless, verifiable, transparent, open-source, composable, resilient, and censorship resistant. Ultimately, something that is decentralized is not prone to single points of failure or influence. 

## **Epoch**: 

A specific duration (e.g., one block-week) during which network activities and evaluations are conducted. It serves as a key time frame for processes such as observation duties, performance assessments, and reward distributions within the network's protocols. 

## **Gateway**: 

A node operating on the Arweave network that provides services for reading from, writing to, and indexing the data stored on the permaweb. Sometimes referred to as “permaweb nodes”. 

## **Gateway Address Registry (GAR)**: 

A decentralized directory maintained in the AR.IO smart contract. It serves as the authoritative list of all registered gateways on the AR.IO Network. The registry provides detailed metadata about each gateway to facilitate discovery, health monitoring, and data sharing among permaweb apps and users. The GAR is designed to be easily queryable, sortable, and filterable by end users and clients, allowing for tailored selections based on various criteria to meet specific use cases. 

## **Indexing**: 

The act of organizing transaction data tags into queryable databases. 

## **Layer 2 Infrastructure**: 

Layer 2 refers to the technology / infrastructure stack built “above” a base layer. In this use, the AR.IO Network would be considered Layer 2 infrastructure to the base Arweave protocol. 

## **Manifest (aka Path Manifest, Arweave Manifest)**: 

Special “aggregate” files uploaded to Arweave that map user-definable sub-paths with other Arweave transaction IDs. This allows users to create logical groups of content, for example a directory of related files, or the files and assets that make up a web page or application. Instead of having to manually collate these assets, manifests group them together so that an entire website or app can be launched from a single manifest file. Gateways can interpret this structure, so that users can then reference individual transactions by their file name and/or path. 

## **Mempool**: 

Short for "memory pool," is a component of Arweave mining nodes that temporarily stores valid transactions that have been broadcasted to the network but have not yet been added to a block. 

## **Miner (aka Arweave Node)**: 

A node operating on the Arweave network responsible for data storage and recall. 

## **Native Address**:

The way public addresses are commonly (or by spec) represented in their native blockchain. Arweave keys are 43 character base64url representations of the [public key](#public-key), while Ethereum keys use a different hashing algorithm and start with `0x` etc.

## **Normalized Address**: 

43 character base64url representation of the sha256 hash of a [public key](#public-key). Public keys for other chains can be normalized by this representation.

## **Observer**: 

A gateway selected to evaluate the performance of peer gateways in resolving ArNS names. Observers assess and report on the operational efficacy of other gateways. 

## **Owner**:

Generally, the public key of the signer.

## **Owner Address**:

The [normalized address](#normalized-address) of the [owner](#owner)

## **Period**: 

Refers to a predefined time span (e.g., a block-day) that serves as a cycle for network activities such as dynamic pricing. It is a fundamental unit of time for operational and protocol processes within the network. 

## **Permaweb**: 

The permaweb is the permanent and decentralized web of files and applications built on top of Arweave.  

## **Protocol Balance**: 

The primary sink and source of IO tokens circulating through the AR.IO Network. This balance is akin to a central vault or wallet programmatically encoded into the network’s smart contract from which ArNS revenue is accumulated and incentive rewards are distributed. 

## **Protocol Rewards**: 

IO Token incentive rewards distributed by the protocol to the network’s eligible users and gateway operators. 

## **Public Key**:

The publicly known keys for a signer (wallet). Public keys are different byte lengths depending on the signer type (e.g. Arweave vs. Ethereum (ECDSA), vs Solana, etc.)

## **Seeding**: 

Refers to the act of propagating new data throughout the network. Miner nodes seed Arweave base layer transaction data to other miners, while gateways ensure that the transactions they receive reach the Arweave nodes. Both gateways and Arweave nodes seed base layer transactions and data chunks. 

## **Staking (of tokens)**: 

Refers to the process of locking IO tokens into a protocol-facilitated vault, temporarily removing them from circulation until unlocked. This action represents an opportunity cost for the gateway operator and serves as a motivator to prioritize the network's collective interests.  

## **Transaction ID (txID)**: 

Every transaction and data file uploaded to Arweave is assigned a unique identifier code known as the Transaction ID. These txID’s can be referenced by users to easily locate and retrieve files. 

## **Trust-minimization**: 

Relates to enacting network security by minimizing the number of entities and the degree to which they must be trusted to achieve reliable network interactions. A network with trust-minimizing mechanisms means that it has reduced exposure to undesirable third-party actions and built-in incentives to reward good behavior while punishing bad behavior. 

## **Vault**: 

Token vaults are protocol level mechanisms used to contain staked tokens over time. Each vault contains a starting block height, ending block height (if applicable), along with a balance of tokens. 

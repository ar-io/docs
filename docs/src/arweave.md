﻿---
permalink: "/arweave/"
---

# Arweave

## The Permanence Pie

The permanent data storage ecosystem can be thought of as a three-tiered arrangement of protocols, services, and applications – dubbed here as “The Permanence Pie”.

<img class="amazingdiagram" :src="$withBase('/images/permanence-pie-1.png')">

<div class="caption">Diagram 1: The Shell of Permanence Pie</div>

The base layer of that pie is the Arweave protocol and network, which is the backbone of the permanent data storage ecosystem. It provides the infrastructure for data to be stored on the network in a decentralized manner and incentivizes nodes to keep the data stored for long periods of time.

The second layer is made up of services that sit on top of the Arweave protocol and network. These services include gateways, data retrieval services, and computation that help to provide a seamless and functional experience for users, creators, and developers.

Finally, the top layer of the pie consists of applications that utilize the data stored on the Arweave network. This includes everything from simple applications that allow users to access and view their data to complex, decentralized applications that use the Arweave network as their backbone.

Each layer of the Permanence Pie is crucial to the overall success and growth of the permanent data storage ecosystem. The Arweave protocol and network provide the foundation for data storage, the services layer helps to facilitate data retrieval and usage, and the application layer brings the benefits of the ecosystem to users and developers alike.

## What Is Arweave

Arweave is a decentralized Layer 1 data storage protocol optimized for long-term permanent storage through its unique proof of access mechanism and tokenomic endowment model. It can be thought of as a global, permissionless hard drive.

The information stored on Arweave is immutable and globally replicated by miner nodes. Instead of a traditional blockchain ledger which links blocks of transactions together in linear sequence, Arweave arranges blocks in a web known as the blockweave. These miner nodes secure the blockweave by operating the Succinct Proof of Random Access (SPoRA) algorithm. SPoRA requires miners to prove that they have access to recall randomly selected bits of weave data in order to produce and share a block. If successful, miners are rewarded in Arweave’s native AR token. These token rewards are derived from transaction fees as well as the network’s storage endowment. The endowment is a protocol-controlled pool of tokens designed to fund the projected cost of storage for 200+ years.

<img class="amazingdiagram" :src="$withBase('/images/permanence-pie-2.png')">

<div class="caption">Diagram 2: Arweave - The Base Storage Layer</div>

Arweave is file type agnostic – any type of file ranging from simple text files to family photos to complex web applications and archival databases can be stored on the network. To upload data, users must pay an amount of AR proportional to the size of the files being uploaded. Arweave is unique when compared with other decentralized storage solutions in that users only pay once to upload their files, then that is it – the files will be stored in perpetuity without any additional upkeep or subscription fees paid by the user.

The Arweave protocol is designed to handle 1,000 base layer transactions per block with new blocks being mined roughly every two minutes. Each transaction may also store an unbounded number of signed, non-AR-transacting data items assembled into a bundle (i.e., a bundled data item). Since its launch in 2018, this scalable architecture has allowed the network's weave size (total data stored on the network) to grow to 140.8 TB with approximately 1.5 billion base layer transactions and bundled data items submitted from over 181k unique wallets. The Arweave protocol endowment has received 60.7k AR to cover the projected storage costs with a cost of storage 0.858 AR/GiB. \* 

\* data as of November 20, 2023 

## Gateways

Gateways act as the front door to the permaweb. They are infrastructure utilities that sit above the base storage layer and allow users to write, access, and query the information stored on Arweave. Gateways are specialized nodes responsible for data ingest (data "in") and data egress (data "out").

For access / egress, gateways allow for data retrieval, caching, and serving as well as indexing transactions into a database that can be easily queried at scale. With bundling functionality, gateways can act as services allowing users to write and seed new data the Arweave network.

These "in and out" functions are not performed by the Arweave mining nodes which are optimized for securing the Layer 1 blockweave and replicating information throughout the network through a mechanism known as Wildfire.

<img class="amazingdiagram" :src="$withBase('/images/permanence-pie-3.png')">

<div class="caption">Diagram 3: Gateways - The Ingest and Access Component</div>

By taking on these responsibilities, gateways allow low cost and maintenance free hosting of static and dynamic content for users, creators, and developers. But there are costs associated with operating a gateway and Arweave does not offer any tokenomic incentives to offset these expenses. As the permaweb grows, these costs can become very significant.

Arweave.net, the primary community gateway, has scaled to meet the needs of the entire Arweave ecosystem and stored the entire weave. Over the last 6 months, this gateway indexed and cached approximately 3.4 million base layer transactions and bundled data items per day, served 233 million requests for data and node information per day, and responded to 3.2 million GQL queries per day. \* 

Gateway use cases, and the types of administrators who operate them, can range from at-home projects hosted by hobbyists to larger decentralized platforms and dApps run by small teams, all the way up to scaled out environments capable of supporting enterprise offerings.  

\* data as of November 20, 2023 

## aoComputer

AO is a global supercomputer built on Arweave. This actor-oriented machine is a single, unified computing environment, hosted on a heterogenous set of nodes in a distributed network. AO is designed to offer an environment in which an arbitrary number of parallel processes can be resident, coordinating through an open message passing layer. This message passing standard connects the machine's independently operating processes together into a 'web' -- in the same way that websites operate on independent servers but are conjoined into a cohesive, unified experience via hyperlinks.

<img class="amazingdiagram" :src="$withBase('/images/aoPie/permanence-pie-4b.png')">

<div class="caption">Diagram 4: AO - The Supercomputer and Smart Contract Protocol</div>

With AO, developers can create processes that act as smart contracts with token-like properties which can then be  used to incorporate incentive structures into applications and infrastructure. The AR.IO Network leverages this technology for development of its network protocol and IO token.

## The Permaweb

The permaweb is the third and final layer of the permanence pie. The permaweb stands for the permanent web, a collection of all the webpages, apps, and files stored on top of the Arweave network and enlivened with the functionality of the AR.IO Network. For users and builders, the permaweb offers low-cost, zero maintenance, permanent hosting of their web apps, files, and web pages.

<img class="amazingdiagram" :src="$withBase('/images/aoPie/permanence-pie-5b.png')">

<div class="caption">Diagram 5: The Permanence Pie</div>

AR.IO is a global network, protocol, and currency built on top of Arweave that enables the permaweb.

## References and Further Reading

The following resources were used as reference material for this section and can provide the interested reader with additional information:

- [The ArWiki](https://arwiki.wiki/)

- [Arweave GitHub repository](https://github.com/ArweaveTeam)

- [aoComputer](https://cookbook_ao.g8way.io/concepts/index.html)

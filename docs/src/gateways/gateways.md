﻿---
permalink: "/gateways/"
---

# Gateway Architecture

## Overview

A gateway’s primary role in the Arweave ecosystem is to act as a bridge between the Arweave network and the outside world. This means that a gateway's main task is to make it easier for users to interact with the Arweave network by simplifying the technical processes of writing, reading, and discovering data on the blockweave in a trust-minimized fashion.

The core functions of a general Arweave gateway are broken down into the following areas.

**Writing data involves:**

- Proxying Layer 1 transaction headers to one or more healthy and active Arweave nodes (miners) to facilitate inclusion in the mempools of as many nodes as possible.

- Proxying chunks for Layer 1 Arweave transactions to Arweave nodes to help facilitate storage and replication of the chunks on the blockweave.

- Receiving and bundling so-called Layer 2 data items (e.g., ANS-104 spec) as Layer 1 transactions.

**Reading involves retrieving:**

- Transaction headers for a Layer 1 Arweave transaction.

- Individual data chunks for a Layer 1 Arweave transaction.

- Blocks from the blockweave.

- Storage pricing rates for data from the Arweave node network.

- Contiguous streams of chunks representing an entire Layer 1 transaction.

- Layer 2 bundled data items (e.g., ANS-104).

- Wallet information (e.g., token balance).

**Discovering data involves:**

- Facilitating efficient, structured queries for Layer 1 and Layer 2 transaction and wallet data by:

  - examining incoming streams of data (i.e., directly ingested transactions and data items, blocks emitted by the chain, etc.).

  - managing index data in a database or analogous data store.

- Parsing and executing user queries.

- Facilitating friendly-path routing via Arweave manifest indexing.

## AR.IO Gateway Benefits

AR.IO gateways provide many new benefits and capabilities beyond general Arweave gateways:

- Providing the modularity and configurability necessary for operating extensible gateways that can be deployed at small or large scales to meet the needs of specific applications, use cases, communities, or business models.

- Providing pluggable means for consuming telemetry data for internal and external monitoring and alerting.

- Facilitating friendly-subdomain-name routing to Arweave transactions via a direct integration with the Arweave Name System (ArNS).

- Facilitating configurable content moderation policies.

- Providing connectivity to a decentralized network of other AR.IO gateways, enabling data sharing and other shared workloads.

## Gateway Modularity

A design principle of AR.IO gateways is that their core components should be interchangeable with compatible implementations.

The core services in the gateway are written in Typescript, with flexible interfaces to the various subsystems and databases. This allows operators to customize their gateway to meet their specific requirements. Gateway services can be turned on or off depending on the operator's needs. For example, an operator might choose to have their gateway serve data, but not actively index Layer 2 bundled data.


<img class="amazingdiagram" :src="$withBase('/images/diagram-7-3-modded.png')">


This flexibility also allows operators to utilize the technologies that are appropriate for the scale and environments in which they operate.

For example, small scale operators might want to use low-overhead relational databases to power their indexing while larger scale operators might opt to use cloud-native, horizontally scalable databases. Analogous examples for storage and caching exist as well.

<div style="text-align: center">
    <table class="inline-table">
        <tr>
            <th colspan="5" style="font-weight: bold">Gateway Tech Stack Options</th>
        </tr>
        <tr>
            <th>Topology</th>
            <th>Chain Index</th>
            <th>Bundle Index</th>
            <th>Data Index</th>
            <th>Data Store</th>
        </tr>
        <tr>
            <td style="font-weight:bold">Small</td>
            <td>SQLite</td>
            <td>SQLite</td>
            <td>SQLite</td>
            <td>Local File System</td>
        </tr>
        <tr>
            <td style="font-weight:bold">Large</td>
            <td>PostgreSQL</td>
            <td>Cassandra</td>
            <td>Cassandra</td>
            <td>S3 Compatible</td>
        </tr>
    </table>
</div>

## ARNS Indexing and Routing

The Arweave Name System’s (ArNS) state is managed by the ARIO token’s smart contract. AR.IO gateways shall perform the following minimum functions relative to ArNS:

- Actively track state changes in the contract.

- Maintain up-to-date indexes for routing configurations based on the state of the ARIO contract as well as the states of the Arweave Name Token (ANT) contracts to which each name is affiliated.

- Manage the expiration of stale records.

- Facilitate ArNS routing based on the subdomains specified on incoming requests where appropriate.

- Provide a custom HTTP response header for ArNS requests indicating the corresponding Arweave transaction ID.

## Content Moderation

The AR.IO Network will adopt Arweave’s voluntary content moderation model whereby every participant of the network has the autonomy to decide which content they want to (or can legally) store, serve, and see. Each gateway operating on the network has the right and ability to blocklist any content (or address) that is deemed in violation of its content policies or non-compliant with local regulations. 

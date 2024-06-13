﻿---
permalink: "/arns/"
---

# Arweave Name System (ArNS)

## Overview

Arweave URLs and Transaction IDs are long, difficult to remember, and occasionally miscategorized as spam. The Arweave Name System (ArNS) aims to resolve these problems in a decentralized manner. ArNS is a censorship-resistant naming system stored on Arweave, purchased with IO tokens, enabled through AR.IO gateway domains, and used to connect friendly domain names to permaweb dApps, web pages, data, and identities.

It's like an open, permissionless address book for anything on the permaweb, powered by the aoComputer.

This system works similarly to traditional DNS services, where users can purchase a name in a registry and DNS Name servers resolve these names to IP addresses. The system shall be flexible and allow users to purchase names permanently or lease them for a defined period based on their use case. With ArNS, the registry is decentralized, permanent, and stored on Arweave (through the aoComputer). This means that apps and infrastructure cannot just read the latest state of the registry but can also check any point in time in the past, creating a “Wayback Machine” of permanent data.

Users can register a name, like *ardrive*, within the ArNS Registry. Before owning a name, they must create an Arweave Name Token (ANT), an aoCOmputer process and open-source protocol used by ArNS to track the ownership and control over the name. ANTs allow the owner to set a pointer to any type of permaweb data, like a page, dApp or file, via its Arweave Transaction ID.

Each AR.IO gateway acts as both a smart contract cache and an ArNS Name resolver. They will generate the latest state of both the ArNS Registry and its related ANTs and serve this information rapidly for apps and users. AR.IO gateways will also resolve that name as one of their own subdomains, e.g., *https://ardrive.arweave.net* and proxy all requests to the associated Arweave Transaction ID. This means that ANTs work across all AR.IO gateways that support them: *https://ardrive.ar-io.dev*, *https://ardrive.g8way.io/*, etc.

Users can easily reference these friendly names in their browsers, and other applications and infrastructure can build rich solutions on top of these ArNS primitives.


<img class="amazingdiagram" :src="$withBase('/images/aa-diagram-1.png')">

<div class="caption">Arweave Name System Interactions</div>

## Name Registry

The ArNS Registry is a list of all the registered names and their associated ANT smart contract addresses. Registering a name requires spending IO tokens based upon the name length and purchase type. The system shall allow users to either lease a name on a yearly basis (maximum up to 5 years) or purchase that name permanently.

The registry uses the following key rules, embedded within the AR.IO smart contract:

- The genesis prices of names are set within the contract itself; these are the starting conditions.
- Name prices vary based on name length, purchase type (lease vs buy), lease duration, and the current Demand Factor. See the Dynamic Pricing section for more details.
- Name records in the registry each include a pointer to its Arweave Name Token Smart Contract process address, its lease end time, and undername allocation.
- Anyone with available IO Tokens can extend any name’s active lease.
- Anyone with available IO Tokens can purchase undername space for any name.
- When a lease expires, there is a grace period where it can still be extended before anyone else can repurchase the name with a new ANT.

Once added, name records cannot be removed from the registry. A leased name’s associated ANT smart contract address cannot be changed until the lease has expired and a new one is purchased. Care must be taken by the owners of permanent name purchases to ensure that their ANT supports an `evolve` ability should it be desired to add or modify functionality in the future as these name purchases are permanently tied to the associated ANT. Owners of permanently purchased names must understand the consequences of private key loss, which results in not being able to update any data pointers for this name.

### Name Validation Rules

All names registered shall meet the following criteria:

1. Valid names include only numbers 0-9, characters a-z and dashes.
2. Dashes cannot be leading or trailing characters.
3. Dashes cannot be used in single character domains.
4. 1 character minimum, 51 characters maximum.
5. Shall not be an invalid name predesignated to prevent unintentional use/abuse such as www.

## Arweave Name Token (ANT)

To establish ownership of a record in the ArNS Registry, each record contains both a friendly name and a reference to an Arweave Name Token, ANT. Name Tokens are unique aoComputer process tokens that give their owners the ability to update the Arweave Transaction IDs that their associated friendly names point to.

The ANT process is a standardized contract that contains the specific ArNS Record specification required by AR.IO gateways who resolve ArNS names and their Arweave Transaction IDs. It also contains other basic functionality to establish ownership and the ability to transfer ownership and update the Arweave Transaction ID.

Name Tokens have an owner, who can transfer the token and control all of its modifiable settings. These settings include modifying the time to live (*ttl*) for each name contained in the ANT, and other settings like the ANT Name, Ticker, and an ANT Controller. The controller can only manage the ANT and set and update records, name, and the ticker, but cannot transfer the ANT. Note that ANTs are initially created by an end user, in accordance with network standards, who then has to ability to transfer its ownership or assign a controller as they see fit.

Secondary markets could be created by ecosystem partners that facilitate the trade of Name Tokens. Additionally, tertiary markets could be created that support the leasing of these friendly names to other users. Such markets, if any, would be created by third parties unrelated to and outside of the scope of this paper or control of the Foundation.

The table below indicates some of the possible interactions with an ANT and who can perform them:

<center>
<table class="inline-table">
  <tr>
    <th style="text-align: center" colspan="4">ANT Interactions</th>
  </tr>
  <tr>
    <th>Type</th>
    <th>ANT Owner</th>
    <th>ANT Controller</th>
    <th>Any IO Token Holder</th>
  </tr>
  <tr>
    <td>Transfer ANT</td>
    <td>✔</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Add / remove controllers</td>
    <td>✔</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Set records (pointers)</td>
    <td>✔</td>
    <td>✔</td>
    <td></td>
  </tr>
  <tr>
    <td>Update records, name, ticker</td>
    <td>✔</td>
    <td>✔</td>
    <td></td>
  </tr>
  <tr>
    <td>Extend / renew lease</td>
    <td>✔</td>
    <td>✔</td>
    <td>✔</td>
  </tr>
  <tr>
    <td>Increase undernames</td>
    <td>✔</td>
    <td>✔</td>
    <td>✔</td>
  </tr>
</table>
</center>

<div class="caption">ANT Interactions</div>

### Under_Names

ANT owners and controllers can configure multiple subdomains for their registered ArNS name known as “under_names” or more easily written “undernames”. These undernames are assigned individually at the time of registration or can be added on to any registered name at any time.

Undernames use an underscore “`_`” in place of a more typically used dot “`.`“ to separate the subdomain from the main ArNS domain.

This means users can trust *dapp_ardrive* just like you would trust ardrive since the owner of *ardrive* is the only one who can configure *dapp_ardrive*.

Some other features that undernames allow include:

- Undernames are configured in the ANT that is referenced for a given name. ANT owners can add more undernames as *subDomains* in the ANT’s records object, each of which can point to a different Arweave Transaction ID.
- Each registered name is provided with an allocation of 10 undernames by default. Additional undername space can be purchased individually and as needed.
- Other users could never register a name that resembles an undername on ardrive since “\_” is not allowed to be registered in the ArNS registry.
- Another user can register *dapp-ardrive* but this is a separate ArNS domain altogether. In traditional DNS, it’s like the difference in trusting *dapp-ardrive.io*(suspicious!) over the legitimate dapp.ardrive.io
- Undernames can go multiple levels deep, like *version_dapp_ardrive* but must not be longer than the total *MAX_NAME_LENGTH* of an ArNS name. The total amount of characters for a name string consisting of undernames and underscore separators is 63 characters.

Undernames give more versatility and utility to owning an ArNS name.

## Addressing Variable Market Conditions

The future market landscape is unpredictable, and the AR.IO Network smart contract is designed to be immutable, operating without governance or mechanisms for manual intervention. In addition, the traditional method of employing a pricing oracle to fix prices relative to a stable currency is not viable due to the infancy of the network as well as the inherent reliance on outside dependencies. Considering this, ArNS is designed to be self-contained and adaptive, ensuring that name prices always mirror network activity and market conditions.

To achieve this, ArNS incorporates a dynamic pricing model that utilizes a “Demand Factor” to adjust fees in line with ArNS purchase activity.

ArNS is designed to ensure that name valuations are always in sync with their true market worth, despite the unchangeable nature of the smart contract it operates on.

## Dynamic Pricing Model

The Arweave Name System (ArNS) introduces an adaptive pricing model for registering names within the AR.IO Network. The core objective is to strike a balance between market demand and pricing fairness, leveraging both static and dynamic pricing elements. The system differentiates prices based on character lengths of names and offers varied purchasing options such as leasing, permanent acquisition, and undernames.

A unique feature of the ArNS pricing mechanism is the integration of a Demand Factor (DF), a dynamic multiplier that adjusts name prices in response to market demand. The DF is determined by comparing the total revenue in IO tokens from the current period to a moving average of revenues from the preceding period window. Depending on whether revenue is above, below, or equal to this average, the DF can increase or decrease. These adjustments are contained within boundaries to prevent extreme pricing variations.

This comprehensive approach ensures that ArNS names are accessible and reasonably priced, adapting to market trends while maintaining an equitable and maintenance-free registration environment.

### Pricing Scenarios

There are several pricing models for leasing and purchasing names:

- **Leased Name**: Allows a user to lease a name for a certain duration and have it available for use immediately by the lessee.

- **Permanent Name**: Allows a user to purchase a name permanently and have it available for use immediately by the owner.

### Dynamic Pricing Mechanics

Names are initially priced according to the Genesis Registration Fee (GRF), as set in the AR.IO smart contract, with prices varying based on the length of the name. As the network's activity progresses, these fees give way to Base Registration Fees (BRF), which are modified by periodic step adjustments. The Demand Factor (DF) is a crucial component that dynamically scales prices, fluctuating with the network’s revenue trends.

Revenue in the network accumulates within the Protocol Balance through various streams, such as instant name leases or purchases, lease extensions, and under_name transactions. This cumulative revenue impacts the Demand Factor, which in turn influences the current name prices.

The DF is adjusted by comparing the recent period’s revenue against a Revenue Moving Average (RMA) from the preceding seven periods. Based on this comparison, the DF can either increase, to reflect greater demand, or decrease, in response to diminished revenue, all within predetermined limits to prevent drastic fluctuations in pricing

The pricing system articulates various fees:

- The Adjusted Registration Fee (ARF) is the BRF modified by the DF.

- The Annual Fee is set as a proportion of the ARF.

- Instant Lease Registration and Permabuy prices are derived from the ARF, adding the calculated annual fees over the desired years.

The DF’s modifications are controlled by the network's recent performance against the RMA. An increase in revenue leads to a DF rise, signifying a thriving market demand, while a decrease indicates the opposite. This responsive adjustment mechanism ensures that the pricing model remains aligned with actual market activity.

Under_names are bundled with name registrations with additional ones available for purchase. The cost for extra under_names is a percentage of the current BRF, altered by the DF.

### Step Pricing Mechanics

The dynamic model shall utilize a “Step Pricing” concept that acts as a stabilizing mechanism to counteract swift and dramatic market shifts, ensuring registration costs remain aligned and predictable. Step pricing adjusts the Base Registration Fees when the Demand Factor reaches its minimum value for an extended period, updating the BRF to align with the current ARF, and resetting the DF to a neutral value. This allows for base prices to lower in extended droughts of low demand or high token value resulting in lower revenue generated to the protocol balance.

The below chart represents Step Pricing in action:

<img class="amazingdiagram" :src="$withBase('/images/aa-diagram-2.png')">
<div class="caption">Step Pricing Action - Declining Demand</div>

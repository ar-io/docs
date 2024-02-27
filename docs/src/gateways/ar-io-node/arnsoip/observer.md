---
next: false
---

# Observation and Incentives

## Overview

The Observation and Incentive Protocol is designed to maintain and enhance the operational integrity of gateways on the AR.IO Network. It achieves this through a combination of incentivizing gateways for good performance and tasking those gateways to fulfill the role of "observers". The protocol is intentionally simple and adaptable, employing a smart contract-based method for onchain “voting” to assess peer performance while being flexible on how that performance is measured. This setup permits gateway and observer nodes to experiment and evolve best practices for performance evaluation, all while operating within the bounds of the network's immutable smart contract, thus eliminating the need for frequent contract updates (forks). 

In this protocol, observers evaluate their gateway peers' performance to resolve ArNS names. Their aim is to ensure each gateway in the network accurately resolves a subset of names and assigning a pass / fail score based on their findings. 

A key component of the protocol is its reward mechanism. This system is predicated on gateway performance and compliance with observation duties. Gateways that excel are tagged as "Functional Gateways" and earn rewards, while those that do not meet the criteria, “Deficient Gateways” risk facing penalties – namely, the lack of rewards. 

Funds for incentive rewards are derived from the protocol balance, which consists of IO tokens collected from ArNS asset purchases. Every epoch, this balance is utilized to distribute rewards to qualifying gateways and observers based on certain performance metrics. 

## Observation Protocol 

The Observation protocol is organized around epochs, periods of time that are broken into an observation reporting and tallying phase. The protocol is followed across each epoch, promoting consistent healthy network activity that can form pro-social behaviors and react to malicious circumstances.  

<img class="amazingdiagram" :src="$withBase('/images/observer-1.png')">
<div class="caption">Observation and Incentive Protocol</div>

- To participate in the epoch, a gateway must have already staked IO tokens and joined the network before it starts. 
- Each epoch (approximately 7 block-days), a random pool of active gateways will be selected (prescribed) to perform observation duties.  
- Within the epoch, observers are tasked with evaluating a subset of ArNS names for each gateway in the network.  
- By the end of the epoch’s observation reporting period, the observer must upload its standardized health observation report to Arweave. 
- The observer must also submit a SmartWeave interaction to the AR.IO contract to save its report transaction ID and a summary of all failed gateways for tallying by the incentive protocol. 
- After the observation reporting period and tallying periods have closed, the payout is performed on the next contract state tick. 
  - This payout rewards gateways and observers who have performed their duties. 
  - Gateways that did not meet the performance threshold will not receive rewards. 
  - Observers that did not perform their duties are not rewarded and in addition, are penalized on any gateway rewards received. 
- Community builders and application users can verify and leverage the report and distribution information to make more informed decisions on which gateway to use. 

## Onchain Reports

The to-be-evaluated ArNS names include a set of names randomly determined by the protocol, known as “prescribed names”, which are common across all observers within the epoch, as well as a set of “chosen names” picked at the discretion of each individual observer. “Prescribed names” are assigned to act as a common denominator / baseline while “chosen names” allow each observer to evaluate names that may be important to their operation. 

Each observer shall assess the performance of the selected ArNS names (across all gateways) and summarize those findings in a report which details the following: 

- General Information: Observer's Arweave address, starting and concluding block heights for the epoch. 

- Gateway Operator Assessment: The expected and actual Arweave addresses of observed gateways, along with a summary verdict (pass or fail), and accompanying reasons for failure. 

- Detailed ArNS Evaluations: For each gateway, it includes the domain name, evaluated ArNS names, the associated block height, transaction IDs, data hashes, a "pass or fail" score, reasons for failure (if any), and performance metrics like time to the first byte. 

A comprehensive list of report criteria can be found in the Appendix. 

Observers shall upload their completed reports (in JSON format) to the Arweave network as an onchain audit trail. In addition, observers shall submit an interaction to the AR.IO SmartWeave contact detailing each gateway that they observed to have “failed” their assessments. This is tallied and used to determine the reward distribution. 

## Selection of Observers

The observer selection process employs a random-weighted selection method. By combining random selection with weighted criteria like stake, tenure, and past rewards, the process aims to ensure both fairness and acknowledgment of consistent performance. This method allows for a systematic yet randomized approach to selecting gateways for observation tasks.  

### Criteria for Selection 

Up to 50 gateways can be chosen as observers per epoch. If the GAR contains 50 or fewer gateways, then every gateway is designated as an observer for that epoch. If there are greater than 50, then randomized selection shall be utilized. 

The weighted selection criteria will consider the following for each gateway: 

- Stake Weight (SW): This factor considers how financially committed a gateway is to the network. It is the ratio of the amount of IO tokens staked by the gateway relative to the network minimum and is expressed as SW = Gateway Stake / Minimum Stake. 

- Tenure Weight (TW): This factor considers how long a gateway has been part of the network, with a maximum value capped at 4. It is calculated as TW = Gateway Network Tenure / 6 block-months. This means that the maximum value is achieved after 2 block-years of participation in the network. 

- Gateway Reward Ratio Weight (GRRW): This factor is a proxy for a gateway’s performance at resolving ArNS names. The weight represents the ratio of epochs in which a gateway received rewards for correctly resolving names relative to their total time on the network. 

- Observer Reward Ratio Weight (ORRW): This factor is a proxy for a gateway’s performance at fulfilling observation duties. The weight reflects the ratio of epochs in which a gateway, as an observer, successfully submitted observation reports relative to their total periods of service as an observer. 

### Weight Calculation and Normalization

For each gateway, a composite weight (CW) is computed, combining the Stake Weight, Tenure Weight, Gateway Reward Ratio Weight, and Observer Reward Ratio Weight.  

The formula used is: `CW = SW x TW x GRRW x ORRW`. 

These weights are then normalized across the network to create a continuous range, allowing for proportional random selection based on the weighted scores. The normalized composite weight (N_CW) for each gateway indicates its likelihood of being chosen as an observer and is calculated by dividing the gateway's CW by the sum of all CWs. 

### Random Selection Process 

The selection of observers is randomized within the framework of these weights. A set of unique random numbers is generated within the total range of normalized weights. For each random number, the gateway whose normalized weight range encompasses this number is selected. This system ensures that while gateways with higher weights are more likely to be chosen, all gateways maintain a non-zero chance of selection, preserving both fairness and meritocracy in the observer assignment process. 

## Performance Evaluation

Consider the following classifications: 
 
- **Functional or Passed Gateways**: are gateways that meet or surpass the network’s performance and quality standards. 

- **Deficient or Failed Gateways**: are gateways that fall short of the network's performance expectations. 

- **Functional or Submitted Observers**: are selected observers who diligently perform their duties and submit observation reports and contract interactions. 

- **Deficient or Failed Observers**: are selected observers who do not fulfill their duty of submitting observation reports and contract interactions. 

At the end of an epoch, the smart contract will assess the results from the observers during a “tallying period” and determine a pass / fail score for each gateway: 

- If greater than or equal to 50% of submitted observer contract interactions indicate a PASS score, then that gateway is considered Functional and eligible for gateway rewards. 

- Else, if greater than 50% of submitted observer contract interactions indicate a FAIL score, then that gateway is considered Deficient and ineligible for gateway rewards. 

 

These results will determine how reward distributions are made for that epoch. Rewards shall be distributed after the epoch’s tallying period is complete. 

## Reward Distribution

Each epoch, a defined portion of the protocol balance (e.g., 0.25%) is earmarked for distribution as rewards. From this allocation, two distinct reward categories are derived: 

1. Base Gateway Reward: This is the portion of the reward allocated to each Functional Gateway within the network and is calculated as: 

      `[Epoch Reward Allocation x 95% / Total Gateways in the Network]` 

2. Base Observer Reward: Observers, due to their additional responsibilities, have a separate reward calculated as:  

      `[Epoch Reward Allocation x 5% / Total Selected Observers for the Epoch]` 

### Distribution Based on Performance 

The reward distribution is contingent on the performance classifications derived from the Performance Evaluation: 

- Functional Gateways: Gateways that meet the performance criteria receive the Base Gateway Reward. 

- Deficient Gateways: Gateways falling short in performance do not receive any gateway rewards. 

- Functional Observers: Observers that fulfilled their duty receive the Base Observer Reward. 

- Deficient Observers: Observers failing to meet their responsibilities do not receive observer rewards. Furthermore, if they are also Functional Gateways, their gateway reward is reduced by 25% for that epoch as a consequence for not performing their observation duty. 

### Undistributed Rewards 

In cases where rewards are not distributed, either due to the inactivity or deficiency of gateways or observers, the allocated tokens shall remain in the protocol balance and carry forward to the next epoch. This mechanism is in place to discourage observers from frivolously marking their peers as offline in hopes of attaining a higher portion of the reward pool. 

## Handling Inactive Gateways

To maintain network efficiency and reduce contract state bloat, gateways that are consistently offline, specifically for six (6) consecutive epochs, and thus fail to receive rewards, will be automatically removed from the Gateway Active Registry (GAR) as well as have their staked IO tokens unlocked and returned to the gateway operator. 

## Observer Report Details

Each observer shall assess the performance of the selected ArNS names (across all AR.IO gateways) and summarize those findings in a report which details the following: 

## General Information

- The observer's Arweave address.
- The starting block height of the epoch.
- The block height at which the report was generated.

## Overall Gateway Operator Assessment

- Gateway FQDN. 
- The Arweave address that the observer expects to be the owner / operator of the gateway. 
- The Arweave address that the observed gateway actually reports. 
- A final “pass or fail” rollup determination for each observed gateway. 
- Failure reason (if applicable). 

## ArNS Assessments

- Observed ArNS name (for all prescribed and chosen names). 
- The block height at which the name was assessed. 
- The expected status code. 
- The resolved status code.  
- The transaction ID that the observer expects the associated name to resolve to. 
- The transaction ID that the gateway actually resolves to. 
- The data hash that the observer expects the associated name to resolve to. 
- The data hash that the gateway actually resolves to. 
- The “pass or fail” score associated with the observed name, at the observer’s discretion. 
- Failure reason (if applicable). 
- Timing / performance information associated with the name resolution such as time to first byte and total duration. 

The above is repeated for the entire name pool and across each gateway in the GAR.  

## Example Observation Report

[https://arweave.net/GG1YCFc7wQxKvQ1qD1lTEp2OAMBs4VzrpfdmeeLyjDI ](https://arweave.net/GG1YCFc7wQxKvQ1qD1lTEp2OAMBs4VzrpfdmeeLyjDI )

## Viewing Observation Reports

You can easily view an observation report in a human readable format through your terminal with the following command:

```bash
curl -L https://arweave.net/<txId> | zcat | jq .
```

Be sure to replace `<txId>` with the txId of the report you want to view.

### example

```bash
curl -L https://arweave.net/H3zDmoDkpOg0U95rejBEq6gUnww_CEVscTuQVqfSbxk | zcat | jq .
```

# Registering an ArNS name

## Overview

There are two options when registering an ArNS name. You can purchase the name outright, or lease it for a period of 1 to 5 years. Registrations are further broken down into instant buys, and [dutch auctions](../../arns.md#bid-initiated-dutch-auctions-bida). Auctions are required for purchases of certain names in a specified character length range. Find more information about when an auction is required, as well as the rules an ArNS name must follow to be valid [here](../../arns.md#name-validation-rules).

## Connect Your Wallet

In order to purchase ArNS names, you will need to have a connected Arweave wallet in order to sign and pay for the transaction. Connect your wallet by clicking the "Connect" button in the top right, and following the prompts.

<!-- Format video to be firefox compatible:

ffmpeg -i input.mp4 -s 1280x720 -c:v libx264 -preset slow -crf 18 -c:a aac -vf  format=yuv420p output.mp4 -->

<video class="amazingdiagram" controls>
  <source :src="$withBase('/videos/connect-wallet.mp4')" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Checking Availability

The home page of [arns.app](https://arns.app) features a search box for checking if a specific ArNS name is available for registration. Indicators below the box can help to make sure you are complying with the technical requirements for name validity as you type.

<img class="amazingdiagram" :src="$withBase('/images/arnshome.jpeg')">

Simply type out the name you would like to register and click on the search icon next to the text box. A check will be performed to let you know if your chosen name is available or already in use.

**NOTE**: 1 to 4 character names are not available during the testnet.

<img class="amazingdiagram" :src="$withBase('/images/arns-name-unavailable.jpeg')">

<center>or</center>

<img class="amazingdiagram" :src="$withBase('/images/arns-name-available.jpeg')">

If a name is unavailable, information about the name's registration period and current owner will be displayed. If it is available, a "Register" button will appear, allowing you to move to the next step in registration.

## Configure Your Purchase

After clicking "Register" on a valid and available name, you will be prompted to connect a wallet using [ArConnect](https://www.arconnect.io/) if you have not already done so. Support for other wallets will be added in the future.

Once you are connected, you will be shown a page to configure your purchase. You will be able to select if you want to lease or buy the name, and the length of the lease. A notice will appear if your purchase requires an auction.

<img class="amazingdiagram" :src="$withBase('/images/arns-auction-notice.jpeg')">

You can also use this page to assign the name to an existing [Arweave Name Token (ANT)](../../arns.md#arweave-name-token-ant), or set an Arweave Transaction ID (Target ID) for the name to resolve to. You will be able to set or change the Target ID after your purchase from the asset management page.

<img class="amazingdiagram" :src="$withBase('/images/arns-name-configure.jpeg')">

Towards the bottom of the page, you can also see the cost of your currently configured purchase in [ARIO tokens](../../token.md), and the AR required to pay for gas for the transaction.

## Confirm Your Purchase

The final page before submitting your purchase shows a summary of your purchase. If everything looks correct, click on the "confirm" button to finalize the transaction. Remain on the page while the transaction processes.

<img class="amazingdiagram" :src="$withBase('/images/arns-name-confirmation.jpeg')">

<br/>

<img class="amazingdiagram" :src="$withBase('/images/arns-name-success.jpeg')">

## Auctions

No additional steps are necessary to initiate a purchase that requires an auction. However, the name will not immediately become yours. Instead, confirming your purchase will begin the auction.

<img class="amazingdiagram" :src="$withBase('/images/arns-auction-started.jpeg')">

The ARIO cost displayed on the confirmation page will be frozen by the aoComputer contract, and used to finalize the purchase once the the auction drops to the floor price. You, or anyone else, may purchase the name at any time for the current auction price. You can click on the "View Auction" button from your confirmation page, or find your auction in the "Live Auctions" tab at the top of the screen to view the current auction price, and how it will change over time. If someone else purchases the name prior to the auction reaching the floor price, your frozen tokens will be released to you.

<img class="amazingdiagram" :src="$withBase('/images/arns-auction-chart.jpeg')">

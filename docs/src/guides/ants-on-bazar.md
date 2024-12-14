---
permalink: /guides/ants-on-bazar
prev: false
next: false
---

# Trading ANTs on Bazar

## Overview

[Arweave Name Tokens](../arns.md#arweave-name-token-ant) are [Atomic Asset Spec](https://github.com/permaweb/ao-permaweb/blob/asset-manager/services/assets/spec.md) compliant AO tokens that manage records and permission for ArNS names. Because the ANT spec is compliant with the Atomic Asset Spec, they are tradable on [Bazar](https://bazar.arweave.net), which is a decentralized market place for Atomic Assets on AO. There are a few simple steps that are required in order to make an ANT available on Bazar to be traded.

## Bazar Profile

Bazar relies on [profiles](https://bazar.g8way.io/#/docs/overview/profiles) for displaying user information and tradable assets. Profiles are AO processes that contain user specified information like a name, a nickname, and images associated with the profile. Profiles also track assets held by the profile in order to provide their information to bazar.

### Create a Profile

If you do not already have a profile associated with your wallet, you can easily create one on using the "Create your profile" button on bazar after connecting your wallet:

<img class="largerdiagram" :src="$withBase('/images/bazar-create-profile1.png')">

You will be prompted to add, at a minimum, a name and handle (nickname) to associate with the profile. These values can be changed later.

<img class="largerdiagram" :src="$withBase('/images/bazar-create-profile2.png')">

Click "Save" at the bottom to finish creation of your profile.

Once your profile is created, you can get its ao process Id at any time by clicking on the user icon in Bazar, and then the "Copy profile address" button from the menu.

<img class="largerdiagram" :src="$withBase('/images/bazar-create-profile3.png')">

## Transfer ANT to the Profile

Bazar profiles only track assets that are held in the profile process, not in a user wallet. In order for an ANT to be displayed and transferred on Bazar, it must first be transferred into the Bazar profile. This can be done easily using [arns.app](https://arns.app) in your manage page for a given name.

<img class="largerdiagram" :src="$withBase('/images/bazar-transfer-name1.png')">
</br></br>
<img class="largerdiagram" :src="$withBase('/images/bazar-transfer-name2.png')">

Once an ANT is transferred into the profile process, it will automatically be detected and displayed by Bazar. It can be transferred or sold just like any other atomic asset on the marketplace, with no additional steps required.

## Restore Controllers

::: tip Optional
This is an optional step that will enable updating an ANT's Target Id without transferring it back into your wallet. This step may be safely skipped without affecting the ANT's functionality or tradability on Bazar.
:::

Transferring an ANT to a new wallet or AO process resets all authorized controllers, or non-owner entities that are allowed to update some settings on the ArNS name. It does not reset the Target Id that the ArNS name is pointing to. If you want to be able to update the Target ID and undernames from your wallet using arns.app, you will need to set your wallet address as a controller for the ANT while it is in your profile. The easiest way to do this is using aos.

If you have not used aos before, you can find installation instructions [here](https://cookbook_ao.arweave.net/welcome/getting-started.html)

Using aos, you can log directly into your profile process with the command:

```bash
aos <profile-address> --wallet "/path/to/your/keyfile"
```

Be sure to replace `<profile-address>` with the process Id for your profile process, and `/path/to/your/keyfile` with the path to the keyfile for the wallet you created the profile with.

Once you are logged in with aos, you can send a message to the ANT in your profile to set your wallet as a controller:

```bash
Send({ Target = "<Ant-Process-ID>", Action = "Add-Controller", Controller = "<Wallet-Address>" })
```

Replace `<Ant-Process-ID>` with the process Id of the ANT you transferred into your profile, and `<Wallet-Address>` with your wallet address.
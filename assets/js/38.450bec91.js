(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{329:function(t,e,a){"use strict";a.r(e);var n=a(10),s=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"delegated-staking-settings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#delegated-staking-settings"}},[t._v("#")]),t._v(" Delegated Staking Settings")]),t._v(" "),e("h2",{attrs:{id:"overview"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),e("p",[t._v('Gateway operators can choose to allow other people to stake tokens on their gateway. This is called "delegated staking", and it increases the number of tokens staked, which increases the likelihood of a gateway being chosen as an observer and potentially receive additional rewards for a given epoch (assuming that the gateway\'s observer is working properly). To incentivize this, you can set a portion of your gateway and observer rewards to be given to the people who stake on your gateway.')]),t._v(" "),e("p",[t._v("By default, delegated staking is disabled. You will need to enable it, and configure your settings, by running the "),e("code",[t._v("update-gateway-settings")]),t._v(" script from the "),e("a",{attrs:{href:"https://github.com/ar-io/testnet-contract",target:"_blank",rel:"noopener noreferrer"}},[t._v("testnet contract repo"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("h2",{attrs:{id:"installing-the-testnet-contract-repo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installing-the-testnet-contract-repo"}},[t._v("#")]),t._v(" Installing the Testnet Contract repo")]),t._v(" "),e("p",[t._v("Enabling delegated staking can be accomplished very easily by running a script found in the "),e("a",{attrs:{href:"https://github.com/ar-io/testnet-contract",target:"_blank",rel:"noopener noreferrer"}},[t._v("testnet-contract repo"),e("OutboundLink")],1),t._v(" on Github.")]),t._v(" "),e("p",[t._v("If you already have the repo installed, make sure that it is updated to the latest version by opening it in a terminal and running "),e("code",[t._v("git pull")]),t._v(".")]),t._v(" "),e("p",[t._v("If you receive an error, try "),e("code",[t._v("git stash")]),t._v(" to remove any changes you may have made locally and then "),e("code",[t._v("git pull")]),t._v(" again.")]),t._v(" "),e("p",[t._v("If you do not have the repo installed, make sure that you have "),e("a",{attrs:{href:"https://git-scm.com/downloads",target:"_blank",rel:"noopener noreferrer"}},[t._v("git"),e("OutboundLink")],1),t._v(" installed on your computer, navigate to the location where you would like to save it, and run")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/ar-io/testnet-contract\n")])])]),e("p",[t._v("This will copy all of the files from github into a new folder on your computer.")]),t._v(" "),e("h2",{attrs:{id:"installing-dependencies"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installing-dependencies"}},[t._v("#")]),t._v(" Installing dependencies")]),t._v(" "),e("p",[t._v("Once the repo is installed, you need to install the code that it relies on to work. We do this using "),e("a",{attrs:{href:"https://yarnpkg.com/getting-started/install",target:"_blank",rel:"noopener noreferrer"}},[t._v("Yarn"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("p",[t._v("Navigate your terminal into the newly created repo folder.")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" testnet-contract\n")])])]),e("p",[t._v("and then install dependencies with:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n")])])]),e("h2",{attrs:{id:"providing-wallet"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#providing-wallet"}},[t._v("#")]),t._v(" Providing Wallet")]),t._v(" "),e("p",[t._v("In order to update your gateway settings, you need to run the script using the wallet associated with your gateway. You can provide this wallet by saving a keyfile in the testnet-contract repo, and name the file "),e("code",[t._v("key.json")]),t._v(".")]),t._v(" "),e("p",[t._v("You will need a small amount of AR in this wallet, in addition to the IO tokens, in order to pay for the contract interaction.")]),t._v(" "),e("h2",{attrs:{id:"editing-the-script"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#editing-the-script"}},[t._v("#")]),t._v(" Editing the Script")]),t._v(" "),e("p",[t._v("You will need to edit the script to give it the correct information for when it runs. You can do this by opening the file, located at "),e("code",[t._v("testnet-contract > tools > update-gateway-settings.ts")]),t._v(" in any code or text editor. Once you have the file open, you will need to look for these lines:")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Enable or disable delegated staking.  If true, other token holders can delegate their stake to this gateway")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// const allowDelegatedStaking: boolean = true;")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Number between 0-100 indicating the percent of gateway and observer rewards given to delegates eg. 30 is 30% distributed to delegates")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The default is 0")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// const delegateRewardShareRatio: number = 10;")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The minimum stake a delegate must use for this for this gateway.  Must be greater than the contracts minimum delegated stake")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// The default is 100")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// const minDelegatedStake: number = 200;")]),t._v("\n")])])]),e("center",[e("img",{attrs:{src:t.$withBase("/images/updateSettings1.png")}})]),t._v(" "),e("p",[t._v("Uncomment the following lines by removing the "),e("code",[t._v("//")]),t._v(" at the beginning of the line:")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("// const allowDelegatedStaking: boolean = true;")])]),t._v(" "),e("li",[e("code",[t._v("// const delegateRewardShareRatio: number = 10;")])]),t._v(" "),e("li",[e("code",[t._v("// const minDelegatedStake: number = 200;")])])]),t._v(" "),e("p",[t._v("These are the lines that will determine the settings your gateway will use once delegated staking is enabled.")]),t._v(" "),e("p",[e("code",[t._v("allowDelegatedStaking")]),t._v(" is a true/false that will turn delegated staking on or off.\n"),e("code",[t._v("delegateRewardShareRatio")]),t._v(" determines the percentage of rewards that will be set aside for delegated stakers.\n"),e("code",[t._v("minDelegatedStake")]),t._v(" sets the minimum number of tokens a person can stake on your gateway.")]),t._v(" "),e("p",[t._v("Edit the values after the "),e("code",[t._v("=")]),t._v(" to match the delegated staking rules you want on your gateway.")]),t._v(" "),e("p",[t._v("Next, scroll down until you find a section that looks like this:")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[t._v("  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" writeInteraction "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" contract"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeInteraction")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'updateGatewaySettings'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// label,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// fqdn,")]),t._v("\n      observerWallet"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// port,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// protocol,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// properties,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// allowDelegatedStaking,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// delegateRewardShareRatio,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// minDelegatedStake,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// note")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      disableBundling"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("center",[e("img",{attrs:{src:t.$withBase("/images/updateSettings2.png")}})]),t._v(" "),e("p",[t._v("Comment out (add "),e("code",[t._v("//")]),t._v(") the line "),e("code",[t._v("observerWallet")]),t._v(", and uncomment (remove "),e("code",[t._v("//")]),t._v(") the lines:")]),t._v(" "),e("p",[e("code",[t._v("// allowDelegatedStaking,")]),t._v(" "),e("code",[t._v("// delegateRewardShareRatio,")]),t._v(" "),e("code",[t._v("// minDelegatedStake,")])]),t._v(" "),e("p",[t._v("When you are done, that section should look like this:")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[t._v("  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" writeInteraction "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" contract"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeInteraction")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'updateGatewaySettings'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// label,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// fqdn,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// observerWallet,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// port,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// protocol,")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// properties,")]),t._v("\n      allowDelegatedStaking"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      delegateRewardShareRatio"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      minDelegatedStake"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// note")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      disableBundling"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),e("h2",{attrs:{id:"running-the-script"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#running-the-script"}},[t._v("#")]),t._v(" Running the Script")]),t._v(" "),e("p",[t._v("Once the above is set all that is left is to run the script. This can be done with a single command in your terminal.")]),t._v(" "),e("p",[t._v("Make sure your terminal is in the root folder of the testnet-contract repo (the one named 'testnet-contract'), and run this command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" ts-node tools/update-gateway-settings.ts\n")])])])],1)}),[],!1,null,null,null);e.default=s.exports}}]);
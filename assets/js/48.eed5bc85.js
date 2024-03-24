(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{338:function(t,e,a){"use strict";a.r(e);var s=a(10),o=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"join-the-ar-io-testnet"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#join-the-ar-io-testnet"}},[t._v("#")]),t._v(" Join the AR.IO Testnet")]),t._v(" "),e("h2",{attrs:{id:"prerequisites"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("Must have a fully functional AR.IO gateway.")]),t._v(" "),e("ul",[e("li",[t._v("This includes the ability to resolve ArNS subdomains.")]),t._v(" "),e("li",[t._v("Follow installation instructions for "),e("a",{attrs:{href:"/gateways/ar-io-node/windows-setup"}},[t._v("windows")]),t._v(" or "),e("a",{attrs:{href:"/gateways/ar-io-node/linux-setup"}},[t._v("linux")]),t._v(" and get help from the "),e("a",{attrs:{href:"https://discord.gg/7zUPfN4D6g",target:"_blank",rel:"noopener noreferrer"}},[t._v("ar.io community"),e("OutboundLink")],1),t._v(".")])])]),t._v(" "),e("li",[e("p",[t._v("Gateway must be associated with an Arweave Wallet.")]),t._v(" "),e("ul",[e("li",[t._v("Learn about creating Arweave wallets "),e("a",{attrs:{href:"https://ar.io/wallet",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),e("OutboundLink")],1)])])]),t._v(" "),e("li",[e("p",[t._v("Arweave wallet must be funded with enough AR tokens to pay for transaction gas.")])])]),t._v(" "),e("h2",{attrs:{id:"submit-an-application"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#submit-an-application"}},[t._v("#")]),t._v(" Submit an Application")]),t._v(" "),e("p",[t._v("Joining the ar.io Testnet requires staking a minimum of 10,000 Test IO Tokens. You must have Test IO Tokens before you are able to join. Test IO Tokens are currently distributed through an application system in the "),e("a",{attrs:{href:"https://discord.gg/7zUPfN4D6g",target:"_blank",rel:"noopener noreferrer"}},[t._v("ar.io Discord"),e("OutboundLink")],1),t._v(".\n")]),t._v(" "),e("h2",{attrs:{id:"setting-up-and-running-the-join-script"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-and-running-the-join-script"}},[t._v("#")]),t._v(" Setting up and Running the Join Script")]),t._v(" "),e("p",[t._v("Joining the ar.io Testnet is currently completed by manually running a script. The process for doing so is as follows:")]),t._v(" "),e("h3",{attrs:{id:"clone-the-repo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#clone-the-repo"}},[t._v("#")]),t._v(" Clone the Repo")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("IMPORTANT")]),t._v(" "),e("p",[t._v("Do not clone the testnet-contract repo inside of your gateway repo. Make sure you exit the folder containing your gateway BEFORE you run the below clone command.")])]),t._v(" "),e("p",[t._v("In a terminal (Powershell or Command Line on Windows) navigate to the location where you want to clone the repo, then run the following command")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("git clone https://github.com/ar-io/testnet-contract\n")])])]),e("h3",{attrs:{id:"install-dependencies"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-dependencies"}},[t._v("#")]),t._v(" Install dependencies")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("cd testnet-contract\nyarn install\n")])])]),e("h3",{attrs:{id:"provide-wallet-keys"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#provide-wallet-keys"}},[t._v("#")]),t._v(" Provide Wallet Keys")]),t._v(" "),e("p",[t._v("Joining the testnet requires signing and funding a transaction that interacts with the Testnet smart contract. This means the script needs access to your wallet. There are two ways this can be done:")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("Copy your wallet's JWK into a .env file in testnet-contract root directory.")])]),t._v(" "),e("li",[e("p",[t._v('Save a copy of your wallet JSON keyfile in the testnet-contract root directory as "key.json".')])])]),t._v(" "),e("h3",{attrs:{id:"run-the-script"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#run-the-script"}},[t._v("#")]),t._v(" Run the Script")]),t._v(" "),e("p",[t._v("Once you have Test IO Tokens and the testnet contract tools installed properly, it's time to run the script and join the network. From the testnet-contract root directory, run the following command in your terminal:")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("yarn join-network\n")])])]),e("p",[t._v("After running the command, several questions will appear in your terminal in order to get all of the correct settings for your gateway:")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Enter your a friendly name for your gateway")]),t._v(": This is a name or "),e("code",[t._v("label")]),t._v(" for your gateway.")]),t._v(" "),e("li",[e("strong",[t._v("Enter your domain for this gateway")]),t._v(': This is the domain name for your gateway. It should be the full domain, without any protocol ("http/https") prefix. For example: "vilenarios.com".')]),t._v(" "),e("li",[e("strong",[t._v("Enter the amount of tokens you want to stake against your gateway - min 10,000 IO")]),t._v(': The number of tokens you want to stake on your gateway. It has to be a minimum of 10,000. Enter the number without commas (",") or dots (".").')]),t._v(" "),e("li",[e("strong",[t._v("Enter port used for this gateway")]),t._v(": The primary access port people should use to access your gateway. Except for some advanced use cases, this value should be 443.")]),t._v(" "),e("li",[e("strong",[t._v("Enter protocol used for this gateway")]),t._v(": http or https. Most users will want to use https.")]),t._v(" "),e("li",[e("strong",[t._v("Enter gateway properties transaction ID (use default if not sure)")]),t._v(": Arweave TxId for your gateway properties setting. This is not a widely implemented feature yet, so most people will just press "),e("code",[t._v("ENTER")]),t._v(" to accept the default value.")]),t._v(" "),e("li",[e("strong",[t._v("Enter short note to further describe this gateway")]),t._v(": A short description of your gateway. Must be 256 characters or less.")]),t._v(" "),e("li",[e("strong",[t._v("Enter the observer wallet public address")]),t._v(": The public wallet address being used for your Observer. It will default to the wallet being used to join the network.")]),t._v(" "),e("li",[e("strong",[t._v("Enable or disable delegated staking?")]),t._v(": Do you want to allow people to stake tokens on your gateway? "),e("code",[t._v("y")]),t._v(" for yes or "),e("code",[t._v("n")]),t._v(" for no.")]),t._v(" "),e("li",[e("strong",[t._v("Enter the percent of gateway and observer rewards given to delegates")]),t._v(": What percentage of your gateway rewards do you want to give to your delegated stakers? Defaults to 10%.")]),t._v(" "),e("li",[e("strong",[t._v("Enter the minimum  delegate stake for this gateway (in IO)")]),t._v(": The minimum number of tokens a person has to stake to delegate to your gateway. Defaults to 100.")]),t._v(" "),e("li",[e("strong",[t._v("CONFIRM GATEWAY DETAILS?")]),t._v(": This is your last chance to review all of your settings before submitting the transaction. "),e("code",[t._v("y")]),t._v(" to confirm and submit, "),e("code",[t._v("n")]),t._v(" to cancel.")])]),t._v(" "),e("p",[t._v("Confirming details will create an Arweave transaction interacting with the Testnet Smartweave contract, so it will require AR tokens to pay for gas. ar.io recommends having at least 0.05 AR to ensure a successful transaction.")]),t._v(" "),e("p",[t._v("If you receive an error after confirming that looks like this:")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("Error "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" interacting with contract "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    type: "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'error'")]),t._v(",\n    error: "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Interaction height 1390188 is less than last ticked height 1390189'")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[t._v("It just means that you took too long while completing the questions and the current Arweave block height is higher than when you first ran the script. You can start over without any issues.")]),t._v(" "),e("h2",{attrs:{id:"update-your-gateway-settings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#update-your-gateway-settings"}},[t._v("#")]),t._v(" Update Your Gateway Settings")]),t._v(" "),e("p",[t._v("Once you have successfully joined the Testnet, you can still update your Gateway settings. This is done by running the "),e("code",[t._v("update-gateway-settings")]),t._v(" script, in the same way as "),e("code",[t._v("join-network")]),t._v(".")]),t._v(" "),e("div",{staticClass:"language-shell extra-class"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" update-gateway-settings\n")])])]),e("p",[t._v("You will see another list of prompts in your terminal, to determine the settings you want to update. Your current settings will populate as the default values, so if you don't want to change something you can just press "),e("code",[t._v("ENTER")]),t._v(" to accept the current value.")]),t._v(" "),e("p",[t._v("The prompts will be identical to the prompts above for the "),e("code",[t._v("join-network")]),t._v(" script.")])])}),[],!1,null,null,null);e.default=o.exports}}]);
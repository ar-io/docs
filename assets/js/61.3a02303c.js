(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{362:function(e,a,t){"use strict";t.r(a);var r=t(10),s=Object(r.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"trading-ants-on-bazar"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#trading-ants-on-bazar"}},[e._v("#")]),e._v(" Trading ANTs on Bazar")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/arns.html#arweave-name-token-ant"}},[e._v("Arweave Name Tokens")]),e._v(" are "),a("a",{attrs:{href:"https://github.com/permaweb/ao-permaweb/blob/asset-manager/services/assets/spec.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Atomic Asset Spec"),a("OutboundLink")],1),e._v(" compliant AO tokens that manage records and permission for ArNS names. Because the ANT spec is compliant with the Atomic Asset Spec, they are tradable on "),a("a",{attrs:{href:"https://bazar.arweave.net",target:"_blank",rel:"noopener noreferrer"}},[e._v("Bazar"),a("OutboundLink")],1),e._v(", which is a decentralized market place for Atomic Assets on AO. There are a few simple steps that are required in order to make an ANT available on Bazar to be traded.")],1),e._v(" "),a("h2",{attrs:{id:"bazar-profile"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bazar-profile"}},[e._v("#")]),e._v(" Bazar Profile")]),e._v(" "),a("p",[e._v("Bazar relies on "),a("a",{attrs:{href:"https://bazar.g8way.io/#/docs/overview/profiles",target:"_blank",rel:"noopener noreferrer"}},[e._v("profiles"),a("OutboundLink")],1),e._v(" for displaying user information and tradable assets. Profiles are AO processes that contain user specified information like a name, a nickname, and images associated with the profile. Profiles also track assets held by the profile in order to provide their information to bazar.")]),e._v(" "),a("h3",{attrs:{id:"create-a-profile"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-a-profile"}},[e._v("#")]),e._v(" Create a Profile")]),e._v(" "),a("p",[e._v('If you do not already have a profile associated with your wallet, you can easily create one on using the "Create your profile" button on bazar after connecting your wallet:')]),e._v(" "),a("img",{staticClass:"largerdiagram",attrs:{src:e.$withBase("/images/bazar-create-profile1.png")}}),e._v(" "),a("p",[e._v("You will be prompted to add, at a minimum, a name and handle (nickname) to associate with the profile. These values can be changed later.")]),e._v(" "),a("img",{staticClass:"largerdiagram",attrs:{src:e.$withBase("/images/bazar-create-profile2.png")}}),e._v(" "),a("p",[e._v('Click "Save" at the bottom to finish creation of your profile.')]),e._v(" "),a("p",[e._v('Once your profile is created, you can get its ao process Id at any time by clicking on the user icon in Bazar, and then the "Copy profile address" button from the menu.')]),e._v(" "),a("img",{staticClass:"largerdiagram",attrs:{src:e.$withBase("/images/bazar-create-profile3.png")}}),e._v(" "),a("h2",{attrs:{id:"transfer-ant-to-the-profile"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transfer-ant-to-the-profile"}},[e._v("#")]),e._v(" Transfer ANT to the Profile")]),e._v(" "),a("p",[e._v("Bazar profiles only track assets that are held in the profile process, not in a user wallet. In order for an ANT to be displayed and transferred on Bazar, it must first be transferred into the Bazar profile. This can be done easily using "),a("a",{attrs:{href:"https://arns.app",target:"_blank",rel:"noopener noreferrer"}},[e._v("arns.app"),a("OutboundLink")],1),e._v(" in your manage page for a given name.")]),e._v(" "),a("img",{staticClass:"largerdiagram",attrs:{src:e.$withBase("/images/bazar-transfer-name1.png")}}),e._v(" "),a("br"),a("br"),e._v(" "),a("img",{staticClass:"largerdiagram",attrs:{src:e.$withBase("/images/bazar-transfer-name2.png")}}),e._v(" "),a("p",[e._v("Once an ANT is transferred into the profile process, it will automatically be detected and displayed by Bazar. It can be transferred or sold just like any other atomic asset on the marketplace, with no additional steps required.")]),e._v(" "),a("h2",{attrs:{id:"restore-controllers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#restore-controllers"}},[e._v("#")]),e._v(" Restore Controllers")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Optional")]),e._v(" "),a("p",[e._v("This is an optional step that will enable updating an ANT's Target Id without transferring it back into your wallet. This step may be safely skipped without affecting the ANT's functionality or tradability on Bazar.")])]),e._v(" "),a("p",[e._v("Transferring an ANT to a new wallet or AO process resets all authorized controllers, or non-owner entities that are allowed to update some settings on the ArNS name. It does not reset the Target Id that the ArNS name is pointing to. If you want to be able to update the Target ID and undernames from your wallet using arns.app, you will need to set your wallet address as a controller for the ANT while it is in your profile. The easiest way to do this is using aos.")]),e._v(" "),a("p",[e._v("If you have not used aos before, you can find installation instructions "),a("a",{attrs:{href:"https://cookbook_ao.arweave.net/welcome/getting-started.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("Using aos, you can log directly into your profile process with the command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("aos "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("profile-address"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--wallet")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/path/to/your/keyfile"')]),e._v("\n")])])]),a("p",[e._v("Be sure to replace "),a("code",[e._v("<profile-address>")]),e._v(" with the process Id for your profile process, and "),a("code",[e._v("/path/to/your/keyfile")]),e._v(" with the path to the keyfile for the wallet you created the profile with.")]),e._v(" "),a("p",[e._v("Once you are logged in with aos, you can send a message to the ANT in your profile to set your wallet as a controller:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("Send"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" Target "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<Ant-Process-ID>"')]),e._v(", Action "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Add-Controller"')]),e._v(", Controller "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<Wallet-Address>"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])])]),a("p",[e._v("Replace "),a("code",[e._v("<Ant-Process-ID>")]),e._v(" with the process Id of the ANT you transferred into your profile, and "),a("code",[e._v("<Wallet-Address>")]),e._v(" with your wallet address.")])])}),[],!1,null,null,null);a.default=s.exports}}]);
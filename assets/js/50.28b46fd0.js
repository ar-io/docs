(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{353:function(e,t,r){"use strict";r.r(t);var o=r(10),a=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"troubleshooting-observer"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting-observer"}},[e._v("#")]),e._v(" Troubleshooting Observer")]),e._v(" "),t("h2",{attrs:{id:"overview"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),t("p",[e._v("ar.io observer epoch distribution reports include a list of failed observers for the epoch, along with an accounting of the errors which caused the observer to fail. When possible, the error messages will give you a starting point to being the troubleshooting process. Below is a list of possible error messages, along with more detailed information on how to address the issues.")]),e._v(" "),t("h2",{attrs:{id:"observer-not-running-and-or-unable-to-connect"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#observer-not-running-and-or-unable-to-connect"}},[e._v("#")]),e._v(" Observer not running and/or unable to connect")]),e._v(" "),t("h3",{attrs:{id:""}},[t("a",{staticClass:"header-anchor",attrs:{href:"#"}},[e._v("#")])]),e._v(" "),t("details",[t("summary",[e._v("Your observer was not able to connect with the contract at all. The most likely causes for this are internet connection problems, or your observer not running.")]),e._v(" "),t("p",[e._v("Verify your observer is running")]),e._v(" "),t("p",[t("code",[e._v("sudo docker ps")])]),e._v(" "),t("p",[e._v("Your output should look something like this:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('    CONTAINER ID   IMAGE                                                                   COMMAND                  CREATED       STATUS                PORTS                                                                                             NAMES\n    264637d3e24d   ghcr.io/ar-io/ar-io-envoy:01952702b78be1e464b9d192e77b38a119bdc4ee      "/docker-entrypoint.…"   2 days ago    Up 2 days             0.0.0.0:3000->3000/tcp, :::3000->3000/tcp, 0.0.0.0:9901->9901/tcp, :::9901->9901/tcp, 10000/tcp   ar-io-node_envoy_1\n    f42a4fbed8c5   ghcr.io/ar-io/ar-io-core:484bd31abb78709e09395f139ca57792bc6c3eb0       "/bin/sh docker-entr…"   2 days ago    Up 2 days (healthy)   0.0.0.0:4000->4000/tcp, :::4000->4000/tcp                                                         ar-io-node_core_1\n    dd2e0b64b0b4   redis:7                                                                 "docker-entrypoint.s…"   10 days ago   Up 2 days             0.0.0.0:6379->6379/tcp, :::6379->6379/tcp                                                         ar-io-node_redis_1\n    ed98aba1c4f6   ghcr.io/ar-io/ar-io-observer:6449bcb6dda778fef68a94bd29343190524439db   "/nodejs/bin/node ./…"   10 days ago   Up 2 days (healthy)   0.0.0.0:5000->5000/tcp, :::5000->5000/tcp                                                         ar-io-node_observer_1\n')])])]),t("p",[e._v('If the line for observer does not say "up", then your observer is not running. You should restart your gateway, and then watch your observer logs to get a better idea of why your observer stopped:')]),e._v(" "),t("p",[t("code",[e._v("sudo docker-compose down")])]),e._v(" "),t("p",[t("code",[e._v("sudo docker-compose up -d")])]),e._v(" "),t("p",[t("code",[e._v("sudo docker-compose logs -f observer")])])]),e._v(" "),t("h2",{attrs:{id:"observer-wallet-has-no-ar"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#observer-wallet-has-no-ar"}},[e._v("#")]),e._v(" Observer wallet has no AR")]),e._v(" "),t("h3",{attrs:{id:"-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#-2"}},[e._v("#")])]),e._v(" "),t("details",[t("summary",[e._v("Your Observer Wallet does not have any AR tokens.")]),e._v(" "),t("p",[e._v("Your observer wallet needs to be able to submit reports to the Arweave blockchain. To do this, it needs to have a small amount of AR tokens in order to pay for the submission. ar.io recommends depositing 1 AR token into your observer wallet to ensure that you remain funded throughout the entire testnet.")])]),e._v(" "),t("h2",{attrs:{id:"observer-wallet-does-not-match-the-observerwallet-set-on-the-gateway"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#observer-wallet-does-not-match-the-observerwallet-set-on-the-gateway"}},[e._v("#")]),e._v(" Observer wallet ... does not match the 'observerWallet' set on the gateway ...")]),e._v(" "),t("h3",{attrs:{id:"-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#-3"}},[e._v("#")])]),e._v(" "),t("details",[t("summary",[e._v("The observer wallet set locally on your gateway does not match the observer wallet for your gateway in the ar.io network.")]),e._v(" "),t("p",[e._v("Check to make sure that you have "),t("code",[e._v("OBSERVER_WALLET")]),e._v(" set in your "),t("code",[e._v(".env")]),e._v(" file, and that the keyfile for your observer wallet is properly provided in the wallets directory in your gateway.")]),e._v(" "),t("p",[e._v("You will need to restart your gateway if you make any changes to the "),t("code",[e._v(".env")]),e._v(" file or your observer wallet keyfile.")]),e._v(" "),t("p",[e._v("Then check to make sure that the value for observerWallet on your gateway in the "),t("a",{attrs:{href:"https://dev.arns.app/v1/contract/bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U/gateways",target:"_blank",rel:"noopener noreferrer"}},[e._v("testnet contract"),t("OutboundLink")],1),e._v(" matches that.")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://youtu.be/wJsCa3FnloY?si=4_aplF8yTIbfC1W-",target:"_blank",rel:"noopener noreferrer"}},[e._v("This video"),t("OutboundLink")],1),e._v(" shows exactly what should be done to correct it if it does not.")])]),e._v(" "),t("h2",{attrs:{id:"uncertain-confirm-your-observer-wallet-is-set-in-the-env-file-and-corresponding-wallet-is-located-in-wallets-address-json"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#uncertain-confirm-your-observer-wallet-is-set-in-the-env-file-and-corresponding-wallet-is-located-in-wallets-address-json"}},[e._v("#")]),e._v(" Uncertain - confirm your OBSERVER_WALLET is set in the .env file and corresponding wallet is located in wallets/< address >.json...")]),e._v(" "),t("h3",{attrs:{id:"-4"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#-4"}},[e._v("#")])]),e._v(" "),t("details",[t("summary",[e._v("The cause for the error could not be reliably determined.")]),e._v(" "),t("p",[e._v('"Uncertain" is the default value returned when evaluating a failed observer. It means that none of the above error messages perfectly matched the problems with your gateway.')]),e._v(" "),t("p",[e._v("You should first ensure that your observer wallet is "),t("a",{attrs:{href:"https://youtu.be/wJsCa3FnloY?si=4_aplF8yTIbfC1W-",target:"_blank",rel:"noopener noreferrer"}},[e._v("set correctly locally"),t("OutboundLink")],1),e._v(", and then check your observer logs for any additional error messages.")]),e._v(" "),t("p",[t("code",[e._v("sudo docker-compose logs -f --tail=50 observer")])])])])}),[],!1,null,null,null);t.default=a.exports}}]);
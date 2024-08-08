(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{343:function(e,a,t){"use strict";t.r(a);var s=t(10),r=Object(s.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"bundler"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bundler"}},[e._v("#")]),e._v(" Bundler")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("A "),a("a",{attrs:{href:"https://github.com/ardriveapp/turbo-upload-service/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Turbo ANS-104"),a("OutboundLink")],1),e._v(" data item bundler can be run alongside an ar.io gateway. This allows gateways the ability to accept data items to be submit to the Arweave blockweave.")]),e._v(" "),a("p",[e._v("The bundler service can be easily run inside Docker in the same way that the gateway is. It utilizes a separate docker compose file for configuration and deployment, which also allows for the use of a separate file for environmental variables specific to the bundler service. Additionally, the separation allows operators to spin their bundler service up or down at any time without affecting their core gateway service. Despite the use of separate docker compose files, the bundler service shares a docker network with the ar.io gateway, and so is able to directly interact with the gateway service and data.")]),e._v(" "),a("h2",{attrs:{id:"getting-started"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" Getting Started")]),e._v(" "),a("p",[a("strong",[e._v("NOTE")]),e._v(": The bundler service relies on GraphQL indexing of recently bundled and uploaded data to manage its pipeline operations. The ar.io gateway should have its indexes synced up to Arweave's current block height before starting the bundler's service stack.")]),e._v(" "),a("h3",{attrs:{id:"environmental-variables"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#environmental-variables"}},[e._v("#")]),e._v(" Environmental Variables")]),e._v(" "),a("p",[e._v("Environmental variables must be provided for the bundler to function and integrate properly with an existing ar.io gateway. The gateway repository provides a "),a("code",[e._v(".env.bundler.example")]),e._v(" file that can be renamed to "),a("code",[e._v(".env.bundler")]),e._v(" and used as a starting point. It contains the following:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("BUNDLER_ARWEAVE_WALLET")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Stringified JWK wallet. e.g: '")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"n"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"..."')]),e._v(", "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("..")]),e._v(". "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\nBUNDLER_ARWEAVE_ADDRESS='")]),e._v("Address "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("for")]),e._v(" above wallet"),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\n\nAPP_NAME='")]),e._v("ar.io bundler "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\n\n# Use localstack s3 bucket for shared data source between ar.io gateway and bundler\nAWS_S3_BUCKET=ar.io\nAWS_S3_PREFIX='")]),e._v("data"),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\nAWS_ACCESS_KEY_ID='")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("test")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\nAWS_SECRET_ACCESS_KEY='")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("test")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\nAWS_REGION='")]),e._v("us-east-1"),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'\nAWS_ENDPOINT='")]),e._v("http://localstack:4566'\n")])])]),a("ul",[a("li",[a("code",[e._v("BUNDLER_ARWEAVE_WALLET")]),e._v(" must be the entire jwk of an Arweave wallet's keyfile, stringified. All uploads of bundled data items to Arweave will be signed and paid for by this wallet, so it must maintain a balance of AR tokens sufficient to handle the uploads.")]),e._v(" "),a("li",[a("code",[e._v("BUNDLER_ARWEAVE_ADDRESS")]),e._v(" must be the "),a("RouterLink",{attrs:{to:"/glossary.html#normalized-address"}},[e._v("normalized public address")]),e._v(" for the provided Arweave wallet.")],1),e._v(" "),a("li",[a("code",[e._v("APP_NAME")]),e._v(" is a GraphQL tag that will be added to uploaded bundles.")])]),e._v(" "),a("p",[e._v("The remaining lines in the "),a("code",[e._v(".env.bundler.example")]),e._v(" file control settings that allow the bundler service to share data with the ar.io gateway. Data sharing of contiguous data between a bundler and a gateway allows the gateway to serve optimistically cached data without waiting for it to fully settle on chain.")]),e._v(" "),a("h3",{attrs:{id:"managing-bundler-access"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#managing-bundler-access"}},[e._v("#")]),e._v(" Managing Bundler Access")]),e._v(" "),a("p",[e._v("By default, the bundler will only accept data items uploaded by data item signers whose "),a("RouterLink",{attrs:{to:"/glossary.html#normalized-address"}},[e._v("normalized wallet addresses")]),e._v(" are in the "),a("code",[e._v("ALLOW_LISTED_ADDRESSES")]),e._v(" list. This is an additional environmental variable that can be added to your "),a("code",[e._v(".env.bundler")]),e._v(" file, and must be a comma separated list of normalized public wallet addresses for wallets that should be allowed to bundle and upload data through your gateway.")],1),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("ALLOW_LISTED_ADDRESSES")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("address"),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[e._v("1")]),e._v(">")]),e._v(","),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("address"),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[e._v("2")]),e._v(">")]),e._v("\n")])])]),a("p",[e._v("The following permissioning configurations schemes are also possible:")]),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("table",{staticClass:"inline-table",attrs:{id:"gateway-table"}},[a("tr",[a("th",[e._v("Scheme")]),e._v(" "),a("th",[e._v("ALLOW_LISTED_ADDRESSES")]),e._v(" "),a("th",[e._v("SKIP_BALANCE_CHECKS")]),e._v(" "),a("th",[e._v("ALLOW_LISTED_SIGNATURE_TYPES")]),e._v(" "),a("th",[e._v("PAYMENT_SERVICE_BASE_URL")])]),e._v(" "),a("tr",[a("th",[e._v("Allow Specific Wallets")]),e._v(" "),a("td",[e._v("Comma-separated normalized wallet addresses")]),e._v(" "),a("td",[e._v("false")]),e._v(" "),a("td",[e._v("EMPTY or supplied")]),e._v(" "),a("td",[e._v("EMPTY")])]),e._v(" "),a("tr",[a("th",[e._v("Allow Specific chains")]),e._v(" "),a("td",[e._v("EMPTY or supplied")]),e._v(" "),a("td",[e._v("false")]),e._v(" "),a("td",[e._v("arbundles sigtype int")]),e._v(" "),a("td",[e._v("EMPTY")])]),e._v(" "),a("tr",[a("th",[e._v("Allow All")]),e._v(" "),a("td",[e._v("n/a")]),e._v(" "),a("td",[e._v("true")]),e._v(" "),a("td",[e._v("n/a")]),e._v(" "),a("td",[e._v("n/a")])]),e._v(" "),a("tr",[a("th",[e._v("Allow None")]),e._v(" "),a("td",[e._v("EMPTY")]),e._v(" "),a("td",[e._v("false")]),e._v(" "),a("td",[e._v("EMPTY")]),e._v(" "),a("td",[e._v("EMPTY")])]),e._v(" "),a("tr",[a("th",[e._v("Allow Payers")]),e._v(" "),a("td",[e._v("EMPTY or supplied")]),e._v(" "),a("td",[e._v("false")]),e._v(" "),a("td",[e._v("EMPTY or supplied")]),e._v(" "),a("td",[e._v("Your payment service url")])])])]),e._v(" "),a("h3",{attrs:{id:"indexing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#indexing"}},[e._v("#")]),e._v(" Indexing")]),e._v(" "),a("p",[e._v("Bundlers submit data to the Arweave network as an "),a("a",{attrs:{href:"https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ANS-104 data item bundle"),a("OutboundLink")],1),e._v(". This means it is several transactions wrapped into one. A gateway will need to unbundle these transactions in order to index them. A gateway should include the following ANS-104 filters in order to unbundle and index transactions from a particular bundler:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("ANS104_INDEX_FILTER")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"always"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("ANS104_UNBUNDLE_FILTER")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"attributes"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"owner_address"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$BUNDLER_ARWEAVE_ADDRESS")]),e._v('"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),a("p",[a("code",[e._v("$BUNDLER_ARWEAVE_ADDRESS")]),e._v(" should be replaced with the "),a("RouterLink",{attrs:{to:"/glossary.html#normalized-address"}},[e._v("normalized public wallet address")]),e._v(" associated with the bundler.")],1),e._v(" "),a("p",[a("strong",[e._v("NOTE")]),e._v(": The above filters must be placed in the "),a("code",[e._v(".env")]),e._v(" file for the core gateway service, not the bundler.")]),e._v(" "),a("p",[e._v("Gateways handle data item indexing asynchronously. This means they establish a que of items to index, and work on processing the que in the background while the gateway continues with its normal operations. If a gateway has broad indexing filters, there can be some latency in indexing data items from the bundler while the gateway works through its que.")]),e._v(" "),a("h4",{attrs:{id:"optimistic-indexing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#optimistic-indexing"}},[e._v("#")]),e._v(" Optimistic Indexing")]),e._v(" "),a("p",[e._v("Gateway operators can prioritize indexing specific data items, putting them at the front of the que. The bundler service can submit data items for prioritized indexing on their associated gateway.")]),e._v(" "),a("p",[e._v("Only gateway operators are able to prioritize indexing, so an admin key is required for the request to be successful. This key should be made available in the environmental files for BOTH the core gateway, and the bundler, and should be provided as "),a("code",[e._v("AR_IO_ADMIN_KEY")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("AR_IO_ADMIN_KEY")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"Admin password"')]),e._v("\n")])])]),a("p",[a("strong",[e._v("NOTE")]),e._v(": If a gateway is started without providing the admin key, a random string will be generated to protect the gateway's admin endpoints. This can be reset by restarting the gateway with the admin key provided in the "),a("code",[e._v(".env")]),e._v(" file.")]),e._v(" "),a("h2",{attrs:{id:"starting-and-stopping-the-bundler"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#starting-and-stopping-the-bundler"}},[e._v("#")]),e._v(" Starting and Stopping the Bundler")]),e._v(" "),a("h3",{attrs:{id:"starting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#starting"}},[e._v("#")]),e._v(" Starting")]),e._v(" "),a("p",[e._v("The bundler service is designed to run in conjunction with an ar.io gateway, and so relies on the "),a("code",[e._v("ar-io-network")]),e._v(" network created in Docker when the core gateway services are spun up. It is possible to spin up the bundler while the core services are down, but the network must exist in Docker.")]),e._v(" "),a("p",[e._v("To start the bundler, specify the env and docker-compose files being used in a "),a("code",[e._v("docker compose up")]),e._v(" command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("docker")]),e._v(" compose --env-file ./.env.bundler "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--file")]),e._v(" docker-compose.bundler.yaml up "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-d")]),e._v("\n")])])]),a("p",[e._v("The "),a("code",[e._v("-d")]),e._v(' flag runs the command in "detached" mode, so it will run in the background without requiring the terminal to remain active.')]),e._v(" "),a("h3",{attrs:{id:"stopping"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stopping"}},[e._v("#")]),e._v(" Stopping")]),e._v(" "),a("p",[e._v("To spin the bundler service down, specify the docker-compose file in a "),a("code",[e._v("docker compose down")]),e._v(" command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("docker")]),e._v(" compose "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--file")]),e._v(" docker-compose.bundler.yaml down\n")])])]),a("h3",{attrs:{id:"logs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logs"}},[e._v("#")]),e._v(" logs")]),e._v(" "),a("p",[e._v("While the bundler service is running in detached mode, logs can be checked by specifying the docker-compose file in a "),a("code",[e._v("docker compose logs")]),e._v(" command:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("docker")]),e._v(" compose "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--file")]),e._v(" docker-compose.bundler.yaml logs "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-f")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--tail")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("\n")])])]),a("ul",[a("li",[a("code",[e._v("-f")]),e._v(' runs the command in "follow" mode, so the terminal will continue to watch and display new logs.')]),e._v(" "),a("li",[a("code",[e._v("--tail=")]),e._v(" defines the number of logs to display that existed prior to running the command. "),a("code",[e._v("0")]),e._v(" displays only new logs.")])])])}),[],!1,null,null,null);a.default=r.exports}}]);
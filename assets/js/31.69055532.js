(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{334:function(t,a,s){"use strict";s.r(a);var e=s(10),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"manifests"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#manifests"}},[t._v("#")]),t._v(" Manifests")]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("ar.io Gateways support friendly-path-name routing for data on Arweave via Manifests. This greatly improves the programmability of data relationships. Consider an illustrative example where data stored on Arweave and accessed like this:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("http://<gateway domain>/cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI (txID of a website's index.html)\nhttp://<gateway domain>/3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV (txID of its js/style.css)\nhttp://<gateway domain>/or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ (txID of its assets/img/logo.png)\n")])])]),a("p",[t._v("can instead be accessed like this:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("http://<gateway domain>/<txId of manifest> (resolves to the txID of index.html)\nhttp://<gateway domain>/<txId of manifest>/js/style.css\nhttp://<gateway domain>/<txId of manifest>/assets/img/logo.png\n")])])]),a("p",[t._v("NFT collections also benefit from manifest-based routing:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("http://<gateway domain>/<txId of NFT collection image manifest>/0.png\nhttp://<gateway domain>/<txId of NFT collection image manifest>/1.png\nhttp://<gateway domain>/<txId of NFT collection image manifest>/2.png\n... and so on.\n")])])]),a("p",[t._v("ar.io gateways are capable of resolving manifest paths in a relative manner. An HTML page loading assets from Arweave would be very difficult to develop, maintain, and harden against hosting domains leaving existence if assets had to be linked to by a fully qualified domain name and an Arweave data item ID as the path. For example:")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://arweave.dev/3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("Manifests allow HTML pages to use relative paths to assets with friendly names so that the document is easy to read, maintain, and host across any ar.io domain. For example:")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("./logo.png"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("Relative routing eliminates the need for every link to contain the full Arweave transaction ID and fully qualified domain name. This makes the HTML more readable and ensures that links remain valid even if the hosting domain changes. If "),a("code",[t._v("index.html")]),t._v(" needed to access "),a("code",[t._v("js/style.css")]),t._v(", the relative link "),a("code",[t._v("./js/style.css")]),t._v(" could be used instead of "),a("code",[t._v("<txId>/js/style.css")]),t._v(". This relative routing is incredibly useful for linking together files in a way that allows functional websites to be hosted entirely on Arweave.")]),t._v(" "),a("p",[t._v("Learn more about relative path routing and structuring files into a permanently hosted website in ArDrive's "),a("a",{attrs:{href:"https://docs.ardrive.io/docs/misc/deploy/paths.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("decentralized app guide"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"what-is-a-manifest"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-is-a-manifest"}},[t._v("#")]),t._v(" What is a Manifest")]),t._v(" "),a("p",[t._v('Manifests, also known as "Path Manifests" or "Arweave Manifests," are JSON objects that connect various Arweave data items and define relational paths for easy navigation. A common use case for manifests is permanently hosting websites on Arweave by linking all necessary files together. An ar.io gateway can then resolve the manifest into a fully functional website.')]),t._v(" "),a("h3",{attrs:{id:"sample-manifest"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sample-manifest"}},[t._v("#")]),t._v(" Sample Manifest")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"manifest"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"arweave/paths"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.2.0"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"index"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"index.html"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fallback"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"paths"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"index.html"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"404.html"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"js/style.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"css/style.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sPiQvpAUXLVK3zF6iXSfo7bkCVQkiLNt24dVtXUKBfZ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"css/mobile.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"assets/img/logo.png"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"assets/img/icon.png"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"how-it-works"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works"}},[t._v("#")]),t._v(" How it Works")]),t._v(" "),a("p",[t._v("A resolver, typically an ar.io gateway, resolves URLs requesting content based on a manifest transaction ID to the corresponding path key in the "),a("code",[t._v("paths")]),t._v(" object. The URL schema for this type of request is "),a("code",[t._v("https://<gateway url>/<manifest TxId>/<path>")]),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"example-usage"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-usage"}},[t._v("#")]),t._v(" Example Usage")]),t._v(" "),a("p",[t._v("Assume the manifest above is uploaded to Arweave with the transaction ID "),a("code",[t._v("UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk")]),t._v(". The below table shows https requests to the ar.io gateway "),a("code",[t._v("arweave.dev")]),t._v(" requesting various endpoints on the manifest transaction Id, the manifest path where the gateway will find the data to return, and the resulting Arweave txId.")]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("table",{staticClass:"inline-table",attrs:{id:"gateway-table"}},[a("tr",[a("th",[t._v("Request Path")]),t._v(" "),a("th",[t._v("Manifest Path")]),t._v(" "),a("th",[t._v("Data served from txID")])]),t._v(" "),a("tr",[a("td",[t._v("https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk")]),t._v(" "),a("td",[t._v("index")]),t._v(" "),a("td",[t._v("cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI")])]),t._v(" "),a("tr",[a("td",[t._v("https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/index.html")]),t._v(" "),a("td",[t._v("index.html")]),t._v(" "),a("td",[t._v("cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI")])]),t._v(" "),a("tr",[a("td",[t._v("https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/js/style.css")]),t._v(" "),a("td",[t._v("js/style.css")]),t._v(" "),a("td",[t._v("3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV")])]),t._v(" "),a("tr",[a("td",[t._v("https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/foobar")]),t._v(" "),a("td",[t._v("fallback")]),t._v(" "),a("td",[t._v("iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ")])])])]),t._v(" "),a("h2",{attrs:{id:"specifications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#specifications"}},[t._v("#")]),t._v(" Specifications")]),t._v(" "),a("h3",{attrs:{id:"transaction-tags"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transaction-tags"}},[t._v("#")]),t._v(" Transaction Tags")]),t._v(" "),a("p",[t._v("Manifest are uploaded to Arweave in the same manner as any other data item. A specific content type tag must be added while uploading so that resolvers like the ar.io gateways can recognize a manifest and properly resolve the paths. Tags must be attached to the manifest at the time of upload. They cannot be added later without uploading a new manifest, and they must be attached to the upload transaction, NOT placed inside the json object.")]),t._v(" "),a("p",[t._v("Failure to provide this tag will result in resolvers not recognizing the manifest, so they will only return the raw json instead of the linked data items.")]),t._v(" "),a("h4",{attrs:{id:"content-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#content-type"}},[t._v("#")]),t._v(" Content-Type")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"value"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/x.arweave-manifest+json"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"transaction-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transaction-data"}},[t._v("#")]),t._v(" Transaction Data")]),t._v(" "),a("p",[t._v("Being a json object, there are several attributes that make up the structure of a manifest. The json object must be fully defined and uploaded to Arweave as a data item.")]),t._v(" "),a("h4",{attrs:{id:"manifest"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#manifest"}},[t._v("#")]),t._v(" manifest")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"manifest"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"arweave/paths"')]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("manifest")]),t._v(" attribute serves as an additional validation layer. It must have the value "),a("code",[t._v("arweave/paths")]),t._v(" in order for a gateway to resolve the manifest.")]),t._v(" "),a("h4",{attrs:{id:"version"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#version"}},[t._v("#")]),t._v(" version")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0.2.0"')]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("version")]),t._v(" attribute defines the version of manifest schema a manifest is using.")]),t._v(" "),a("h4",{attrs:{id:"index"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#index"}},[t._v("#")]),t._v(" index")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"index"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("or")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"index"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"index.html"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("index")]),t._v(" attribute is an object that defines the base, or 'starting' data item. It is similar to the "),a("code",[t._v("/")]),t._v(" endpoint on a website. When resolving the manifest with no additional path definition, this is the data item that will be returned.")]),t._v(" "),a("p",[a("code",[t._v("index")]),t._v(" accepts either "),a("code",[t._v("path")]),t._v(" or "),a("code",[t._v("id")]),t._v(" as sub attributes. "),a("code",[t._v("path")]),t._v(" represents the key of a defined "),a("a",{attrs:{href:"#paths"}},[t._v("path")]),t._v(" in the manifest, while "),a("code",[t._v("id")]),t._v(" represents a specific Arweave data item transaction Id.")]),t._v(" "),a("p",[t._v("If both "),a("code",[t._v("path")]),t._v(" and "),a("code",[t._v("id")]),t._v(" are defined in "),a("code",[t._v("index")]),t._v(", "),a("code",[t._v("id")]),t._v(" will override path.")]),t._v(" "),a("h4",{attrs:{id:"fallback"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fallback"}},[t._v("#")]),t._v(" fallback")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fallback"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("fallback")]),t._v(" attribute is an object that defines an Arweave data item transaction Id for the resolver to fall back to if it fails to correctly resolve a requested path. For example, it can act as a 404 page if a user requests "),a("code",[t._v("manifest/non-existent-page")])]),t._v(" "),a("p",[a("code",[t._v("fallback")]),t._v(" accepts "),a("code",[t._v("id")]),t._v(" as a sub attribute, representing an Arweave data item transaction Id.")]),t._v(" "),a("h4",{attrs:{id:"paths"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#paths"}},[t._v("#")]),t._v(" paths")]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"paths"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"index.html"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"404.html"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"js/style.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"css/style.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"sPiQvpAUXLVK3zF6iXSfo7bkCVQkiLNt24dVtXUKBfZ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"css/mobile.css"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"assets/img/logo.png"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"assets/img/icon.png"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("paths")]),t._v(" attribute is an object that defines the url paths that a manifest can resolve to. If a user navigates to "),a("code",[t._v("manifest/index.html")]),t._v(" the resolver will look for "),a("code",[t._v("index.html")]),t._v(" as a key in the "),a("code",[t._v("paths")]),t._v(" object and return the corresponding "),a("code",[t._v("id")]),t._v(". ("),a("code",[t._v("cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI")]),t._v(")")])])}),[],!1,null,null,null);a.default=n.exports}}]);
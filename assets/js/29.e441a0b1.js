(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{321:function(e,t,a){"use strict";a.r(t);var n=a(10),r=Object(n.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"arcss"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#arcss"}},[e._v("#")]),e._v(" ARCSS")]),e._v(" "),t("h2",{attrs:{id:"overview"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),t("p",[e._v("The ARCSS protocol is a "),t("a",{attrs:{href:"https://wikipedia.org/wiki/Uniform_Resource_Identifier",target:"_blank",rel:"noopener noreferrer"}},[e._v("URI scheme"),t("OutboundLink")],1),e._v(" designed to translate requests for Arweave content into an "),t("code",[e._v("https://")]),e._v(" request. Essentially, ARCSS allows for transforming traditional Arweave URLs like "),t("code",[e._v("https://arweave.net/long-txid")]),e._v(" into more concise and user-friendly forms such as "),t("code",[e._v("ar://txid")]),e._v(" or "),t("code",[e._v("ar://arns-name")]),e._v(". When combined with the "),t("a",{attrs:{href:"https://chrome.google.com/webstore/detail/ario-WayFinder/hnhmeknhajanolcoihhkkaaimapnmgil",target:"_blank",rel:"noopener noreferrer"}},[e._v("AR.IO WayFinder browser extension"),t("OutboundLink")],1),e._v(", the request can be directed to any number of functional "),t("RouterLink",{attrs:{to:"/concepts/gateways/"}},[e._v("AR.IO Gateways")]),e._v(" to serve the content.")],1),e._v(" "),t("p",[e._v("An early technical breakdown of ARCSS, created by Arweave community member DMac, can be found "),t("a",{attrs:{href:"https://hackmd.io/@DMac/r1iyjzxPs",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("h2",{attrs:{id:"browser-integration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#browser-integration"}},[e._v("#")]),e._v(" Browser Integration")]),e._v(" "),t("p",[e._v("ARCSS is currently facilitated via the WayFinder browser extension or internal application integration. The intention is to lead popular web browsers like Chrome and Brave towards a direct integration of ARCSS, similar to recent integrations of the "),t("code",[e._v("ipfs://")]),e._v(" protocol. Such integration would remove the need for a client-side extension and boost developers' confidence in embedding ARCSS in their websites.")]),e._v(" "),t("h2",{attrs:{id:"internal-application-integration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#internal-application-integration"}},[e._v("#")]),e._v(" Internal Application Integration")]),e._v(" "),t("p",[e._v("Certain websites or apps may want to resolve Arweave Transaction ID's (TxId) internally. In these scenarios, they can process ARCSS internally without depending on browser support or WayFinder. A prime example is "),t("a",{attrs:{href:"https://opensea.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("opensea.io"),t("OutboundLink")],1),e._v(". Opensea, an NFT marketplace, frequently imports NFT metadata from external sources. If metadata employs ARCSS, Opensea internally resolves these, presenting content without redirecting users through an "),t("code",[e._v("https://")]),e._v(" link.")]),e._v(" "),t("p",[e._v("There are two main approaches to resolving ARCSS:")]),e._v(" "),t("ol",[t("li",[e._v("Convert ARCSS into a request directed at a predefined Arweave gateway.")]),e._v(" "),t("li",[e._v("Retrieve a list of active AR.IO Gateways from the "),t("RouterLink",{attrs:{to:"/concepts/gateway-network.html#gateway-address-registry-gar"}},[e._v("GAR")]),e._v(" by reading the contract state, or other available resources, and then fetch content from a gateway on the list.")],1)]),e._v(" "),t("p",[e._v("Each strategy has its benefits and challenges, necessitating careful evaluation based on specific use cases.")]),e._v(" "),t("h2",{attrs:{id:"benefits-of-arcss-over-hardcoded-gateway-links"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#benefits-of-arcss-over-hardcoded-gateway-links"}},[e._v("#")]),e._v(" Benefits of ARCSS Over Hardcoded Gateway Links")]),e._v(" "),t("p",[e._v("Using ARCSS offers several advantages over hardcoded links to a specific gateway:")]),e._v(" "),t("ol",[t("li",[t("strong",[e._v("Flexibility")]),e._v(": ARCSS can be routed through any available AR.IO Gateway, ensuring content remains accessible even if a specific gateway is down or congested.")]),e._v(" "),t("li",[t("strong",[e._v("Decentralization")]),e._v(": By not being tied to a single gateway, ARCSS embodies the decentralized spirit of the web, reducing potential censorship points.")]),e._v(" "),t("li",[t("strong",[e._v("Ease of Maintenance")]),e._v(": Developers and content creators don't need to modify links if a gateway changes its URL or becomes unavailable. The WayFinder extension handles routing to an active gateway.")]),e._v(" "),t("li",[t("strong",[e._v("Consistency")]),e._v(": Users always receive the same content, regardless of the gateway used, ensuring a consistent user experience.")])]),e._v(" "),t("h2",{attrs:{id:"use-cases"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#use-cases"}},[e._v("#")]),e._v(" Use Cases")]),e._v(" "),t("h3",{attrs:{id:"decentralized-web-hosting-with-flexible-access"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#decentralized-web-hosting-with-flexible-access"}},[e._v("#")]),e._v(" Decentralized Web Hosting with Flexible Access")]),e._v(" "),t("p",[e._v("With ARCSS, not only can websites be hosted on the Arweave network, but their accessibility is also enhanced. By using ARCSS, web developers can ensure that if a specific AR.IO Gateway is down, the content can still be accessed through another gateway, offering a more reliable and resilient user experience.")]),e._v(" "),t("h3",{attrs:{id:"digital-archives-and-preservation-with-enhanced-sharing"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#digital-archives-and-preservation-with-enhanced-sharing"}},[e._v("#")]),e._v(" Digital Archives and Preservation with Enhanced Sharing")]),e._v(" "),t("p",[e._v("Digitally archiving public domain works, especially in light of events like "),t("a",{attrs:{href:"https://www.youtube.com/watch?v=eMSCHXklULQ",target:"_blank",rel:"noopener noreferrer"}},[e._v('"banned books week"'),t("OutboundLink")],1),e._v(", becomes more efficient with ARCSS. Historical institutions or enthusiasts can easily share specific ARCSS links to documents or media. Unlike hardcoded links which might break if a specific gateway goes offline, ARCSS ensures that the content remains consistently accessible.")]),e._v(" "),t("h3",{attrs:{id:"media-sharing-platforms-with-consistent-content-delivery"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#media-sharing-platforms-with-consistent-content-delivery"}},[e._v("#")]),e._v(" Media Sharing Platforms with Consistent Content Delivery")]),e._v(" "),t("p",[e._v("For platforms hosting user-generated content, ARCSS provides not just decentralized hosting but also a guarantee of content delivery. Even if a content piece becomes viral and one gateway gets congested, ARCSS ensures that users can still access the content through another gateway, providing a seamless experience.")]),e._v(" "),t("h3",{attrs:{id:"decentralized-applications-dapps-with-reliable-front-end-accessibility"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#decentralized-applications-dapps-with-reliable-front-end-accessibility"}},[e._v("#")]),e._v(" Decentralized Applications (DApps) with Reliable Front-End Accessibility")]),e._v(" "),t("p",[e._v("DApps, while benefiting from Arweave's permanent hosting, can further ensure their front-end remains consistently accessible to users by using ARCSS. If a DApp's front-end is accessed frequently, causing strain on one gateway, ARCSS can help ensure the load is distributed, and the DApp remains online and functional.")]),e._v(" "),t("h2",{attrs:{id:"how-it-works"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works"}},[e._v("#")]),e._v(" How it Works")]),e._v(" "),t("h3",{attrs:{id:"transaction-id"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#transaction-id"}},[e._v("#")]),e._v(" Transaction ID")]),e._v(" "),t("p",[e._v("To access content tied to an Arweave Transaction ID (TxId), simply append the TxId to "),t("code",[e._v("ar://")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("ar://qI19W6spw-kzOGl4qUMNp2gwFH2EBfDXOFsjkcNyK9A\n")])])]),t("p",[e._v("Inputting this into a WayFinder-equipped browser will route your request through the right AR.IO Gateway, translating it as per your "),t("code",[e._v("Routing Method")]),e._v(" settings.")]),e._v(" "),t("h3",{attrs:{id:"arns"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#arns"}},[e._v("#")]),e._v(" ArNS")]),e._v(" "),t("p",[e._v("Fetching content via an Arweave Name Service (ArNS) name is straightforward. Attach the ArNS name to "),t("code",[e._v("ar://")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("ar://good-morning\n")])])]),t("p",[e._v("The ARCSS protocol, along with the WayFinder extension, discerns between TxIds and ArNS names. Once the suitable "),t("code",[e._v("https://")]),e._v(" request is formulated, the chosen gateway translates the ArNS name based on the ArNS smartweave contract.")]),e._v(" "),t("h2",{attrs:{id:"wayfinder"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#wayfinder"}},[e._v("#")]),e._v(" Wayfinder")]),e._v(" "),t("p",[e._v("The "),t("a",{attrs:{href:"https://chrome.google.com/webstore/detail/ario-WayFinder/hnhmeknhajanolcoihhkkaaimapnmgil",target:"_blank",rel:"noopener noreferrer"}},[e._v("AR.IO WayFinder browser extension"),t("OutboundLink")],1),e._v(" is a browser extension designed to facilitate the resolving of "),t("code",[e._v("ar://")]),e._v(" urls.")]),e._v(" "),t("h3",{attrs:{id:"v0-0-10"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#v0-0-10"}},[e._v("#")]),e._v(" v0.0.10")]),e._v(" "),t("p",[e._v("As of v0.0.10, Wayfinder supports the resolution of TXT records to Arwevae content on top level domains. This innovative feature leverages DNS TXT records to associate Arweave transaction IDs with human-readable domain names, facilitating intuitive and memorable access to permaweb content. By simply entering an AR:// URL with a domain name, Wayfinder resolves the corresponding Arweave transaction ID through DNS TXT records, redirecting users directly to the content hosted on the Arweave network.")]),e._v(" "),t("p",[t("strong",[e._v("Setup")]),e._v(": Owners of a domain can set a TXT record for that domain following the format "),t("code",[e._v("ARTX <Arweave TXID>")]),e._v(".")]),e._v(" "),t("center",[t("img",{attrs:{src:e.$withBase("/images/arcss-txt.png")}})]),e._v(" "),t("p",[t("strong",[e._v("AR:// Redirection")]),e._v(": With a TXT record set properly, whenever a user (who has Wayfinder installed) enters an AR:// URL containing a domain name (e.g., "),t("code",[e._v("ar://example.com")]),e._v("), Wayfinder performs a DNS lookup for that TXT record in order to redirect to the Arweave content. The lookup is completed through a secure DNS-over-HTTPS query to ensure privacy and integrity.")]),e._v(" "),t("p",[t("strong",[e._v("Dynamic Content Resolution")]),e._v(": After retrieving the TXT record, Wayfinder extracts that Arweave transaction ID and dynamically redirects the user to the content on the permaweb. This process is transparent to the user, providing a seamless experience as if accessing a traditional website.")]),e._v(" "),t("h3",{attrs:{id:"key-features"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#key-features"}},[e._v("#")]),e._v(" Key Features")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Gasless")]),e._v(": TXT records can be set without any onchain transactions that would require gas fees.")]),e._v(" "),t("li",[t("strong",[e._v("Easy Integration")]),e._v(": Domain owners can easily link their permaweb content to their domains, making it accessible through a simple AR:// URL.")]),e._v(" "),t("li",[t("strong",[e._v("Dyncamic Content Access")]),e._v(": Content links can be updated in real-time through DNS TXT records, without requiring any changes to the AR:// URL itself.")]),e._v(" "),t("li",[t("strong",[e._v("Enhanced User Experience")]),e._v(": Offers users a familiar and easy-to-remember way to access permaweb content, leveraging standard web domain names.")]),e._v(" "),t("li",[t("strong",[e._v("Security and Privacy")]),e._v(": Secure DNS-over-HTTPS queries for DNS lookups protect user privacy and enhances security.")])]),e._v(" "),t("h3",{attrs:{id:"use-cases-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#use-cases-2"}},[e._v("#")]),e._v(" Use Cases")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Branded Content Access")]),e._v(": Companies and individuals can brand their permaweb content, making it accessible through their domain, enhancing brand visibility and user trust.")]),e._v(" "),t("li",[t("strong",[e._v("Dynamic Content Updates")]),e._v(": Domain owners can easily update what Permaweb content their AR:// URL resolves to, which is ideal for frequently updated resources like documents, blogs, and application interfaces.")]),e._v(" "),t("li",[t("strong",[e._v("Educational and Informational Resources")]),e._v(": Educational institutions and information providers can make their resources permanently available on the permaweb, accessible through simple, memorable URLs.")])]),e._v(" "),t("p",[e._v("This feature marks a significant advancement in making decentralized content more accessible and user-friendly, bridging the gap between traditional internet usability and the permaweb’s permanence and censorship-resistant nature.")])],1)}),[],!1,null,null,null);t.default=r.exports}}]);
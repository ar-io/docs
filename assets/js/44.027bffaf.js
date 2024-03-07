(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{334:function(e,r,t){"use strict";t.r(r);var a=t(10),o=Object(a.a)({},(function(){var e=this,r=e._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"ar-io-release-notes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#ar-io-release-notes"}},[e._v("#")]),e._v(" ar.io Release Notes")]),e._v(" "),r("h2",{attrs:{id:"overview"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),r("p",[e._v("Welcome to the documentation page for the ar.io gateway release notes. Here, you will find detailed information about each version of the ar.io gateway, including the enhancements, bug fixes, and any other changes introduced in every release. This page serves as a comprehensive resource to keep you informed about the latest developments and updates in the ar.io gateway. For those interested in exploring the source code, each release's code is readily accessible at our GitHub repository: ar.io gateway "),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/blob/main/CHANGELOG.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("change logs"),r("OutboundLink")],1),e._v(". Stay updated with the continuous improvements and advancements in the ar.io gateway by referring to this page for all release-related information.")]),e._v(" "),r("h2",{attrs:{id:"release-7-2024-02-14"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#release-7-2024-02-14"}},[e._v("#")]),e._v(" [Release 7] - 2024 - 02 - 14")]),e._v(" "),r("ul",[r("li",[r("p",[r("strong",[e._v("Added")])]),e._v(" "),r("ul",[r("li",[e._v("Add support for notifying other services of transactions and data items using webhooks (see README for details).")]),e._v(" "),r("li",[e._v("Add support for filter negation (particularly useful for excluding large bundles from indexint).")]),e._v(" "),r("li",[e._v("Improve unbundling throughput by decoupling data fetching from unbundling.")]),e._v(" "),r("li",[e._v("Add Envoy and core service ARM builds.")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Changed")])]),e._v(" "),r("ul",[r("li",[e._v("Improve resouce cleanup and shutdown behavior.")]),e._v(" "),r("li",[e._v("Don't save Redis data to disk by default to help prevent memory issues on startup for small gateways.")]),e._v(" "),r("li",[e._v("Reduce the amount of data sampled from large files by the observer.")]),e._v(" "),r("li",[e._v("Ensure block poa2 field is not chached to reduce memory consumption.")])])])]),e._v(" "),r("h2",{attrs:{id:"release-6-2024-01-29"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#release-6-2024-01-29"}},[e._v("#")]),e._v(" [Release 6] - 2024-01-29")]),e._v(" "),r("ul",[r("li",[r("strong",[e._v("Fixed")]),e._v(" "),r("ul",[r("li",[e._v("Update observer to improve reliability of contract state synchronization and evaluation.")])])])]),e._v(" "),r("h2",{attrs:{id:"release-5-2024-01-25"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#release-5-2024-01-25"}},[e._v("#")]),e._v(" [Release 5] - 2024-01-25")]),e._v(" "),r("ul",[r("li",[r("p",[r("strong",[e._v("Added")])]),e._v(" "),r("ul",[r("li",[e._v("Added transaction offset indexing to support future data retrieval capabilities.")]),e._v(" "),r("li",[e._v("Enabled IPv6 support in Envoy config.")]),e._v(" "),r("li",[e._v("Added ability to configure observer report generation interval via the "),r("code",[e._v("REPORT_GENERATION_INTERVAL_MS")]),e._v(" environmental variable. (Intended primarily for development and testing)")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Changed")])]),e._v(" "),r("ul",[r("li",[e._v("Updated observer to properly handle FQDN conflicts.")]),e._v(" "),r("li",[e._v("Renamed most "),r("code",[e._v("created_at")]),e._v(" columns to index to "),r("code",[e._v("indexed_at")]),e._v(" for consistency and clarity.")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Fixed")])]),e._v(" "),r("ul",[r("li",[e._v("Updated LMDB version to remove Buffer workaround and fix occasional block cache errors.")])])])]),e._v(" "),r("h2",{attrs:{id:"release-4-2024-01-11"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#release-4-2024-01-11"}},[e._v("#")]),e._v(" [Release 4] - 2024-01-11")]),e._v(" "),r("ul",[r("li",[r("p",[r("strong",[e._v("Added")])]),e._v(" "),r("ul",[r("li",[e._v("Added circuit breakers around data index access to reduce impact of DB access contention under heavy requests loads.")]),e._v(" "),r("li",[e._v("Added support for configuring data source priority via the ON_DEMAND_RETRIEVAL_ORDER environment variable.")]),e._v(" "),r("li",[e._v("Updated observer to a version that retrieves epoch start and duration from contract state.")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Changed")])]),e._v(" "),r("ul",[r("li",[e._v("Set the Redis max memory eviction policy to "),r("code",[e._v("allkeys-lru")]),e._v(".")]),e._v(" "),r("li",[e._v("Reduced default Redis max memory from 2GB to 256MB.")]),e._v(" "),r("li",[e._v("Improved predictability and performance of GraphQL queries.")]),e._v(" "),r("li",[e._v("Eliminated unbundling worker threads when filters are configured to skip indexing ANS-104 bundles.")]),e._v(" "),r("li",[e._v("Reduced the default number of ANS-104 worker threads from 2 to 1 when unbundling is enabled to conserve memory.")]),e._v(" "),r("li",[e._v("Increased nodejs max old space size to 8GB when ANS-104 workers > 1.")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Fixed")])]),e._v(" "),r("ul",[r("li",[e._v("Adjusted paths for chunks indexed by data root to include the full data root.")])])])]),e._v(" "),r("h2",{attrs:{id:"release-3-2023-12-05"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#release-3-2023-12-05"}},[e._v("#")]),e._v(" [Release 3] - 2023-12-05")]),e._v(" "),r("ul",[r("li",[r("p",[r("strong",[e._v("Added")])]),e._v(" "),r("ul",[r("li",[e._v("Support range requests ("),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/61",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 61"),r("OutboundLink")],1),e._v(", "),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/64",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 64"),r("OutboundLink")],1),e._v(")\n"),r("ul",[r("li",[e._v("Note: serving multiple ranges in a single request is not yet supported.")])])]),e._v(" "),r("li",[e._v("Release number in "),r("code",[e._v("/ar-io/info")]),e._v(" response.")]),e._v(" "),r("li",[e._v("Redis header cache implementation ("),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/62",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 62"),r("OutboundLink")],1),e._v(").\n"),r("ul",[r("li",[e._v("New default header cache (replaces old FS cache).")])])]),e._v(" "),r("li",[e._v("LMDB header cache implementation ("),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/60",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 60"),r("OutboundLink")],1),e._v(").\n"),r("ul",[r("li",[e._v("Intended for use in development only.")]),e._v(" "),r("li",[e._v("Enable by setting "),r("code",[e._v("CHAIN_CACHE_TYPE=lmdb")]),e._v(".")])])]),e._v(" "),r("li",[e._v("Filesystem header cache cleanup worker ("),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/68",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 68"),r("OutboundLink")],1),e._v(").\n"),r("ul",[r("li",[e._v("Enabled by default to cleanup old filesystem cache now that Redis is the new default.")])])]),e._v(" "),r("li",[e._v("Support for parallel ANS-104 unbundling ("),r("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/65",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 65"),r("OutboundLink")],1),e._v(").")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Changed")])]),e._v(" "),r("ul",[r("li",[e._v("Used pinned container images tags for releases.")]),e._v(" "),r("li",[e._v("Default to Redis header cache when running via docker-compose.")]),e._v(" "),r("li",[e._v("Default to LMDB header cache when running via "),r("code",[e._v("yarn start")]),e._v(".")])])]),e._v(" "),r("li",[r("p",[r("strong",[e._v("Fixed")])]),e._v(" "),r("ul",[r("li",[e._v("Correct GraphQL pagination for transactions with duplicate tags.")])])])])])}),[],!1,null,null,null);r.default=o.exports}}]);
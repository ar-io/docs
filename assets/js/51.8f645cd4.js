(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{351:function(e,t,a){"use strict";a.r(t);var r=a(10),i=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"ar-io-release-notes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ar-io-release-notes"}},[e._v("#")]),e._v(" ar.io Release Notes")]),e._v(" "),t("h2",{attrs:{id:"overview"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),t("p",[e._v("Welcome to the documentation page for the ar.io gateway release notes. Here, you will find detailed information about each version of the ar.io gateway, including the enhancements, bug fixes, and any other changes introduced in every release. This page serves as a comprehensive resource to keep you informed about the latest developments and updates in the ar.io gateway. For those interested in exploring the source code, each release's code is readily accessible at our GitHub repository: ar.io gateway "),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/blob/main/CHANGELOG.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("change logs"),t("OutboundLink")],1),e._v(". Stay updated with the continuous improvements and advancements in the ar.io gateway by referring to this page for all release-related information.")]),e._v(" "),t("h2",{attrs:{id:"release-18-2024-10-01"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-18-2024-10-01"}},[e._v("#")]),e._v(" [Release 18] - 2024-10-01")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Improved performance of data attributes query that was preventing "),t("code",[e._v("data.db")]),e._v("\nWAL flushing.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added WAL "),t("code",[e._v("sqlite_wal_checkpoint_pages")]),e._v(" Prometheus metric to help monitor WAL\nflushing.")]),e._v(" "),t("li",[e._v("Added a POST "),t("code",[e._v("/ar-io/admin/export-parquet")]),e._v(" endpoint that can be used to\nexport the contents of the SQLite3 core and bundle DBs as Parquet. To trigger\nan export, POST JSON containing "),t("code",[e._v("outputDir")]),e._v(", "),t("code",[e._v("startHeight")]),e._v(", "),t("code",[e._v("endHeight")]),e._v(", and\n"),t("code",[e._v("maxFileRows")]),e._v(" keys. The resulting Parquet files can then be queried directly\nusing DuckDB or loaded into another system (e.g. ClickHouse). Scripts will be\nprovided to help automate the latter in a future release.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("ARNS_RESOLVER_OVERRIDE_TTL_SECONDS")]),e._v(" that can be used to force ArNS\nnames to refresh before their TTLs expire.")]),e._v(" "),t("li",[e._v("Added a GET "),t("code",[e._v("/ar-io/resolver/:name")]),e._v(" endpoint that returns an ArNS resolution\nfor the given name.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Removed ArNS resolver service in favor of integrated resolver. If a\nstandalone resolver is still desired, the core service can be run with the\n"),t("code",[e._v("START_WRITERS")]),e._v(" environment variable set to "),t("code",[e._v("false")]),e._v(". This will disable\nindexing while preserving resolver functionality.")]),e._v(" "),t("li",[e._v("Deduplicated writes to "),t("code",[e._v("data.db")]),e._v(" to improve performance and reduce WAL growth\nrate.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-17-2024-09-09"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-17-2024-09-09"}},[e._v("#")]),e._v(" [Release 17] - 2024-09-09")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Notes")])]),e._v(" "),t("ul",[t("li",[e._v("This release includes a "),t("strong",[e._v("LONG RUNNING MIGRATION")]),e._v(". Your node may appear\nunresponsive while it is running. It is best to wait for it to complete. If\nit fails or is interrupted, removing your SQLite DBs (in "),t("code",[e._v("data/sqlite")]),e._v(" by\ndefault) should resolve the issue, provided you are willing to lose your\nGraphQL index and let your node rebuild it.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Use the correct environment variable to populate "),t("code",[e._v("WEBHOOK_BLOCK_FILTER")]),e._v(" in\n"),t("code",[e._v("docker-compose.yaml")]),e._v(".")]),e._v(" "),t("li",[e._v("Don't cache data regions retrieved to satisfy range requests to avoid\nunnecessary storage overhead and prevent inserting invalid ID to hash\nmappings into the data DB.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added a new ClickHouse based DB backend. It can be used in combination with\nthe SQLite DB backend to enable batch loading of historical data from\nParquet. It also opens up the possibility of higher DB performance and\nscalability. In its current state it should be considered a technology\npreview. It won't be useful to most users until we either provide Parquet\nfiles to load into it or automate flushing of the SQLite DB to it (both are\nplanned in future release). It is not intended to be standalone solution. It\nsupports bulk loading and efficient GraphQL querying of transactions and data\nitems, but it relies on SQLite (or potentially another OLTP in the future) to\nindex recent data. These limitations allow greatly simplified schema and\nquery construction. Querying the new ClickHouse DB for transaction and data\nitems via GraphQL is enabled by setting the "),t("code",[e._v("CLICKHOUSE_URL")]),e._v(" environment\nvariable.")]),e._v(" "),t("li",[e._v("Added the ability to skip storing transaction signatures in the DB by setting\nWRITE_TRANSACTION_DB_SIGNATURES to false. Missing signatures are fetched from\nthe trusted Arweave node when needed for GraphQL results.")]),e._v(" "),t("li",[e._v("Added a Redis backed signature cache to support retrieving optimistically\nindexed data item signatures in GraphQL queries when writing data items\nsignatures to the DB has been disabled.")]),e._v(" "),t("li",[e._v("Added on-demand and composite ArNS resolvers. The on-demand resolver\nfetches results directly from an AO CU. The composite resolver attempts\nresolution in the order specified by the "),t("code",[e._v("ARNS_RESOLVER_PRIORITY_ORDER")]),e._v("\nenvironment variable (defaults to "),t("code",[e._v("on-demand,gateway")]),e._v(").")]),e._v(" "),t("li",[e._v("Added a queue_length Prometheus metric to fasciliate monitoring queues and\ninform future optimizations")]),e._v(" "),t("li",[e._v("Added SQLite WAL cleanup worker to help manage the size of the "),t("code",[e._v("data.db-wal")]),e._v("\nfile. Future improvements to "),t("code",[e._v("data.db")]),e._v(" usage are also planned to further\nimprove WAL management.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Handle data requests by ID on ArNS sites. This enables ArNS sites to use\nrelative links to data by ID.")]),e._v(" "),t("li",[e._v("Replaced "),t("code",[e._v("ARNS_RESOLVER_TYPE")]),e._v(" with "),t("code",[e._v("ARNS_RESOLVER_PRIORITY_ORDER")]),e._v(" (defaults to\n"),t("code",[e._v("on-demand,gateway")]),e._v(").")]),e._v(" "),t("li",[e._v("Introduced unbundling back pressure. When either data item data or GraphQL\nindexing queue depths are more than the value specified by the\n"),t("code",[e._v("MAX_DATA_ITEM_QUEUE_SIZE")]),e._v(" environment variable (defaults to 100000),\nunbundling is paused until the queues length falls bellow that threshold.\nThis prevents the gateway from running out of memory when the unbundling rate\nexceeds the indexing rate while avoiding wasteful bundle reprocessing.")]),e._v(" "),t("li",[e._v("Prioritized optimistic data item indexing by inserting optimistic data items\nat the front of the indexing queues.")]),e._v(" "),t("li",[e._v("Prioritized nested bundle indexing by inserting nested bundles at the front\nof the unbundling queue.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-16-2024-08-09"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-16-2024-08-09"}},[e._v("#")]),e._v(" [Release 16] - 2024-08-09")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Fixed promise leak caused by missing await when saving data items to the DB.")]),e._v(" "),t("li",[e._v("Modified ArNS middleware to not attempt resolution when receiving requests for a different hostname than the one specified by "),t("code",[e._v("ARNS_ROOT_HOST")]),e._v(".")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added support for returning "),t("code",[e._v("Content-Encoding")]),e._v(" HTTP headers based on user specified Content-Encoding tags.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("isNestedBundle")]),e._v(" filter enables that matches any nested bundle when indexing. This enables composite unbundling filters that match a set of L1 tags and bundles nested under them.")]),e._v(" "),t("li",[e._v("Added ability to skip writing ANS-104 signatures to the DB and load them based on offsets from the data instead. This significantly reduces the size of the bundles DB. It can be enabled by setting the "),t("code",[e._v("WRITE_ANS104_DATA_ITEM_DB_SIGNATURES")]),e._v(" environment variable to false.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("data_item_data_indexed_total")]),e._v(" Prometheus counter to count data items with data attributes indexed.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Queue data attributes writes when serving data rather than writing them syncronously.")]),e._v(" "),t("li",[e._v("Reduced the default data indexer count to 1 to lessen the load on the data DB.")]),e._v(" "),t("li",[e._v("Switched a number of overly verbose info logs to debug level.")]),e._v(" "),t("li",[e._v("Removed docker-compose on-failure restart limits to ensure that services restart no matter how many times they fail.")]),e._v(" "),t("li",[e._v("Modified the "),t("code",[e._v("data_items_indexed_total")]),e._v(" Prometheus counter to count data items indexed for GraphQL querying instead of data attributes.")]),e._v(" "),t("li",[e._v("Increased aggressiveness of contiguous data cleanup. It now pauses 5 seconds instead of 10 seconds per batch and runs every 4 hours instead of every 24 hours.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-15-2024-07-19"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-15-2024-07-19"}},[e._v("#")]),e._v(" [Release 15] - 2024-07-19")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Fixed query error that was preventing bundles from being marked as fully imported in the database.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Adjusted data item indexing to record data item signature types in the DB. This helps distinguish between signatures using different key formats, and will enable querying by signature type in the future.")]),e._v(" "),t("li",[e._v("Adjusted data item indexing to record offsets for data items within bundles and signatures and owners within data items. In the future this will allow us to avoid saving owners and signatures in the DB and thus considerably reduce the size of the bundles DB.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("ARNS_CACHE_TTL_MS")]),e._v(" environment variable to control the TTL of ARNS cache entries (defaults to 1 hour).")]),e._v(" "),t("li",[e._v("Added support for multiple ranges in a single HTTP range request.")]),e._v(" "),t("li",[e._v("Added experimental chunk POST endpoint that broadcasts chunks to the comma-separate list of URLS in the "),t("code",[e._v("CHUNK_BROADCAST_URLS")]),e._v(" environment variable. It is available at "),t("code",[e._v("/chunk")]),e._v(" on the internal gateway service port (4000 by default) but is not yet exposed through Envoy.")]),e._v(" "),t("li",[e._v("Added support for running an AO CU adjacent to the gateway (see README.md for details).")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("X-ArNS-Process-Id")]),e._v(" to ArNS resolved name headers.")]),e._v(" "),t("li",[e._v("Added a set of "),t("code",[e._v("AO_...")]),e._v(" environment variables for specifying which AO URLs should be used (see "),t("code",[e._v("docker-compose.yaml")]),e._v(" for the complete list). The "),t("code",[e._v("AO_CU_URL")]),e._v(" is of particular use since the core and resolver services only perform AO reads and only the CU is needed for reads.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Split the monolithic "),t("code",[e._v("docker-compose.yaml")]),e._v(" into "),t("code",[e._v("docker-compose.yaml")]),e._v(", "),t("code",[e._v("docker-compose.bundler.yaml")]),e._v(", and "),t("code",[e._v("docker-compose.ao.yaml")]),e._v(" (see README for details).")]),e._v(" "),t("li",[e._v("Replaced references to 'docker-compose' with 'docker compose' in the docs since the former is mostly deprecated.")]),e._v(" "),t("li",[e._v("Reduce max fork depth from 50 to 18 inline to reflect Arweave 2.7.2 protocol changes.")]),e._v(" "),t("li",[e._v("Increased the aggressiveness of bundle reprocessing by reducing reprocessing interval from 10 minutes to 5 minutes and raising reprocessing batch size from 100 to 1000.")]),e._v(" "),t("li",[e._v("Use a patched version of Litestream to work around insufficient S3 multipart upload size in the upstream version.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-14-2024-06-26"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-14-2024-06-26"}},[e._v("#")]),e._v(" [Release 14] - 2024-06-26")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Correctly handle manifest "),t("code",[e._v("index")]),e._v(" after "),t("code",[e._v("paths")]),e._v(".")])])])]),e._v(" "),t("h2",{attrs:{id:"release-13-2024-06-24"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-13-2024-06-24"}},[e._v("#")]),e._v(" [Release 13] - 2024-06-24")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added support for optimistically reading data items uploaded using the integrated Turbo bundler via the LocalStack S3 interface.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("X-AR-IO-Origin-Node-Release")]),e._v(" header to outbound data requests.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("hops")]),e._v(", "),t("code",[e._v("origin")]),e._v(", and "),t("code",[e._v("originNodeRelease")]),e._v(" query params to outbound data requests.")]),e._v(" "),t("li",[e._v("Added support for "),t("code",[e._v("fallback")]),e._v(" in v0.2 manifests that is used if no path in the manifest is matched.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Updated Observer to read prescribed names from and write observations to the ar.io AO network process.")]),e._v(" "),t("li",[e._v("Updated Resolver to read from the ar.io AO network process.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Modified optimistic indexing of data items to use a null "),t("code",[e._v("parent_id")]),e._v(" when inserting into the DB instead of a placeholder value. This prevents unexpected non-null "),t("code",[e._v("bundledIn")]),e._v(" values in GraphQL results for optimistically indexed data items.")]),e._v(" "),t("li",[e._v("Modified GraphQl query logic to require an ID for single block GraphQL queries. Previously queries missing an ID were returning an internal SQLite error. This represents a small departure from arweave.net's query logic which returns the latest block for these queries. We recommend querying "),t("code",[e._v("blocks")]),e._v(" instead of "),t("code",[e._v("block")]),e._v(" in cases where the latest block is desired.")]),e._v(" "),t("li",[e._v("Adjusted Observer health check to reflect port change to 5050.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Security")])]),e._v(" "),t("ul",[t("li",[e._v("Modified docker-compose.yaml to only expose Redis, PostgreSQL, and LocalStack ports internally. This protects gateways that neglect to deploy behind a firewall, reverse proxy, or load balancer.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-12-2024-06-05"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-12-2024-06-05"}},[e._v("#")]),e._v(" [Release 12] - 2024-06-05")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added "),t("code",[e._v("/ar-io/admin/queue-data-item")]),e._v(" endpoint for queuing data item headers for indexing before the bundles containing them are processed. This allows trusted bundlers to make their data items quickly available to be queried via GraphQL without having to wait for bundle data submission or unbundling.")]),e._v(" "),t("li",[e._v("Added experimental support for retrieving contiguous data from S3. See "),t("code",[e._v("AWS_*")]),e._v(" "),t("a",{attrs:{href:""}},[e._v("environment variables documentation")]),e._v(" for configuration details. In conjuction with a local Turbo bundler this allows optimistic bundle (but not yet data item) retrieval.")]),e._v(" "),t("li",[e._v("Add experimental support for fetching data from gateway peers. It can be enabled by adding "),t("code",[e._v("ario-peer")]),e._v(" to "),t("code",[e._v("ON_DEMAND_RETRIEVAL_ORDER")]),e._v(". Note: do not expect this work reliably yet! This functionality is in active development and will be improved in future releases.")]),e._v(" "),t("li",[e._v("Add "),t("code",[e._v("import_attempt_count")]),e._v(" to "),t("code",[e._v("bundle")]),e._v(" records to enable future bundle import retry optimizations.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Removed "),t("code",[e._v("version")]),e._v(" from "),t("code",[e._v("docker-compose.yaml")]),e._v(" to avoid warnings with recent versions of "),t("code",[e._v("docker-compose")]),e._v(".")]),e._v(" "),t("li",[e._v("Switched default observer port from 5000 to 5050 to avoid conflict on OS X. Since Envoy is used to provide external access to the observer API this should have no user visible effect.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-11-2024-05-21"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-11-2024-05-21"}},[e._v("#")]),e._v(" [Release 11] - 2024-05-21")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added "),t("code",[e._v("arweave_tx_fetch_total")]),e._v(" Prometheus metric to track counts of transaction headers fetched from the trusted node and Arweave network peers.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Revert to using unnamed bind mounts due to cross platform issues with named volumes.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-10-2024-05-20"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-10-2024-05-20"}},[e._v("#")]),e._v(" [Release 10] - 2024-05-20")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added experimental support for streaming SQLite backups to S3 (and compatible services) using "),t("a",{attrs:{href:"https://litestream.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Litestream"),t("OutboundLink")],1),e._v('. Start the service using the docker-compose "litestream" profile to use it, and see the '),t("code",[e._v("AR_IO_SQLITE_BACKUP_*")]),e._v(" "),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/blob/r10-prep/docs/env.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("environment variables documentation"),t("OutboundLink")],1),e._v(" for further details.")]),e._v(" "),t("li",[e._v("Added "),t("code",[e._v("/ar-io/admin/queue-bundle")]),e._v(" endpoint for queueing bundles for import for import before they're in the mempool. In the future this will enable optimistic indexing when combined with a local trusted bundler.")]),e._v(" "),t("li",[e._v("Added support for triggering webhooks when blocks are imported matching the filter specified by the "),t("code",[e._v("WEBHOOK_BLOCK_FILTER")]),e._v(" environment variable.")]),e._v(" "),t("li",[e._v("Added experimental support for indexing transactions and related data items from the mempool. Enable it by setting "),t("code",[e._v("ENABLE_MEMPOOL_WATCHER")]),e._v(" to 'true'.")]),e._v(" "),t("li",[e._v("Made on-demand data caching circuit breakers configurable via the "),t("code",[e._v("GET_DATA_CIRCUIT_BREAKER_TIMEOUT_MS")]),e._v(" environment variable. This allows gateway operators to decide how much latency they will tolerate when serving data in exchange for more complete data indexing and caching.")]),e._v(" "),t("li",[e._v("Rename cache header from "),t("code",[e._v("X-Cached")]),e._v(" to "),t("code",[e._v("X-Cache")]),e._v(" to mimic typical CDN practices.")]),e._v(" "),t("li",[e._v("Add X-AR-IO-Hops and X-AR-IO-Origin headers in preparation for future peer-to-peer functionality.")]),e._v(" "),t("li",[e._v("Upgrade to Node.js v20 and switch to native test runner.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-9-2024-04-10"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-9-2024-04-10"}},[e._v("#")]),e._v(" [Release 9] - 2024-04-10")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Added")]),e._v(" "),t("ul",[t("li",[e._v("Added experimental Farcaster Frames support, enabling simple Arweave based Frames with button navigation. Transaction and data item data is now served under "),t("code",[e._v("/local/farcaster/frame/<ID>")]),e._v(". "),t("code",[e._v("/local")]),e._v(" is used as a prefix to indicate this functionality is both experimental and local to a particular gateway rather than part of the global gateway API. Both GET and POST requests are supported.")]),e._v(" "),t("li",[e._v("Added an experimental local ArNS resolver. When enabled it removes dependence on arweave.net for ArNS resolution! Enable it by setting "),t("code",[e._v("RUN_RESOLVER=TRUE")]),e._v(", "),t("code",[e._v("TRUSTED_ARNS_RESOLVER_TYPE=resolver")]),e._v(", and "),t("code",[e._v("TRUSTED_ARNS_RESOLVER_URL=http://resolver:6000")]),e._v(" in your "),t("code",[e._v(".env")]),e._v(" file.")]),e._v(" "),t("li",[e._v("Added an "),t("code",[e._v("X-Cached")]),e._v(" header to data responses to indicate when data is served from the local cache rather than being retrieved from an external source. This is helpful for interfacing with external systems, debugging, and end-to-end testing.")]),e._v(" "),t("li",[e._v("Save hashes for unbundled data items during indexing. This enables reduction in data storage via hash based deduplication as well as more efficient peer-to-peer data retrieval in the future.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-8-2024-03-14"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-8-2024-03-14"}},[e._v("#")]),e._v(" [Release 8] - 2024-03-14")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added GraphQL SQL query debug logging to support trouble-shooting and performance optimization.")]),e._v(" "),t("li",[e._v("Added support for indexing data items (not GraphQL querying) based solely on tag name. (example use case: indexing all IPFS CID tagged data items).")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changes")])]),e._v(" "),t("ul",[t("li",[e._v("Observer data sampling now uses randomized ranges to generate content hashes.")]),e._v(" "),t("li",[e._v("Reference gateway ArNS resolutions are now cached to improve report generation performance.")]),e._v(" "),t("li",[e._v("Contract interactions are now tested before posting using "),t("code",[e._v("dryWrite")]),e._v(" to avoid submitting interactions that would fail.")]),e._v(" "),t("li",[t("code",[e._v("/ar-io/observer/info")]),e._v(" now reports "),t("code",[e._v("INVALID")]),e._v(" for wallets that fail to load.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Fix data caching failure caused by incorrect method name in "),t("code",[e._v("getData")]),e._v(" circuit breakers.")]),e._v(" "),t("li",[e._v("Fix healthcheck when "),t("code",[e._v("ARNS_ROOT_HOST")]),e._v(" includes a subdomain.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-7-2024-02-14"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-7-2024-02-14"}},[e._v("#")]),e._v(" [Release 7] - 2024 - 02 - 14")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Add support for notifying other services of transactions and data items using webhooks (see README for details).")]),e._v(" "),t("li",[e._v("Add support for filter negation (particularly useful for excluding large bundles from indexint).")]),e._v(" "),t("li",[e._v("Improve unbundling throughput by decoupling data fetching from unbundling.")]),e._v(" "),t("li",[e._v("Add Envoy and core service ARM builds.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Improve resouce cleanup and shutdown behavior.")]),e._v(" "),t("li",[e._v("Don't save Redis data to disk by default to help prevent memory issues on startup for small gateways.")]),e._v(" "),t("li",[e._v("Reduce the amount of data sampled from large files by the observer.")]),e._v(" "),t("li",[e._v("Ensure block poa2 field is not chached to reduce memory consumption.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-6-2024-01-29"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-6-2024-01-29"}},[e._v("#")]),e._v(" [Release 6] - 2024-01-29")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Fixed")]),e._v(" "),t("ul",[t("li",[e._v("Update observer to improve reliability of contract state synchronization and evaluation.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-5-2024-01-25"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-5-2024-01-25"}},[e._v("#")]),e._v(" [Release 5] - 2024-01-25")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added transaction offset indexing to support future data retrieval capabilities.")]),e._v(" "),t("li",[e._v("Enabled IPv6 support in Envoy config.")]),e._v(" "),t("li",[e._v("Added ability to configure observer report generation interval via the "),t("code",[e._v("REPORT_GENERATION_INTERVAL_MS")]),e._v(" environmental variable. (Intended primarily for development and testing)")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Updated observer to properly handle FQDN conflicts.")]),e._v(" "),t("li",[e._v("Renamed most "),t("code",[e._v("created_at")]),e._v(" columns to index to "),t("code",[e._v("indexed_at")]),e._v(" for consistency and clarity.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Updated LMDB version to remove Buffer workaround and fix occasional block cache errors.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-4-2024-01-11"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-4-2024-01-11"}},[e._v("#")]),e._v(" [Release 4] - 2024-01-11")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Added circuit breakers around data index access to reduce impact of DB access contention under heavy requests loads.")]),e._v(" "),t("li",[e._v("Added support for configuring data source priority via the ON_DEMAND_RETRIEVAL_ORDER environment variable.")]),e._v(" "),t("li",[e._v("Updated observer to a version that retrieves epoch start and duration from contract state.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Set the Redis max memory eviction policy to "),t("code",[e._v("allkeys-lru")]),e._v(".")]),e._v(" "),t("li",[e._v("Reduced default Redis max memory from 2GB to 256MB.")]),e._v(" "),t("li",[e._v("Improved predictability and performance of GraphQL queries.")]),e._v(" "),t("li",[e._v("Eliminated unbundling worker threads when filters are configured to skip indexing ANS-104 bundles.")]),e._v(" "),t("li",[e._v("Reduced the default number of ANS-104 worker threads from 2 to 1 when unbundling is enabled to conserve memory.")]),e._v(" "),t("li",[e._v("Increased nodejs max old space size to 8GB when ANS-104 workers > 1.")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Adjusted paths for chunks indexed by data root to include the full data root.")])])])]),e._v(" "),t("h2",{attrs:{id:"release-3-2023-12-05"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#release-3-2023-12-05"}},[e._v("#")]),e._v(" [Release 3] - 2023-12-05")]),e._v(" "),t("ul",[t("li",[t("p",[t("strong",[e._v("Added")])]),e._v(" "),t("ul",[t("li",[e._v("Support range requests ("),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/61",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 61"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/64",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 64"),t("OutboundLink")],1),e._v(")\n"),t("ul",[t("li",[e._v("Note: serving multiple ranges in a single request is not yet supported.")])])]),e._v(" "),t("li",[e._v("Release number in "),t("code",[e._v("/ar-io/info")]),e._v(" response.")]),e._v(" "),t("li",[e._v("Redis header cache implementation ("),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/62",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 62"),t("OutboundLink")],1),e._v(").\n"),t("ul",[t("li",[e._v("New default header cache (replaces old FS cache).")])])]),e._v(" "),t("li",[e._v("LMDB header cache implementation ("),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/60",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 60"),t("OutboundLink")],1),e._v(").\n"),t("ul",[t("li",[e._v("Intended for use in development only.")]),e._v(" "),t("li",[e._v("Enable by setting "),t("code",[e._v("CHAIN_CACHE_TYPE=lmdb")]),e._v(".")])])]),e._v(" "),t("li",[e._v("Filesystem header cache cleanup worker ("),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/68",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 68"),t("OutboundLink")],1),e._v(").\n"),t("ul",[t("li",[e._v("Enabled by default to cleanup old filesystem cache now that Redis is the new default.")])])]),e._v(" "),t("li",[e._v("Support for parallel ANS-104 unbundling ("),t("a",{attrs:{href:"https://github.com/ar-io/ar-io-node/pull/65",target:"_blank",rel:"noopener noreferrer"}},[e._v("PR 65"),t("OutboundLink")],1),e._v(").")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Changed")])]),e._v(" "),t("ul",[t("li",[e._v("Used pinned container images tags for releases.")]),e._v(" "),t("li",[e._v("Default to Redis header cache when running via docker-compose.")]),e._v(" "),t("li",[e._v("Default to LMDB header cache when running via "),t("code",[e._v("yarn start")]),e._v(".")])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("Fixed")])]),e._v(" "),t("ul",[t("li",[e._v("Correct GraphQL pagination for transactions with duplicate tags.")])])])])])}),[],!1,null,null,null);t.default=i.exports}}]);
# Environmental Variables

## Overview

The AR.IO Gateway allows configuration customization through environmental variables. These variables dictate the gateway's behavior, from block synchronization settings to log formatting. Detailed below is a table enumerating all available environmental variables, their respective types, default values, and a brief description. Note that certain variables, such as `SANDBOX_PROTOCOL`, rely on others (e.g., `ARNS_ROOT_HOST`) to function effectively. Ensure proper understanding of these dependencies when configuring.

## Variables


<div style="text-align: center">
    <table class="inline-table" id="gateway-table">
        <tr>
            <th>ENV Name</th>
            <th>Type</th>
            <th>Default Value</th>
            <th>Description</th>
        </tr>
        <tr>
            <th>START_HEIGHT</th>
            <td>Number or "Infinity"</td>
            <td>0</td>
            <td>Starting block height for node synchronization (0 = start from genesis block)</td>
        </tr>
        <tr>
            <th>STOP_HEIGHT</th>
            <td>Number or "Infinity"</td>
            <td>"Infinity"</td>
            <td>Stop block height for node synchronization (Infinity = keep syncing until stopped)</td>
        </tr>
        <tr>
            <th>TRUSTED_NODE_URL</th>
            <td>String</td>
            <td>"https://arweave.net"</td>
            <td>Arweave node to use for fetching data</td>
        </tr>
        <tr>
            <th>TRUSTED_GATEWAY_URL</th>
            <td>String</td>
            <td>"https://arweave.net"</td>
            <td>Arweave node to use for proxying reqeusts</td>
        </tr>
        <tr>
            <th>TRUSTED_ARNS_GATEWAY_URL</th>
            <td>String</td>
            <td>https://NAME.arweave.dev</td>
            <td>ArNS gateway</td>
        </tr>
        <tr>
            <th>INSTANCE_ID</th>
            <td>String</td>
            <td>""</td>
            <td>Adds an "INSTANCE_ID" field to output logs</td>
        </tr>
        <tr>
            <th>LOG_FORMAT</th>
            <td>String</td>
            <td>"simple"</td>
            <td>Sets the format of output logs, accepts "simple" and "json"</td>
        </tr>
        <tr>
            <th>SKIP_CACHE</th>
            <td>Boolean</td>
            <td>false</td>
            <td>If true, skips the local cache and always fetches headers from the node</td>
        </tr>
        <tr>
            <th>PORT</th>
            <td>Number</td>
            <td>4000</td>
            <td>AR.IO node exposed port number</td>
        </tr>
        <tr>
            <th>SIMULATED_REQUEST_FAILURE_RATE</th>
            <td>Number</td>
            <td>0</td>
            <td>Number from 0 to 1, representing the probability of a request failing</td>
        </tr>
        <tr>
            <th>AR_IO_WALLET</th>
            <td>String</td>
            <td>""</td>
            <td>Arweave wallet address used for staking and rewards</td>
        </tr>
        <tr>
            <th>ADMIN_API_KEY</th>
            <td>String</td>
            <td>Generated</td>
            <td>API key used for admin API requests (if not set, it is generated and logged into the console)</td>
        </tr>
        <tr>
            <th>BACKFILL_BUNDLE_RECORDS</th>
            <td>Boolean</td>
            <td>false</td>
            <td>If true, AR.IO node will start indexing missing bundles</td>
        </tr>
        <tr>
            <th>FILTER_CHANGE_REPROCESS</th>
            <td>Boolean</td>
            <td>false</td>
            <td>If true, all indexed bundles will be reprocessed with the new filters (you can use this when you change the filters)</td>
        </tr>
        <tr>
            <th>ANS104_UNBUNDLE_FILTER</th>
            <td>String</td>
            <td>{"never": true}</td>
            <td>Only bundles compliant with this filter will be unbundled</td>
        </tr>
        <tr>
            <th>ANS104_INDEX_FILTER</th>
            <td>String</td>
            <td>{"never": true}</td>
            <td>Only bundles compliant with this filter will be indexed</td>
        </tr>
        <tr>
            <th>ARNS_ROOT_HOST</th>
            <td>String</td>
            <td>undefined</td>
            <td>Domain name for ArNS host</td>
        </tr>
        <tr>
            <th>SANDBOX_PROTOCOL</th>
            <td>String</td>
            <td>undefined</td>
            <td>Protocol setting in process of creating sandbox domains in ArNS (ARNS_ROOT_HOST needs to be set for this env to have any effect) accepts "http" or "https"</td>
        </tr>
        <tr>
            <th>START_WRITERS</th>
            <td>Boolean</td>
            <td>true</td>
            <td>If true, start indexing blocks, tx, ANS104 bundles</td>
        </tr>
        <tr>
            <th>RUN_OBSERVER</th>
            <td>Boolean</td>
            <td>true</td>
            <td>If true, runs the Observer alongside the gateway to generate Network compliance reports</td>
        </tr>
        <tr>
            <th>OBSERVER_WALLET</th>
            <td>String</td>
            <td>undefined</td>
            <td>The public wallet address of the wallet being used to sign report upload transactions for Observer</td>
        </tr>
        <tr>
            <td>CHUNKS_DATA_PATH</td>
            <td>string</td>
            <td>"data/chunks"</td>
            </td>Sets the location for chunked data to be saved. If omitted, chunked data will be stored in the `data` directory</td>
        </tr> 
        <tr>
            <td>CONTIGUOUS_DATA_PATH</td>
            <td>string</td>
            <td>"data/contiguous"</td>
            </td>Sets the location for contiguous data to be saved. If omitted, contiguous data will be stored in the `data` directory</td>
        </tr> 
        <tr>
            <td>HEADERS_DATA_PATH</td>
            <td>string</td>
            <td>"data/headers"</td>
            </td>Sets the location for header data to be saved. If omitted, header data will be stored in the `data` directory</td>
        </tr> 
        <tr>
            <td>SQLITE_DATA_PATH</td>
            <td>string</td>
            <td>"data/sqlite"</td>
            </td>Sets the location for sqlite indexed data to be saved. If omitted, sqlite data will be stored in the `data` directory</td>
        </tr>
        <tr>
            <td>TEMP_DATA_PATH</td>
            <td>string</td>
            <td>"data/tmp"</td>
            </td>Sets the location for temporary data to be saved. If omitted, temporary data will be stored in the `data` directory</td>
        </tr>
        <tr>
            <td>LMDB_DATA_PATH</td>
            <td>string</td>
            <td>"data/LMDB"</td>
            </td>Sets the location for LMDB data to be saved. If omitted, LMDB data will be stored in the `data` directory</td>
        </tr>
        <tr>
            <th>CHAIN_CACHE_TYPE</th>
            <td>String</td>
            <td>"redis"</td>
            <td>Sets the method for caching chain data, defaults to redis if gateway is started with docker-compose, otherwise defaults to LMDB</td>
        </tr>
        <tr>
            <th>REDIS_CACHE_URL</th>
            <td>String (URL)</td>
            <td>"redis://localhost:6379"</td>
            <td>URL of Redis database to be used for caching</td>
        </tr>
        <tr>
            <th>REDIS_CACHE_TTL_SECONDS</th>
            <td>Number</td>
            <td>28800</td>
            <td>TTL value for Redis cache, defaults to 8 hours (28800 seconds)</td>
        </tr>
        <tr>
            <th>ENABLE_FS_HEADER_CACHE_CLEANUP</th>
            <td>Boolean</td>
            <td>false</td>
            <td>If true, periodically deletes cached header data</td>
        </tr>
        <tr>
            <th>NODE_JS_MAX_OLD_SPACE_SIZE</th>
            <td>Number</td>
            <td>system default</td>
            <td>Sets the memory limit, in Megabytes, for NodeJs. Default value depends on hardware</td>
        </tr>
        <tr>
            <th>SUBMIT_CONTRACT_INTERACTIONS</th>
            <td>Boolean</td>
            <td>true</td>
            <td>If true, Observer will submit its generated reports to the ar.io Network. If false, reports will be generated but not submitted</td>
        </tr>
    </table>
</div>
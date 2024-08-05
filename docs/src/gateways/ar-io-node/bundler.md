---
permalink: "/gateways/bundler"
---

# Bundler

## Overview

A [Turbo ANS-104](https://github.com/ardriveapp/turbo-upload-service/) data item bundler can be run alongside an ar.io gateway. This allows gateways the ability to accept data items to be submit to the Arweave blockweave. 

The bundler service can be easily run inside Docker in the same way that the gateway is. It utilizes a separate docker compose file for configuration and deployment, which also allows for the use of a separate file for environmental variables specific to the bundler service. Additionally, the separation allows operators to spin their bundler service up or down at any time without effecting their core gateway service. Despite the use of separate docker compose files, the bundler service shares a docker network with the ar.io gateway, and so is able to directly interact with the gateway service and data.

**NOTE**: The bundler service relies on GraphQL indexing of recently bundled and uploaded data to manage its pipeline operations. The ar.io gateway should have its indexes synced up to Arweave's current block height before starting the bundler's service stack.

## Getting Started

### Environmental Variables

Environmental variables must be provided for the bundler to function and integrate properly with an existing ar.io gateway. The gateway repository provides a `.env.bundler.example` file that can be renamed to `.env.bundler` and used as a starting point. It contains the following:

```bash
BUNDLER_ARWEAVE_WALLET='Stringified JWK wallet. e.g: '{ "n": "...", ... }'
BUNDLER_ARWEAVE_ADDRESS='Address for above wallet'

APP_NAME='ar.io bundler service'

# Index on bundles from this bundler's wallet
ANS104_INDEX_FILTER={ "always": true }
ANS104_UNBUNDLE_FILTER={ "attributes": { "owner_address": "$BUNDLER_ARWEAVE_ADDRESS" } }

# Use localstack s3 bucket for shared data source between ar.io gateway and bundler
AWS_S3_BUCKET=ar.io
AWS_S3_PREFIX='data'
AWS_ACCESS_KEY_ID='test'
AWS_SECRET_ACCESS_KEY='test'
AWS_REGION='us-east-1'
AWS_ENDPOINT='http://localstack:4566'
```

- `BUNDLER_ARWEAVE_WALLET` must be the entire jwk of an Arweave wallet's keyfile, stringified. All uploads of bundled data items to Arweave will be signed and paid for by this wallet, so it must maintain a balance of AR tokens sufficient to handle the uploads. 
- `BUNDLER_ARWEAVE_ADDRESS` must be the normalized public address for the provided Arweave wallet.

The `ANS104` variables define filters for unbundling ANS-104 bundles and indexing the data items they contain. The filters provided in the `.env.bundler.example` file will unbundle anything that was submitted to Arweave by the provided bundler wallet, and index all contained data items. This will allow the accompanying ar.io gateway to serve this data almost instantaneously, even if it has not settled on the Arweave blockweave yet.

The remaining lines in the `.env.bundler.example` file control settings that allow the bundler service to share data with the ar.io gateway. If the gateway is not using custom data configurations, the provided values should be sufficient to sync the bundler and gateway.

### Managing Bundler Access

By default, the bundler will only accept data items uploaded by data item signers whose normalized wallet addresses are in the `ALLOW_LISTED_ADDRESSES` list. This is an additional environmental variable that can be added to your `.env.bundler` file, and must be a comma separated list of normalized public wallet addresses for wallets that should be allowed to bundle and upload data through your gateway.

```bash
ALLOW_LISTED_ADDRESSES=<address1>,<address2>
```

The following permissioning configurations schemes are also possible:

<div style="text-align: center">
    <table class="inline-table" id="gateway-table">
        <tr>
            <th>Scheme</th>
            <th>ALLOW_LISTED_ADDRESSES</th>
            <th>SKIP_BALANCE_CHECKS</th>
            <th>ALLOW_LISTED_SIGNATURE_TYPES</th>
            <th>PAYMENT_SERVICE_BASE_URL</th>
        </tr>
        <tr>
            <th>Allow Specific Wallets</th>
            <td>Comma-separated normalized wallet addresses</td>
            <td>false</td>
            <td>EMPTY or supplied</td>
            <td>EMPTY</td>
        </tr>
        <tr>
            <th>Allow Specific chains</th>
            <td>EMPTY or supplied</td>
            <td>false</td>
            <td>arbundles sigtype int</td>
            <td>EMPTY</td>
        </tr>
        <tr>
            <th>Allow All</th>
            <td>n/a</td>
            <td>true</td>
            <td>n/a</td>
            <td>n/a</td>
        </tr>
        <tr>
            <th>Allow None</th>
            <td>EMPTY</td>
            <td>false</td>
            <td>EMPTY</td>
            <td>EMPTY</td>
        </tr>
        <tr>
            <th>Allow Payers</th>
            <td>EMPTY or supplied</td>
            <td>false</td>
            <td>EMPTY or supplied</td>
            <td>Your payment service url</td>
        </tr>
    </table>
</div>

## Starting and Stopping the Bundler

### Starting

The bundler service is designed to run in conjunction with an ar.io gateway, and so relies on the `ar-io-network` network created in Docker when the core gateway services are spun up. It is possible to spin up the bundler while the core services are down, but the network must exist in Docker.

To start the bundler, specify the env and docker-compose files being used in a `docker compose up` command:

```bash
docker compose --env-file ./.env.bundler --file docker-compose.bundler.yaml up -d
```

The `-d` flag runs the command in "detached" mode, so it will run in the background without requiring the terminal to remain active.

### Stopping

To spin the bundler service down, specify the docker-compose file in a `docker compose down` command:

```bash
docker compose --file docker-compose.bundler.yaml down
```
### logs 

While the bundler service is running in detached mode, logs can be checked by specifying the docker-compose file in a `docker compose logs` command:

```bash
docker compose --file docker-compose.bundler.yaml logs -f --tail=0
```

- `-f` runs the command in "follow" mode, so the terminal will continue to watch and display new logs.
- `--tail=` defines the number of logs to display that existed prior to running the command. `0` displays only new logs.
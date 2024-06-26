---
permalink: "/manifests"
sidebarDepth: 3
---

# Manifests

## Overview

ar.io Gateways support friendly-path-name routing for data on Arweave via Manifests. This greatly improves the programmability of data relationships. Consider an illustrative example where data stored on Arweave and accessed like this:

```
http://<gateway domain>/cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI (txID of a website's index.html)
http://<gateway domain>/3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV (txID of its js/style.css)
http://<gateway domain>/or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ (txID of its assets/img/logo.png)
```

can instead be accessed like this:

```
http://<gateway domain>/<txId of manifest> (resolves to the txID of index.html)
http://<gateway domain>/<txId of manifest>/js/style.css
http://<gateway domain>/<txId of manifest>/assets/img/logo.png
```

NFT collections also benefit from manifest-based routing:

```
http://<gateway domain>/<txId of NFT collection image manifest>/0.png
http://<gateway domain>/<txId of NFT collection image manifest>/1.png
http://<gateway domain>/<txId of NFT collection image manifest>/2.png
... and so on.
```

ar.io gateways are capable of resolving manifest paths in a relative manner. An HTML page loading assets from Arweave would be very difficult to develop, maintain, and harden against hosting domains leaving existence if assets had to be linked to by a fully qualified domain name and an Arweave data item ID as the path. For example:

```html
<img src="https://arweave.dev/3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV">
```

Manifests allow HTML pages to use relative paths to assets with friendly names so that the document is easy to read, maintain, and host across any ar.io domain. For example:

```html
<img src="./logo.png">
```

Relative routing eliminates the need for every link to contain the full Arweave transaction ID and fully qualified domain name. This makes the HTML more readable and ensures that links remain valid even if the hosting domain changes. If `index.html` needed to access `js/style.css`, the relative link `./js/style.css` could be used instead of `<txId>/js/style.css`. This relative routing is incredibly useful for linking together files in a way that allows functional websites to be hosted entirely on Arweave.

Learn more about relative path routing and structuring files into a permanently hosted website in ArDrive's [decentralized app guide](https://docs.ardrive.io/docs/misc/deploy/paths.html)

## What is a Manifest

Manifests, also known as "Path Manifests" or "Arweave Manifests," are JSON objects that connect various Arweave data items and define relational paths for easy navigation. A common use case for manifests is permanently hosting websites on Arweave by linking all necessary files together. An ar.io gateway can then resolve the manifest into a fully functional website.

### Sample Manifest

```json
{
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "404.html": {
      "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
    },
    "js/style.css": {
      "id": "3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"
    },
    "css/style.css": {
      "id": "sPiQvpAUXLVK3zF6iXSfo7bkCVQkiLNt24dVtXUKBfZ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

### How it Works

A resolver, typically an ar.io gateway, resolves URLs requesting content based on a manifest transaction ID to the corresponding path key in the `paths` object. The URL schema for this type of request is `https://<gateway url>/<manifest TxId>/<path>`.

### Example Usage

Assume the manifest above is uploaded to Arweave with the transaction ID `UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk`. The below table shows https requests to the ar.io gateway `arweave.dev` requesting various endpoints on the manifest transaction Id, the manifest path where the gateway will find the data to return, and the resulting Arweave txId.

<div style="text-align: center">
    <table class="inline-table" id="gateway-table">
        <tr>
            <th>Request Path</th>
            <th>Manifest Path</th>
            <th>Data served from txID</th>
        </tr>
        <tr>
            <td>https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk</td>
            <td>index</td>
            <td>cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI</td>
        </tr>
        <tr>
            <td>https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/index.html</td>
            <td>index.html</td>
            <td>cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI</td>
        </tr>
        <tr>
            <td>https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/js/style.css</td>
            <td>js/style.css</td>
            <td>3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV</td>
        </tr>
        <tr>
            <td>https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/foobar</td>
            <td>fallback</td>
            <td>iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ</td>
        </tr>
    </table>
</div>

## Specifications

### Transaction Tags

Manifest are uploaded to Arweave in the same manner as any other data item. A specific content type tag must be added while uploading so that resolvers like the ar.io gateways can recognize a manifest and properly resolve the paths. Tags must be attached to the manifest at the time of upload. They cannot be added later without uploading a new manifest, and they must be attached to the upload transaction, NOT placed inside the json object.

Failure to provide this tag will result in resolvers not recognizing the manifest, so they will only return the raw json instead of the linked data items.

#### Content-Type

```json
{ "name": "Content-Type", "value": "application/x.arweave-manifest+json" }
```

### Transaction Data

Being a json object, there are several attributes that make up the structure of a manifest. The json object must be fully defined and uploaded to Arweave as a data item.

#### manifest

```json
"manifest": "arweave/paths"
```

The `manifest` attribute serves as an additional validation layer. It must have the value `arweave/paths` in order for a gateway to resolve the manifest.

#### version

```json
"version": "0.2.0"
```

The `version` attribute defines the version of manifest schema a manifest is using.

#### index

```json
"index": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  }
```

or

```json
"index": {
    "path": "index.html",
  }
```

The `index` attribute is an object that defines the base, or 'starting' data item. It is similar to the `/` endpoint on a website. When resolving the manifest with no additional path definition, this is the data item that will be returned.

`index` accepts either `path` or `id` as sub attributes. `path` represents the key of a defined [path](#paths) in the manifest, while `id` represents a specific Arweave data item transaction Id.

If both `path` and `id` are defined in `index`, `id` will override path.

#### fallback

```json
"fallback": {
    "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
  }
```

The `fallback` attribute is an object that defines an Arweave data item transaction Id for the resolver to fall back to if it fails to correctly resolve a requested path. For example, it can act as a 404 page if a user requests `manifest/non-existent-page`

`fallback` accepts `id` as a sub attribute, representing an Arweave data item transaction Id.

#### paths

```json
"paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "404.html": {
      "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
    },
    "js/style.css": {
      "id": "3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"
    },
    "css/style.css": {
      "id": "sPiQvpAUXLVK3zF6iXSfo7bkCVQkiLNt24dVtXUKBfZ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
```

The `paths` attribute is an object that defines the url paths that a manifest can resolve to. If a user navigates to `manifest/index.html` the resolver will look for `index.html` as a key in the `paths` object and return the corresponding `id`. (`cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI`)
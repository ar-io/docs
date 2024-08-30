---
permalink: "/guides/perma-deploy"
---

# Deploy a Website or Application

## Overview

With the growing popularity of permanently deployed apps, hosted on Arweave, along with the growing list of tools offered by ar.io, several methods have been developed to automate the process of deploying a website and updating the ArNS name pointed at it. A particularly useful tool for this is [permaweb-deploy](https://github.com/permaweb/permaweb-deploy) from Forward Research.

permaweb-deploy is a cli tool that handles uploading a build folder to Arweave using [Turbo](https://docs.ardrive.io/docs/turbo/what-is-turbo.html), creating a [manifest](../concepts/manifests.md), and then updating an ArNS name to point at the new manifest. It being a cli tool makes it very easy to incorporate into a github actions flow. Setting up an automated deployment with permaweb-deploy is simple, but does require a few steps.

## Getting Started

### Installing package

permaweb-deploy is an npm package, and must be installed in any project before it can be used. If you are using npm, you can install the package with the below command:

```bash
npm install permaweb-deploy
```

If you prefer yarn for your package installations, the process is slightly more involved. permaweb-deploy is not designed for installation with yarn, so you must provide the additional argument `ignore-engines` in order to skip over the yarn version error you would normally get with installation. There are two methods for doing so:

- Directly in the install command

    ```bash
    yarn add permaweb-deploy --ignore-engines
    ```

- In a `.yarnc` file

    You can provide a file, named `.yarnc` in the same directory as your `package.json` in order to assign specific instructions to all of your yarn commands. Creating a `.yarnc` file with the line 

    ```json
    ignore-engines true
    ```

    will have the same effect as providing the flag directly in your yarn command

### Adding a Deploy Script

The simplest way to utilize the permaweb-deploy tool is to build it into a script in your `package.json`. Here you will provide all of the variables that permaweb-deploy needs in order to function properly, as well as ensure that your app is statically built before being uploaded.

```json
"scripts": {
    "build": "vuepress build src",
    "deploy": "npm run build && permaweb-deploy --deploy-folder ./src/.vuepress/dist --ant-process $DEPLOY_ANT_PROCESS_ID"
  },
```

The above example shows a `build` script for a vuepress app, which will build the app into a static folder for deployment, and a `deploy` script which runs `build` and then permaweb-deploy. Your `build` script will look different depending on the framework you are using, but most will provide that for you when you create your app.

The permaweb-deploy command has two required arguments:

- `--deploy-folder`
    This is the relative path (from your `package.json`) to the build folder you want to upload. In a vuepress app, that will be `./src/.vuepress/dist` unless you manually specify otherwise in your vuepress configuration. It will be different depending on your chosen framework and if you have modified the default location.

- `--ant-process`
    This is the process id of the [Arweave Name Token](../arns.md#arweave-name-token-ant) for the ArNS name you want to deploy to. You can find this id by viewing the name on [arns.app](https://arns.app). Providing the process id is crucial for making sure the update is sent to the ao process that controls the ArNS name.

There is also the additional, optional flag `--undername`. If you want to deploy your app to an [undername](../arns.md#under_names) on an ArNS name, provide that name with this flag.

### Providing Arweave Wallet Keys

While using permaweb-deploy, you will be uploading data to Arweave using Turbo, as well as performing protected actions on an Arweave Name Token. Because of this, you will need to provide the keys to an Arweave wallet in order for the actions to be successful. The wallet must contain [Turbo Credits](https://ardrive.io/turbo-bundler/) to pay for the upload, and it must either be a controller or the owner of the ArNS name you are trying to update.

permaweb-deploy requires your wallet keyfile be encoded in base64 format. You can convert a local keyfile to base64, and copy the new value to your clipboard by using one of the below commands, depending on your operating system:

- Linux

```bash
base64 wallet.json | xclip -selection clipboard
```

- Mac

```bash
base64 wallet.json | pbcopy
```

- Windows (CMD)

```bash
base64 wallet.json | clip
```

Be sure to replace `wallet.json` with the path to your chosen wallet keyfile. Once you have this value saved to your clipboard, you can move on to the next step.

### Create Github Secrets

Anyone who has your wallet keyfile (including the base64 formatted keyfile) has full control over your wallet and any of its assets. Because of this, you do not want to include it directly in your package.json script. Instead, keep the value safe by storing it in a [github secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions). You will create the secrets in the settings tab on your github repo, and the secrets will act as environmental variables in the github actions workflow.

You will need to create 2 secrets"

- `DEPLOY_KEY`: This is the base64 encoded version of your Arweave wallet keyfile.

- `ANT_PROCESS`: This is the process id of the Arweave Name Token for your ArNS name. This value is not as sensitive, and may be provided in your package.json without issue, but it is a very long hashed string, and it is much easier to work with the variable name than the string itself.

### Create Action Workflow

Github Actions allow you to perform specific actions whenever you push code to github. They are handled by using `.yaml` files provided in `<root-of-project>/.github/workflows`.

To get started, create a new file named `deploy.yaml` in the workflows directory, then paste the below inside of it:

```yaml
name: Arweave Deploy

on:
  push:
    branches:
      - main

jobs:
  Arweave-build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js environment
        uses: actions/setup-node@v2
        with:
          node-version: "20"

      - name: Run deployment script
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
          DEPLOY_ANT_PROCESS: ${{ secrets.DEPLOY_ANT_PROCESS}}
        run: |
          npm install
          npm run deploy
```

The above tells github to perform these actions when you push new code to the branch `main`

It then sets up a vps with nodejs v 20. When that is complete, it installs dependencies for your project using npm (You will need to add a step to install yarn if that is your preferred package manager), and runs your `deploy` script, which builds your static folder and then runs permaweb-deploy. It also loads your github secrets into environmental variables that can be used by your deploy script.

## Deploying App

With the above setup complete, the only thing you need to do to deploy a new version of a permasite app to Arweave is push the updated code to branch `main` on github. Everything else is fully automated.
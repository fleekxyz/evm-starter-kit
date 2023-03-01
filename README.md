![ethereumdapp](https://user-images.githubusercontent.com/73345016/219379423-d5e96187-2152-4b2e-88dd-adc305d08f79.png)

# Ethereum boilerplate OSS

This repo is part of [fleekxyz/templates](https://github.com/fleekxyz/templates) a collection of Collection of Boileplates & examples configured to easily deploy to Fleek.xyz with the pre-configured scrips. End-to-end, from its contract to a Next.js frontend integrated to easily use the contract's ABIs.

- Find a deep-dive guide on this [article](https://blog.fleek.co/posts/ethereum-boilerplate-ipfs-nextjs).

Dapp Boilerplate that gives you maximum flexibility using oper-source packages, a non-binding stack, and tools giving you a fully customizable experience bootstraped with minimal configuration.

### Tech-Stack
- **[Hardhat](https://hardhat.org/):** Development environment for Ethereum.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed lenguage that builds on JavaScript.
- **[wagmi](https://wagmi.sh/):** Collection on React Hooks for working with Ethereum.
- **[RainbowKit](https://www.rainbowkit.com/):** React library to add wallet connection to your Dapp.
- **[Typechain](https://www.npmjs.com/package/typechain):** Typescript bindings for Ethereum smart contracts.
- **[Next.js](https://nextjs.org/):** The React Framework.

### Quick start
To get started clone the `ethereum-dapp-oss`:

```
git clone https://github.com/fleekxyz/ethereum-boilerplate.git
```

Install all dependencies:

```
pnpm install
```

Start the project:

> This is a pre-configured script which runs a hardhat node, deploys it and starts the frontend.
> You can check the commands it triggers in `package.json`

```
pnpm dev
```

Now you can interact with the frontend by going to [localhost:3000](https://localhost:3030)

### Available Scripts
- `hardhat:generate-abi`: Deploys contracts and exports the `ABI` & `address` to frontend. 
- `hardhat:clean`: Cleans the generated `artifacts` `cache` & `typechain-types` generated folders.
- `hardhat:deploy`: Deploys your contract to localhost & exports the `ABI` to the frontend.
- `hardhat:node`: Starts the Hardhat node.
- `frontend:dev`: Starts the NextJS frontend in development mode.
- `frontend:clean`: Cleans the generated folders inside the frontend application.
- `test`: Runs the tests for the smart contract.
- `clean`: Runs `frontend:clean` && `hardhat:clean`
- `dev`: Starts & deploys the hardhat node to the localhost & starts the frontend in development mode.

### How to customize
For customizing the project, please check the [customizing guide](customize.md).

#### Hardhat
- `contracts/`: This folder contains all of your contracts, it comes with example `Token.sol` to illustrate the experience.
- `deploys/`: Each file is meant to deploy a contract, you can check the `001_deploy_token.ts` for an example.

#### Frontend
- `frontend/`: Contains a minimal NextJS application prepared with `wagmi`, `rainbow kit` & `tailwind`
  - You can get started by customizing `frontend/src/pages/index.tsx`

## Deploying to Fleek

In order to deploy the Frontend, we'll use `Fleek CLI`, which allows us to deploy to IPFs from the `CLI`. If you haven't used Fleek CLI before, read the CLI section of [our docs](https://docs.fleek.xyz/getting-started/cli/).

You'll need to install the `CLI` as a global package by runnign the following command:

```
npm install -g @fleekxyz/cli
```

Then, move into the frontend project by running
```
cd frontend
```

and create a new Project:
```
fleek projects create
```

and then create a new site
```
fleek sites init
```

When you start the process, you will be prompted to create a new site or use an existing one. Go ahead and input a name for the site.

```
 > fleek sites init
 WARN! Fleek CLI is in beta phase, use it under your own responsibility
 ? Choose one of the existing sites or create a new one. › 
 ❯ Create a new site
```

Now that you have named the site, you’ll need to specify the output directory., Since we’re using NextJs, the output directory should be `out`:
```
 ✔ Choose one of the existing sites or create a new one. › Create a new site
 ✔ Type name of you new site. … fleek-demo-docs
 ✔ Specify the dist directory from where the site will be uploaded from > out
``` 

For the last step, choose to add a build command which will be `pnpm run build`

That's it! Your site is set up. You will see a file named fleek.json has been created in your directory, which holds the configuration to deploy the site.

You can now deploy your site to IPFS by running `fleek sites deploy`:
```
 > fleek sites deploy
 WARN! Fleek CLI is in beta phase, use it under your own responsibility
 > Success! Deployed! IPFS CID: QmQ88SAK9shZ7NUFTPJDcS9zuMmU7tDPbC9e9j5264Yfj4
```

If you are interested in other features like continuous integration, you can check this guide on deploying to fleek using GitHub Actions [here](https://docs.fleek.xyz/services/sites/#continuous-integration-ci).

## Contributing

Contributions are always welcome!

Please refer to each project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. Fork the repo on GitHub
2. Clone the project to your own machine
3. Commit changes to your own branch
4. Push your work back up to your fork
5. Submit a Pull request so that we can review your changes

> NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Requests

Is the framework you're looking for not here?

Please create an [issue](https://github.com/fleekxyz/templates/issues) describing your request We'll chck it out and consider adding it on future releases!

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

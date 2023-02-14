# Ethereum boilerplate OSS

Dapp Boilerplate that gives you maximum flexibility using oper-source packages & tools giving you a fully customizable experience bootstraped with minimal configuration.

### Quick start
To get started clone the `ethereum-dapp-oss`:

```
git clone <repo_url>
```

Install all dependencies:

```
pnpm Install
```

Start the project:

> This is a pre-configured script which runs a hardhat node, deploys it and starts the frontend.
> You can check the commands it triggers in `package.json`

```
pnpm dev
```

Now you can interact with the frontend by going to [localhost:3000](https://localhost:3030)

### Available Scripts
- `hardhat:generate-abi`: Deploys contracts and exports the `API` & `address` to frontend. 
- `hardhat:clean`: Cleans the generated `artifacts` `cache` & `typechain-types` generated folders.
- `hardhat:deploy`: Deploys your contract to localhost & exports the `ABI` to the frontend.
- `hardhat:node`: Starts the Hardhat node.
- `frontend:dev`: Starts the NextJS frontend in development mode.
- `frontend:clean`: Cleans the generated folders inside the frontend application.
- `test`: Runs the tests for the smart contract.
- `clean`: Runs `frontend:clean` && `hardhat:clean`
- `dev`: Starts & deploys the hardhat node to the localhost & starts the frontend in development mode.

### How to customize
You can check the [contracts](), [deploys]() & [frontend]() Readme files for more details.

#### Hardhat
- `contracts/`: This folder contains all of your contracts, it comes with example `Token.sol` to illustrate the experience.
- `deploys/`: Each file is meant to deploy a contract, you can check the `001_deploy_token.ts` for an example.

#### Frontend
- `frontend/`: Contains a minimal NextJS application prepared with `wagmi`, `rainbow kit` & `tailwind`
  - You can get started by customizing `frontend/src/pages/index.tsx`

### Tech-Stack
- **Hardhat:** Development environment for Ethereum.
- **TypeScript:** Strongly typed lenguage that builds on JavaScript.
- **wagmi:** Collection on React Hooks for working with Ethereum.
- **RainbowKit:** React library to add wallet connection to your Dapp.
- **Typechain:** Typescript bindings for Ethereum smart contracts.
- **Next.js:** The React Framework.

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

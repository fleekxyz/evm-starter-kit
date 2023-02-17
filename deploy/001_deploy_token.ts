import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  const { deployer, tokenOwner } = await getNamedAccounts();

  if (network.name === 'hardhat') {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat  " +
        " option '--network localhost'"
    );
  }

  console.log(
    "Deploying the contracts with the account:",
    deployer
  );

  await deploy('Token', {
    from: deployer,
    args: [tokenOwner],
    log: true,
  });
};
export default func;
func.tags = ['Token'];

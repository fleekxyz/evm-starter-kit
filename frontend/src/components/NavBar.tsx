import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavBar = () => (
  <div className='w-full flex-row-reverse fixed top-0 left-0 px-12 py-10 place-content-between'>
    <ConnectButton />
  </div>
);

export default NavBar;

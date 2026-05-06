import { House as HomeIcon, ChessKnight as AppIcon } from 'lucide-react';
import GithubIcon from '../assets/github_white.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div
      className={'header flex flex-row justify-between items-center px-4 py-2 '}
    >
      <Link
        to={''}
        className={'flex flex-row items-center gap-1 text-4xl font-bold'}
      >
        <AppIcon />
        <span>Chess</span>
        <span className="text-yellow-500">Lens</span>
      </Link>

      <Link to={'https://github.com/TuLe142857/ChessLens'}>
        <img
          src={GithubIcon}
          alt="Github"
          className="w-10 h-10"
          title={'view source code'}
        />
      </Link>
    </div>
  );
};

export default Header;

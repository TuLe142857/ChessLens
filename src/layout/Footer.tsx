import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer flex flex-col items-center justify-center min-h-15">
      <p>
        This page use
        <Link
          to={'https://www.chess.com/'}
          className={'hover:underline font-semibold'}
        >
          {' '}
          chess.com{' '}
        </Link>
        public API to show player statistic
      </p>
    </div>
  );
};

export default Footer;

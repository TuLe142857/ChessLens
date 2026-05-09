import { Outlet } from 'react-router-dom';

import Header from './Header.tsx';
import Footer from './Footer.tsx';

const Layout = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
export default Layout;

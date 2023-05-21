import { FC, useState } from "react";

import { useAuth } from "../../Context/AuthContext/context";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import "./styles.scss";
import { Link } from "react-router-dom";

interface ILayout {
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const { changeLocalStoreToken } = useAuth();

  return (
    <main className="easyedit-main">
      <aside className="easyedit-sidebar">
        <Link to="/">
          <div className="easyedit-sidebar__logo">
            <div className="easyedit-sidebar__logo--main-text">
              <span>EasyEdit</span>
              <span className="easyedit-sidebar__logo--main-text--point">.</span>
            </div>
          </div>
        </Link>
        <nav className="easyedit-sidebar--navigation">
          {/* <Link to="/" className={`${activeItem === 1 ? "active" : ""} easyedit-sidebar--navigation__item`} onClick={() => setActiveItem(1)}>
            <AiOutlineHome />
            Dashboard
          </Link> */}
        </nav>
      </aside>
      <div className="easyedit-main--content">
        <header className="easyedit-main--content__header">
          <Link to="/profile">
            <AiOutlineUser />
          </Link>
          <FiLogOut onClick={() => changeLocalStoreToken("delete")} />
        </header>
        {children}
      </div>
    </main>
  );
};

export default Layout;

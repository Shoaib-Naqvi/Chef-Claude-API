import icon from "../assets/chef-icon.png";

function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <div className="nav-brand">
            <img src={icon} className="nav-logo" alt="Chef Claude Logo" />
            <span className="nav-title">Chef Claude</span>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;

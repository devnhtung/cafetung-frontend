import Navlink from "./Navlink";

const Navbar = () => {
  return (
    <div className="nav-links flex items-center gap-5">
      <Navlink className="nav-link" key={1} href="#" title="về Tùng" />
      <Navlink className="nav-link" key={2} href="#" title="Location" />
      <Navlink className="nav-link" key={3} href="#" title="Chia sẻ" />
    </div>
  );
};

export default Navbar;

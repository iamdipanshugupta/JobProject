import NavBar from "../componants/NavBar.jsx";
import Footer from "../componants/Footer.jsx";

const PublicLayout = ({ children }) => (
  <>
    <NavBar />
    <div className="pt-20">{children}</div>
    <Footer />
  </>
);

export default PublicLayout;
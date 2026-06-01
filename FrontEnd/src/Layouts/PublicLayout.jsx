import NavBar from "../componants/NavBar.jsx";
import Footer from "../componants/Footer.jsx";

const PublicLayout = ({ children }) => (
  <>
    <NavBar />
    {children}
    <Footer />
  </>
);

export default PublicLayout;
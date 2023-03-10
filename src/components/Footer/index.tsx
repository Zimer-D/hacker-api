import { Navbar, NavbarBrand } from "react-bootstrap"
import './Footer.sass'
const Footer = (): JSX.Element => 
<div className="fixed-bottom">  

<Navbar bg="dark" variant="dark" className="footer">
        <NavbarBrand  className="footerInfo" >©{new Date().getFullYear()} HackerApi news App by Kiryazov D. </NavbarBrand>
        <div>
        </div>
</Navbar>
</div>

export default Footer
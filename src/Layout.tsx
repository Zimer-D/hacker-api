import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Error404 from "./pages/Error404";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/:id" element={<NewsPage/>} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
                <ToastContainer
                    theme="dark"
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick={true}
                    pauseOnHover={true}
                    draggable={true}
                />
            </Container>
            <Footer />
        </>
    );
}

export default Layout;
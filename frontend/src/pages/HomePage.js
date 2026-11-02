import '../styles/pages/HomePage.css';

const HomePage = (props) => {
    return (
        <main className="holder">
            <div className="homeimg">
                <img src="/images/home/img01.jpg" alt="avion" />
            </div>
            <div className="columnas">
                <div className="bienvenidos left">
                    <h2>Bienvenidos</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.</p>
                </div>
                <div className="testimonios right">
                    <h2>Testimonios</h2>
                    <div className="testimonio">
                        <span className="cita">Simplemente excelente</span>
                        <span className="autor">Juan Perez </span>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default HomePage;

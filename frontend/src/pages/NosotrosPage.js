import '../styles/pages/NosotrosPage.css';

const NosotrosPage = (props) => {
    return (
        <main className="holder">
            <div className="historia">
                <h2>Historia</h2>
                <p>Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Consequuntur, rem saepe. A
                    enim qui facilis consectetur. Tempora dolores
                    culpa libero a natus fugit ea ratione
                    reprehenderit,
                    consequuntur, debitis corrupti asperiores.</p>
                <p>Ipsum dolor sit, amet consectetur
                    adipisicing elit. Consequuntur, rem saepe. A
                    enim qui facilis consectetur. Tempora dolores
                    culpa libero a natus fugit ea ratione
                    reprehenderit, consequuntur, debitis corrupti
                    asperiores.</p>
            </div>
            <div className="staff">
                <h2>Staff</h2>
                <div className="personas">
                    <div className="persona">
                        <img src="/images/nosotros/nosotros1.jpg" alt="Juan Gomez" />
                        <h5>Juan Gomez</h5>
                        <h6>Gerente General</h6>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Obcaecati
                            aspernatur deleniti, endis mollitia
                            voluptas est accusantium veritatis
                            quidem, autem architecto commodi
                            cumque, suscipit nobis molestias!
                            Voluptatibus esse quibusdam sunt
                            architecto.</p>
                    </div>
                    <div className="persona">
                        <img src="/images/nosotros/nosotros2.jpg" alt="Maria Lopez" />
                        <h5>Maria Lopez</h5>
                        <h6>Subgerente</h6>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Obcaecati
                            aspernatur deleniti, endis mollitia
                            voluptas est accusantium veritatis
                            quidem, autem architecto commodi.</p>
                    </div>
                    <div className="persona">
                        <img src="/images/nosotros/nosotros3.jpg" alt="Carlos Diaz" />
                        <h5>Carlos Diaz</h5>
                        <h6>Jefe de Flota</h6>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Obcaecati
                            aspernatur deleniti, endis mollitia
                            voluptas est accusantium veritatis
                            quidem, autem architecto commodi.</p>
                    </div>
                    <div className="persona">
                        <img src="/images/nosotros/nosotros4.jpg" alt="Ana Torres" />
                        <h5>Ana Torres</h5>
                        <h6>Atención al Cliente</h6>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Obcaecati
                            aspernatur deleniti, endis mollitia
                            voluptas est accusantium veritatis
                            quidem, autem architecto commodi.</p>
                    </div>
                    <div className="persona">
                        <img src="/images/nosotros/nosotros5.jpg" alt="Pedro Sosa" />
                        <h5>Pedro Sosa</h5>
                        <h6>Logística</h6>
                        <p>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Obcaecati
                            aspernatur deleniti, endis mollitia
                            voluptas est accusantium veritatis
                            quidem, autem architecto commodi.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default NosotrosPage;

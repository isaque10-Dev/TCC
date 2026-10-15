
import "./App.css";

function App() {
  return (
    <div className="home">
      <div className="home-topo">

        <div className="home-pt1">
          <img
            className="home-banner"src="/assets/images/baner.png"alt="Banner"
          />

          <img
            className="home-alimentos" src="/assets/images/alimentos.png" alt="Alimentos"
          />

          <div className="home-texto">
            <h1>
              Conectando quem tem <br />
              <span>alimento em excesso</span>
            </h1>

            <h2>com <span> quem</span> precisa.</h2>
          </div>
        </div>

        
<div className="como-funciona">
  <h2>Como funciona? </h2>

  <div className="passos">
    <div className="passo">
      
      <img src="/assets/images/icons/estabelecimentos.png" alt="" />
      <p>Você encontra doações próximas</p>
    </div>

    <div className="passo">
      
      <img src="/assets/images/icons/mapa.png" alt="" />
      <p>Seleciona o que precisa</p>
    </div>

    <div className="passo">
     
      <img src="/assets/images/icons/perfil.png" alt="" />
      <p>Solicita a reserva</p>
    </div>

    <div className="passo">
      
      <img src="/assets/images/icons/caminhao.png" alt="" />
      <p>Combina a retirada</p>
    </div>

    <div className="passo">
      
      <img src="/assets/images/icons/coracao.png" alt="" />
      <p>Recebe e aproveita!</p>
    </div>
  </div>
</div>


      </div>
    </div>
  );
}

export default App;

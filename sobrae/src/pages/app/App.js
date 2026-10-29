import { Link } from "react-router-dom";
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


<div className="home-baixo">
  
<div className="convite">
  <div className="convite-texto">
    <h2>Juntos contra o desperdício!</h2>

    <p>
      Todos os dias, alimentos que ainda poderiam ser aproveitados
      acabam sendo desperdiçados. Enquanto isso, muitas pessoas
      precisam de ajuda para ter comida na mesa.
    </p>

    <p>
      O Sobraê nasceu para conectar quem tem alimentos disponíveis
      com quem precisa. Aqui, cada doação representa uma oportunidade
      de compartilhar, ajudar e fazer a diferença.
    </p>

    <h3>Faça parte dessa mudança!</h3>

    <div className="botoes-home">
      <Link to="/doacoes">Ver doações</Link>
      <Link to="/doacoes">Quero doar</Link>
    </div>
  </div>

  <div className="convite-cards">
    <div className="convite-card">
      <img src="/assets/images/frutasCoracao.png" alt="Frutas" />
      <h3>Compartilhe alimentos</h3>
      <p>O que sobra para você pode fazer a diferença para alguém.</p>
    </div>

    <div className="convite-card">
      <img src="/assets/images/paes2.png" alt="Pães" />
      <h3>Menos desperdício</h3>
      <p>Alimentos bons merecem um novo destino.</p>
    </div>

    <div className="convite-card">
      <img src="/assets/images/marmita.png" alt="Refeições" />
      <h3>Mais solidariedade</h3>
      <p>Cada doação ajuda a construir um futuro melhor.</p>
    </div>
  </div>
</div>


  <h2>O que você pode fazer no Sobraê?</h2>

  <div className="opcoes-home">
    <div className="opcao-home">
      <h3>Encontrar alimentos</h3>
      <p>Explore as doações disponíveis na plataforma.</p>
    </div>

    <div className="opcao-home">
      <h3>Compartilhar alimentos</h3>
      <p>Publique alimentos que deseja doar.</p>
    </div>

    <div className="opcao-home">
      <h3>Acompanhar atividades</h3>
      <p>Consulte suas doações e reservas.</p>
    </div>
  </div>
</div>

<div className="impacto">
  <div className="impacto-topo">
    <div className="impacto-texto">
      <h2>
        Aqui boas ações alimentam
        <span> mais do que o corpo.</span>
      </h2>

      <p>
        Cada alimento doado ganha um novo destino
        e faz diferença na vida de alguém!
      </p>
    </div>

    <img
      src="/assets/images/comidas.png"
      alt="Alimentos"
    />
  </div>

  <div className="impacto-cards">
    <div>
      <h3>Menos alimentos no lixo</h3>
      <p>Reduzimos o desperdício de alimentos.</p>
    </div>

    <div>
      <h3>Mais pessoas alimentadas</h3>
      <p>Conectamos doações a quem precisa.</p>
    </div>

    <div>
      <h3>Um futuro mais sustentável</h3>
      <p>Incentivamos o consumo consciente.</p>
    </div>
  </div>
</div>


    </div>
  );
}

export default App;

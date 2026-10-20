import "./index.css";

export default function Doacoes() {
  return (
    <div className="doe">
        <div className="doe-topo">
            <div className="topo-pt1">
              
<img className="baner" src="/assets/images/baner.png" alt="Banner" />

<div className="bannerMais">
              <h1 className="titu">DOAÇÕES</h1>
              <h2 className="agaDois">Conectamos o excedente de alimentos de quem pode doar com pessoas que precisam.</h2>
              <input className="enput" type="text" placeholder="Buscar doações..."/>

        <div className="botao">
          <button className="butao">Todos</button>
          <button className="butao">Frutas e verduras</button>
          <button className="butao">Pães</button>
          <button className="butao">Refeições</button>
          <button className="butao">Outro</button>
        </div>

</div>



            </div>



                <div className="insc">
                 <h2>Postar Doação</h2>
                </div>






            </div>



        </div>
  );
}


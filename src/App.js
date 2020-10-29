import React, {useEffect, useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  
  //pra listar os repositorios no site precisamos executar um trecho de codigo 
  //sempre que a pagina é renderizada então vamos usar o UseEffect.
  const [repositories,setRepositories]=useState([])
  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })
  },[])//n esquecer de passar o vetor vazio no useEffect para nao entrar em loop
  
  
  async function handleAddRepository() {
    // Para adicionar um repositorio precisamos usar o setRepositories usando
    // o principio da imutabilidade em outras palavras é nunca sobrescrever
    // por cima da variavel antiga e sim sempre criar uma nova colocar todo 
    // mundo la e mostrar na tela.
      const repository = {
        "url": `https://github.com/Leandro/Desafio`,
        "title": `Desafio${Date.now()}`,
        "techs": ["Node", "Express", "TypeScript","ReactJS","Firebase"]
      }
      const response = await api.post('repositories',repository)
        //como meu backend retorna o carinha que eu quero adicionar com qualquer
        //informação adicional que ele vai colocar (ex:id,likes) então eu posso 
        //usar o response pra adicionar ele no vetor de repositorios
      setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
   
    await api.delete(`repositories/${id}`).then((response)=>{
      const results = repositories.filter(repository=>repository.id!==id)
      setRepositories(results)
    })
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

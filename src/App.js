import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./styles/app.css";
import Tabela from "./tabela/Tabela";
import Formulario from "./formulario/Formulario";

function App() {
  const [pessoa, setPessoa] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    fetchApi();
  }, [])

  function fetchApi() {
    setPessoa([]);
    setTimeout(() => {
      axios.get("https://crud-java-react.herokuapp.com/pessoa")
      .then(response => setPessoa(response.data));
    }, 600)
  }

  function savePessoa(nome, logradouro, bairro, uf){
    axios.post("https://crud-java-react.herokuapp.com/pessoa", {
      nome,
      logradouro,
      bairro,
      uf
    }).then(history("/")).then(fetchApi());
  }

  function deletePessoa(id){
    axios.delete("https://crud-java-react.herokuapp.com/pessoa/" + id)
    .then(history("/")).then(fetchApi());
  }

  function editPessoa(id, nome, logradouro, bairro, uf){
    axios.put("https://crud-java-react.herokuapp.com/pessoa/" + id,{
      nome,
      logradouro,
      bairro,
      uf
    })
    .then(history("/")).then(fetchApi());
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Tabela deletePessoa={deletePessoa} pessoa={pessoa} />} />
        <Route path="cadastro" element={<Formulario saveP={savePessoa} />} />
        <Route path="editar/*" element={<Formulario update={true} editPessoa={editPessoa}  />} />
      </Routes>
    </div>
  );
}

export default App;
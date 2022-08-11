import axios from "axios";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/formulario.css";

export default function Formulario(props) {
    let id;
    id = useParams();
    id = Object.values(id)[0];

    useEffect(() => {
        if (props.update) {
            axios.get("https://crud-java-react.herokuapp.com/pessoa/" + id)
                .then(response => setInputValues(response.data));
        }
    }, [])

    function setInputValues(data) {
        let logradouro = document.getElementById("logradouro");
        let bairro = document.getElementById("bairro");
        let uf = document.getElementById("uf");
        let nome = document.getElementById("nome");

        nome.value = data.nome;
        bairro.value = data.bairro;
        logradouro.value = data.logradouro;
        uf.value = data.uf;
    }

    function fetchCep() {
        let logradouro = document.getElementById("logradouro");
        let bairro = document.getElementById("bairro");
        let uf = document.getElementById("uf");

        let cep = document.getElementById("cep");

        if (cep.value.length > 7) {
            let url = "https://viacep.com.br/ws/" + cep.value + "/json/";
            axios.get(url).then(response => {
                logradouro.value = response.data.logradouro;
                bairro.value = response.data.bairro;
                uf.value = response.data.uf;
            }).catch();
        }
    }

    function savePessoa() {
        let logradouro = document.getElementById("logradouro");
        let bairro = document.getElementById("bairro");
        let uf = document.getElementById("uf");
        let nome = document.getElementById("nome");

        if (nome.value === null || nome.value === "")
            erro();
        else if (logradouro.value === null || logradouro.value === "")
            erro();
        else if (bairro.value === null || bairro.value === "")
            erro();
        else if (uf.value === null || uf.value === "")
            erro();
        else {
            if (props.update)
                props.editPessoa(id, nome.value, logradouro.value, bairro.value, uf.value);
            else
                props.saveP(nome.value, logradouro.value, bairro.value, uf.value);
        }
    }

    function erro() {
        let alert = document.querySelector(".alert");
        let barra = document.querySelector(".barra");
        let cont = 0;
        alert.style.display = "block";

        function interval() {
            cont++
            setTimeout(() => {
                barra.style.width = cont + "%";
                if (cont < 100) {
                    interval();
                }
                else
                    alert.style.display = "none";
            }, 30);
        }

        interval();

    }

    return (
        <div className="formulario">
            <div className="alert">
                <div className="barra"></div>
                Preencha todos os campos
            </div>
            {props.update ? <h1>Editar Pessoa</h1> : <h1>Cadastrar Pessoa</h1>}
            <form>
                <div className="group">
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id="nome" required />
                    </div>
                    <div>
                        <label htmlFor="cep">CEP:</label>
                        <input type="number" id="cep" onChange={fetchCep} required />
                    </div>
                </div>
                <div className="group">
                    <div>
                        <label htmlFor="logradouro">Lograduro:</label>
                        <input type="text" id="logradouro" required />
                    </div>
                </div>
                <div className="group">
                    <div>
                        <label htmlFor="bairro">Bairro:</label>
                        <input type="text" id="bairro" required />
                    </div>
                    <div>
                        <label htmlFor="uf">UF:</label>
                        <input type="text" id="uf" required />
                    </div>
                </div>
                <button onClick={e => {
                    e.preventDefault();
                    savePessoa();
                }}>Enviar</button>
                <Link to="/">
                    <button>Voltar</button>
                </Link>

            </form>
        </div>
    )
}
import { Link } from "react-router-dom";
import "../styles/tabela.css";

export default function Tabela(props) {
    return (
        <div className="tabela">
            <h1>Pessoas cadastradas</h1>
            <div className="add">
                <Link to={"/cadastro"}>
                    <button>Adicionar</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Logradouro</th>
                        <th>Bairro</th>
                        <th>UF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.pessoa.map(element => {
                        let url = "/editar/" + element.id;
                        return (
                            <tr>
                                <td>{element.nome}</td>
                                <td>{element.logradouro}</td>
                                <td>{element.bairro}</td>
                                <td>{element.uf}</td>
                                <td>
                                    <Link to={url}>
                                        <button>Editar</button>
                                    </Link>
                                    <button onClick={() => {
                                        props.deletePessoa(element.id);
                                    }}>Excluir</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
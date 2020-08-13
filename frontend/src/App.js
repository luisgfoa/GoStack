import React, {useState, useEffect} from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {

    const [projects, setProjects] = useState([]);

    //primeiro parametro do useEffect é a função que quero disparar, segundo parâmetro é quando disparar esta função
    useEffect(()=>{
        api.get('/projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProjects() {

        // setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Luis Guilherme Almeida"
        })

        const project = response.data;

        setProjects([...projects, project]);

    }
    
    return (
        <>
        <Header title = "Homepage"/>
        <ul>
            {projects.map(project => <li key ={project.id}>{project.title}</li>)}
        </ul>

        <button type="button" onClick={handleAddProjects}>Adicionar Projetos</button>
        </>
    );
}

export default App;
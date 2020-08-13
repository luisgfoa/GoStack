import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api';

// Elementos não possuem valor semântico (significado). A View, por exemplo, é apenas um container
// Elementos não possuem estilização própria
// Todos componentes possuem por padrão "display: flex"
// No React-native não existe herança de estilos para os filhos
// View: div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3


export default function App(){
    const [projects, SetProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(response =>{
            console.log(response.data);
            SetProjects(response.data);
        })
    }, []);

    async function handleAddProject(){
        const response = await api.post('projects', {
            title: `Novo projecto ${Date.now()}`,
            owner: 'Luis Guilherme Almeida'
        })

        const project = response.data;

        SetProjects([...projects, project]);

    }

    return (
        <>
         <StatusBar barStyle ="light-content" backgroundColor ="#7159c1"/>

         <SafeAreaView style={styles.container}>
         <FlatList
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item })=>(
                <Text style={styles.project}>{item.title}</Text>
            )}
         />

         <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={handleAddProject}
         >
             <Text style={styles.buttonText}>Adicionar projeto</Text>
         </TouchableOpacity>
         </SafeAreaView>

        {/* <View style ={styles.container}>
       {projects.map(project => (

       ))}
        </View> */}
        </>
                )
            }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 30,
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})
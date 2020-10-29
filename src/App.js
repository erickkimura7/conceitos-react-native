import React, { useEffect, useState } from "react";
import {
  FlatList, SafeAreaView,



  StatusBar,
  StyleSheet, Text,


  TouchableOpacity, View
} from "react-native";
import api from './services/api';


export default function App() {

  const [repositorios, setRepositorios] = useState([])

  useEffect(() => {
    api.get('repositories').then(repositorio => {
      setRepositorios(repositorio.data)
    })
  }, [])

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`, {});
    const index = repositorios.findIndex(repositorio => repositorio.id === id);

    if (index >= 0) {
      const novosRepositorios = [...repositorios];

      novosRepositorios[index] = { ...novosRepositorios[index], likes: response.data.likes }

      setRepositorios(novosRepositorios)
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositorios}
          keyExtractor={repositorios => repositorios.id}
          renderItem={({ item: repositorio }) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repositorio.title}</Text>

                <View style={styles.techsContainer}>
                  {repositorio.techs.map(tech => (
                    <Text key={tech} style={styles.tech}>
                      {tech}
                    </Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repositorio.id}`}
                  >
                    {`${repositorio.likes} curtidas`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repositorio.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repositorio.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        >
        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});

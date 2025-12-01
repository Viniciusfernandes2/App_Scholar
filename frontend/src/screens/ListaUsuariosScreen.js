import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../api/api";
import { getToken } from "../storage";

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function carregar() {
      const token = await getToken();

      const r = await api.get("/listusuarios", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios(r.data);
    }

    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários do Sistema</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Nome:</Text>
            <Text>{item.nome}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text>{item.email}</Text>

            <Text style={styles.label}>Perfil:</Text>
            <Text>{item.perfil}</Text>

            <Text style={styles.label}>Senha padrão:</Text>
            <Text>123456</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 15, backgroundColor: "#eee", marginBottom: 15, borderRadius: 10 },
  label: { fontWeight: "bold", marginTop: 5 }
});

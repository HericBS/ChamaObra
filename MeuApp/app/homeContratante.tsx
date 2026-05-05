import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { db } from '../database/database';

export default function HomeScreen() {
  const [prestadores, setPrestadores] = useState<any[]>([]);
  const [busca, setBusca] = useState('');

  // 🔥 BUSCAR PRESTADORES DO SQLITE
  useEffect(() => {
    carregarPrestadores();
  }, []);

  const carregarPrestadores = () => {
    const result = db.getAllSync(`
      SELECT * FROM usuarios 
      WHERE tipo = 'prestador'
    `);

    setPrestadores(result);
  };

  // 🔍 FILTRO
  const prestadoresFiltrados = prestadores.filter((p) =>
    p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    p.servico?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>

      {/* TOPO */}
      <View style={styles.topBar}>
        <Ionicons name="menu" size={24} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="notifications-outline" size={22} />
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* ALERTA */}
      <View style={styles.alertBox}>
        <Text>📩 Você recebeu propostas</Text>
        <TouchableOpacity style={styles.alertButton}>
          <Text style={{ color: '#fff' }}>VER AGORA</Text>
        </TouchableOpacity>
      </View>

      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Qual trabalho você precisa?</Text>
        <Text style={styles.heroSubtitle}>
          Poste seu pedido e receba propostas
        </Text>

        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>+ POSTAR UM PEDIDO</Text>
        </TouchableOpacity>
      </View>

      {/* CATEGORIAS */}
      <Text style={styles.sectionTitle}>Categorias</Text>

      <View style={styles.categories}>
        {['Pedreiro', 'Eletricista', 'Encanador', 'Pintor'].map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.categoryItem}
            onPress={() => setBusca(item)}
          >
            <MaterialIcons name="build" size={24} />
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* BUSCA */}
      <TextInput
        placeholder="Buscar profissional..."
        style={styles.search}
        value={busca}
        onChangeText={setBusca}
      />

      {/* LISTA REAL */}
      <Text style={styles.sectionTitle}>Prestadores</Text>

      {prestadoresFiltrados.map((item, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=' + (index + 10) }}
            style={styles.profileImage}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.prof}>{item.servico || 'Serviço geral'}</Text>

            <Text>⭐ 5.0</Text>

            <View style={styles.tags}>
              {item.servico && <Text style={styles.tag}>{item.servico}</Text>}
              {item.experiencia && <Text style={styles.tag}>{item.experiencia}</Text>}
            </View>

            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={{ color: '#fff' }}>Orçamento</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryBtn}>
                <Text>Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* BOTÃO FLUTUANTE */}
      <TouchableOpacity style={styles.fab}>
        <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f5f5f5', padding: 15 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  avatar: { width: 30, height: 30, borderRadius: 15, marginLeft: 10 },

  alertBox: {
    backgroundColor: '#ffe8d9',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  alertButton: {
    backgroundColor: '#ff6600',
    padding: 8,
    borderRadius: 8,
  },

  hero: {
    backgroundColor: '#0a1f44',
    padding: 20,
    borderRadius: 20,
    marginTop: 15,
  },

  heroTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  heroSubtitle: { color: '#ccc', marginTop: 10 },

  postButton: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },

  postButtonText: { color: '#fff', fontWeight: 'bold' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  categoryItem: { alignItems: 'center' },

  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },

  name: { fontWeight: 'bold' },
  prof: { color: 'gray' },

  tags: { flexDirection: 'row', marginTop: 5 },

  tag: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 8,
    marginRight: 5,
  },

  cardButtons: { flexDirection: 'row', marginTop: 10 },

  primaryBtn: {
    backgroundColor: '#ff6600',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
    borderRadius: 8,
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff6600',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
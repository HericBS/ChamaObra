import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ExplorarScreen() {
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

      {/* TITULO */}
      <Text style={styles.title}>
        Encontre o seu{"\n"}
        <Text style={styles.highlight}>próximo trabalho</Text>
      </Text>

      {/* BUSCA */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Buscar serviços (ex: eletricista)"
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={{ color: '#fff' }}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* CATEGORIAS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorias Populares</Text>
        <Text style={styles.link}>Ver todas</Text>
      </View>

      <View style={styles.categories}>
        {['Pedreiro', 'Eletricista', 'Encanador'].map((item, i) => (
          <View key={i} style={styles.category}>
            <MaterialIcons name="build" size={24} />
            <Text>{item}</Text>
          </View>
        ))}
      </View>

      {/* PERTO DE VOCÊ */}
      <Text style={styles.sectionTitle}>Perto de Você</Text>

      <View style={styles.bigCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1581092919534-2b2c1f5b6b8c' }}
          style={styles.bigImage}
        />

        <View style={styles.overlay}>
          <Text style={styles.badge}>URGENTE • há 3min</Text>
          <Text style={styles.cardTitle}>
            Instalação de Quadro Elétrico Bifásico
          </Text>

          <Text style={styles.cardDesc}>
            Residência no Jardim Europa. Necessário profissional com certificação NR10.
          </Text>

          <TouchableOpacity style={styles.orangeBtn}>
            <Text style={{ color: '#fff' }}>Enviar Proposta</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ÚLTIMOS TRABALHOS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Últimos Trabalhos</Text>
        <Ionicons name="filter" size={20} />
      </View>

      {/* CARD LISTA */}
      {[1, 2].map((_, i) => (
        <View key={i} style={styles.listCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.jobTitle}>
              Revestimento de Banheiro
            </Text>

            <Text style={styles.jobInfo}>
              Mogi, SP • 10km
            </Text>

            <Text style={styles.jobInfo}>
              3 propostas enviadas
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.detailBtn}>
                <Text>Detalhes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.orangeBtnSmall}>
                <Text style={{ color: '#fff' }}>Proposta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f0eb',
    padding: 15,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  highlight: {
    color: '#007bff',
  },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  searchBtn: {
    backgroundColor: '#ff6600',
    padding: 8,
    borderRadius: 8,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    color: '#ff6600',
  },

  categories: {
    flexDirection: 'row',
    marginTop: 10,
  },

  category: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },

  bigCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 15,
  },

  bigImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    padding: 15,
    bottom: 0,
  },

  badge: {
    backgroundColor: '#ff6600',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },

  cardDesc: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },

  orangeBtn: {
    backgroundColor: '#ff6600',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  listCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },

  jobTitle: {
    fontWeight: 'bold',
  },

  jobInfo: {
    color: 'gray',
    fontSize: 12,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },

  detailBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },

  orangeBtnSmall: {
    backgroundColor: '#ff6600',
    padding: 8,
    borderRadius: 8,
  },
});
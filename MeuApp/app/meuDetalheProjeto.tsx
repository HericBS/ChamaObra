import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MeuDetalheProjeto = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Ionicons name="arrow-back" size={24} style={styles.backButton} color="#0a1f44"/>
          <Text style={styles.title}
            numberOfLines={2}
            style={{ fontSize: 24, fontWeight: "bold" }}
          >
            Detalhes do Serviço
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={{ fontSize: 20, marginRight: 15, color: "#ff6600" }}>
            Recebendo Propostas
          </Text>
          <ProgressBar style={{ width: 80, height: 8, borderRadius: 4, backgroundColor: "#f0f0f0"}}
            progressColor="#ff6600"
            progressWidth={30} />
            <Text style={{ position: "absolute", left: 40, color: "#ff6600" }}>50%</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {/* Fotos do Projeto */}
        <View style={styles.fotoBox}>
          <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.fotoProjeto}/>
          <Text style={{ color: "#999", marginTop: 20, fontSize: 12 }}>Fotos do Local</Text>
        </View>

        {/* Propostas Recebidas */}
        <View style={styles.proposalsBox}>
          <View style={styles.recipientBox}>
            <Avatar source={{ uri: "https://i.pravatar.cc/100" }} style={styles.avatarClient} />
            <Text style={styles.recipientName}>Marcus Thorne</Text>
            <Rating
              count={104}
              filledCount={56}
              style={
                { color: "#ff6600", marginLeft: 15, marginRight: 20 }
              }
            />
            <Text style={{ marginRight: 20, fontSize: 18, color: "#ff6600" }}>R$ ₱4.850,00</Text>
          </View>
          <View style={styles.recipientBox}>
            <Avatar source={{ uri: "https://i.pravatar.cc/100?2" }} style={styles.avatarProfessional} />
            <Text style={{ fontSize: 16, marginTop: 5, marginLeft: 10, color: "#0a1f44" }}>Elena Rodríguez</Text>
            <Rating count={89} filledCount={89} style={{ color: "#ff6600", marginLeft: 15, marginRight: 20 }} />
            <Text style={{ fontSize: 18, color: "#ff6600" }}>R$ ₱5.200,00</Text>
          </View>
          <View style={styles.moreButton}>
            <TouchableOpacity style={styles.moreButton}
              onPress={() => console.log('Ver todas as propostas')}
            >
              <Text style={styles.moreText}
                numberOfLines={1}
                style={{ fontSize: 14, color: "#fff", textAlign: "center" }}
              >Ver Todas as Propostas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actionsBox}>
          <TouchableOpacity style={styles.btnCancelar}
            onPress={() => console.log('Cancelar Projeto')}
          >
            <Text style={{ color: "#fff", fontSize: 14 }}>Cancelar Projeto</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default MeuDetalheProjeto;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: { flexDirection: "row", alignItems: "center", padding: 20, backgroundColor: "#f5f5f5" },
  headerLeft: { flex: 1, justifyContent: "space-between", alignItems: "center" },
  headerRight: { flex: 1, justifyContent: "flex-end" },
  backButton: { backgroundColor: "#ffe4bd", padding: 8, borderRadius: 12, marginLeft: 10 },
  title: { fontWeight: "bold" },
  contentContainer: { padding: 20 },
  fotoBox: { flexDirection: "row", marginTop: 30 }
  // ... reste dos estilos conforme original
})

```)}}
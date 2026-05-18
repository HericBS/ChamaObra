import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, SafeAreaView, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { servicoRepository } from '../database/servicoRepository';

export default function PostarServico() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [metragem, setMetragem] = useState('');
  const [endereco, setEndereco] = useState('');
  const [categoria, setCategoria] = useState('Reforma');
  const [urgencia, setUrgencia] = useState('Hoje');
  const [materiais, setMateriais] = useState('Apenas mão de obra');
  const [descricao, setDescricao] = useState('');

  const categorias = ['Reforma', 'Elétrica', 'Hidráulica', 'Pintura', 'Outros'];
  const urgencias = ['Hoje', 'Esta Semana', 'Agendar'];

  const handlePostar = () => {
    if (!titulo || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha o título e o endereço.');
      return;
    }

    try {
      servicoRepository.insert({
        clienteId: 1, // Mockado: em um app real, viria do usuário logado
        titulo,
        descricao,
        metragem,
        categoria,
        urgencia,
        materiais,
        endereco,
        status: 'EM_ANDAMENTO',
      });

      Alert.alert('Sucesso', 'Seu pedido foi postado com sucesso!', [
        { text: 'OK', onPress: () => router.push('/meusProjetos') }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao postar o serviço.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="menu" size={24} color="#0a1f44" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#0a1f44" />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Postar novo Pedido</Text>

        {/* SEÇÃO: DADOS BÁSICOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionAccent} />
          <View>
            <Text style={styles.sectionTitle}>Dados Básicos</Text>
            <Text style={styles.sectionSubtitle}>Comece com o essencial para atrair os melhores profissionais.</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>TÍTULO DO SERVIÇO</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Reforma completa de banheiro social"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>DESCRIÇÃO DETALHADA</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Descreva detalhadamente o que precisa ser feito..."
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>CATEGORIA DO SERVIÇO</Text>
            <View style={styles.categoryContainer}>
              {categorias.slice(0, 2).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryBtn, categoria === cat && styles.categoryBtnActive]}
                  onPress={() => setCategoria(cat)}
                >
                  <MaterialIcons
                    name={cat === 'Reforma' ? 'build' : 'bolt'}
                    size={20}
                    color={categoria === cat ? '#fff' : '#0a1f44'}
                  />
                  <Text style={[styles.categoryBtnText, { color: categoria === cat ? '#fff' : '#0a1f44' }]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* SEÇÃO: ESPECIFICAÇÕES */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionAccent} />
          <View>
            <Text style={styles.sectionTitle}>Especificações</Text>
            <Text style={styles.sectionSubtitle}>Detalhes técnicos garantem orçamentos mais precisos.</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>METRAGEM (M²)</Text>
            <View style={styles.inputWithUnit}>
              <TextInput
                style={[styles.input, { flex: 1, borderBottomWidth: 0, borderRadius: 0 }]}
                placeholder="0.00"
                keyboardType="numeric"
                value={metragem}
                onChangeText={setMetragem}
              />
              <Text style={styles.unitText}>m²</Text>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>MATERIAIS INCLUSOS</Text>
            <View style={styles.selectInput}>
              <Text style={styles.selectText}>{materiais}</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>URGÊNCIA DO SERVIÇO</Text>
            <View style={styles.urgencyContainer}>
              {urgencias.map((urg) => (
                <TouchableOpacity
                  key={urg}
                  style={[styles.urgencyBtn, urgencia === urg && styles.urgencyBtnActive]}
                  onPress={() => setUrgencia(urg)}
                >
                  <Text style={[styles.urgencyBtnText, { color: urgencia === urg ? '#fff' : '#666' }]}>
                    {urg}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* SEÇÃO: LOCAL E FOTOS */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionAccent} />
          <View>
            <Text style={styles.sectionTitle}>Local e Fotos</Text>
            <Text style={styles.sectionSubtitle}>Mostre o que precisa ser feito para gerar confiança.</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>ENDEREÇO DO LOCAL</Text>
            <View style={styles.inputWithIcon}>
              <Ionicons name="location-outline" size={20} color="#666" style={{ marginRight: 8 }} />
              <TextInput
                style={[styles.input, { flex: 1, borderBottomWidth: 0, borderRadius: 0 }]}
                placeholder="Rua, Número, Bairro, Cidade"
                value={endereco}
                onChangeText={setEndereco}
              />
            </View>
          </View>

          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Visualização do Mapa</Text>
            <View style={styles.mapMarker} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>FOTOS DO LOCAL (MÍNIMO 2)</Text>
            <View style={styles.photoGrid}>
              <TouchableOpacity style={styles.photoUploadBtn}>
                <View style={styles.uploadCircle}>
                  <Ionicons name="add" size={30} color="#ff6600" />
                </View>
                <Text style={styles.uploadText}>ADICIONAR</Text>
              </TouchableOpacity>
              <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.photoPreview} />
              <Image source={{ uri: 'https://picsum.photos/201' }} style={styles.photoPreview} />
              <View style={styles.photoEmpty}>
                <Ionicons name="image-outline" size={30} color="#ccc" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePostar}
        >
          <Text style={styles.submitButtonText}>POSTAR SERVIÇO</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Mock */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/homeContratante')}>
          <Ionicons name="home-outline" size={20} color="#666" />
          <Text style={styles.navText}>INÍCIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <Text style={styles.navText}>EXPLORAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { alignItems: 'center' }]} onPress={() => {}}>
          <View style={styles.navCenterButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </View>
          <Text style={[styles.navText, { color: '#ff6600', fontWeight: 'bold' }]}>POSTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/meusProjetos')}>
          <Ionicons name="hammer-outline" size={20} color="#666" />
          <Text style={styles.navText}>PEDIDOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.navText}>MENSAGENS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a1f44',
    marginBottom: 25,
    marginTop: 10,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  sectionAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#ff6600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1f44',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#333',
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingRight: 15,
  },
  unitText: {
    fontWeight: 'bold',
    color: '#666',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    padding: 15,
  },
  selectText: {
    fontSize: 15,
    color: '#333',
  },
  urgencyContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    padding: 5,
  },
  urgencyBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  urgencyBtnActive: {
    backgroundColor: '#ff6600',
  },
  urgencyBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryBtnActive: {
    backgroundColor: '#0a1f44',
    borderColor: '#0a1f44',
  },
  categoryBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderStyle: 'dashed',
  },
  mapText: {
    color: '#adb5bd',
    fontSize: 14,
  },
  mapMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff6600',
    position: 'absolute',
    top: '40%',
    left: '50%',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoUploadBtn: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff6600',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadCircle: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  uploadText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  photoEmpty: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f1f3f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: '#ff6600',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#ff6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 30,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  navCenterButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ff6600',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#ff6600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

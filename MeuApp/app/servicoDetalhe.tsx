import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../database/database';
import { propostaRepository } from '../database/propostaRepository';
import { servicoRepository } from '../database/servicoRepository';

const { width } = Dimensions.get('window');

export default function ServicoDetalheScreen() {
  const router = useRouter();
  const { servicoId } = useLocalSearchParams<{ servicoId: string }>();
  const id = Number(servicoId);

  const [servico, setServico] = useState<any>(null);
  const [propostas, setPropostas] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    // In a real app, we'd use servicoRepository.getById(id)
    const result = db.getAllSync(`SELECT * FROM servicos WHERE id = ?`, [id]);
    if (result.length > 0) {
      const data = result[0];
      // Adding mock fields for the high-fidelity design since they aren't in the DB yet
      setServico({
        ...data,
        progresso: data.progresso || 50,
        estagio: data.estagio || 2,
        fotos: data.fotos ? JSON.parse(data.fotos) : [
          'https://picsum.photos/seed/serv1/800/600',
          'https://picsum.photos/seed/serv2/800/600',
          'https://picsum.photos/seed/serv3/800/600',
          'https://picsum.photos/seed/serv4/800/600',
        ]
      });
    }

    const propostasResult = propostaRepository.getByServicoId(id);
    setPropostas(propostasResult);
  }, [id]);

  const formatReais = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  if (!servico) {
    return (
      <View style={styles.centered}>
        <Text>Carregando serviço...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#0a1f44" />
        </TouchableOpacity>
        <View style={styles.topBarIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#0a1f44" />
          </TouchableOpacity>
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Navigation */}
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0a1f44" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes do Serviço</Text>
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-outline" size={24} color="#0a1f44" />
          </TouchableOpacity>
        </View>

        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>RECEBENDO PROPOSTAS</Text>
          </View>
          <View style={styles.stageContainer}>
            <Text style={styles.stageText}>STAGE {servico.estagio} OF 4</Text>
            <Text style={styles.progressText}>{servico.progresso}% Complete</Text>
          </View>
        </View>

        {/* Hero Image */}
        <Image source={{ uri: servico.fotos[0] }} style={styles.heroImage} />

        <View style={styles.contentPadding}>
          <Text style={styles.mainTitle}>{servico.titulo}</Text>
          <Text style={styles.description}>{servico.descricao}</Text>

          {/* Technical Specifications */}
          <Text style={styles.sectionLabel}>TECHNICAL SPECIFICATIONS</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <View style={styles.specIcon}><Ionicons name="build-outline" size={16} color="#0a1f44" /></View>
              <View>
                <Text style={styles.specLabel}>CATEGORY</Text>
                <Text style={styles.specValue}>{servico.categoria}</Text>
              </View>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIcon}><Ionicons name="resize-outline" size={16} color="#0a1f44" /></View>
              <View>
                <Text style={styles.specLabel}>TOTAL AREA</Text>
                <Text style={styles.specValue}>{servico.metragem}</Text>
              </View>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIcon}><Ionicons name="hammer-outline" size={16} color="#0a1f44" /></View>
              <View>
                <Text style={styles.specLabel}>MATERIALS</Text>
                <Text style={styles.specValue}>{servico.materiais}</Text>
              </View>
            </View>
            <View style={styles.specItem}>
              <View style={styles.specIcon}><Ionicons name="calendar-outline" size={16} color="#0a1f44" /></View>
              <View>
                <Text style={styles.specLabel}>START DATE</Text>
                <Text style={styles.specValue}>{servico.criado_em ? new Date(servico.criado_em).toLocaleDateString('pt-BR') : 'N/A'}</Text>
              </View>
            </View>
          </View>

          {/* Photos Gallery */}
          <View style={styles.galleryHeader}>
            <Text style={styles.galleryTitle}>Fotos do Local</Text>
            <Text style={styles.galleryCount}>{servico.fotos.length} FOTOS</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
            {servico.fotos.map((url: string, index: number) => (
              <Image key={index} source={{ uri: url }} style={styles.galleryImage} />
            ))}
          </ScrollView>

          {/* Proposals Received */}
          <View style={styles.proposalsHeader}>
            <Text style={styles.galleryTitle}>Propostas Recebidas</Text>
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>{propostas.length} Novas</Text>
            </View>
          </View>

          {propostas.map((p) => (
            <TouchableOpacity key={p.id} style={styles.propostaCard}>
              <Image source={{ uri: p.imagem || 'https://i.pravatar.cc/100' }} style={styles.propostaAvatar} />
              <View style={styles.propostaInfo}>
                <Text style={styles.propostaNome}>{p.prestadorNome}</Text>
                <Text style={styles.propostaRating}>⭐ 4.9 (124 avaliações)</Text>
              </View>
              <Text style={styles.propostaValor}>{formatReais(p.valor)}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>VER TODAS AS PROPOSTAS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn}>
            <Ionicons name="close-circle-outline" size={20} color="#fff" />
            <Text style={styles.secondaryBtnText}>CANCELAR PROJETO</Text>
          </TouchableOpacity>
          <Text style={styles.cancelDisclaimer}>
            Esta ação é irreversível. O projeto será removido do mercado e todas as propostas ativas serão canceladas.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation Mock */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/homeContratante')}>
          <Ionicons name="home-outline" size={20} color="#666" />
          <Text style={styles.navText}>INÍCIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <Text style={styles.navText}>EXPLORAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, { alignItems: 'center' }]} onPress={() => router.push('/postarServico')}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  menuButton: {
    padding: 5,
  },
  topBarIcons: {
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
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1f44',
  },
  shareBtn: {
    padding: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  stageContainer: {
    alignItems: 'flex-end',
  },
  stageText: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 12,
    color: '#ff6600',
    fontWeight: 'bold',
  },
  heroImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  contentPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a1f44',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 25,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    gap: 10,
  },
  specIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#999',
  },
  specValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0a1f44',
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1f44',
  },
  galleryCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  galleryScroll: {
    marginBottom: 25,
  },
  galleryImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginRight: 10,
  },
  proposalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  newBadge: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  propostaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  propostaAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  propostaInfo: {
    flex: 1,
  },
  propostaNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a1f44',
  },
  propostaRating: {
    fontSize: 12,
    color: '#999',
  },
  propostaValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  primaryBtn: {
    backgroundColor: '#ff6600',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: '#0a1f44',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelDisclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
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

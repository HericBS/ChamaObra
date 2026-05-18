import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../database/database';
import { propostaRepository } from '../database/propostaRepository';

export default function ServicoDetalheScreen() {
  const router = useRouter();
  const { servicoId } = useLocalSearchParams<{ servicoId: string }>();
  const id = Number(servicoId);

  const [servico, setServico] = useState<any>(null);
  const [propostas, setPropostas] = useState<any[]>([]);

  // Carregar detalhes do serviço ao montar
  useEffect(() => {
    if (!id) return;
    const result = db.getAllSync(`SELECT * FROM servicos WHERE id = ?`, [id]);
    if (result.length > 0) setServico(result[0]);

    // Carregar propostas associadas
    const propostasResult = propostaRepository.getByServicoId(id);
    setPropostas(propostasResult);
  }, [id]);

  const formatReais = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const navegarChat = (propostaId: number) => {
    router.push({ pathname: '/chat', params: { servicoId: id.toString(), propostaId: propostaId.toString() } });
  };

  if (!servico) {
    return (
      <View style={styles.centered}>
        <Text>Carregando serviço...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com foto e título */}
      <View style={styles.header}>
        {servico.foto && servico.foto.length > 0 && (
          <Image source={{ uri: servico.foto[0] }} style={styles.servicoImage} />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{servico.titulo}</Text>
          <Text style={styles.categoria}>{servico.categoria}</Text>
        </View>
      </View>

      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{servico.descricao}</Text>
      </View>

      {/* Botão de agendamento */}
      <TouchableOpacity
        style={styles.agendarButton}
        onPress={() => router.push({ pathname: '/agendar', params: { servicoId: id.toString() } })}
      >
        <Text style={styles.agendarText}>Agendar Serviço</Text>
      </TouchableOpacity>

      {/* Lista de propostas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Propostas Recebidas</Text>
        {propostas.map((p) => (
          <View key={p.id} style={styles.propostaCard}>
            <View style={styles.perfilContainer}>
              <Image source={{ uri: p.imagem || 'https://i.pravatar.cc/100' }} style={styles.perfilImg} />
              <View style={styles.perfilInfo}>
                <Text style={styles.perfilNome}>{p.prestadorNome}</Text>
                <Text style={styles.perfilServico}>{p.servico || ''}</Text>
              </View>
            </View>

            <View style={styles.detalhesProposta}>
              <Text style={styles.valor}>Valor: {formatReais(p.valor)}</Text>
              <Text style={styles.prazo}>Prazo: {p.prazo}</Text>
              <Text style={styles.status}>Status: {p.status}</Text>
            </View>

            <View style={styles.botoesProposta}>
              <TouchableOpacity style={styles.aceitarBtn} onPress={() => console.log('Aceitar proposta', p.id)}>
                <Text style={styles.btnTexto}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatBtn} onPress={() => navegarChat(p.id)}>
                <Text style={styles.btnTexto}>Conversar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a1f44',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  servicoImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  categoria: {
    color: '#dfe6e6',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a1f44',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  agendarButton: {
    backgroundColor: '#ff6600',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  agendarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  propostaCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ff6600',
  },
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  perfilImg: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },
  perfilInfo: {
    flexDirection: 'column',
  },
  perfilNome: {
    fontWeight: '600',
    color: '#0a1f44',
  },
  perfilServico: {
    color: '#ff6600',
    fontSize: 12,
  },
  detalhesProposta: {
    marginBottom: 10,
  },
  valor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a1f44',
  },
  prazo: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  status: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  botoesProposta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aceitarBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  chatBtn: {
    backgroundColor: '#ff6600',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  btnTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { db } from '../database/database';
import { propostaRepository } from '../database/propostaRepository';
import { Icon } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Text as ThemedText } from '@/components/themed-text';

export default function ChatScreen() {
  const router = useRouter();
  const { servicoId, propostaId } = useLocalSearchParams<{ servicoId: string, propostaId: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [proposal, setProposal] = useState<any>(null);

  // Carregar proposta e mensagens
  useEffect(() => {
    if (!propostaId) return;
    const result = db.getAllSync(
      `SELECT p.*, u.nome AS prestadorNome, u.imagem
       FROM propostas p
       JOIN usuarios u ON p.prestadorId = u.id
       WHERE p.id = ?`,
      [Number(propostaId)]
    );
    if (result.length > 0) setProposal(result[0]);

    // Carregar mensagens (simulado)
    setMessages([
      { id: 1, text: 'Olá! Recebi sua proposta.', isUser: false },
      { id: 2, text: 'Gostaria de negociar o valor.', isUser: true },
      { id: 3, text: 'Claro! Qual valor você tem em mente?', isUser: false },
    ]);
  }, [propostaId]);

  const formatReais = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const sendMessage = () => {
    if (text.trim().length === 0) return;
    const newMessage = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, newMessage]);
    setText('');
    // Simular resposta automática
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: `Recebi sua mensagem. O valor atual é ${formatReais(proposal?.valor)}. Podemos ajustar?`,
        isUser: false,
      };
      setMessages(prev => [...prev, response]);
    }, 800);
  };

  const adjustPrice = (delta: number) => {
    if (!proposal) return;
    const newValue = Math.max(0, proposal.valor + delta);
    console.log(`Ajustando preço de ${proposal.valor} para ${newValue}`);
    // Em uma implementação real, atualizaria no banco
  };

  if (!proposal) {
    return (
      <View style={styles.centered}>
        <Text>Carregando chat...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/servico/' + servicoId)}>
          <Icon size={20} color="#0a1f44" name="arrow-left" />
        </TouchableOpacity>
        <ThemedText type="title">Negociar Proposta</ThemedText>
      </View>

      {/* Resumo da proposta */}
      <View style={styles.proposalSummary}>
        <ThemedText type="sectionTitle">Sobre esta proposta</ThemedText>
        <View style={styles.proposalDetails}>
          <Text><strong>Prestador:</strong> {proposal.prestadorNome}</Text>
          <Text><strong>Serviço:</strong> {proposal.servico}</Text>
          <Text><strong>Prazo:</strong> {proposal.prazo}</Text>
          <Text><strong>Valor atual:</strong> {formatReais(proposal.valor)}</Text>
        </View>
      </View>

      {/* Lista de mensagens */}
      <ScrollView style={styles.messagesContainer} contentContainerStyle={{ paddingBottom: 120 }}>
        {messages.map(msg => (
          <View key={msg.id} style={{ flexDirection: 'row', marginBottom: 8 }}>
            {msg.isUser ? (
              <View style={styles.userMessage}>
                <View style={styles.userBubble}>
                  <ThemedText type="default">{msg.text}</ThemedText>
                </View>
              </View>
            ) : (
              <View style={styles.receiverMessage}>
                <View style={styles.receiverBubble}>
                  <ThemedText type="default">{msg.text}</ThemedText>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input e botões de ajuste */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva sua mensagem..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={text.trim().length === 0}
        >
          <ThemedText type="link">Enviar</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.adjustmentContainer}>
        <ThemedText type="sectionTitle">Ajustar valor:</ThemedText>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.adjustButton, styles.decreaseButton]}
            onPress={() => adjustPrice(-100)}
            disabled={proposal.valor <= 100}
          >
            <ThemedText type="link">- R$ 100</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adjustButton, styles.increaseButton]}
            onPress={() => adjustPrice(100)}
            disabled={proposal.valor >= 5000}
          >
            <ThemedText type="link">+ R$ 100</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#0a1f44',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proposalSummary: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#ff6600',
  },
  proposalDetails: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  userMessage: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  userBubble: {
    maxWidth: '75%',
    padding: 12,
    backgroundColor: '#ff6600',
    borderRadius: 15,
    alignItems: 'flex-end',
  },
  receiverMessage: {
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  receiverBubble: {
    maxWidth: '75%',
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    alignItems: 'flex-start',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#e8e8e8',
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#ff6600',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  adjustmentContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  adjustButton: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  decreaseButton: {
    backgroundColor: '#ffe8d9',
  },
  increaseButton: {
    backgroundColor: '#e8f5e9',
  },
});
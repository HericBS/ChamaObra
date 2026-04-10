import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { db } from '../database/database';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const router = useRouter();

  const [tipo, setTipo] = useState<'contratante' | 'prestador'>('contratante');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [endereco, setEndereco] = useState('');

  const cadastrar = () => {
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    db.runSync(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );

    alert('Conta criada 🔥');
    router.push('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* TOPO */}
      <View style={styles.header}>
        <Text style={styles.logo}>🛠️</Text>
        <Text style={styles.title}>Junte-se à maior rede de</Text>
        <Text style={styles.highlight}>profissionais.</Text>
      </View>

      {/* TIPO */}
      <Text style={styles.labelTop}>Você é:</Text>

      <View style={styles.tipoContainer}>
        {/* CONTRATANTE */}
        <TouchableOpacity
          style={[styles.tipoBox, tipo === 'contratante' && styles.tipoAtivo]}
          onPress={() => setTipo('contratante')}
        >
          <Text>Contratante</Text>
        </TouchableOpacity>

        {/* PRESTADOR */}
        <TouchableOpacity
          style={[styles.tipoBox, tipo === 'prestador' && styles.tipoAtivo]}
         onPress={() => {
  setTipo('prestador');
  router.push('/prestador?tipo=prestador');
}}
        >
          <Text>Prestador de serviço</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <Text style={styles.label}>NOME COMPLETO</Text>
      <TextInput style={styles.input} placeholder="Como deseja ser chamado" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>EMAIL</Text>
      <TextInput style={styles.input} placeholder="seu@email.com" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} placeholder="000.000.000-00" value={cpf} onChangeText={setCpf} />

      <Text style={styles.label}>SENHA</Text>
      <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />

      <Text style={styles.label}>CONFIRMAR SENHA</Text>
      <TextInput style={styles.input} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <Text style={styles.label}>ENDEREÇO</Text>
      <TextInput style={styles.input} placeholder="Rua, número e bairro" value={endereco} onChangeText={setEndereco} />

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* VOLTAR */}
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.loginLink}>Já possui uma conta? Entre aqui</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f0eb',
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    fontSize: 30,
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
  },

  highlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },

  labelTop: {
    marginBottom: 10,
    fontWeight: 'bold',
  },

  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  tipoBox: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  tipoAtivo: {
    borderColor: '#ff6600',
  },

  label: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  loginLink: {
    textAlign: 'center',
    marginTop: 15,
    color: '#007bff',
  },
});
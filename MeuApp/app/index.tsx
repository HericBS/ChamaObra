import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { loginUsuario } from '../database/authService';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
  const resultado = loginUsuario(email, senha);

  if (!resultado.sucesso) {
    alert(resultado.mensagem);
    return;
  }

const usuario = resultado.usuario as any;

  console.log(usuario); // 🔥 veja isso

  if (usuario.tipo === 'prestador') {
    router.replace('/homePrestador');
  } else {
    router.replace('/homeContratante');
  }
};
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>🔥</Text>
        <Text style={styles.title}>ChamaObra</Text>
        <Text style={styles.subtitle}>
          Conectando você aos melhores profissionais
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Entrar</Text>
        <Text style={styles.helperText}>
          Acesse sua conta para continuar
        </Text>

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* SENHA */}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        {/* BOTÃO LOGIN */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* CRIAR CONTA */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Ainda não tem uma conta?
          </Text>

          <TouchableOpacity onPress={() => router.push('/contratante')}>
            <Text style={styles.signupLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },

  logo: {
    fontSize: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 5,
  },

  subtitle: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },

  form: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  helperText: {
    color: 'gray',
    marginBottom: 15,
  },

  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  signupContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  signupText: {
    color: 'gray',
  },

  signupLink: {
    color: '#ff6600',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
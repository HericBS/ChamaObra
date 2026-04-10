import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../database/database';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';



// criar tabela
const createTable = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      senha TEXT
    );
  `);
};

// cadastrar
const cadastrarUsuario = (email: string, senha: string) => {
  db.runSync(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [email, senha]
  );
};

// login
const loginUsuario = (email: string, senha: string) => {
  const result = db.getAllSync(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha]
  );

  return result.length > 0;
};

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  const handleLogin = () => {
    const success = loginUsuario(email, senha);

    if (success) {
      alert('Login realizado 🔥');
    } else {
      alert('Email ou senha inválidos');
    }
  };
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>🔥</Text>
        <Text style={styles.title}>ChamaObra</Text>
        <Text style={styles.subtitle}>
          Conectando você aos melhores profissionais
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Entrar</Text>
        <Text style={styles.helperText}>
          Acesse sua conta para continuar
        </Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Cadastro teste */}
        <TouchableOpacity onPress={() => cadastrarUsuario(email, senha)}>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
            Cadastrar usuário (teste)
          </Text>
        </TouchableOpacity>

        {/* OU */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.line} />
        </View>

        {/* Google */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>Entrar com Google</Text>
        </TouchableOpacity>

        {/* Criar conta */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Ainda não tem uma conta?
          </Text>
        <TouchableOpacity onPress={() => router.push('/cadastro')}>
  <Text style={styles.signupLink}>Criar conta</Text>
</TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderStyle: 'dashed',
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

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  dividerText: {
    marginHorizontal: 10,
    color: 'gray',
  },

  googleButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  googleText: {
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
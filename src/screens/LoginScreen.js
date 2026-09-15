import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleLogin() {
    const nextErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Informe um e-mail válido.';
    if (password.length < 6) nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      dispatch(login({ email: email.trim(), name: email.trim().split('@')[0] }));
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Catálogo Mobile</Text>
        <Text style={styles.subtitle}>Entre para consultar os produtos</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={[styles.input, errors.email && styles.inputError]} placeholder="aluno@exemplo.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Senha</Text>
        <TextInput style={[styles.input, errors.password && styles.inputError]} placeholder="123456" value={password} onChangeText={setPassword} secureTextEntry />
        {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.help}>Teste: aluno@exemplo.com / 123456</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  form: { backgroundColor: colors.surface, borderRadius: 16, padding: 24, elevation: 2 },
  title: { color: colors.primary, fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textLight, textAlign: 'center', marginTop: 8, marginBottom: 28 },
  label: { color: colors.text, fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 13, color: colors.text },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 12, marginTop: 5 },
  button: { backgroundColor: colors.primary, borderRadius: 8, padding: 15, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  help: { color: colors.textLight, textAlign: 'center', fontSize: 12, marginTop: 16 },
});

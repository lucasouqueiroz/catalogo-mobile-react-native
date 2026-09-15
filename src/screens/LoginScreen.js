import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.page}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.brand}>URBAN STORE</Text>
          <Text style={styles.heroTitle}>Seu catálogo{`\n`}em qualquer lugar.</Text>
          <Text style={styles.heroText}>Acesse produtos, promoções e detalhes em uma experiência simples e rápida.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Entrar</Text>
          <Text style={styles.formSubtitle}>Informe seus dados para acessar o catálogo.</Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="aluno@exemplo.com"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={(text) => { setEmail(text); if (errors.email) setErrors({ ...errors, email: null }); }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="123456"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={(text) => { setPassword(text); if (errors.password) setErrors({ ...errors, password: null }); }}
            secureTextEntry
          />
          {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Acessar catálogo</Text>
          </TouchableOpacity>

          <View style={styles.testBox}>
            <Text style={styles.testTitle}>Dados para teste</Text>
            <Text style={styles.testText}>E-mail: aluno@exemplo.com</Text>
            <Text style={styles.testText}>Senha: 123456</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 24, gap: 24 },
  hero: { width: '100%', maxWidth: 420, padding: 24 },
  brand: { color: colors.primary, fontWeight: '900', letterSpacing: 2, fontSize: 13, marginBottom: 18 },
  heroTitle: { color: colors.text, fontSize: 38, lineHeight: 44, fontWeight: '900' },
  heroText: { color: colors.textLight, fontSize: 16, lineHeight: 24, marginTop: 16 },
  form: { width: '100%', maxWidth: 430, backgroundColor: colors.surface, borderRadius: 20, padding: 28, borderWidth: 1, borderColor: colors.border, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 18, elevation: 4 },
  formTitle: { color: colors.text, fontSize: 27, fontWeight: '800' },
  formSubtitle: { color: colors.textLight, lineHeight: 20, marginTop: 6, marginBottom: 24 },
  label: { color: colors.text, fontWeight: '800', marginBottom: 8, marginTop: 14 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 14, color: colors.text, fontSize: 16, backgroundColor: '#ffffff' },
  inputError: { borderColor: colors.error },
  error: { color: colors.error, fontSize: 12, marginTop: 5 },
  button: { backgroundColor: colors.primary, borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 26 },
  buttonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  testBox: { backgroundColor: '#eff6ff', borderRadius: 10, padding: 14, marginTop: 20, borderWidth: 1, borderColor: '#bfdbfe' },
  testTitle: { color: colors.primaryDark, fontWeight: '800', marginBottom: 5 },
  testText: { color: '#334155', fontSize: 13, lineHeight: 19 },
});

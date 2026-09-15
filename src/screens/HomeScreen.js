import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { getAllFemaleProducts, getAllMaleProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [tab, setTab] = useState('male');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true); else setLoading(true);
    setError('');
    try {
      const data = tab === 'male' ? await getAllMaleProducts() : await getAllFemaleProducts();
      setProducts(data);
    } catch (err) {
      setProducts([]);
      setError('Verifique sua conexão com a internet e tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [tab]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  if (loading) return <Loading message="Carregando produtos..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadProducts} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Bem-vindo(a),</Text>
          <Text style={styles.name}>{user?.name || 'usuário'}</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={() => dispatch(logout())}><Text style={styles.logoutText}>Sair</Text></TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === 'male' && styles.tabActive]} onPress={() => setTab('male')}><Text style={[styles.tabText, tab === 'male' && styles.tabTextActive]}>Masculino</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'female' && styles.tabActive]} onPress={() => setTab('female')}><Text style={[styles.tabText, tab === 'female' && styles.tabTextActive]}>Feminino</Text></TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard product={item} onPress={(product) => navigation.navigate('ProductDetails', { productId: product.id })} />}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadProducts(true)} colors={[colors.primary]} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.surface, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.border },
  welcome: { color: colors.textLight, fontSize: 13 },
  name: { color: colors.text, fontSize: 18, fontWeight: '700' },
  logout: { backgroundColor: colors.error, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 7 },
  logoutText: { color: '#fff', fontWeight: '700' },
  tabs: { flexDirection: 'row', gap: 10, padding: 14, backgroundColor: colors.surface },
  tab: { flex: 1, borderRadius: 8, paddingVertical: 10, backgroundColor: colors.background, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary },
  tabText: { color: colors.textLight, fontWeight: '700' },
  tabTextActive: { color: '#fff' },
  list: { paddingTop: 14, paddingBottom: 24 },
});

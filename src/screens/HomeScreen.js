import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { getAllFemaleProducts, getAllMaleProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { colors } from '../theme/colors';

const HORIZONTAL_PADDING = 20;
const CARD_GAP = 16;

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState('male');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const columns = useMemo(() => {
    if (width >= 1280) return 4;
    if (width >= 900) return 3;
    if (width >= 620) return 2;
    return 1;
  }, [width]);

  const contentWidth = Math.min(width, 1280);
  const cardWidth = columns === 1
    ? undefined
    : Math.floor((contentWidth - (HORIZONTAL_PADDING * 2) - (CARD_GAP * (columns - 1))) / columns);

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
    <View style={styles.page}>
      <View style={[styles.appContainer, { maxWidth: contentWidth }]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>URBAN STORE</Text>
            <Text style={styles.welcome}>Olá, <Text style={styles.name}>{user?.name || 'usuário'}</Text></Text>
            <Text style={styles.subtitle}>Encontre os melhores produtos para você.</Text>
          </View>
          <TouchableOpacity style={styles.logout} onPress={() => dispatch(logout())} accessibilityLabel="Sair da conta">
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, tab === 'male' && styles.tabActive]} onPress={() => setTab('male')}>
            <Text style={[styles.tabText, tab === 'male' && styles.tabTextActive]}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab === 'female' && styles.tabActive]} onPress={() => setTab('female')}>
            <Text style={[styles.tabText, tab === 'female' && styles.tabTextActive]}>Feminino</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>{tab === 'male' ? 'Moda Masculina' : 'Moda Feminina'}</Text>
            <Text style={styles.sectionDescription}>{products.length} produtos disponíveis</Text>
          </View>
        </View>

        <FlatList
          key={columns}
          data={products}
          numColumns={columns}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              cardWidth={cardWidth}
              onPress={(product) => navigation.navigate('ProductDetails', { productId: product.id })}
            />
          )}
          columnWrapperStyle={columns > 1 ? styles.row : undefined}
          contentContainerStyle={[styles.list, columns === 1 && styles.listMobile]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadProducts(true)} colors={[colors.primary]} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  brand: {
    color: colors.primary,
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '900',
    marginBottom: 6,
  },
  welcome: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '500',
  },
  name: {
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textLight,
    marginTop: 4,
    fontSize: 14,
  },
  logout: {
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: colors.error,
    fontWeight: '800',
  },
  tabs: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 20,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textLight,
    fontWeight: '800',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  sectionHeader: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 18,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    color: colors.text,
    fontWeight: '800',
  },
  sectionDescription: {
    color: colors.textLight,
    marginTop: 4,
    fontSize: 14,
  },
  list: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 30,
  },
  listMobile: {
    paddingHorizontal: 0,
  },
  row: {
    gap: CARD_GAP,
    marginBottom: 0,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { getProductById } from '../services/productService';
import { colors } from '../theme/colors';

const formatPrice = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  const { width } = useWindowDimensions();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductById(productId).then(setProduct).catch(() => setError('Não foi possível carregar os detalhes do produto.'));
  }, [productId]);

  if (error) return <View style={styles.center}><Text style={styles.error}>{error}</Text></View>;
  if (!product) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /><Text style={styles.loading}>Carregando detalhes...</Text></View>;

  const discountPrice = product.price * (1 - product.discountPercentage / 100);
  const isWide = width >= 760;

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      <View style={[styles.container, isWide && styles.containerWide]}>
        <View style={[styles.productLayout, isWide && styles.productLayoutWide]}>
          <View style={styles.imagePanel}>
            <Image source={{ uri: product.images?.[0] || product.thumbnail }} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.content}>
            <Text style={styles.category}>{product.category.replaceAll('-', ' ')}</Text>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.priceBox}>
              <Text style={styles.original}>{formatPrice(product.price)}</Text>
              <Text style={styles.price}>{formatPrice(discountPrice)}</Text>
              <Text style={styles.discount}>{product.discountPercentage.toFixed(0)}% de desconto</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.heading}>Descrição</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  pageContent: { padding: 20, alignItems: 'center' },
  container: { width: '100%', maxWidth: 680 },
  containerWide: { maxWidth: 1080 },
  productLayout: { backgroundColor: colors.surface, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  productLayoutWide: { flexDirection: 'row' },
  imagePanel: { flex: 1, minHeight: 330, padding: 28, backgroundColor: '#f8fafc', justifyContent: 'center' },
  image: { width: '100%', height: 320 },
  content: { flex: 1, padding: 28, justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  loading: { marginTop: 14, color: colors.textLight },
  error: { color: colors.error, textAlign: 'center' },
  category: { alignSelf: 'flex-start', color: colors.primary, fontWeight: '900', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  title: { color: colors.text, fontSize: 27, lineHeight: 34, fontWeight: '900' },
  priceBox: { backgroundColor: '#eff6ff', borderRadius: 12, padding: 16, marginTop: 22, borderWidth: 1, borderColor: '#bfdbfe' },
  original: { color: colors.textLight, textDecorationLine: 'line-through', fontSize: 15 },
  price: { color: colors.primary, fontSize: 29, fontWeight: '900', marginTop: 3 },
  discount: { color: colors.success, fontWeight: '800', marginTop: 5 },
  separator: { height: 1, backgroundColor: colors.border, marginVertical: 22 },
  heading: { fontSize: 17, color: colors.text, fontWeight: '800', marginBottom: 9 },
  description: { color: colors.textLight, fontSize: 15, lineHeight: 23 },
});

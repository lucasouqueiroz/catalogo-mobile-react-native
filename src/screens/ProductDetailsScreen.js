import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { getProductById } from '../services/productService';
import { colors } from '../theme/colors';

const formatPrice = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductById(productId).then(setProduct).catch(() => setError('Não foi possível carregar os detalhes do produto.'));
  }, [productId]);

  if (error) return <View style={styles.center}><Text>{error}</Text></View>;
  if (!product) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /><Text style={styles.loading}>Carregando detalhes...</Text></View>;

  const discountPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images?.[0] || product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.priceBox}>
          <Text style={styles.original}>{formatPrice(product.price)}</Text>
          <Text style={styles.price}>{formatPrice(discountPrice)}</Text>
          <Text style={styles.discount}>{product.discountPercentage.toFixed(0)}% de desconto</Text>
        </View>
        <Text style={styles.heading}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loading: { marginTop: 14, color: colors.textLight },
  image: { width: '100%', height: 300, backgroundColor: colors.surface },
  content: { padding: 20 },
  title: { color: colors.text, fontSize: 23, fontWeight: '700' },
  category: { alignSelf: 'flex-start', color: '#fff', backgroundColor: colors.primary, borderRadius: 5, paddingHorizontal: 9, paddingVertical: 5, marginTop: 12, textTransform: 'capitalize' },
  priceBox: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 16, marginTop: 18 },
  original: { color: colors.textLight, textDecorationLine: 'line-through', fontSize: 16 },
  price: { color: colors.primary, fontSize: 26, fontWeight: '700', marginTop: 4 },
  discount: { color: colors.success, fontWeight: '700', marginTop: 4 },
  heading: { fontSize: 17, color: colors.text, fontWeight: '700', marginTop: 22, marginBottom: 8 },
  description: { color: colors.text, fontSize: 15, lineHeight: 22 },
});

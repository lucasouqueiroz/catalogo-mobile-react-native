import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const formatPrice = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(value);

export default function ProductCard({ product, onPress }) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)} activeOpacity={0.75}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(discountedPrice)}</Text>
          <Text style={styles.discount}>-{product.discountPercentage.toFixed(0)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 12, marginHorizontal: 16, marginBottom: 12, overflow: 'hidden', elevation: 3 },
  image: { width: '100%', height: 180, backgroundColor: colors.background },
  content: { padding: 12 },
  title: { color: colors.text, fontSize: 16, fontWeight: '700' },
  category: { color: colors.textLight, fontSize: 13, marginTop: 4, textTransform: 'capitalize' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  price: { color: colors.primary, fontSize: 17, fontWeight: '700' },
  discount: { color: '#fff', backgroundColor: colors.discount, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2, fontSize: 12, fontWeight: '700' },
});

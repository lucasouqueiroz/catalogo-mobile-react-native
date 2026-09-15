import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const formatPrice = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(value);

export default function ProductCard({ product, onPress, cardWidth }) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <TouchableOpacity
      style={[styles.card, cardWidth ? { width: cardWidth } : styles.cardMobile]}
      onPress={() => onPress(product)}
      activeOpacity={0.82}
    >
      <View style={styles.imageArea}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discountPercentage.toFixed(0)}%</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>{product.category.replaceAll('-', ' ')}</Text>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.originalPrice}>{formatPrice(product.price)}</Text>
        <Text style={styles.price}>{formatPrice(discountedPrice)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  cardMobile: {
    marginHorizontal: 16,
  },
  imageArea: {
    height: 180,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.discount,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    padding: 14,
  },
  category: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 7,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
    minHeight: 42,
  },
  originalPrice: {
    color: colors.textLight,
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginTop: 12,
  },
  price: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 2,
  },
});

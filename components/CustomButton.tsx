import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from './ui/IconSymbol';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  style,
  textStyle,
  loading = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineButton);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryButton);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'outline') {
      baseStyle.push(styles.outlineText);
    } else if (variant === 'secondary') {
      baseStyle.push(styles.secondaryText);
    } else {
      baseStyle.push(styles.primaryText);
    }
    
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };

  const renderContent = () => (
    <>
      {icon && (
        <IconSymbol 
          name={icon as any} 
          size={size === 'large' ? 20 : size === 'medium' ? 18 : 16} 
          color={variant === 'outline' ? '#FF6B6B' : '#FFFFFF'} 
        />
      )}
      <Text style={getTextStyle()}>
        {loading ? 'Loading...' : title}
      </Text>
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={[styles.gradientButton, style]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, styles[size], disabled && styles.disabled]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#FF6B6B',
  },
  gradientButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  
  // Variants
  secondaryButton: {
    backgroundColor: '#F1F5F9',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    marginLeft: 8,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Text colors
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#334155',
  },
  outlineText: {
    color: '#FF6B6B',
  },
});

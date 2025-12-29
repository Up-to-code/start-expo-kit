import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    icon?: React.ReactNode;
}

export const Button = ({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled,
    loading,
    className,
    icon,
}: ButtonProps) => {
    const baseStyles = "flex-row items-center justify-center rounded-[14px] active:opacity-70";

    const variants = {
        primary: "bg-[#007AFF]", // Apple System Blue
        secondary: "bg-gray-100",
        outline: "bg-transparent border border-gray-200",
        ghost: "bg-transparent",
    };

    const textVariants = {
        primary: "text-white font-semibold", // Added semi-bold for better legibility
        secondary: "text-black font-medium",
        outline: "text-black font-medium",
        ghost: "text-[#007AFF] font-medium", // Apple style ghost button
    };

    const sizes = {
        sm: "h-9 px-3",
        md: "h-[50px] px-6", // Standard touch target
        lg: "h-[56px] px-8",
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-40' : ''} ${className || ''}`}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#000'} />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    <Text className={`${textVariants[variant]} text-[17px] tracking-tight`}>
                        {label}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

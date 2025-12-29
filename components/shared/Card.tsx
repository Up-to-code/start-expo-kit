import React from 'react';
import { View, ViewProps } from 'react-native';

export const Card = ({ children, className, ...props }: ViewProps) => {
    return (
        <View
            className={`bg-white rounded-2xl p-6 border border-gray-100 ${className || ''}`}
            {...props}
        >
            {children}
        </View>
    );
};

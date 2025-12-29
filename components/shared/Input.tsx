import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(({ label, error, className, ...props }, ref) => {
    return (
        <View className="mb-4 w-full">
            {label && <Text className="mb-2 text-[15px] font-medium text-gray-900 tracking-tight">{label}</Text>}
            <TextInput
                ref={ref}
                placeholderTextColor="#A1A1AA"
                importantForAutofill="yes"
                autoCorrect={false}
                spellCheck={false}
                className={`w-full h-[52px] rounded-[14px] border bg-gray-50/50 px-4 text-[17px] text-gray-900 ${error ? 'border-red-500 bg-red-50/10' : 'border-gray-200 focus:border-[#007AFF] focus:bg-white'
                    } ${className || ''}`}
                {...props}
            />
            {error && <Text className="mt-1.5 text-[13px] text-red-500 font-medium">{error}</Text>}
        </View>
    );
});

Input.displayName = "Input";

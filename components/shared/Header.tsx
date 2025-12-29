import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    rightElement?: React.ReactNode;
}

export const Header = ({ title, showBack = true, rightElement }: HeaderProps) => {
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-between py-2 bg-white min-h-[48px]">
            <View className="w-16 items-start">
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} className="py-2 px-1">
                        <Text className="text-blue-600 text-base font-medium">Back</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text className="text-lg font-bold text-gray-900 text-center flex-1">{title}</Text>
            <View className="w-16 items-end">
                {rightElement}
            </View>
        </View>
    );
};

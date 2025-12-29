import React from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps extends ViewProps {
    safe?: boolean;
    scrollable?: boolean;
}

export const Container = ({ children, safe, scrollable, className, ...props }: ContainerProps) => {
    const Wrapper = safe ? SafeAreaView : View;

    if (scrollable) {
        return (
            <Wrapper className={`flex-1 bg-white ${className || ''}`} {...props}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, minHeight: '100%' }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    className="px-6"
                >
                    {children}
                </ScrollView>
            </Wrapper>
        );
    }

    return (
        <Wrapper className={`flex-1 bg-white px-6 ${className || ''}`} {...props}>
            {children}
        </Wrapper>
    );
};

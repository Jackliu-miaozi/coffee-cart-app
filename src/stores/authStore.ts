import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '../types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (phone: string, code: string) => {
        set({ isLoading: true });

        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 1500));

          // 模拟登录成功
          const mockUser: User = {
            id: '1',
            phone: phone,
            name: '咖啡爱好者',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            token: 'mock_token_' + Date.now(),
          };

          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw new Error('登录失败，请检查手机号和验证码');
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      skipAuth: () => {
        set({
          user: null,
          isAuthenticated: true, // 设置为true以跳过认证
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

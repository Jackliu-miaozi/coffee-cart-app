import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuthStore } from '../stores/authStore';

const { width, height } = Dimensions.get('window');

type LoginScreenNavigationProp = StackNavigationProp<any, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, skipAuth } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      Alert.alert('提示', '请输入正确的手机号');
      return;
    }

    setIsLoading(true);
    // 模拟发送验证码
    setTimeout(() => {
      setIsCodeSent(true);
      setIsLoading(false);
      Alert.alert('验证码已发送', '请查看短信获取验证码');
    }, 1500);
  };

  const handleLogin = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Alert.alert('提示', '请输入6位验证码');
      return;
    }

    try {
      setIsLoading(true);
      await login(phoneNumber, verificationCode);
      // 登录成功后会自动更新状态，主导航器会处理跳转
    } catch (error) {
      Alert.alert('登录失败', error instanceof Error ? error.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipLogin = () => {
    // 跳过登录，直接进入应用
    skipAuth();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B4513" />

      {/* 背景装饰 */}
      <View style={styles.backgroundDecoration}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* 顶部标题区域 */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <Ionicons name="cafe" size={60} color="#8B4513" />
              </View>
              <Text style={styles.title}>咖啡车</Text>
              <Text style={styles.subtitle}>开启您的咖啡之旅</Text>
            </View>

            {/* 登录表单 */}
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="请输入手机号"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={11}
                    editable={!isCodeSent}
                  />
                </View>

                {!isCodeSent ? (
                  <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleSendCode}
                    disabled={isLoading}
                  >
                    <Text style={styles.buttonText}>
                      {isLoading ? '发送中...' : '获取验证码'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="key-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="请输入验证码"
                        keyboardType="number-pad"
                        value={verificationCode}
                        onChangeText={setVerificationCode}
                        maxLength={6}
                      />
                    </View>

                    <TouchableOpacity
                      style={[styles.button, isLoading && styles.buttonDisabled]}
                      onPress={handleLogin}
                      disabled={isLoading}
                    >
                      <Text style={styles.buttonText}>
                        {isLoading ? '登录中...' : '登录'}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* 其他登录方式 */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>或</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-wechat" size={24} color="#07C160" />
                  <Text style={styles.socialButtonText}>微信登录</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={24} color="#000" />
                  <Text style={styles.socialButtonText}>Apple登录</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 底部区域 */}
            <View style={styles.footerSection}>
              <TouchableOpacity onPress={handleSkipLogin}>
                <Text style={styles.skipText}>跳过登录，先逛逛</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backgroundDecoration: {
    ...StyleSheet.absoluteFillObject,
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8B4513',
    opacity: 0.1,
  },
  circle2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#D2691E',
    opacity: 0.1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formSection: {
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#8B4513',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    paddingHorizontal: 20,
    color: '#666',
    fontSize: 14,
  },
  socialLoginContainer: {
    gap: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footerSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  skipText: {
    color: '#8B4513',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

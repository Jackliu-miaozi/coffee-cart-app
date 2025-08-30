import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { loginScreenStyles as styles } from '../styles/screens';

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
      // 登录成功后导航回主界面
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        '登录失败',
        error instanceof Error ? error.message : '未知错误'
      );
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
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="#666"
                    style={styles.inputIcon}
                  />
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
                      <Ionicons
                        name="key-outline"
                        size={20}
                        color="#666"
                        style={styles.inputIcon}
                      />
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
                      style={[
                        styles.button,
                        isLoading && styles.buttonDisabled,
                      ]}
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

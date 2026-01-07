import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop, Circle, Ellipse} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

interface LogoIconProps {
  size?: number;
}

export const LogoIcon = ({size = 80}: LogoIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor="#C084FC" />
        <Stop offset="50%" stopColor="#8B5CF6" />
        <Stop offset="100%" stopColor="#6D28D9" />
      </LinearGradient>
    </Defs>
    <Path
      d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z"
      fill="url(#shieldGradient)"
    />
    <Circle cx="50" cy="38" r="12" fill="white" />
    <Ellipse cx="50" cy="60" rx="18" ry="10" fill="white" />
    <Path
      d="M38 70 L46 78 L62 62"
      stroke="#8B5CF6"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

interface EyeIconProps extends IconProps {
  visible?: boolean;
}

export const MailIcon = ({size = 20, color = '#9CA3AF'}: IconProps) => (
  <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: size * 0.9,
        height: size * 0.65,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: size * 0.4,
          borderRightWidth: size * 0.4,
          borderTopWidth: size * 0.3,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: color,
          marginTop: -1,
        }}
      />
    </View>
  </View>
);

export const LockIcon = ({size = 20, color = '#9CA3AF'}: IconProps) => (
  <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: size * 0.5,
        height: size * 0.35,
        borderWidth: 1.5,
        borderColor: color,
        borderTopLeftRadius: size * 0.25,
        borderTopRightRadius: size * 0.25,
        borderBottomWidth: 0,
        marginBottom: -1,
      }}
    />
    <View
      style={{
        width: size * 0.7,
        height: size * 0.5,
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
  </View>
);

export const UserIcon = ({size = 20, color = '#9CA3AF'}: IconProps) => (
  <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: size * 0.4,
        height: size * 0.4,
        borderRadius: size * 0.2,
        backgroundColor: color,
        marginBottom: size * 0.05,
      }}
    />
    <View
      style={{
        width: size * 0.7,
        height: size * 0.35,
        backgroundColor: color,
        borderTopLeftRadius: size * 0.35,
        borderTopRightRadius: size * 0.35,
      }}
    />
  </View>
);

export const EyeIcon = ({size = 20, color = '#667EEA', visible = true}: EyeIconProps) => (
  <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: size * 0.9,
        height: size * 0.5,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: size * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: size * 0.15,
          backgroundColor: color,
        }}
      />
    </View>
    {!visible && (
      <View
        style={{
          position: 'absolute',
          width: size * 1.1,
          height: 1.5,
          backgroundColor: color,
          transform: [{rotate: '-45deg'}],
        }}
      />
    )}
  </View>
);

export const CheckIcon = ({size = 20, color = '#22C55E'}: IconProps) => (
  <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: size * 0.5,
        height: size * 0.25,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{rotate: '-45deg'}],
        marginTop: -size * 0.1,
      }}
    />
  </View>
);

export const LogoutIcon = ({size = 20, color = '#FFFFFF'}: IconProps) => (
  <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        width: size * 0.6,
        height: size * 0.7,
        borderWidth: 1.5,
        borderColor: color,
        borderRightWidth: 0,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
      }}
    />
    <View
      style={{
        position: 'absolute',
        right: size * 0.1,
        width: size * 0.5,
        height: 1.5,
        backgroundColor: color,
      }}
    />
    <View
      style={{
        position: 'absolute',
        right: size * 0.1,
        width: 0,
        height: 0,
        borderTopWidth: size * 0.15,
        borderBottomWidth: size * 0.15,
        borderLeftWidth: size * 0.2,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: color,
      }}
    />
  </View>
);

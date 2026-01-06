import React from 'react';
import {View} from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
}

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

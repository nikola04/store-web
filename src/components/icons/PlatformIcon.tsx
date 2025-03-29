import linux from '../../assets/linux.png';
import apple from '../../assets/apple.png';
import gconsole from '../../assets/gamingconsole.png';
import android from '../../assets/android.png';
import windows from '../../assets/windows.png';
import smarttv from '../../assets/smarttv.png';
import { JSX, PropsWithoutRef } from 'react';

export type PlatformType = 'mac'|'windows'|'linux'|'android'|'gconsole'|'smarttv'
export default function PlatformIcon({ platform, ...props }: {
    platform: PlatformType
} & PropsWithoutRef<JSX.IntrinsicElements['img']>){
    if(platform === 'mac')
        return <img src={apple} {...props} width={28} height={28} />;
    if(platform === 'android')
        return <img src={android} {...props} width={26} height={26} />;
    if(platform === 'gconsole')
        return <img src={gconsole} {...props} width={24} height={24} />;
    if(platform === 'linux')
        return <img src={linux} {...props} width={24} height={24} />;
    if(platform === 'windows')
        return <img src={windows} {...props} width={22} height={22} />
    if(platform === 'smarttv')
        return <img src={smarttv} {...props} width={24} height={24} />
}

import React from 'react'
import { Avatar } from '../Avatar'

export default {
  title: 'Components / Avatar',
  component: Avatar,
}

export const Default = () => <Avatar />
export const Color_1 = () => <Avatar firstName='Never Gonna' lastName='Give You Up' />
export const Color_2 = () => <Avatar firstName='Coleton' lastName='Annett' />
export const Color_3 = () => <Avatar firstName='Johan' lastName='Venter' />
export const Color_4 = () => <Avatar firstName='Kutay' lastName='Cinar' />
export const Color_5 = () => <Avatar firstName='Logan' lastName='Volkers' />
export const Color_6 = () => <Avatar firstName='Amy' lastName='Santiago' />
export const Default_Full = () => <Avatar full />
export const Color_1_Full = () => <Avatar firstName='Never Gonna' lastName='Give You Up' full />
export const Color_2_Full = () => <Avatar firstName='Coleton' lastName='Annett' full />
export const Color_3_Full = () => <Avatar firstName='Johan' lastName='Venter' full />
export const Color_4_Full = () => <Avatar firstName='Kutay' lastName='Cinar' full />
export const Color_5_Full = () => <Avatar firstName='Logan' lastName='Volkers' full />
export const Color_6_Full = () => <Avatar firstName='Amy' lastName='Santiago' full />
export const FirstNameOnly = () => <Avatar firstName='Shirley' />
export const FirstNameOnlyFull = () => <Avatar firstName='Shirley' full />
export const LastNameOnly = () => <Avatar lastName='Lam' />
export const LastNameOnlyFull = () => <Avatar lastName='Lam' full />

import { LikeButton } from './LikeButton';
import { Card, Image } from '../styles/styledComponenets';
import React from 'react';
import { CardProps } from '../../models/propsTypes';

export const KittenCard = ({ item }: CardProps) => {
  return(
    <Card>
      <Image src={item?.url} />
      <LikeButton item={item} />
    </Card>
  );
};

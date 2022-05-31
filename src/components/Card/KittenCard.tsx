import { LikeButton } from './LikeButton';
import { Card, Image } from '../styles/styledComponenets';
import React from 'react';
import { CardProps } from '../../models/propsTypes';

export const KittenCard = ({ item, innerRef }: CardProps) => {
  return(
    <Card ref={innerRef}>
      <Image src={item?.url} />
      <LikeButton item={item} />
    </Card>
  );
};

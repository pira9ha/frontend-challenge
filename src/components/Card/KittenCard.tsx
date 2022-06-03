import { LikeButton } from './LikeButton';
import { Card, CardWrapper, CardWrapperFirstChild, Image } from '../styled/styledComponents';
import React from 'react';
import { CardProps } from '../../models/propsTypes';

export const KittenCard = ({ item, innerRef }: CardProps) => {
  return(
    <CardWrapper>
      <CardWrapperFirstChild>
    <Card ref={innerRef}>
      <LikeButton item={item} />
      <Image src={item?.url} />
    </Card>
      </CardWrapperFirstChild>
    </CardWrapper>
  );
};

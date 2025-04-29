import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 9999px;
  padding: 0.2rem 0.6rem;
  margin-left: 0.5rem;
  background-color: #fff;
`;

const LeftLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  color: #333;
`;

const Divider = styled.div<{ isOriginal?: boolean }>`
  width: 5px;
  height: 1.2rem;
  background-color: ${({ isOriginal }) => (isOriginal ? '#00AA5B' : '#4771EC')};
  margin: 0 0.3rem;
  border-radius: 9999px;
`;

const RightLabel = styled.span`
  font-size: 0.7rem;
  color: #333;
  /* 고정 폭 및 줄바꿈 방지 */
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
`;

const Arrow = styled.span`
  font-size: 1rem;
  color: #666;
  margin-left: 0.5rem;
  cursor: pointer;
`;

interface EventToggleProps {
  leftLabel: string;
  rightLabel: string;
  onClickArrow?: () => void;
  isOriginal?: boolean;
}

const EventToggle: React.FC<EventToggleProps> = ({
  leftLabel,
  rightLabel,
  onClickArrow,
  isOriginal,
}) => {
  // rightLabel이 15글자 초과 시 잘라서 ... 추가
  const truncatedRight =
    rightLabel.length > 15 ? `${rightLabel.slice(0, 8)}...` : rightLabel;

  return (
    <ToggleContainer>
      <LeftLabel>{leftLabel}</LeftLabel>
      <Divider isOriginal={isOriginal} />
      <RightLabel title={rightLabel}>{truncatedRight}</RightLabel>
      <Arrow onClick={onClickArrow}>{'>'}</Arrow>
    </ToggleContainer>
  );
};

export default EventToggle;

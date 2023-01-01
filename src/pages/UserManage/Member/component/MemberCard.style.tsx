import { Position as PositionType } from 'model/member.model';
import styled from 'styled-components';

export const Card = styled.button`
  background: #FFFFFF;
  appearance: none;
  border: none;

  width: 260px;
  height: auto;
  position: relative;
  margin-top: 72px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 13%), 0 1px 6px -1px rgb(0 0 0 / 11%), 0 2px 4px 0 rgb(0 0 0 / 11%);
  display: flex;
  flex-direction: column;
  padding: 40px 22px 34px;
  border-radius: 8px;
  transition: 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 26%), 0 2px 8px -1px rgb(0 0 0 / 22%), 0 4px 8px 0 rgb(0 0 0 / 22%);
  }
`;

export const ProfileCover = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ProfileImg = styled.img<{ position: PositionType }>`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background: black;
  position: absolute;
  top: -36px;
  right: 6px;

  border-width: 3px;
  border-style: solid;
  border-color: ${({ position }) => (position === 'Mentor' ? '#795cf2' : '#1abc9c')};
`;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 26px;
  line-height: 1;
`;

export const Position = styled.div<{ position: PositionType }>`
  font-size: 18px;
  font-family: 'AppleSDGothicNeoB00';
  text-transform: uppercase;
  align-self: flex-start;
  letter-spacing: -.39px;

  color: ${({ position }) => (position === 'Mentor' ? '#795cf2' : '#1abc9c')};
`;

export const Label = styled.div`
  font-family: 'AppleSDGothicNeoB00';
  letter-spacing: -.39px;
  font-size: 18px;
  color: #656565;
  margin-top: 16px;
  line-height: 1;
`;

export const StudentNumberLabel = styled(Label)`
  margin-top: 32px;
`;

export const Description = styled.div`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: -.7px;
`;

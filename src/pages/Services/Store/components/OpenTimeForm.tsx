/* eslint-disable no-restricted-imports */
import { Divider, Select, TimePicker } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { StoreOpen } from 'model/store.model';
import { useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import dayjs from 'dayjs';
import * as S from '../StoreDetail.style';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

function OpenTimeForm({ form } : { form: FormInstance }) {
  const openTimeInfo: StoreOpen[] = form.getFieldValue('open');
  const [selectType, setSelectType] = useState('직접 지정');

  return (
    <div>
      <Divider orientation="left">오픈시간</Divider>

      <Select value={selectType} onChange={setSelectType}>
        <Select.Option value="직접 지정">직접 지정</Select.Option>
        <Select.Option value="평일/휴일">평일/휴일</Select.Option>
        <Select.Option value="모든 요일">모든 요일</Select.Option>
      </Select>

      <S.OpenTimeTable>
        <S.OpenTimeRow>
          <S.OpenTableHead>구분</S.OpenTableHead>
          {openTimeInfo.map((info, index) => (
            <S.OpenTableHead key={info.day_of_week}>{DAYS[index]}</S.OpenTableHead>
          ))}
        </S.OpenTimeRow>
        <S.OpenTimeRow>
          <S.OpenTimeColHead>휴무 여부</S.OpenTimeColHead>
          {openTimeInfo.map((info, index) => (
            <S.TableData key={info.day_of_week}>
              <CustomForm.Checkbox name={['open', index, 'closed']} />
            </S.TableData>
          ))}
        </S.OpenTimeRow>
        <S.OpenTimeRow>
          <S.OpenTimeColHead>오픈 시간</S.OpenTimeColHead>
          {openTimeInfo.map((info) => (
            <S.TableData key={info.day_of_week}>
              <TimePicker minuteStep={10} format="HH:mm" defaultValue={dayjs(info.open_time, 'HH:mm')} />
            </S.TableData>
          ))}
        </S.OpenTimeRow>
        <S.OpenTimeRow>
          <S.OpenTimeColHead>마감 시간</S.OpenTimeColHead>
          {openTimeInfo.map((info) => (
            <S.TableData key={info.day_of_week}>
              {info.closed ? '-' : info.close_time}
            </S.TableData>
          ))}
        </S.OpenTimeRow>
      </S.OpenTimeTable>
    </div>
  );
}

export default OpenTimeForm;

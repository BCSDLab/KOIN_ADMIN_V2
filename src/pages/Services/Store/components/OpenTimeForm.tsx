/* eslint-disable no-restricted-imports */
import { Divider, Select, TimePicker } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { StoreOpen } from 'model/store.model';
import { useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import * as S from '../StoreDetail.style';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TABLE_TYPES = {
  '직접 지정': {
    dateList: [0, 1, 2, 3, 4, 5, 6],
    colSize: [1, 1, 1, 1, 1, 1, 1],
  },
  '평일/휴일': {
    dateList: [0, 5],
    colSize: [5, 2],
  },
  '모든 요일': {
    dateList: [0],
    colSize: [7],
  },
};

dayjs.extend(customParseFormat);

function OpenTimeForm({ form } : { form: FormInstance | any }) {
  const openTimeInfo: StoreOpen[] = form.getFieldValue('open');
  const [selectType, setSelectType] = useState<keyof typeof TABLE_TYPES>('직접 지정');
  const handleTimeFormChange = (index: number, key: keyof StoreOpen, value: string | string[]) => {
    const selected = TABLE_TYPES[selectType];
    for (let i = 0; i < selected.colSize[index]; i += 1) {
      form.setFieldValue(['open', selected.dateList[index] + i, key], value);
    }
  };

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
          {openTimeInfo?.map((info, index) => (
            <S.OpenTableHead key={info.day_of_week}>{DAYS[index]}</S.OpenTableHead>
          ))}
        </S.OpenTimeRow>

        <S.OpenTimeRow>
          <S.OpenTimeColHead>휴무 여부</S.OpenTimeColHead>
          {openTimeInfo?.map((info, index) => (
            <S.TableData key={info.day_of_week} colSize={1}>
              <CustomForm.Checkbox
                name={['open', index, 'closed']}
                onChange={(e) => form.setFieldValue(['open', index, 'closed'], e.target.checked)}
              />
            </S.TableData>
          ))}
        </S.OpenTimeRow>

        <S.OpenTimeRow>
          <S.OpenTimeColHead>오픈 시간</S.OpenTimeColHead>
          {TABLE_TYPES[selectType].dateList.map((date, index) => (
            <S.TableData key={date} colSize={TABLE_TYPES[selectType].colSize[index]}>
              <TimePicker
                minuteStep={10}
                format="HH:mm"
                // Antd의 TimePicker, DatePicker등 시간 관련 값은 dayjs 객체를 받아야 한다.
                // 첫번째 인자는 dayjs 객체지만, 2번째 인자는 단순 문자열이므로 2번째 인자로만 폼 데이터를 핸들링한다.
                // closed(휴무 여부)가 true일 경우, API Response상으로 open_time과 close_time을 null로 설정된다.
                defaultValue={dayjs(openTimeInfo[date].open_time ?? '00:00', 'HH:mm')}
                onChange={(e, dateString) => handleTimeFormChange(index, 'open_time', dateString)}
              />
            </S.TableData>
          ))}
        </S.OpenTimeRow>

        <S.OpenTimeRow>
          <S.OpenTimeColHead>마감 시간</S.OpenTimeColHead>
          {TABLE_TYPES[selectType]?.dateList?.map((date, index) => (
            <S.TableData key={date} colSize={TABLE_TYPES[selectType].colSize[index]}>
              <TimePicker
                minuteStep={10}
                format="HH:mm"
                defaultValue={dayjs(openTimeInfo[date].close_time ?? '00:00', 'HH:mm')}
                onChange={(e, dateString) => handleTimeFormChange(index, 'close_time', dateString)}
              />
            </S.TableData>
          ))}
        </S.OpenTimeRow>
      </S.OpenTimeTable>
    </div>
  );
}

export default OpenTimeForm;

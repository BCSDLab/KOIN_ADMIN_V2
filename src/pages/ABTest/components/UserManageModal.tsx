import { Input, Button } from 'antd';
import CustomTable from 'components/common/CustomTable';
import { ABTestUserMoveRequest } from 'model/abTest.model';
import { useState } from 'react';
import { useGetUserByIDQuery, useGetUserByNameQuery } from 'store/api/abtest';
import useABTestMutation from './hook/useABTestMutation';
//  import useDebounce from 'utils/hooks/debouce';

interface UserManageModalProps {
  ABTestId: string
}
function UserManageModal({ ABTestId }: UserManageModalProps) {
  const { moveUser } = useABTestMutation();
  const [page, setPage] = useState(1);
  const [name, setName] = useState<string>('');
  const [userId, setUserId] = useState<number>();
  const [deviceId, setDeviceId] = useState<number>();
  const [step, setStep] = useState<number>(1);
  // eslint-disable-next-line max-len
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, func : React.Dispatch<React.SetStateAction<string>>) => {
    func(e.target.value);
  };

  // const debounceInput = useDebounce(handleInput, 1);
  // const [selectedUser, setSelectedUser] = useState<any>(null);
  // const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [experimentGroup, setExperimentGroup] = useState<string>('');
  const { data: userData } = useGetUserByNameQuery(name);
  const { data: deviceData } = useGetUserByIDQuery(userId, {
    skip: !userId,
  });
  // const handleUserSelect = (id: string ) => {
  //   useGetUserByIDQuery(id);
  //   setStep(2);
  // };

  // const handleDeviceSelect = (record: any) => {
  //   setSelectedDevice(record);
  //   setStep(3);
  // };
  const handleFinish = (data:ABTestUserMoveRequest) => {
    moveUser(data);
  };

  const handleUserID = (id: number) => {
    setUserId(id);
    setStep(2);
  };

  const handleDeviceId = (id:number) => {
    setDeviceId(id);
    setStep(3);
  };
  const renderContent = () => {
    if (step === 1) {
      return (
        <>
          <h3>사용자 선택</h3>
          <Input value={name} onChange={(e) => handleInput(e, setName)} />
          {userData && (
          <CustomTable
            onClick={handleUserID}
            data={userData.users}
            pagination={{
              current: page,
              onChange: setPage,
              total: userData.users.length / 10,
            }}
            columnSize={[10, 15, 40, 20, 15]}
            hiddenColumns={['id']}
          />
          )}

        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <h3>디바이스 선택</h3>
          {deviceData && (
          <CustomTable
            onClick={handleDeviceId}
            data={deviceData.devices}
            pagination={{
              current: page,
              onChange: setPage,
              total: deviceData.devices.length,
            }}
            columnSize={[10, 15, 40, 20, 15]}
            hiddenColumns={['id']}
          />
          )}
        </>
      );
    }
    if (step === 3) {
      return (
        <>
          <h3>실험군 입력</h3>
          <Input
            placeholder="실험군 이름을 입력해주세요"
            value={experimentGroup}
            onChange={(e) => setExperimentGroup(e.target.value)}
          />
        </>
      );
    }
    return null;
  };

  return (
    <>
      {renderContent()}
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        {step > 1 && (
          <Button onClick={() => setStep(step - 1)} style={{ marginRight: 8 }}>
            이전
          </Button>
        )}
        <Button
          type="primary"
          onClick={() => {
            if (step === 3 && deviceId) {
              handleFinish({
                id: Number(ABTestId),
                data: {
                  device_id: deviceId,
                  variable_name: experimentGroup,
                },
              });
            } else {
              setStep(step + 1);
            }
          }}
        >
          {step === 3 ? '완료' : '다음'}
        </Button>
      </div>
    </>
  );
}

export default UserManageModal;

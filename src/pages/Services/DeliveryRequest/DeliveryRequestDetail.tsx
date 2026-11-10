import { useParams } from 'react-router-dom';
import { Divider, Tag, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import DetailHeading from 'components/common/DetailHeading';
import CustomForm from 'components/common/CustomForm';
import deliveryRequestQueries from 'queryFactory/deliveryRequestQueries';
import type { DeliveryRequestDetail as DeliveryRequestDetailType } from 'model/deliveryRequest.model';
import { toDateStringFormat } from 'utils/ts/date';
import useDeliveryRequestMutation from './useDeliveryRequestMutation';
import MenuTable from './components/MenuTable';
import { DELIVERY_OPTION_LABEL, STATUS_TAG, formatPrice } from './constant';
import * as S from './DeliveryRequestDetail.style';

const toFormValues = (request: DeliveryRequestDetailType) => ({
  id: request.id,
  shop_id: request.shop_id,
  shop_name: request.shop_name,
  created_at: toDateStringFormat(request.created_at),
  approved_at: request.approved_at ? toDateStringFormat(request.approved_at) : '-',
  minimum_order_amount: formatPrice(request.minimum_order_amount),
  is_takeout: request.is_takeout ? '가능' : '불가능',
  delivery_option: DELIVERY_OPTION_LABEL[request.delivery_option],
  campus_delivery_tip: formatPrice(request.campus_delivery_tip),
  off_campus_delivery_tip: formatPrice(request.off_campus_delivery_tip),
  bank: request.bank,
  account_number: request.account_number,
  account_holder: request.account_holder ?? '-',
  rejection_reason: request.rejection_reason ?? '',
});

export default function DeliveryRequestDetail() {
  const { id } = useParams();
  const { data: request } = useQuery(deliveryRequestQueries.deliveryRequest(Number(id)));
  const { processMutation } = useDeliveryRequestMutation(Number(id));
  const [form] = CustomForm.useForm();

  if (!request) return null;

  const isPending = request.request_status === 'PENDING';
  const hasMenus = (request.menus?.length ?? 0) > 0;
  const canApprove = isPending && hasMenus && !!request.account_holder;

  const handleApprove = () => {
    processMutation.mutate({ process_type: 'APPROVE' });
  };

  const handleReject = async () => {
    try {
      const { rejection_reason: rejectionReason } = await form.validateFields(['rejection_reason']);
      processMutation.mutate({ process_type: 'REJECT', rejection_reason: rejectionReason.trim() });
    } catch {
      // 검증 실패 메시지는 폼 필드 아래에 표시된다.
    }
  };

  return (
    <S.Wrap>
      <DetailHeading>Delivery Request Detail</DetailHeading>
      <S.BreadCrumb>
        {`Delivery Request Management / Delivery Request Detail / ${request.shop_name}`}
      </S.BreadCrumb>
      <S.FormWrap>
        <CustomForm form={form} initialValues={toFormValues(request)}>
          <Divider orientation="left">기본 정보</Divider>
          <S.StatusWrap>
            <Tag color={STATUS_TAG[request.request_status].color}>
              {STATUS_TAG[request.request_status].label}
            </Tag>
          </S.StatusWrap>
          <CustomForm.GridRow gridColumns="1fr 1fr">
            <CustomForm.Input label="id" name="id" disabled />
            <CustomForm.Input label="상점 ID" name="shop_id" disabled />
            <CustomForm.Input label="요청일" name="created_at" disabled />
            <CustomForm.Input label="승인일" name="approved_at" disabled />
          </CustomForm.GridRow>
          <CustomForm.Input label="상점명" name="shop_name" disabled />

          <Divider orientation="left">배달 정보</Divider>
          <CustomForm.GridRow gridColumns="1fr 1fr">
            <CustomForm.Input label="최소 주문 금액" name="minimum_order_amount" disabled />
            <CustomForm.Input label="포장 여부" name="is_takeout" disabled />
            <CustomForm.Input label="배달 옵션" name="delivery_option" disabled />
            <CustomForm.Input label="교내 배달비" name="campus_delivery_tip" disabled />
            {request.delivery_option !== 'CAMPUS' && (
              <CustomForm.Input label="교외 배달비" name="off_campus_delivery_tip" disabled />
            )}
          </CustomForm.GridRow>

          <Divider orientation="left">계좌 정보</Divider>
          <CustomForm.GridRow gridColumns="1fr 1fr">
            <CustomForm.Input label="은행" name="bank" disabled />
            <CustomForm.Input label="예금주" name="account_holder" disabled />
          </CustomForm.GridRow>
          <CustomForm.Input label="계좌번호" name="account_number" disabled />

          <Divider orientation="left">제출 서류</Divider>
          <S.SectionWrap>
            <S.DocumentList>
              <Typography.Link href={request.business_license_url} target="_blank">
                사업자등록증
              </Typography.Link>
              <Typography.Link href={request.business_certificate_url} target="_blank">
                사업자등록 증명서
              </Typography.Link>
              <Typography.Link href={request.bank_copy_url} target="_blank">
                통장 사본
              </Typography.Link>
            </S.DocumentList>
          </S.SectionWrap>

          <Divider orientation="left">이관 메뉴 리스트</Divider>
          <S.SectionWrap>
            <MenuTable menus={request.menus ?? []} />
          </S.SectionWrap>

          <Divider orientation="left">심사</Divider>
          {isPending && !canApprove && (
            <S.Notice>이관 메뉴와 예금주가 있는 신청만 승인할 수 있습니다.</S.Notice>
          )}
          <CustomForm.TextArea
            label="반려 사유"
            name="rejection_reason"
            rules={[
              { required: true, whitespace: true, message: '미승인 시 반려 사유를 입력해주세요.' },
              { max: 500, message: '반려 사유는 500자 이하로 입력해주세요.' },
            ]}
            placeholder="미승인 시 사장님께 전달할 반려 사유를 입력해주세요."
            autoSize={{ minRows: 3 }}
            showCount
            maxLength={500}
            disabled={!isPending}
          />

          <S.ButtonWrap>
            <CustomForm.Button
              icon={<CheckOutlined />}
              onClick={handleApprove}
              disabled={!canApprove || processMutation.isPending}
            >
              승인
            </CustomForm.Button>
            <CustomForm.Button
              danger
              icon={<CloseOutlined />}
              onClick={handleReject}
              disabled={!isPending || processMutation.isPending}
            >
              미승인
            </CustomForm.Button>
          </S.ButtonWrap>
        </CustomForm>
      </S.FormWrap>
    </S.Wrap>
  );
}

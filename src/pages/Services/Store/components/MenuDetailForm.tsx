import CustomProForm from 'components/common/CustomProForm';
import { Divider, FormInstance } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { UploadOutlined } from '@ant-design/icons';
import * as S from './StoreMenus.style';

export default function MenuDetailForm({ form }: { form: FormInstance }) {
  return (
    <>
      <S.ProFormTextDetailWrap>
        <CustomProForm.Text placeholder="메뉴 이름" width="md" name="name" key="name" />
        <CustomProForm.Text placeholder="단일 메뉴 가격" width="xs" name="single_price" key="single_price" />
        <S.CardsWrap>
          <S.TextsWrap>
            <CustomProForm.List
              name="option_prices"
              creatorButtonProps={{ creatorButtonText: '사이즈 추가', style: { width: 'xs' } }}
              min={1}
              deleteIconProps={{ tooltipText: '사이즈 삭제' }}
              copyIconProps={false}
                  // eslint-disable-next-line react/no-unstable-nested-components
              itemRender={({ listDom, action }) => (
                <S.MenuSizeItemsWrap>
                  {listDom}
                  <S.ResetMenuSizeButtonWrap>
                    {action}
                  </S.ResetMenuSizeButtonWrap>
                </S.MenuSizeItemsWrap>
              )}
            >
              <S.TextWrap>
                <CustomProForm.Text
                  placeholder="옵션"
                  width="xs"
                  name={['option']}
                  disabled={false}
                />
                <CustomProForm.Text
                  placeholder="가격"
                  width="md"
                  name={['price']}
                  disabled={false}
                />
              </S.TextWrap>
            </CustomProForm.List>
          </S.TextsWrap>
        </S.CardsWrap>
        <CustomProForm.Text placeholder="설명" width="xs" name="description" key="description" />
      </S.ProFormTextDetailWrap>
      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.MultipleUpload domain="shops" name="image_urls" form={form} />
      </S.UploadWrap>
      <S.SubmitButtonWrap>
        <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
          완료
        </CustomForm.Button>
      </S.SubmitButtonWrap>
    </>
  );
}

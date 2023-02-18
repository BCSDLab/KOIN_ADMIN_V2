export default function useValidate() {
  const required = () => ({ required: true, message: '필수 항목입니다' });

  const max = (maxLength: number) => ({ max: maxLength, message: `최대 ${maxLength}자 이내로 입력해주세요` });

  const min = (minLength: number) => ({ min: minLength, message: `최소 ${minLength}자 이내로 입력해주세요` });

  const pattern = (RegExp: RegExp, message: string) => ({ pattern: RegExp, message });

  return {
    required, max, min, pattern,
  };
}

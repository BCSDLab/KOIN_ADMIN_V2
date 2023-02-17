export default function useValidate() {
  const Required = () => {
    return { required: true, message: '필수 항목입니다' };
  };

  const Max = (maxLength: number) => {
    return { max: maxLength, message: `최대 ${maxLength}자 이내로 입력해주세요` };
  };

  const Min = (minLength: number) => {
    return { min: minLength, message: `최소 ${minLength}자 이내로 입력해주세요` };
  };

  const Pattern = (pattern: RegExp, message: string) => {
    return { pattern, message };
  };

  return {
    Required, Max, Min, Pattern,
  };
}

export default function useValidate() {
  const Required = () => {
    return { required: true, message: '필수 항목입니다' };
  };

  const Max = (maxNum: number) => {
    return { max: maxNum, message: `최대 ${maxNum}자 이내로 입력해주세요` };
  };

  const Min = (minNum: number) => {
    return { min: minNum, message: `최소 ${minNum}자 이내로 입력해주세요` };
  };

  const Pattern = (pattern: RegExp, message: string) => {
    return { pattern, message };
  };

  return {
    Required, Max, Min, Pattern,
  };
}

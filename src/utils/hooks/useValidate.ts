export default function useValidate() {
  const Required = (name: string) => {
    return { required: true, message: `${name}은 필수입니다` };
  };

  const Max = (number: number) => {
    return { max: number, message: `최대 ${number}자 이내로 입력해주세요` };
  };

  const Min = (number: number) => {
    return { min: number, message: `최소 ${number}자 이내로 입력해주세요` };
  };

  const Pattern = (pattern: RegExp, message: string) => {
    return { pattern, message };
  };

  return {
    Required, Max, Min, Pattern,
  };
}

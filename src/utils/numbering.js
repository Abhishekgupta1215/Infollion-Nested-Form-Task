export const getQuestionNumber = (path) => {
  return `Q${path.join(".")}`;
};
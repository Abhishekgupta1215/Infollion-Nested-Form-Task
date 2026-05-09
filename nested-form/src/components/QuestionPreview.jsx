import { getQuestionNumber } from "../utils/numbering"

const QuestionPreview = ({ questions, path = [] }) => {
  return (
    <div className="space-y-4">
      {questions.map((q, index) => {
        const currentPath = [...path, index + 1]

        return (
          <div
            key={q.id}
            className="ml-4 border-l-2 border-green-300 pl-4"
          >
            <div className="bg-green-50 rounded-xl p-3">
              <p className="font-semibold text-gray-800">
                {getQuestionNumber(currentPath)}
              </p>

              <p className="mt-1 text-gray-700">
                {q.text}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Type: {q.type === "short" ? "Short Answer" : "True / False"}
              </p>

              {q.type === "boolean" && q.answer && (
                <p className="text-sm text-gray-500 mt-1">
                  Answer: {q.answer === "true" ? "True" : "False"}
                </p>
              )}
            </div>

            {q.children.length > 0 && (
              <QuestionPreview
                questions={q.children}
                path={currentPath}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default QuestionPreview
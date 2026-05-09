import { Plus, Trash2 } from "lucide-react"

import QuestionCard from "./QuestionCard"
import { getQuestionNumber } from "../utils/numbering"

const QuestionItem = ({
  question,
  path,
  onChange,
  onDelete,
  onAddChild,
}) => {
  const number = getQuestionNumber(path)

  return (
    <div className="ml-4 mt-4 border-l-4 border-blue-300 pl-4">
      <QuestionCard>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-blue-700">
              {number}
            </h2>

            <button
              onClick={() => onDelete(question.id)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter your question"
            value={question.text}
            onChange={(e) =>
              onChange(question.id, "text", e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={question.type}
            onChange={(e) =>
              onChange(question.id, "type", e.target.value)
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="short">Short Answer</option>
            <option value="boolean">True / False</option>
          </select>

          {question.type === "boolean" && (
            <select
              value={question.answer}
              onChange={(e) =>
                onChange(question.id, "answer", e.target.value)
              }
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Answer</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          )}

          {question.type === "boolean" && question.answer === "true" && (
            <button
              onClick={() => onAddChild(question.id)}
              className="w-fit flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >
              <Plus size={16} />
              Add Child Question
            </button>
          )}
        </div>
      </QuestionCard>

      {question.children.map((child, index) => (
        <QuestionItem
          key={child.id}
          question={child}
          path={[...path, index + 1]}
          onChange={onChange}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  )
}

export default QuestionItem
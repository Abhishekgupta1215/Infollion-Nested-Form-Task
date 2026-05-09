import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { PlusCircle, Send } from "lucide-react"

import QuestionItem from "./components/QuestionItem"
import QuestionPreview from "./components/QuestionPreview"

const createQuestion = () => ({
  id: uuidv4(),
  text: "",
  type: "short",
  answer: "",
  children: [],
})

function App() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("nestedQuestions")
    return saved ? JSON.parse(saved) : []
  })

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      "nestedQuestions",
      JSON.stringify(questions)
    )
  }, [questions])

  const addQuestion = () => {
    setQuestions([...questions, createQuestion()])
  }

  const updateQuestion = (id, field, value) => {
    const updateRecursive = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          if (field === "type") {
            return {
              ...item,
              type: value,
              answer: value === "boolean" ? item.answer : "",
              children: value === "boolean" ? item.children : [],
            }
          }

          if (field === "answer") {
            return {
              ...item,
              answer: value,
              children: value === "true" ? item.children : [],
            }
          }

          return {
            ...item,
            [field]: value,
          }
        }

        return {
          ...item,
          children: updateRecursive(item.children),
        }
      })
    }

    setQuestions(updateRecursive(questions))
  }

  const deleteQuestion = (id) => {
    const deleteRecursive = (items) => {
      return items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: deleteRecursive(item.children),
        }))
    }

    setQuestions(deleteRecursive(questions))
  }

  const addChildQuestion = (id) => {
    const addRecursive = (items) => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            children: [
              ...item.children,
              createQuestion(),
            ],
          }
        }

        return {
          ...item,
          children: addRecursive(item.children),
        }
      })
    }

    setQuestions(addRecursive(questions))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  // DRAG DROP
  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(questions)

    const [reorderedItem] = items.splice(result.source.index, 1)

    items.splice(result.destination.index, 0, reorderedItem)

    setQuestions(items)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Nested Dynamic Form
            </h1>

            <button
              onClick={addQuestion}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition"
            >
              <PlusCircle size={20} />
              Add New Question
            </button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {questions.map((question, index) => (
                    <Draggable
                      key={question.id}
                      draggableId={question.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <QuestionItem
                            question={question}
                            path={[index + 1]}
                            onChange={updateQuestion}
                            onDelete={deleteQuestion}
                            onAddChild={addChildQuestion}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {questions.length > 0 && (
            <button
              onClick={handleSubmit}
              className="mt-8 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl transition"
            >
              <Send size={18} />
              Submit Form
            </button>
          )}

          {submitted && (
            <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">
                Submitted Questions
              </h2>

              <QuestionPreview questions={questions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
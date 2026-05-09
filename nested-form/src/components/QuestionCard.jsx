const QuestionCard = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 mt-4">
      {children}
    </div>
  )
}

export default QuestionCard
const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
  xl: "h-16 w-16 border-4",
}

const Spinner = ({ size = "md", className = "" }) => {
  return (
    <div className={`spinner ${className}`}>
      <div className={`rounded-full border-t-transparent border-blue-600 animate-spin ${sizes[size]}`}></div>
    </div>
  )
}

export default Spinner

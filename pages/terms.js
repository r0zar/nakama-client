const Terms = () => {
  const text = `
    Let's keep it simple for now.
    Don't use handle.events for malicious activities
    please. Don't intententially try to crash the service. Disclose bugs
    professionally via Github. Thank you.
  `
  return (
    <div className="w-auto p-3 max-w-2xl m-auto my-64">
      <div className="flex flex-col justify-center pb-12 ">
        <h1 className="text-2xl my-4">Terms of Use</h1>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Terms

const Privacy = () => {
  const text = `
    Let's keep it simple for now.
    This app collects data to perform basic operations. 
    That's all it's used for. I barely even have analytics in this thing.
    I dispise the concept of selling data or running ads to pay for server costs.
    The goal is to scale this app purely based on usage and payments from end users.
    That way handle.events will always serve the customer first and foremost.

  `
  return (
    <div className="w-auto p-3 max-w-2xl m-auto my-64">
      <div className="flex flex-col justify-center pb-12 ">
        <h1 className="text-2xl my-4">Privacy Policy</h1>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Privacy

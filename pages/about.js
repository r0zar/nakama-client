const About = () => {
  const text1 = `
    Hi I'm Ross 👋
  `
  const text2 = `
    handle.events has a simple mission to make working with websockets more accessable.
  `
  const text3 = `
    Creating a persistant connection to a websocket host requires a server to run 24/7,
    so there arn't many serverless options to accomplish that goal. I looked for a no-code
    solution for this problem I didn't find out, so I made build it.
  `
  const text4 = `    
    Give handle.events a try and let me know what you think. 
    I'm working hard to add support for more websocket hosts and event handlers,
    so if you have any suggestions, I'd love to hear them!
  `
  const text5 = `
    Thank you!
  `
  return (
    <div className="w-auto p-3 max-w-2xl m-auto my-64">
      <div className="flex flex-col justify-center pb-12 ">
        <h1 className="text-2xl my-4">About</h1>
        <p className="text-lg">{text1}</p>
        <p className="font-fine">{text2}</p>
        <p className="font-fine">{text3}</p>
        <p className="font-fine">{text4}</p>
        <p>{text5}</p>
      </div>
    </div>
  )
}

export default About

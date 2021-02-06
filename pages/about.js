const About = () => {
  const text = `
    Hi I'm Ross 👋

    handle.events has a simple mission to make working with websockets more accessable.

    Creating a persistant connection to a websocket host requires a server to run 24/7,
    so there arn't many serverless options to accomplish that goal. I looked for a no-code
    solution for this problem I didn't find out, so I made build it. 
    
    Give handle.events a try and let me know what you think. 
    I'm working hard to add support for more websocket hosts and event handlers,
    so if you have any suggestions, I'd love to hear them!

    Thanks,
    Ross Ragsdale

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

export default About

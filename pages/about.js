const About = () => {
  const text1 = `
    Hi, I'm Ross 👋
  `
  const text2 = `
    handle.events has a simple mission to make working with web sockets more accessible.
  `
  const text3 = `
    Creating a persistent connection to a web socket host requires a server to run 24/7.
    I looked for a no-code solution for this problem I didn't find out, so I build one.
  `
  const text4 = `    
    Give handle.events a try and let me know what you think. 
    I'm working to more web socket hosts and event handlers. 
    If you have any suggestions, I'd love to hear them!
  `
  const text5 = `
    Thank you!
  `
  return (
    <div className="w-auto p-3 max-w-2xl m-auto my-64">
      <div className="flex flex-col justify-center pb-12 ">
        <h1 className="text-2xl my-4">About</h1>
        <p className="font-thin text-5xl my-4">{text1}</p>
        <p className="font-fine my-1">{text2}</p>
        <p className="font-fine my-1">{text3}</p>
        <p className="font-fine my-1">{text4}</p>
        <p className="font-thin text-lg my-1">{text5}</p>
      </div>
    </div>
  )
}

export default About

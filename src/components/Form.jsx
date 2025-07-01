import { useState } from "react";
export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
  let err= handleErrors();
  if(Object.keys(err).length>0){
    setError(err)
    return
  }
    
    alert(`Thanks ${name} for submitting the form`);
    setName("");
    setEmail("");
    setMessage("");
  }

  function handleErrors(){
    let errorMessages= {};
    if(!name){
        errorMessages.name="Name is Required"
    }
   return errorMessages;
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Name</legend>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="input"
          placeholder="Enter Your Name"
        />
        {error.name && <p className="label text-red-700">{error.name}</p>}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Email Address</legend>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="input"
          placeholder="Enter Your Email"
        />
        {error.email && (
          <p className="label text-red-600"></p>
        )}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend"></legend>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea h-24"
          placeholder="Write here"
        ></textarea>
        {error.message && (
          <p className="label text-red-600"></p>
        )}
      </fieldset>
      <button  type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

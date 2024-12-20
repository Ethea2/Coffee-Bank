"use client"

import { useEffect, useState } from "react"

const Login = () => {
  const [username, setUsername] = useState<String>("")
  const [password, setPassword] = useState<String>("")
  const [showme, setShowme] = useState<boolean>(false)

  useEffect(() => {
    console.log("Username: " + username)
    console.log("Password: " + password)
  }, [username, password])
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-96 shadow-xl border-2 border-secondary">
        <div className="card-body">
          <div className="my-5 w-full text-neutral font-bold text-2xl flex justify-center items-center">
            Welcome to Coffee Bank!
          </div>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="mb-2 input input-bordered w-full max-w-xs focus:border-primary" />
          <input type={showme ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="my-2 input input-bordered w-full max-w-xs focus:border-primary" />
          <button className="btn btn-secondary" onClick={() => {
            setShowme(!showme)
          }}>showme</button>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;

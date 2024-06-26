"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
const [formdata,setformdata]=useState({Name:"",Email:"",Password:""})
const [error,seterror]=useState(false)
const [errotext,seterrortext]=useState("")
const router= useRouter()
const handlechange=(e)=>{

  // the User shall not be able to visit the registeration or login page if the user is in the dashboard
//   const session= await getServerSession(authOptions);

// if(session) redirect ('/Userinfo')



  setformdata((data)=>({
    ...data,[e.target.name]:e.target.value
  }))
}



const Handlesubmit = async (e) => {
  e.preventDefault();
  const {Name,Email,Password}=formdata
  if (!Name || !Email || !Password) {
    seterrortext("All fields are necessary.");
    return;
  }

  try {
    const resUserExists = await fetch("api/UserExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email }),
    });

    const { user } = await resUserExists.json();

    if (user) {
      seterrortext("User already exists.");
      return;
    }

    const res = await fetch("api/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Email,
        Password,
      }),
    });

    if (res.ok) {
      const form = e.target;
      form.reset();
      router.push("/");
    } else {
      console.log("User registration failed.");
    }
  } catch (error) {
    console.log("Error during registration: ", error);
  }
};

console.log(process.env.MongoURL)

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0 mt-9">
   
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent" bis_skin_checked="1"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">Register</h3>

          </div>
          <div className="p-6 pt-0">
            <form onSubmit={Handlesubmit} >
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>
                      <div className="absolute right-3 translate-y-2 text-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <input onChange={handlechange} type="text" name="Name" placeholder="Username" autoComplete="off" className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                    </div>
                    <div className="flex items-center">
                      <input onChange={handlechange} type="email" name="Email" className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
                    </div>
                    <div className="flex items-center">
                      <input onChange={handlechange} type="password" name="Password" className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
             {error&& <p className="text-sm font-medium text-foreground underline text-red-900" >{errotext}</p>}
                <a className="text-sm font-medium text-foreground underline" href="/"> Click Here to Login</a>
              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">

                <button className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2" type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

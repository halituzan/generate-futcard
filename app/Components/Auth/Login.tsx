import React, { useState } from "react";
import TextInput from "../Patterns/TextInput";
import Button from "../Patterns/Buttons";
import { Icon } from "@iconify/react";
import Network from "@/helpers/Network";
import { useRouter } from "next/router";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const body = {
      userName,
      password,
    };
    try {
      await Network.postData("/api/auth/login", body);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between w-screen h-screen'>
      <div className='w-1/2 h-screen flex-1'></div>
      <div className='bg-white text-slate-dark border h-screen flex-1 flex flex-col justify-center items-center'>
        <div className='px-10 self-start'>
          <h2 className='mb-5 text-4xl font-bold flex items-center '>
            Generate Futcard
            <Icon icon='maki:soccer' className='text-blue-700' />
          </h2>
          <p className='text-lg mb-10 font-500 text-blue-700'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            odit modi deleniti repellendus!
          </p>
        </div>

        <TextInput
          set={userName}
          setter={setUserName}
          placeholder='Username'
          type='text'
          label='Username'
          className='px-10'
        />

        <TextInput
          set={password}
          setter={setPassword}
          placeholder='Password'
          type='password'
          label='Password'
          className='px-10'
        />

        <div className='px-10 w-full'>
          <Button
            onClick={loginHandler}
            text='Login'
            textColor='text-white'
            color='bg-blue-600'
            className='self-end mt-5 w-full'
            disabled={!userName || !password}
          />
        </div>
        <div className='px-10 mt-4 w-full flex justify-between items-center'>
          <p className='font-500'>Don't have an account?</p>
          <a
            href='/register'
            className='text-blue-500 font-700 hover:text-blue-800'
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
export default Login;

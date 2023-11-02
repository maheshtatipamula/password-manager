"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 32);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (special) str += `~!@#$%^&*()_+-=[]{}|;:'",.<>?/`;
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, numbers, special]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, special]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300 bg-gray-700">
        <h1 className="text-center py-2">Password Generator</h1>
        <div className="flex items-center">
          <input
            type="text"
            value={password}
            className="outline-none flex-grow py-1 px-3 my-2 h-10"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-blue-300 text-white px-3 py-0.5 h-10"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              className="cursor-pointer "
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbers}
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={special}
              onChange={() => {
                setSpecial((prev) => !prev);
              }}
            />
            <label>Special</label>
          </div>
        </div>
      </div>
    </>
  );
}

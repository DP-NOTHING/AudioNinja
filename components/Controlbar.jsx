"use client";
import {React,useState} from 'react'
import { Zoom } from "@/components/Zoom";
import { Fade } from "@/components/Fade";
import { Fadetype } from "@/components/Fadetype";
import { Trim } from "@/components/Trim";
import { Files } from "@/components/Files";

export const Controlbar = ({ee}) => {
    
  const [isplay, setIsplay] = useState(false);
  return (
    <div id="top-bar" className="playlist-top-bar">
    <div className="playlist-toolbar">
      <div className="btn-group">
        <button
          onClick={() => {
            if (isplay === true) {
              setIsplay(false);
              ee.emit("pause");
            } else {
              setIsplay(true);
              ee.emit("play");
            }
          }}
        >
          {isplay ? "pause" : "play"}
        </button>
      </div>
      <Zoom ee={ee} />
      <Fade ee={ee} />
      <Fadetype ee={ee} />
      <Trim ee={ee} />
      <Files ee={ee} />
    </div>
  </div>
  )
}

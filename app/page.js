"use client";
import React, { useCallback, useState, useRef } from "react";
import Script from "next/script";
import EventEmitter from "events";
import WaveformPlaylist from "waveform-playlist";
import { saveAs } from "file-saver";
import { Zoom } from "@/components/Zoom";
import { Fade } from "@/components/Fade";
import { Fadetype } from "@/components/Fadetype";
import { Trim } from "@/components/Trim";
import { Files } from "@/components/Files";

export default function Home() {
  const [ee] = useState(new EventEmitter());
  const [toneCtx, setToneCtx] = useState(null);
  const setUpChain = useRef();
  const [isplay, setIsplay] = useState(false);
  const [starttime, setStartTIme] = useState(0);
  const [endtime, setEndTime] = useState(0);
  const [time, setTime] = useState(0);
  const [selected, setSelected] = useState(false);

  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {
        const playlist = WaveformPlaylist(
          {
            ac: toneCtx.rawContext,
            samplesPerPixel: 512,
            mono: true,
            waveHeight: 100,
            container: node,
            state: "cursor",
            isContinuousPlay: false,
            timescale: true,
            colors: {
              waveOutlineColor: "rgba(218, 206, 246, 1)",
              timeColor: "black",
              fadeColor: "black",
            },
            controls: {
              show: false,
            },
            zoomLevels: [300, 500, 512, 1024, 2048, 4096],
          },
          ee
        );

        ee.on("audiorenderingstarting", function (offlineCtx, a) {
          // Set Tone offline to render effects properly.
          const offlineContext = new Tone.OfflineContext(offlineCtx);
          Tone.setContext(offlineContext);
          setUpChain.current = a;
        });

        ee.on("finished", () => {
          setIsplay(false);
        });

        ee.on("select", (time) => {
          setStartTIme(clockFormat(playlist.timeSelection.start));
          setEndTime(clockFormat(playlist.timeSelection.end));
        });

        ee.on("audiorenderingfinished", function (type, data) {
          //restore original ctx for further use.
          Tone.setContext(toneCtx);
          if (type === "wav") {
            saveAs(data, "test.wav");
          } else {
            let file = new File([data], "filename", {
              type: "application/octet-stream",
            });
            ee.emit("newtrack", {
              src: file,
              name: "new track",
              start: 0,
            });
          }
        });

        ee.on("log", () => {
          console.log(playlist);
        });

        ee.on("custom", () => {
          // console.log(playlist);
          playlist.tracks[0].cueIn = 0;
          playlist.tracks[0].startTime = 0;
          playlist.duration = playlist.tracks[0].duration;
          playlist.tracks[0].endTime = playlist.duration;
        });
        playlist.initExporter();
      }
    },
    [ee, toneCtx]
  );

  function clockFormat(seconds) {
    var hours, minutes, secs, result;
    hours = parseInt(seconds / 3600, 10) % 24;
    minutes = parseInt(seconds / 60, 10) % 60;
    secs = seconds % 60;
    secs = secs.toFixed(3);
    result =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (secs < 10 ? "0" + secs : secs);
    return result;
  }

  function handleLoad() {
    setToneCtx(Tone.getContext());
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.37/Tone.js"
        onLoad={handleLoad}
      />
      <main>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="hero-title">AUDIO NINJA </div>
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20activities/Ninja%20Light%20Skin%20Tone.png"
            width="60"
            alt="Ninja Light Skin Tone"
          />
        </div>
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
        <div ref={container} style={{marginLeft:"10vh",marginRight:"10vh"}}></div>

        {selected ? (
          <div style={{marginLeft:"10vh",marginRight:"10vh"}}> 
            <div>start : {starttime}</div>
            <div>end : {endtime}</div>
          </div>
        ) : (
          <div className="hero-title2">
            <div>Free editor to trim and cut any audio file online</div>
          </div>
        )}

        {/* <div>start : {starttime}</div>
        <div>end : {endtime}</div> */}
        <input
          type="file"
          id="file"
          name="file"
          accept="audio/*"
          onChange={(e) => {
            ee.emit("clear");
            setSelected(true);
            ee.emit("newtrack", e.target.files[0]);
          }}
        />
        {/* <button onClick={()=>{ee.emit("log");}}></button> */}
      </main>
    </>
  );
}

'use client'
import { useRef, useEffect, useState } from "react";
import useWindowListener from "@/hooks/useWindowListener";

export default function VlogPlayer( {vdoSrc, isPlaying} : {vdoSrc:string, isPlaying:boolean} ) {
    
    const vdoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // alert('width is ' + vdoRef.current?.videoWidth); 
        if(isPlaying) {
            // alert('Play VDO');
            vdoRef.current?.play();
        } else {
            // alert('Pause VDO')
            vdoRef.current?.pause();
        }
    }, [isPlaying])

    useWindowListener("resize", (e)=>{ alert('Window Width is ' + (e.target as Window).innerWidth) });

    return(
        <video className="w-[40%]" ref={vdoRef}
        src={vdoSrc} controls loop muted/>
    );
}
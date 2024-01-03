import { useState } from "react"
import { Footer } from "../src/components/general/Footer"
import { Header } from "../src/components/general/header"
import { RoomHome } from "../src/components/room/RoomHome"


export const RoomView = () => {
    
  

    return (
        <>
        <Header/>
        <RoomHome/>
        <Footer/>
        </>
 
    )
}
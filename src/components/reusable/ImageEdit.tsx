import React, { useState, useEffect } from 'react'
import "../../css/reusable/imageEdit.css"
import AvatarEditor from 'react-avatar-editor'
// import Marvin, {MarvinImage} from 'marvin-js'
// import Marvin from "./Marvin"

export default function ImageEdit({src, setProfilePhoto}: {src: any, setProfilePhoto: any}){
    const editor = React.createRef<AvatarEditor>()

    const [defStyle, setDef] = useState()
    useEffect(() => {
        setDef(document.querySelector(".left>canvas").getAttribute("style"))
    }, [defStyle, setDef])

    function headerClick(e){
        document.querySelectorAll("#editHeader>div").forEach(element => {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
        document.querySelectorAll("#editor>div").forEach(element => {
            element.classList.remove("editActive")
        })
        if(e.target.innerHTML === "Adjust"){
            document.getElementById("brightConst").classList.add("editActive")
            document.querySelector(".left>canvas").setAttribute("style", defStyle + "pointer-events: none;")
        }
        else{
            document.getElementById("crop").classList.add("editActive")
            document.querySelector(".left>canvas").setAttribute("style", defStyle)
        }
    }

    const [editState, setEditState] = useState({
        zoom: 12,
        rotate: 0,
        brightness: 100,
        contrast: 100
    })

    function closeEdit() {
        document.getElementById("imageEdit").setAttribute("style", "display: none !important")
    }

    const handleExit = (e) => {
        if(e.target.id === "cancel") closeEdit()
        else{
            let canvasScaled = editor.current.getImage()
            
            let c = document.createElement('canvas')
            c.width = canvasScaled.width
            c.height = canvasScaled.height
            let ctx = c.getContext('2d')
            ctx.filter = getFilter()
            ctx.drawImage(canvasScaled, 0, 0)
            
            let imgUrl = c.toDataURL()
            // document.getElementById('outi').append(c)

            setProfilePhoto(imgUrl)
            closeEdit()
        }
    }

    const handleChange = (e) => {
        let currState = Object.assign({}, editState)
        let val = e.target.value
        switch(e.target.id){
            case "zoom":
                currState.zoom = val
                break
            case "brightness":
                currState.brightness = val
                break
            case "contrast":
                currState.contrast = val
                break
        }
        setEditState(currState)
    }

    const handleRotate = (e) => {
        let currState = Object.assign({}, editState)
        let val = 90
        switch(e.target.id){
            case "left":
                currState.rotate += val
                break
            case "right":
                currState.rotate -= val
                break
        }
        setEditState(currState)
    }

    const onInputFile = (e) => {
        let reader = new FileReader()
        reader.onload = function(){
            setProfilePhoto(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function getFilter(){
        return "brightness(" + editState.brightness + "%) contrast(" + editState.contrast + "%)"
    }
    
    return (
        <div id="imageEdit">
            <div>
                <div className="left">
                    <AvatarEditor
                        ref={editor}
                        image = {src}
                        crossOrigin = "anonymous"
                        border={50}
                        scale={editState.zoom / 10}
                        rotate={editState.rotate % 360}
                        color={[0, 0, 0, 0.75]} // RGBA
                        style={{filter: getFilter()}}
                    />
                </div>
                <div className="right">
                    <div className="close-modal" onClick={closeEdit}>&#10005;</div>
                    <div id="header">Edit Photo</div>
                    <div id="editHeader">
                        <div onClick={headerClick} className="active">Crop + Position</div>
                        <div onClick={headerClick}>Adjust</div>
                    </div>
                    <div className="hr"></div>
                    <div id="editor">
                        <div id="crop" className="editActive">
                            <div>Zoom</div>
                            <div>
                                <input type="range"
                                    id="zoom"
                                    onChange={handleChange}
                                    min="5"
                                    max="60"
                                    defaultValue="12"
                                />
                            </div>
                            <div>Rotate</div>
                            <div id="rotateBtn">            
                                <input type="button" id="left" onClick={handleRotate} value="Left"></input>
                                <input type="button" id="right" onClick={handleRotate} value="Right"></input>
                            </div>
                        </div>
                        <div id="brightConst">
                            <div>Brightness</div>
                            <div>
                                <input type="range"
                                    id="brightness"
                                    onChange={handleChange}
                                    min="50"
                                    max="250"
                                    defaultValue="100"
                                />
                            </div>
                            <div>Contrast</div>
                            <div>
                                <input type="range"
                                    id="contrast"
                                    onChange={handleChange}
                                    min="50"
                                    max="250"
                                    defaultValue="100"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input type="file" name="" id="imgFile" accept="image/x-png,image/jpeg,image/jpg" onChange={onInputFile}/>
                    </div>
                    <div id="commitButton">
                        <input type="button" id="saveRep" onClick={handleExit} value="Save and Replace"/>
                        <input type="button" id="cancel" onClick={handleExit} value="Cancel"/>
                    </div>
                </div>
            </div>
        </div>
    )
}   

// <ImageIcon src={"http://simpleicon.com/wp-content/uploads/crop.png"} size={20} />
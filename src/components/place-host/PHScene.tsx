import React, { useState } from 'react'
import '../../css/place-host/PHScene.css'
import EHGSPhotos from '../experience-host/EHGSPhotos'

export default function PHScene(){
    const [count, setCount] = useState(0)
    const [images, setImages] = useState([])
    const [imageContent, setimageContent] = useState(
        images.map(i => (
            i.out
        ))
    )
    const delImage = (e) => {
        let img = images
        console.log(img)

        let remove = -1
        console.log(e.target.id)
        console.log(img.length)
        for(let i = 0; i < images.length; i++){
            // console.log(img[i].id, e.target.id)
            if("" + img[i].id === e.target.id){
                remove = i
                break
            }
        }
        if(remove === -1) return

        img.splice(remove, 1)

        setImages(img)
        setimageContent(img.map(i => (
            i.out
        )))
    }
    function onInputFile (e) {
        let reader = new FileReader()
        reader.onload = function(){
            //reader.result
            let img = images
            img.push({
                out: <EHGSPhotos imageURL={reader.result} idx={count} delImage={delImage}/>,
                id: count
            })

            setCount(count + 1)
            setImages(img)
            setimageContent(img.map(i => (
                i.out
            )))
            // alert(images.length)
            img.forEach(e => {console.log(e)})
        }
        // for(let i = 0; i < e.target.files.length; i++){
            reader.readAsDataURL(e.target.files[0])
        // }
    }

    function nextClick(){
        document.getElementById("PHSceneSection").style.transform = "scale(0.35)"
        setTimeout(() => {
            
            document.getElementById("placeHost").style.transform = "translateX(-200vw)"
        }, 500)
        setTimeout(() => {
            
            document.getElementById("PHGuestSection").style.transform = "scale(1)"
        }, 1300)
    }

    return(
        <div id="PHSceneSection" style={{backgroundImage: "url(" + process.env.PUBLIC_URL + "/images/host-wallpaper/scene.jpg)" }}>
            <div>
                <h2>Scene</h2>
                <div className="input">
                    <div className="photosInput">
                        <h4>Photos</h4>
                        <div>
                        {imageContent}
                        </div>
                        <input type="file" name="" accept="image/*" id="fileUp" onChange={onInputFile}/>
                    </div>
                </div>
                <div className="input">
                    <textarea name=""  placeholder=" " id="amenities" rows={10}></textarea>
                    <div className="label">Amenities</div>
                </div>
                <div className="input">
                    <input type="text" name="" id="title"/>
                    <div className="label">Title</div>
                </div>
                <div className="input">
                    <input type="button" value="Next" onClick={nextClick}/>
                </div>
            </div>
            <div id="sceneImage"></div>
        </div>
    )
}
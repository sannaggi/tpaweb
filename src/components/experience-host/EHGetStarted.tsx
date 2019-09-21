import React, { useEffect, useState } from "react"
import "../../css/experience-host/EHGetStarted.css";
import EHGSSection from "./EHGSSection";
import EHGSPhotos from "./EHGSPhotos";
// import {  } from 

export default function EHGetStarted(){
    useEffect(() => {
        document.getElementById("EHFirstStarted").setAttribute("style", "opacity: 0");
        document.getElementById("EHFirstStarted").setAttribute("style", "position: absolute");
        function delEH(){
            let obj = document.getElementById("EHGetStarted");
            if(obj !== null)
                obj.setAttribute("style", "opacity: 1; z-index: 9");
        }
        function EHdel(){
            let obj = document.getElementById("EHFirstStarted");
            if(obj !== null)
                obj.setAttribute("style", "display: none")
        }
        setTimeout(delEH, 750);
        setTimeout(EHdel, 800);
    })

    const handleInput = (e) =>{
        let checkbox: HTMLInputElement = document.getElementById(e.target.id + 'Check') as HTMLInputElement;
        checkbox.checked = e.target.value !== "";
        switch(e.target.id){
            case "groupSize":
                e.target.value = e.target.value < 0 ? 0 : e.target.value
                e.target.value = e.target.value > 10 ? 10 : e.target.value
                break
            case "price":
                e.target.value = e.target.value > 14000000 ? 14000000 : e.target.value
                break
            case "wedo":
            case "webe":
                if((e.target.value).split(' ').length < 5){
                    checkbox.checked = false
                    alert('Must atleast 5 words')
                }
                break
            default:
                if(e.target.value === ""){
                    let a = document.querySelector(`#${e.target.id} + div`) as HTMLDivElement
                    console.log(a.innerHTML + " cannot be empty")
                }
                break
        }
    }

    const [count, setCount] = useState(0)
    const [images, setImages] = useState([])
    const [imageContent, setimageContent] = useState(
        images.map(i => (
            i.out
        ))
    )
    
    useEffect(() => {
    }, [images])

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
        let a = document.getElementById('photosCheck') as HTMLInputElement
        a.checked = img.length <= 0
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
            let a = document.getElementById('photosCheck') as HTMLInputElement
            a.checked = true
        }
        // for(let i = 0; i < e.target.files.length; i++){
            reader.readAsDataURL(e.target.files[0])
        // }
    }

    function giveMeetingLocCheck(){
        let a = document.getElementById('meetinglocCheck') as HTMLInputElement

        let arr=['country', 'street', 'city', 'state', 'zip_code', 'loc_name']
        a.checked = true
        for(let i = 0; i < arr.length; i++){
            let e = arr[i]
            let el = document.getElementById(e) as HTMLInputElement
            if(el.value === ""){
                a.checked = false
                break
            }
        }
    }

    function cannotEmpty(e){
        giveMeetingLocCheck()
        if(e.target.value !== "") return
        alert('cannot be empty')
    }

    return(
        <div id="EHGetStarted">
            <div className="left">
                <div id="basicInfo" className="head-sec">
                    <p>Basic Information</p>
                    <EHGSSection headName={"Experience Location City Name"} id={"locName"}/>
                    <EHGSSection headName={"Primary Language"} id={"primLang"}/>
                    <EHGSSection headName={"Spoken Language"} id={"spokeLang"}/>
                    <EHGSSection headName={"Experience Category"} id={"expCat"}/>
                </div>
                <div id="experiencePage" className="head-sec">
                    <p>Experience Page</p>
                    <EHGSSection headName={"Title"} id={"title"}/>
                    <EHGSSection headName={"About you"} id={"aboutyou"}/>
                    <EHGSSection headName={"What we'll do"} id={"wedo"}/>
                    <EHGSSection headName={"What we'll be"} id={"webe"}/>
                    <EHGSSection headName={"Provided Amenities"} id={"amenities"}/>
                    <EHGSSection headName={"Photos"} id={"photos"}/>
                </div>
                <div id="settings" className="head-sec">
                    <p>Settings</p>
                    <EHGSSection headName={"Group size"} id={"groupSize"}/>
                    <EHGSSection headName={"Schedule"} id={"schedule"}/>
                    <EHGSSection headName={"Price"} id={"price"}/>
                    <EHGSSection headName={"Meeting location"} id={"meetingloc"}/>
                </div>
            </div>
            <div className="right">
                <div id="basicInfoInput" className="input-section">
                    <h2>Basic Information</h2>
                    <div className="input">
                        <input type="text"  placeholder=" " name="" id="locName" onBlur={handleInput}/>
                        <div className="label">Experience Location Name</div>
                    </div>
                    <div className="input">
                        <input type="text"  placeholder=" " name="" id="primLang" onBlur={handleInput}/>
                        <div className="label">Primary Language</div>
                    </div>
                    <div className="input">
                        <input type="text"  placeholder=" " name="" id="spokeLang" onBlur={handleInput}/>
                        <div className="label">Spoken Language</div>
                    </div>
                    <div className="input">
                        <input type="text"  placeholder=" " name="" id="expCat" onBlur={handleInput}/>
                        <div className="label">Experience Category</div>
                    </div>
                </div>
                <div id="experiencePageInput" className="input-section">
                    <h2>Experience Page</h2>
                    <div className="input">
                        <input type="text" placeholder=" " name="" id="title" onBlur={handleInput}/>
                        <div className="label">Title</div>
                    </div>
                    <div className="input">
                        <textarea name=""  placeholder=" " id="aboutyou" rows={6} onBlur={handleInput}></textarea>
                        <div className="label">About You</div>
                    </div>
                    <div className="input">
                        <textarea name=""  placeholder=" " id="wedo" rows={10} onBlur={handleInput}></textarea>
                        <div className="label">What we'll do</div>
                    </div>
                    <div className="input">
                        <textarea name=""  placeholder=" " id="webe" rows={10} onBlur={handleInput}></textarea>
                        <div className="label">What we'll be</div>
                    </div>
                    <div className="input">
                        <textarea name=""  placeholder=" " id="amenities" rows={10} onBlur={handleInput}></textarea>
                        <div className="label">Amenities</div>
                    </div>
                    <div className="input">
                        <div className="photosInput">
                            <h4>Photos</h4>
                            <div>
                            {imageContent}
                            </div>
                            <input type="file" name="" accept="image/*, video/*" id="fileUp" onChange={onInputFile}/>
                        </div>
                    </div>
                </div>
                <div id="settingsInput" className="input-section">
                    <h2>Settings</h2>
                    <div className="input">
                        <input type="number"  placeholder=" " name="" id="groupSize" onBlur={handleInput}/>
                        <div className="label">Group Size</div>
                    </div>
                    <div className="input">
                        <input type="text"  placeholder=" " name="" id="schedule" onBlur={handleInput}/>
                        <div className="label">Schedule</div>
                    </div>
                    <div className="input">
                        <input type="number"  placeholder=" " name="" id="price" onBlur={handleInput}/>
                        <div className="label">Price</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="country" onChange={cannotEmpty} placeholder=" "/>
                        <div className="label">Country</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="street" onChange={cannotEmpty} placeholder=" "/>
                        <div className="label">Street Address</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="city" onChange={cannotEmpty} placeholder=" "/>
                        <div className="label">City</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="state" onChange={cannotEmpty} placeholder=" "/>
                        <div className="label">State</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="zip_code" onChange={cannotEmpty} placeholder=" "/>
                        <div className="label">Zip Code</div>
                    </div>
                    <div className="input">
                        <input type="text" name="" id="loc_name" onChange={cannotEmpty} placeholder=" "/>
                        <div className="label">Location name</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';

import { List } from "./list"

import { useState, useRef, useEffect } from 'react';

export const Form = () => {

    const ref = useRef(null)
    const [data, setData] = useState([])

    const [item, setItem] = useState("");
    const [item1, setItem1] = useState("");
    const [item2, setItem2] = useState("");
    const [item3, setItem3] = useState("");


   const [form, setForm] = useState({
    title : "",
    ingredients : "",
    timetocook : "",
    })
   

    const handleChange = (e) => {
        
        let { name, value } = e.target
 
        setForm({
            ...form,
            [name]: value,
            
        })
    };

    const getData = () => {
        fetch(`http://localhost:3001/recipe`)
        .then(d => d.json())
        .then((res) => setData(res))
    }


    useEffect(() => {

        getData()
    },[data])

    
     const PostData = () => {
        console.log("form:" , form)

        const payload = {
                title : form.title,
                ingredients : form.ingredients,
                timetocook : form.timetocook,
                image : form.image
          }
            fetch("http://localhost:3001/recipe", {
            method: "POST",
            body : JSON.stringify(payload),
            headers : {
              "Content-type" : "application/json"
            }
          }).then(() => {
          
            getData()

          })
     }
    
    const handleDetails = (title, ingredients, timetocook, image) => {
        
        // console.log(title, ingredients, timetocook, image)
        setItem(title)
        setItem1(ingredients)
        setItem2(timetocook)
        setItem3(image)




    }

    // console.log(item)
    // console.log(item1)

    // console.log(item2)
    // console.log(item3)



    return (
        <div>
            <div className="inputContainer">
            <input onChange={handleChange} type="text" name="title" placeholder="enter title" />
            <br></br>
            <input onChange={handleChange} type="text" name="ingredients" placeholder="Enter ingredients" />
           <br></br>
            <input onChange={handleChange} type="text" name="timetocook" placeholder="time" />
            <br></br>
            <input ref={ref} onChange={handleChange} type="text" name="image" placeholder="image-url" />
            <br></br>
            <button className="SaveData" onClick={PostData}>Save</button>
            </div>
            
            <div className="itemlists">
            {data.map((e) => (
                <List key={e.id} {...e} handledetails={handleDetails} />
            ))}
            </div>
            
            <div className="details">
                <p>{item}</p>
                <p>{item1}</p>
                <p>{item2}</p>
                <img src={item3} alt="" />
            </div>
    </div>
    );
}
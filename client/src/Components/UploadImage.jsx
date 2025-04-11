import React, { useState } from 'react'

const UploadImage = () => {

    const [file,setFile]=useState(null);
    const UploadImage=(e)=>
    {
           console.log(e.target.files[0].name)
           const selectedFile=e.target.files[0]
           setFile(URL.createObjectURL(selectedFile))
          
    }
    const Upload=()=>
    {
        document.getElementById('inputBox').click()
        
    }
  return (
    <div className='justify-center items-center flex' >
        <input type="file" className='hidden'  id='inputBox' onChange={(e)=>{UploadImage(e)}}/>
        <button className='bg-blue-400 px-6 py-4 text-white rounded-3xl cursor-pointer ' onClick={()=>{Upload()}}>Upload Profile pic</button>
        <img src={file} alt=""  className='w-40 h-40'/>
        
    </div>
  )
}

export default UploadImage
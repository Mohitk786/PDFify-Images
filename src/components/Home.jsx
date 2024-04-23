import React, { useState } from 'react'
import Loading from './Loading';
import axios from 'axios';

const Home = () => {
  
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const [pdf, setPdf] = useState(null);


    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        setLoading(true)
        try{
            //make api call for converting
            const response = await axios.post("https://pdfify-images.onrender.com/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}} )
            setPdf(response.data.fileName);
            setLoading(false)
        }
        catch(err){ 
                console.log("error aa  gya ji ", err.message);
        }
    }


    return !loading ? (
    <div className='w-screen h-screen flex items-center flex-col justify-center'>
        <div>
          <form
              method='POST'
              action='/upload'
              encType='multipart/form-data'
              className='flex flex-col gap-5'
              onSubmit={submitHandler}
          >

          <label htmlFor="image">Please upload the image:</label>
          <input
            type="file"
            name="image"
            accept="image/jpg, image/jpeg, image/png, image/svg"
            onChange={(e)=>setFile(e.target.files[0])}
          />

         
         
            <input type='submit' className='rounded-lg py-3 font-semibold text-white bg-sky-500 hover:bg-sky-800 hover:text-xl duration-300'/>
          </form>
        </div>
        
        { pdf && <div className='w-[50%] h-[50%] flex justify-center mt-5'>
        <a href={`http://localhost:5000/download/${pdf}`} download={`${pdf}.pdf`}>Download PDF</a>
                </div>

        }

    </div>) : <Loading/>
}

export default Home
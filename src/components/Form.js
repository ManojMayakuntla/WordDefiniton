import { useEffect, useState } from "react";
import axios  from "axios";
import {toast} from 'react-toastify';
const Form=()=>{
    const [para,setPara]=useState('');
    const [words,setWords] = useState([]);
    const [split,setSplit] = useState([]);
    const [word,setWord] = useState('');
   
    const SubmitHandler=(e)=>{
        e.preventDefault();
        if(para.length<500)
        {
            const letters=para.split(' ');
            setSplit(letters);
        }
        else{
            toast.error('paragraph should contain only 500 letters')
        }
    }

    useEffect(()=>{
        const filter = split.filter((word)=>{
            return word.length>5;
        });
    setWords(filter);
    },[split])

    const HandleClick=(word)=>{
        setWord(word);
        axios({
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
            headers: {
              'X-RapidAPI-Key': 'a565c504a5msh9c50648ccdaf95ep1a16fbjsn96a0a93b8bbb',
              'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        }).then((res)=>{if(res.status==200){toast.success(res.data.results[0].definition)}}).catch((err)=>{toast.error(err.response.data.message)})
    }
      return(
        <div>
         <h1 className="text-secondary">WORD DEFINITION</h1><br/>
         <form onSubmit={SubmitHandler}>
            <textarea className="form-control justify-content-center" id="exampleFormControlTextarea1" rows="5" onChange={(e)=>{setPara(e.target.value)}} style={{width:'40%',marginLeft:'30%'}}></textarea><br/>
            <input type='submit' value='Submit' className="btn btn-primary"/>
         </form>
         <div className='shadow-lg d-flex flex-wrap'style={{border:'1px solid', width:'50%', height:200, marginTop:'3%',marginLeft:'25%',borderRadius:10,borderColor:'grey'}}  >
            {
                split.map((word,index)=>{
                    if(words.includes(word))
                    {
                        return(
                            <div key={index}>
                             <a href="#" onClick={()=>{HandleClick(word)}}>{word}</a>&nbsp;
                            </div>
                        )
                    }
                    else{
                        return(
                            <div key={index}>
                             {word}&nbsp;
                            </div>
                        )
                    }
                })
            }
         </div>
        </div>
    )
};

export default Form;
import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';



const Test = () => {
    const {user, sever, socket, sever3} = useSelector((state) => state);
    // const [videourl, setvideourl] = useState()



    const getuservideo = async() => {

    }

    useEffect(() => {

    }, [])

    return (
        <>
            <video src={`${sever3}/file/7182a4c5d70593547b5491b3940f3490`} controls id='Video'></video>
        </>
    )
}

export default Test

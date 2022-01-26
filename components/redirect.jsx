import {useRouter} from 'next/router'
import {useEffect} from 'react'


const Redirect = (item, page) => {

    const router = useRouter()

    useEffect(() => {
        if(!item){
            router.push(page)
        }
    }, [])


    return (
        <div>
            
        </div>
    )
}

export default Redirect

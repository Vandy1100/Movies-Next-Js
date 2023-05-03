import { useRouter } from "next/router"
import Link from "next/link"

function Post({result}){
    const router=useRouter()
    const {id}=router.query
    return(
        <>
        <h5 style={{textAlign:'center',color:'blue'}}><Link href={`/post`}>Back To Old Pack</Link></h5>
        <h1 style={{textAlign:'center',color:'red'}}>post : {id}</h1>
        <p style={{textAlign:'center',color:'blue',marginTop:'10px'}}>{result.name}</p>
        <p style={{textAlign:'center',color:'blue',marginTop:'10px'}}>{result.address.street}</p>
        </>
    )
}
export async function getServerSideProps(context){
    const {params} =context
    const {id}=params
    const resp=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const result=await resp.json()
    console.log('------------------In Server Side Rendering-------------')
    return{
        props:{
            result
        }
    }
}
export default Post
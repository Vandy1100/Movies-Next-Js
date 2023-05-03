// function Post({result}){
//     return (
//         <>
//             {
//                result.map(user=>(
//                 <p>{user.name}</p>
//                ))
//             }
//             </>
//     )
// }
// export async function getStaticProps(){
//     const resp=await fetch("https://jsonplaceholder.typicode.com/users")
//     const result=await resp.json()
//     console.log('------------------in static generation-------------')
//     return{
//         props:{
//             result
//         }
//     }
// }
// export default Post

import Link from "next/link"
function Post({result}){
    return (
        <section>
            {
               result.map(user=>(
                <p style={{textAlign:'center'}} key={user.id}><Link href={`/post/${user.id}`}>{user.name}</Link></p>
 ))
            }
            </section>
    )
}
export async function getServerSideProps(){
    const resp=await fetch("https://jsonplaceholder.typicode.com/users")
    const result=await resp.json()
    console.log('------------------In Server Side Rendering-------------')
    return{
        props:{
            result
        }
    }
}
export default Post
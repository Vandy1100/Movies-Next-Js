import React from "react";
import { BASE_URL, BASE_PATH, API_KEY, YT } from "../../../lib/constant";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../../components/layout";
function Movies({ trailer }) {
  const router = useRouter();
  const { id } = router.query;
  const [m, setMovie] = useState(JSON.parse(router.query.movie));
  const [key, setKey] = useState("")
  useEffect(() =>  {
    // console.log(trailer[trailer.length-1].key)
    setKey(trailer[trailer.length-1].key)
  }, [])
  return (
    <Layout>
      <div className="container shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div className="row">
          <div className=" offset-1 col-5">
          <div className="card rounded w-75">
            <img className="rounded" src={`${BASE_PATH}` + m.poster_path} />
            </div>
          </div>
          <div className="col-6">
            <h2>{m.original_title}</h2>
            <p>{m.overview}</p>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              WATCH NOW
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{width:'1200px',marginLeft:'-350px'}}>
                  <div className="modal-header" >
                  <iframe className="w-100" style={{height:'800px'}} src={YT + key}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
//   const resp = await fetch(
//     `${BASE_URL}/movie/${id}?api_key=4113f3ad734e747a5b463cde8c55de42&language=en-US`
//   );
//   const result = await resp.json();
//   console.log("------------------In Server Side Rendering-------------");
//   return {
//     props: {
//       trailer: result.results,
//     },
//   };
// }

export async function getServerSideProps({ params }) {
    const res = await fetch(
     ` ${BASE_URL}/movie/${params.id}/videos?api_key=${API_KEY}`
    );
    const resp = await res.json();
    return {
      props: {
        trailer: resp.results,
      },
    };
  }
export default Movies;

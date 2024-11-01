// import React from 'react'
 
export default function AuthComponent({form,img}) {
  return (
<section className="bg-light d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
     <div className="container">
       <div className="row justify-content-center" >
         <div className="col-12 col-xxl-11">
           <div className="card border-light-subtle">
             <div className="row g-0 ">
               {form}
               <div className="col-12 col-md-6">
                  <img
                    className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src={img}
                    alt="Welcome back you've been missed!"
                    style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}
                  />
                </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
  )
}

export default function LoginDefault({verification,handleEmail,handlePassword,}) {
    return (
        <>
             <div className="container d-flex flex-column align-items-center">
                <div className="row text-center mt-3">
                    <h1>Login</h1>
                </div>

                <div className="row w-50" >
                    
                    <form >
                        <div className=" mb-3">
                            <label htmlFor="email" className="form-label">Mail address</label>
                            <input onInput={(e)=>handleEmail(e)} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
                               
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input onInput={(e)=>handlePassword(e)} type="password" className="form-control" id="password" name="password"/>
                        </div>
                      <div className="d-flex justify-content-between ">
                        <p></p>
                        <button onClick={()=>verification()} type="reset" className="btn btn-primary">Login</button>
                      </div>
                    </form>
                    
                </div>

            </div>
        </>
    );
}
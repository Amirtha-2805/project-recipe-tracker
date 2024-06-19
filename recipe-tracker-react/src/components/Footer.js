import { Link } from "react-router-dom"
import "../styles/footer.css"

const Footer=()=>{
    return(
        <>
            {/* <div className="footer-box">
                <center>
                    <ul>
                        <li className="footer-content"><h6>@Copyright &copy;2024 designed by Amirtha</h6></li>
                    </ul>
                </center>
            </div> */}
             <footer className="footer footer-black  footer-white ">
        <div className="container-fluid">
          <div className="row">
            <div className="credits ml-auto">
              <span className="copyright">
                <b>
               <h5> © made with <i className="fa fa-heart heart"></i> by Amirtha </h5></b>
              </span>
            </div>
          </div>
        </div>
      </footer>
        </>
    )
}
export default Footer
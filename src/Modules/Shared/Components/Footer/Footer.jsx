// import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/img/logon.png";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  const nav = useNavigate();
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <div className="text-center">
        <button
          className="btn btn-primary mb-3"
          onClick={() => nav("/showdata")}
        >
          اعلن عن عقارك مجانا{" "}
        </button>
      </div>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                <img src={logo} width={"180px"} />
              </h6>
              <p>
                Here you can display your property securely and for free so that
                the buyer can see all the apartment prices within the announced
                area and can communicate with the site administration to
                communicate between the buyer and the seller.
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Minia & Edwa
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                yj0820996@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 01125683265
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> 01028075983
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <a className="" href="/">
          <img src={logo} width={"180px"} />
        </a>
      </div>
    </MDBFooter>
  );
}

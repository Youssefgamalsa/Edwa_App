// import React from 'react';
import logo from '../../../../assets/img/logon.png'
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <button className="btn btn-primary"> اعلن عن عقارك مجانا </button>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                <img src={logo} width={'180px'}/>
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
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}

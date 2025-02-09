import React, { useEffect } from "react";
import {
  Grid,
  Text,
  Container,
  Input,
  Button,
  Modal,
  Checkbox,
  Row,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import rapiPago from "../../img/rapi-pago.png";
import pagoFacil from "../../img/pago-facil.png";
import styled from "styled-components";
import { toast } from "react-toastify";





import { useTranslation } from "react-i18next";


const GridS = styled(Grid.Container)`
  border: solid 0.5px #03030349;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  width: 61%;
  -webkit-box-shadow: -10px 0px 13px -7px #00000052,
    10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

export default function Charge() {
  const token = JSON.parse(localStorage.getItem("token")).data;
  let { username } = jwt.decode(token);

  const form = {
    username: username,
    charge: "",
  };

  const [input, setInput] = useState(form);
  const [btnValidate, setBtnValidate] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pago1, setPago1] = useState(false);
  const [pago2, setPago2] = useState(true);
  const [paymentCode, setpaymentCode] = useState();
  const [imageQr, setImageQr] = useState();
  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (input.charge > 0) {
      setBtnValidate(false);
    } else {
      setBtnValidate(true);
    }
  }, [input]);

  const handleChange = (e) => {
    setInput({
      ...input,
      charge: parseInt(e.target.value),
    });
  };

  const handleSubmit = () => {
    setBtnLoading(true);
    if ((input.charge > 0 && pago1) || pago2) {
      axios
        .patch("http://localhost:3001/user/charge", input, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          console.log(response);
          setpaymentCode(response.data.transaction.transactionCode);
          setImageQr(response.data.QR);
          setInput(form);
          setVisible(true);
          setBtnLoading(false);
        })
        .catch((error) => {
          setBtnLoading(false);
          console.log(error);

          if (error) {
            localStorage.removeItem("token");
            toast.error("Session expired, sign in again!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              onClose: () => (window.location.href = "http://localhost:3000/"),
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            console.log(error);
          }
        });
    }
  };
  const { t, i18n } = useTranslation("global");
  
  return (
    <div>
      <Container
        display="flex"
        direction="column"
        justify="center"
        alignItems="center"
        style={{ height: "100vh", width: "100vh" }}
      >
        <Text
          style={{ position: "relative", left: "-245px", marginBottom: "10px" }}
          h3
        >
         {t("Side.charge")}
        </Text>
        <GridS
          gap={2}
          display="flex"
          justify="center"
          alignItems="center"
          style={{
            backgroundColor: "#F6F6F6",
            width: "60%",
            height: "350px",
            borderRadius: "10px",
          }}
        >
          <Row display="flex" justify="center">
            <img style={{ width: "180px" }} src={rapiPago} alt="rapiPago" />
            <Spacer x={2} />
            <img style={{ width: "150px" }} src={pagoFacil} alt="pagofacil" />
          </Row>
          <Row display="flex" justify="center">
            <Spacer x={1} />
            <Checkbox
              onClick={() => {
                setPago2(true);
                setPago1(false);
              }}
              checked={pago2}
            >
              RapiPago
            </Checkbox>
            <Spacer x={5} />
            <Checkbox
              onClick={() => {
                setPago1(true);
                setPago2(false);
              }}
              checked={pago1}
            >
              PagoFacil
            </Checkbox>
          </Row>

          <Spacer y={5} />

          <Grid>
            <Input
              value={input.charge}
              onChange={handleChange}
              min="0"
              width="250px"
              labelPlaceholder={t("Transfer.Amount")}
              type="number"
            ></Input>
          </Grid>

          <Grid>
            <Button
              onClick={handleSubmit}
              loading={btnLoading}
              loaderType="gradient"
              disabled={btnValidate}
              color="#2CA1DE"
              size="small"
            >
              ok
            </Button>
          </Grid>
          <Modal
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text color="green" h2>
              {t("Transfer.Success")} 
              </Text>
            </Modal.Header>
            <Modal.Body display="flex" justify="center" alignItems="center">
              <Grid.Container alignItems="center">
                <Grid >
                  <Text>{pago2 ? "Rapi Pago" : "Pago Facil"}</Text>
                  <Text> {t("Transfer.Payment-Code")} {`${paymentCode}`}</Text>
                </Grid>
                
                <Spacer x={1} />
                <Grid>
                  <img
                    height="150px"
                    width="150px"
                    src={imageQr}
                    alt="imgenQr"
                  />
                </Grid>
              </Grid.Container>
            </Modal.Body>
            <Modal.Footer justify="center">
              <Button onClick={closeHandler} size="small">
                ok
              </Button>
            </Modal.Footer>
          </Modal>
        </GridS>
      </Container>
    </div>
  );
}

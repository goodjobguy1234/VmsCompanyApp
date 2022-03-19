import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function QuotationManagement() {
    const [quotationRows, setQuotationRows] = useState([]);
    const [quotationData, setQuotationData] = useState([]);
    const [total, setTotal] = useState(0);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {

    fetch(`${API_URL}/quotations`)
      .then((res) => res.json())
      .then((data) => {
        setQuotationData(data)
      });  
      }, []);

    useEffect(() => {
    let sum = 0;
    const z = quotationData.map((v, i) => {
        let amount = v.qty * v.pricePerUnit;
        sum += amount;
        return (
        <tr key={i}>
            <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteQuotation(v)} />
            </td>
            <td className={style.textCenter}>{v.qty}</td>
            <td>{v.name}</td>
            <td className={style.textCenter}>{formatNumber(v.pricePerUnit)}</td>
            <td className={style.textRight}>{formatNumber(amount)}</td>
            <td className={style.textCenter}>{v.date}</td>
        </tr>
        );
    });
    
    setQuotationRows(z);
    setTotal(sum);
    }, [quotationData]);
    

    const deleteQuotation = (data) => {
    
    console.log(data);
    if (window.confirm(`Are you sure to delete [${data.name}]?`)) {
      fetch(`${API_URL}/quotations/${data._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);

          const coppyQuotation = [...quotationData]
          for (let i = 0; i < coppyQuotation.length; i++) {
            if (coppyQuotation[i]._id === data._id) {
                coppyQuotation.splice(i,1);
              break;
            }
          }
        setQuotationData(coppyQuotation);
            });
        }
    }  

    const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
      
    return (
        <>
    <Container>
        <h1>Quotation Management</h1>
        {/* API_URL: {API_URL} */}
        <Link to="/quotation-build">
            <Button variant="outline-dark" >
            <FaPlus /> Add
            </Button>
        </Link>
    
        <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>&nbsp;</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Amount</th>
            <th className={style.textCenter}>CreateAt</th>
          </tr>
        </thead>
        <tbody>{quotationRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td colSpan={2} className={style.textCenter}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
      </Table>
      </Container>
        </>
    )
}
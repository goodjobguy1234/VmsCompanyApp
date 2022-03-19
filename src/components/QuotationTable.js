import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import style from "../mystyle.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function QuotationTable({ data, clearDataItems, updateDataItems, saveQuotationHandler}) {
  // const [dataItems, setDataItems] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.price;
      sum += amount;
      return (
        <tr key={i}>
          <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v.code)} />
          </td>
          <td className={style.textCenter}>{v.qty}</td>
          <td>{v.name}</td>
          <td className={style.textCenter}>{formatNumber(v.price)}</td>
          <td className={style.textRight}>{formatNumber(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const deleteItem = (code) => {
    var z = data.filter((value, index, arr) => value.code != code);
    updateDataItems(z);
  };

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const saveHandler = () => {
    const dataFilter = data.map((currentData) => {
      return {
        code: currentData.code,
        name: currentData.name,
        pricePerUnit: currentData.price,
        qty: currentData.qty,
            }
    });

    saveQuotationHandler(dataFilter);
  }

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1>Quotation</h1>
      
      <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button>

      <div>____</div>
      <br></br>

      <Row className="mx-0 px-0">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "20px" }}>&nbsp;</th>
              <th className={style.textCenter}>Qty</th>
              <th className={style.textCenter}>Item</th>
              <th className={style.textCenter}>Price/Unit</th>
              <th className={style.textCenter}>Amount</th>
            </tr>
          </thead>
          <tbody>{dataRows}</tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className={style.textRight}>
                Total
              </td>
              <td className={style.textRight}>
                {formatNumber(total)}
              </td>
            </tr>
          </tfoot>
        </Table>
      </Row>
     
      <Row className="mx-0 px-0">
    
      <Button onClick={saveHandler}>
        Save
      </Button>
      </Row>
      
    </div>
  );
}

export default QuotationTable;

import React from "react";

export const NewOrderProductTable = ({
  items,
  handleWarranty,
  handleQuantity,
  checkActiveDetail,
}) => {
  return (
    <table className="table table-hover">
      {/* Header de la table */}
      <thead
        style={{
          position: "sticky",
          top: 0,
          borderBottom: "2px solid black",
        }}
      >
        <tr style={{ textAlign: "center" }}>
          <th scope="col" width="5%">
            #
          </th>
          <th scope="col" width="10%">
            Item
          </th>
          <th scope="col" width="40%">
            Detalle
          </th>
          <th scope="col" width="10%">
            Garantia
          </th>
          <th scope="col" width="10%">
            Cantidad
          </th>
          <th scope="col" width="10%">
            Precio Unitario
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((detail) => (
          <tr
            key={detail.id}
            style={{ marginBottom: "0px", textAlign: "center" }}
          >
            <td>
              <input
                type="checkbox"
                id={detail.id}
                className="custom-checkbox"
                onChange={(event) => checkActiveDetail(event, detail)}
                style={{ color: "#000000", cursor: "pointer" }}
              />
            </td>
            <td>{detail.name}</td>
            <td className="text-overflow">{detail.description}</td>
            <td style={{ justifyContent: "center" }}>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  style={{
                    width: "50%",
                    height: "25px",
                    textAlign: "center",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                  aria-describedby="basic-addon2"
                  onChange={(event) => handleWarranty(detail, event)}
                  value={detail.warranty}
                />
                <span
                  className="input-group-text d-flex justify-content-center align-items-center"
                  id="basic-addon2"
                  style={{
                    height: "25px",
                    display: "inline-block",
                    minWidth: "40px",
                  }}
                >
                  Años
                </span>
              </div>
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                style={{
                  width: "50%",
                  height: "25px",
                  textAlign: "center",
                  margin: "0 auto",
                }}
                onChange={(event) => handleQuantity(detail, event)}
                value={detail.quantity}
                disabled={detail.type === "Service" ? true : false}
              />
            </td>
            <td>
              $
              {(detail.warranty
                ? (0.02 * detail.warranty + 1) * detail.basePrice
                : detail.basePrice).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

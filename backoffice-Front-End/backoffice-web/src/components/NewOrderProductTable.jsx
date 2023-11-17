import React from "react";

export const NewOrderProductTable = ({
  items,
  handleWarranty,
  handleQuantity,
  checkActiveDetail,
}) => {
  return (
    <table className="table table-hover" style={{ minWidth: "100%" }}>
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
            <td
              style={{
                justifyContent: "center",
              }}
            >
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  style={{
                    width: "25px",
                    height: "25px",
                    textAlign: "center",
                  }}
                  aria-describedby="basic-addon2"
                  onChange={(event) => handleWarranty(detail, event)}
                  value={detail.warranty}
                />
                <span
                  className="input-group-text"
                  id="basic-addon2"
                  style={{ height: "25px" }}
                >
                  Años
                </span>
              </div>
            </td>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="input-group"
                style={{
                  width: "70px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  type="number"
                  className="form-control"
                  style={{
                    width: "100%",
                    height: "25px",
                    textAlign: "center",
                  }}
                  onChange={(event) => handleQuantity(detail, event)}
                  value={detail.quantity}
                  disabled={detail.type === "Service" ? true : false}
                />
              </div>
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

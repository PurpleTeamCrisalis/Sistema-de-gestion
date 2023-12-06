ALTER VIEW totalDiscountService AS
SELECT 
    c.name AS client_name, 
    c.last_name AS client_lastname,
    s.name AS services_name,
    ot.date AS order_date, 
    ot.total_discount AS total_discount
FROM 
    order_table AS ot
INNER JOIN
    client AS c ON c.id = ot.client_id
INNER JOIN
    service_detail AS sd ON ot.id = sd.order_id
INNER JOIN
    service_table AS s ON s.id = sd.service_id
GROUP BY c.id, c.name, c.last_name, s.name, ot.[date], ot.total_discount;

ALTER PROCEDURE getTotalDiscountsService AS
BEGIN
     SELECT
        *
    FROM
        totalDiscountService
    ORDER BY
        client_name , client_lastname, services_name, total_discount DESC;
END

EXEC getTotalDiscountsService

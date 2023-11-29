SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[totalDiscountServiceView] AS
SELECT 
    CASE 
        WHEN c.is_bussiness = 1 THEN c.bussiness_name
        ELSE c.name
    END AS client_name,
    CASE 
        WHEN c.is_bussiness = 1 THEN ''
        ELSE c.last_name
    END AS client_lastname,
    s.name AS services_name,
    ot.date AS order_date, 
    ot.total_discount AS total_discount
FROM 
    order_table AS ot
INNER JOIN
    client AS c ON c.id = ot.client_id
INNER JOIN
    service_table AS s ON s.id = ot.discount_service_id
GROUP BY c.id, c.bussiness_name, c.name, c.last_name, s.name, ot.[date], ot.total_discount, c.is_bussiness;
GO

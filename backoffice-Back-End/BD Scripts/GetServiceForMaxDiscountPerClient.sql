SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetServiceForMaxDiscountPerClient] (@startDate DATETIME, @endDate DATETIME)
AS
BEGIN
    DECLARE @adjustedEndDate DATE = DATEADD(day, 1, @endDate);

    SELECT 
         c.id AS client_id,
         c.name AS client_name,
         c.last_name AS lastname,
         c.dni,
         c.phone ,
         c.adress,
         c.start_date AS startdate,
         c.enabled AS clientenabled,
         c.is_bussiness AS is_bussiness,
         c.bussiness_name AS bussinessname,
         c.cuit,
         s.id AS serviceid,
         s.name AS servicename,
         s.description,
         s.base_price AS baseprice,
         s.is_special AS isspecial,
         s.suport_charge AS suportcharge,
         s.enabled AS serviceenabled,
         o.date,
         o.total_discount
    FROM order_table AS o 
    INNER JOIN max_discount_per_client_view AS m
        ON o.client_id = m.client_id AND o.total_discount = m.max_discount
    INNER JOIN client AS c
        ON o.client_id = c.id
    INNER JOIN service_table AS s
        ON o.discount_service_id = s.id
    WHERE o.date BETWEEN @startDate AND @adjustedEndDate;
END;
GO

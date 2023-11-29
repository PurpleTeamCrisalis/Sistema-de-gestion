SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getTotalDiscountsService] AS
BEGIN
    SELECT
        *
    FROM
        totalDiscountServiceView
    ORDER BY
        client_name , client_lastname, services_name, total_discount DESC;
END

GO

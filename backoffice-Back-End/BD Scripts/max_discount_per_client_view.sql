SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[max_discount_per_client_view] AS
SELECT client_id, MAX(total_discount) AS max_discount
FROM order_table
GROUP BY client_id;
GO

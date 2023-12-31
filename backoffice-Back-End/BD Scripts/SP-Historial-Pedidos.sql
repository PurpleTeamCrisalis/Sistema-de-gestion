CREATE PROCEDURE ORDERS_HISTORY
AS
BEGIN
WITH CombinedData AS (
SELECT 
        "cli"."name",
        "cli".last_name,
        "cli".is_bussiness,
        "cli".bussiness_name,
        "order".id AS order_id,
        "order".order_state,
        "order".[date],
        "prod"."name" AS product_name,
        "prod_detail".quantity,
        "prod_detail".base_price,
        "prod_detail".sub_total,
        SUM("tax_by_order".amount) AS total_impuestos,
        "order".total_discount,
        "order"."total"
    FROM dbo.order_table AS "order"
    INNER JOIN dbo.client AS "cli" ON "order".client_id = "cli".id
    INNER JOIN dbo.product_detail AS "prod_detail" ON "prod_detail"."order_id" = "order".id
    INNER JOIN dbo.product_table AS "prod" ON "prod_detail".product_id = "prod".id
    LEFT JOIN dbo.tax_by_order AS "tax_by_order" ON "tax_by_order"."order_id" = "order"."id"
    GROUP BY "order"."id", 
            "cli"."name", 
            "cli".last_name,
            "cli".is_bussiness,
            "cli".bussiness_name, 
            "order"."order_state", 
            "order"."date", 
            "prod"."name", 
            "prod_detail"."base_price",
            "order".total_discount,
            "prod_detail".sub_total,
            "order".total,
            "prod_detail"."quantity"
    UNION ALL
    SELECT 
        "cli"."name",
        "cli".last_name,
        "cli".is_bussiness,
        "cli".bussiness_name,
        "order".id AS order_id,
        "order".order_state,
        "order".[date],
        "serv"."name" AS service_name,
        1 AS quantity,
        "serv_detail".base_price,
        "serv_detail".sub_total,
        SUM("tax_by_order".amount) AS total_impuestos,
        "order".total_discount,
        "order"."total"
    FROM dbo.order_table AS "order"
    INNER JOIN dbo.client AS "cli" ON "order".client_id = "cli".id
    INNER JOIN dbo.service_detail AS "serv_detail" ON "serv_detail"."order_id" = "order".id
    INNER JOIN dbo.service_table AS "serv" ON "serv_detail".service_id = "serv".id
    LEFT JOIN dbo.tax_by_order AS "tax_by_order" ON "tax_by_order"."order_id" = "order"."id"
    GROUP BY "order"."id", 
            "cli"."name", 
            "cli".last_name,
            "cli".is_bussiness,
            "cli".bussiness_name, 
            "order"."order_state", 
            "order"."date", 
            "serv"."name", 
            "serv_detail"."base_price",
            "order".total_discount,
            "serv_detail".sub_total,
            "order".total
)

SELECT 
    ROW_NUMBER() OVER (ORDER BY CAST(GETDATE() AS TIMESTAMP)) AS ticket_id, *
FROM CombinedData
ORDER BY name, last_name, bussiness_name, order_id, product_name, date
END
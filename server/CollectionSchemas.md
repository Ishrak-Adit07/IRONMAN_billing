# Server Side Collection Schemas

## Bill

```json
{
  "bill": {
    "employee": "employee_id",
    "client": "Artisan",
    "products": [
      "product1_id",
      "product2_id",
      "product3_id"
    ],
    "productPrices": [
      "product1_price",
      "product2_price",
      "product3_price"
    ],
    "quantities": [
      10,
      15,
      10
    ],
    "totals": [
      "product1_total",
      "product2_total",
      "product3_total"
    ],
    "totalBill": 200,
    "$id": "bill_id",
    "$tenant": "******",
    "$createdAt": "2024-07-10T06:25:56.965+00:00",
    "$updatedAt": "2024-07-10T06:25:56.965+00:00",
    "$permissions": []
  }
}

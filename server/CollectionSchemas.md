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
    "quantities": [
      10,
      15,
      10
    ],
    "productPrices": [
      "product1_price",
      "product2_price",
      "product3_price"
    ],
    "totals": [
      1000,
      180,
      200
    ],
    "totalBill": 1380,
    "$id": "bill_id",
    "$tenant": "******",
    "$createdAt": "2024-07-10T06:25:56.965+00:00",
    "$updatedAt": "2024-07-10T06:25:56.965+00:00",
    "$permissions": []
  }
}

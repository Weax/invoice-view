import { rest } from 'msw'

export const handlers = [
    rest.get('https://rivile.lt/invoice-view', (req, res, ctx) => {

    return res(
      ctx.json({
         "invoices": [
          {
           "uid": 111222300,
           "title": "office supplies ",
           "group": "expense",
           "date": "2020-06-20",
           "total": 90.99,
           "currency": "eur",
           "closed": true,
           "invoiceLines": [
            {
             "name": "pen",
             "quantity": 30,
             "price": 1.00
            },
            {
             "name": "printer cartridge ",
             "quantity": 2,
             "price": 30.00
            },
            {
             "name": "blackboard marker",
             "quantity": 1,
             "price": 0.99
            }]
          },
          {
           "uid": 111222301,
           "title": "sales to client1",
           "group": "income",
           "date": "2020-06-22",
           "total": 1000.00,
           "currency": "eur",
           "closed": false,
           "invoiceLines": [
            {
             "name": "service",
             "quantity": 100,
             "price": 10.00
            }]
          },
          {
           "uid": 111222302,
           "title": "sales to client2",
           "group" : "income",
           "date": "2020-06-23",
           "total": 100.00,
           "currency": "eur",
           "closed": true,
           "invoiceLines": [
            {
             "name": "service",
             "quantity": 10,
             "price": 10.00
            }]
          }
          ]
        }
        )
    )
  }),
]
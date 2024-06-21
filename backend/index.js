console.log('Hello world!');
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const user={
    "users": [
        {
          firstName: "John",
          lastName: "Doe",
          phoneNumber: "123-456-7890"
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          phoneNumber: "987-654-3210"
        },
        {
          firstName: "David",
          lastName: "Johnson",
          phoneNumber: "555-123-4567"
        },
        {
          firstName: "Emily",
          lastName: "Brown",
          phoneNumber: "456-789-0123"
        },
        {
          firstName: "Michael",
          lastName: "Davis",
          phoneNumber: "321-654-9870"
        },
        {
          firstName: "Sarah",
          lastName: "Williams",
          phoneNumber: "789-012-3456"
        },
        {
          firstName: "Robert",
          lastName: "Martinez",
          phoneNumber: "210-555-6666"
        },
        {
          firstName: "Amanda",
          lastName: "Jones",
          phoneNumber: "666-999-8888"
        },
        {
          firstName: "Daniel",
          lastName: "Garcia",
          phoneNumber: "777-888-9999"
        },
        {
          firstName: "Lisa",
          lastName: "Taylor",
          phoneNumber: "444-333-2222"
        },
        {
          firstName: "Matthew",
          lastName: "Wilson",
          phoneNumber: "111-222-3333"
        },
        {
          firstName: "Jessica",
          lastName: "Lopez",
          phoneNumber: "888-777-6666"
        },
        {
          firstName: "Christopher",
          lastName: "Hernandez",
          phoneNumber: "333-222-1111"
        },
        {
          firstName: "Ashley",
          lastName: "Gonzalez",
          phoneNumber: "222-333-4444"
        },
        {
          firstName: "Kevin",
          lastName: "Perez",
          phoneNumber: "999-666-3333"
        },
        {
          firstName: "Mary",
          lastName: "Rodriguez",
          phoneNumber: "777-555-3333"
        },
        {
          firstName: "Ryan",
          lastName: "Flores",
          phoneNumber: "555-666-7777"
        },
        {
          firstName: "Kimberly",
          lastName: "Torres",
          phoneNumber: "222-444-6666"
        },
        {
          firstName: "Joseph",
          lastName: "Rivera",
          phoneNumber: "888-444-2222"
        },
        {
          firstName: "Stephanie",
          lastName: "Scott",
          phoneNumber: "777-999-5555"
          
        }
      ]
}
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')

})

app.get('/api', (req, res) => {
    res.json(user.users)
  
  })








app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
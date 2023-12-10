const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yoddd!')
    })
app.get("/da",(req,res)=>{
    res.json({
        hey:'hello',
        f:'ff'
    })   
    })

app.listen(process.env.PORT || 3000)

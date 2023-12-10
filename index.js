import bodyParser from "body-parser";
import express from 'express';
import Stripe from "stripe";
// import {STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY} from "./constants.js";

const stripePublishableKey = 'pk_test_51OEve0SBkRy3VUVVkfeeqcpAQFUF7r0H9yPDMqxrQzMdHKbLxS4qdJQeSsy7m0UQrHdNq7Uy63FZh578nmFHD7QM00Np8Y5m24'
const stripeSecretKey = 'sk_test_51OEve0SBkRy3VUVVNFjwnCMDFsYYgENPlAJ7ebrbDFlSdcIUUtH5SLkmCjYA6P91YxWi6zfzQGV4B5Ez71Nhlrek00PYUY7p8m'


const app = express();
app.get("/",(req,res)=>{
    res.json({
        hey:'hello',
        f:'ff'
    })   
    })
app.use((req, res,next) => {
    bodyParser.json()(req,res,next)
})


app.post('/create-payment-intent', async (req, res) => {
    const {email, currency, amount} = req.body;
    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2020-03-02'
    })
    const customer = await stripe.customers.create({email})
    console.log(req.body);
    const params = {
        amount: parseInt(amount),
        currency,
        customer: customer.id,
        payment_method_options: {
            card: {
                request_three_d_secure: 'automatic'
            }
        },
        payment_method_types: []
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create(params);
        return res.send({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch(error){
        console.log(error);
        return res.send({
            error: error.raw.message
        })
    }
})

app.listen(3000, () => console.log(`Node server listening on port 3000!`));

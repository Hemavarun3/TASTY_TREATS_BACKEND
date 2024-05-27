import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = Stripe("sk_test_51O4RQ3SASuyyVAbQFYAd4cQpAxhrGPLoFYsmJR39AC1eVTgYMffyBz8UhhKfXLecMYluz2TmEyMOLiUorZPA6eXy00HV9I0ZIr");

const payment = async (req, res, next) => {
    try {
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options : [{shipping_rate : "shr_1PKZb9SASuyyVAbQ0b6HecEp"}],

            line_items: req.body.items.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty
                }
            }),
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        }
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json({ id : session.id });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(err.message)
    }

}


export default payment;
import csrf from "../../utils/csrf";

export default async function subscribe(req, res) {
    if (req.method === 'POST') {

        try {
            await csrf(req, res)
        } catch (e) {
            return res.json({error: true, message: "Missing csrf token"})
        }

        try {
            // send request to newsletter api
            if (!req.body.email) return res.json({
                error: true,
                message: "Missing required params"
            });

            let payload = {
                email: req.body.email,
                name: req.body.email,
                status: 'enabled',
            }

            let response = await fetch(process.env.NEWSLETTER_DOMAIN + '/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Basic " + new Buffer(process.env.NEWSLETTER_USER + ":" + process.env.NEWSLETTER_PASS).toString("base64"),
                },
                body: JSON.stringify(payload)
            })

            if (response.status === 200) {
                return res.json({
                    error: false,
                    message: "OK",
                    response: response?.statusText || 'Unknown Error'
                })
            } else return res.json({
                error: true,
                message: "Error Occurred",
                response: response?.statusText || 'Unknown Error'
            })

        } catch (e) {
            console.log(e)
            return res.json({error: true, message: "Error Occurred"})
        }

    } else {

        return res.json({
            error: true,
            message: "Invalid request method"
        });
    }
}
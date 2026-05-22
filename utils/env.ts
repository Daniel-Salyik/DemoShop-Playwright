import { z } from "zod";

const envShema = z.object({
    REGISTERED_EMAIL_FOR_USER1 : z.string(),
    PASSWORD_FOR_USER1 : z.string()
})

const env = envShema.parse(process.env)

export default env
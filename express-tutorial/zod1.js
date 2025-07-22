const z = require('zod');

const Player = z.object({
    username : z.string(),
    password : z.string().min(8).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must include uppercase, lowercase, number, and special character"
    )
})

try 
{
    const input = Player.parse({
        username : "Ramesh",
        password : "Asdfg$12344"
    })

    console.log("The input is ",input);
} catch (error) {
    if(error instanceof z.ZodError)
    {
        console.error("global error : ", error);
    }
}

const fishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
console.log("enums are : ",fishEnum.enum)
console.log("only trout : ",fishEnum.exclude(["Salmon","Tuna"]));
console.log("only salmon and trout : ",fishEnum.extract(["Salmon", "Trout"]))

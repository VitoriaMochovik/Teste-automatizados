import Service from "./service.js";

const data = {
    username: `vitoria-${Date.now()}`,
    password: `minhassenha`
}

const service = new Service({
    filename: './users.ndjson'
})

//await service.create(data)

// const users = await service.read()


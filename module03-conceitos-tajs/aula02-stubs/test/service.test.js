import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service'
import fs from "node:fs/promises"
import fsSync from 'node:fs'



describe('Service Test Suite', () => {
    let _service

    const filename = 'testfile.ndjson'
    beforeEach(() => {
       
        _service = new Service({
            filename
        })

    })

    describe('#read', () => {
        it('should return an empty array if the file is empty', async () => {
            //sistema operacional retornou um arquivo vazio
            jest.spyOn(
                fsSync,
                "existsSync"
            ).mockResolvedValue(true)

            jest.spyOn(
                fs,
                fs.readFile.name
            ).mockResolvedValue('')

            const result = await _service.read()
            expect(result).toEqual([])
        })

        //meu teste
        it('should return an empty array if the file not exist', async () => {
            jest.spyOn(
                fsSync,
                "existsSync"
            ).mockReturnValue(false)
            const readFileSpy = jest.spyOn(fs, "readFile")
     
            const result = await _service.read()

            expect(readFileSpy).not.toHaveBeenCalled();
            expect(result).toEqual([])

            
        })

        it('should return users without password if file contains users', async () => {
            const dbData = [
                {
                    username: 'user1',
                    password: 'pass1',
                    createdAt: new Date().toISOString()
                },
                {
                    username: 'user2',
                    password: 'pass2',
                    createdAt: new Date().toISOString()
                },
            ]

            //cada linha um json com quebra de linha e no final junta todos
            const fileContents = dbData
                .map(item => JSON.stringify(item).concat('\n')).join('')
            
            //mokey que aquele modulo readfile vai me retornar o filecontents, ou seja, sem chamar o sistema
            jest.spyOn(
                fsSync,
                "existsSync"

            )
            .mockResolvedValue(true)

            jest.spyOn(
                fs,
                "readFile"

            )
            .mockResolvedValue(fileContents)



            const result = await _service.read()

            const expected = dbData.map(({password, ...rest}) => ({...rest}))
            expect(result).toEqual(expected)

        })
    })

})

//e quando arquivo nao existir?
import { describe, it, expect, jest} from "@jest/globals"
import Person from '../src/person'

describe('Person', () => {
    describe('validate', () => {
        it('should throw if the name is not present', () => {
            //mock é a entrada necessaria para que o teste funcione
            const mockInvalidPerson = {
                name: '',
                cpf: '123.456.789-00'
            }
            
            expect(() => Person.validate(mockInvalidPerson))
            .toThrow(new Error('name is required'))
        })

        it('should throw if the cpf is not present', () => {
            //mock é a entrada necessaria para que o teste funcione
            const mockInvalidPerson = {
                name: 'tese',
                cpf: ''
            }
            
            expect(() => Person.validate(mockInvalidPerson))
            .toThrow(new Error('cpf is required'))
        })

        it('should not throw if person is valid', () => {
            //mock é a entrada necessaria para que o teste funcione
            const mockInvalidPerson = {
                name: 'teste',
                cpf: '123.456.789-00'
            }
            
            expect(() => Person.validate(mockInvalidPerson))
            .not
            .toThrow()
        })
    })

    describe('formated', () => {
        it('should formated the person name and cpf', () => {
            // AAA
            // ARANGE = PREPARA
            const mockPerson = {
                name: 'vitoria mochovik mateus',
                cpf: '000.999.444-45'
            }
            // ACT = EXECUTAR
            const formattedPerson = Person.format(mockPerson)
            // ASSERT = VALIDAR
            const expected = {
                name: 'vitoria',
                cpf: '00099944445',
                lastName: 'mochovik mateus'
            }

            expect(formattedPerson).toStrictEqual(expected)
        })
    })

    describe('save', () => {
        it('Should save the person', () => {
            const mockPerson06 = {
                name: 'vitoria',
                cpf: '00099944445',
                lastName: 'mochovik mateus'
            }

            const savePerson = Person.save(mockPerson06)

            expect(savePerson).toBeUndefined()

        })
    }) 

    describe('process', () => {
        it('should process a valid person', () => {
            const mockPerson = {
                name: 'ze da silva',
                cpf: '123.456.789-10'
            }
            jest.spyOn(
                Person,
                Person.validate.name
            ).mockReturnValue()

            jest.spyOn(
                Person,
                Person.format.name
            ).mockReturnValue({
                cpf: '12345678910',
                name: 'ze',
                lastName: 'da silva'
            })

            // act
            const result = Person.process(mockPerson)

            // assert
            const expected = 'ok'
            expect(result).toStrictEqual(expected)
        })
    })
})
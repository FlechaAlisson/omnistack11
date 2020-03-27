const generateUniqueID = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => {
    it('should return an unique ID',() =>{
        const id = generateUniqueID.generateUniqueId()
        expect(id).toHaveLength(8)
    })
})
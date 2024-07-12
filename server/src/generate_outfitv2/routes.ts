import {Router} from 'express'
import { openai } from '../generate_outfit/routes'


const generate_outfitV2 = Router()

generate_outfitV2.post("/generate_cloth", async (req, res) => {
    // try {
    //     const response = await openai.chat.completions.create({
    //         model: 'gpt-4o',
    //         messages: 
    //     })
    // } catch (error) {
        
    // }
})

export default generate_outfitV2
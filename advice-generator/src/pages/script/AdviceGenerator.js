import { ref } from 'vue'
import axios from 'axios'

export default {
    setup() {
        
        const random = ref('')
        const num = ref('')

        const randomFunction = () => {
            axios
            .get('https://api.adviceslip.com/advice')
            .then(response => {
               random.value = response.data.slip.advice
               num.value = response.data.slip.id
            })
            .catch(error => {
                console.log(error)
            })
        }

        randomFunction()

        return {
            random,
            num,
            randomFunction
        }
    }
}


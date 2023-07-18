import { ref } from 'vue'
export default {
    setup() {
        
        // document.getElementById('paragraph').textContent = 'Jerwin Propogo'

        const parag = 'Joshua Propogo'

        const inputColor = ref('')

        const btnCount = ref(0);
        const count = () => {
            btnCount.value++
        }
        
        return {
            parag,
            inputColor,
            btnCount,
            count
        }
    }
}
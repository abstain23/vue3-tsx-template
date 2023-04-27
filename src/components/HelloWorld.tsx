import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    return () => <div text-red wh-full >HelloWorld</div>
  }
})

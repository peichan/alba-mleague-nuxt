<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  fetch({ redirect }) {
    redirect(301, '/ranking/2020Q2')
  }
})
</script>
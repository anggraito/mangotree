<template>
  <div class="mango-wrap">
    <h1>Mango Tree Simulator</h1>
    <h3>Show me each 5 second</h3>
    <button class="btn" @click="startMango">Click Me, please!!</button>
    <div class="image-wrap">
      <ul>
        <li><img src="../assets/image.jpg" /></li>
      </ul>
    </div>
    <h2>{{status}}</h2>
    <h3>{{die}}</h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'mango-wrap',
  data () {
    return {
      status: '',
      die: ''
    }
  },
  methods: {
    ...mapActions([
      'getLive'
    ]),
    getStatus () {
      this.$db.on('value', (mango) => {
        this.status = mango.val().status
        this.die = mango.val().stopMessage
      })
    },
    startMango () {
      this.$db.set({ status: '', die: '' })
      this.getLive()
    }
  },
  mounted () {
    this.getStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3 {
  font-weight: normal;
}

.btn {
  margin: 10px 0px 10px 0px;
}
</style>

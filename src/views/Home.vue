<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }} <button @click="remove(index);">X</button>
      </li>
    </ul>
    <input type="text" v-model="idea" @keyup.enter="submit" />

    <button @click="pick">Pick!</button>
  </div>
</template>

<style>
input {
  width: 100%;
  padding: 0.5rem;
}
</style>

<script>
export default {
  name: "home",
  data() {
    return {
      items: [],
      idea: ""
    };
  },
  components: {},
  methods: {
    submit() {
      this.items.push(this.idea);
      this.idea = "";
    },

    remove(index) {
      this.items.splice(index, 1);
    },

    pick() {
      let randomIndex = Math.floor(Math.random() * this.items.length);

      alert(this.items[randomIndex]);
    }
  }
};
</script>

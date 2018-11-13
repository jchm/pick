<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.body }} <button @click="remove(item);">X</button>
      </li>
    </ul>

    <input
      type="text"
      v-model="newItem"
      @keyup.enter="add"
      placeholder="Voeg idee toe"
    />

    <button class="primary" @click="pick">Pick!</button>
  </div>
</template>

<style>
html {
  font-size: 18px;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  text-align: left;
  padding: 0.5rem 0;

  display: flex;
  justify-content: space-between;
}
input {
  width: 100%;
  padding: 0.5rem;
}
#app {
  max-width: 800px;
  margin: 0 auto;
}
.primary {
  border: 0;
  background-color: green;
  color: white;
  font-size: 18px;
  padding: 0.5rem 1rem;
  border-radius: 250px;
  margin-top: 1rem;
}
</style>

<script>
import { db } from "../config/db.js";

export default {
  name: "home",
  data() {
    return {
      id: this.$route.params.id,
      items: [],
      newItem: ""
    };
  },
  created() {
    if (!this.id) {
      return;
    }

    this.$bind(
      "items",
      db
        .collection("lists")
        .doc(this.id)
        .collection("items")
    );
  },
  methods: {
    add() {
      if (!this.newItem) {
        return;
      }

      if (!this.id) {
        let test = db.collection("lists").doc();

        this.id = test.id;

        this.$router.push({ name: "list", params: { id: test.id } });

        db.collection("lists")
          .doc(test.id)
          .collection("items")
          .add({
            body: this.newItem,
            created: firebase.firestore.FieldValue.serverTimestamp()
          });
      } else {
        db.collection("lists")
          .doc(this.id)
          .collection("items")
          .add({
            body: this.newItem,
            created: firebase.firestore.FieldValue.serverTimestamp()
          });
      }

      this.newItem = "";
    },

    remove(item) {
      db.collection("lists")
        .doc(this.id)
        .collection("items")
        .doc(item.id)
        .delete();
    },

    pick() {
      let randomIndex = Math.floor(Math.random() * this.items.length);

      alert(this.items[randomIndex].body);
    }
  },
  watch: {
    $route(to) {
      if (!to.params.id) {
        this.id = null;

        return;
      }

      this.id = to.params.id;
    },
    id() {
      if (!this.id) {
        this.$unbind("items");
        this.items = [];

        return;
      }

      this.$bind(
        "items",
        db
          .collection("lists")
          .doc(this.id)
          .collection("items")
      );
    }
  }
};
</script>
